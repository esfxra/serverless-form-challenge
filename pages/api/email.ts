import type { NextApiRequest, NextApiResponse } from 'next';
import type { AttendeeData, AttendeeEmail, HostEmail } from '../../types';
import sendgrid from '@sendgrid/mail';
import { nanoid } from 'nanoid';

interface CustomRequest extends NextApiRequest {
  body: AttendeeData;
}

sendgrid.setApiKey(process.env.SENDGRID_KEY);

/**
 * This function sends an email to the user that registered for the event.
 */
async function sendEmailToAttendee({ to, ticketId, firstname }: AttendeeEmail) {
  const html = `
  <div>
    <p>Hi ${firstname},</p>
    <p>Thank you for signing up for the event.</p>
    <p>Here is your ticket id: ${ticketId}</p>
    <br />
    <p>See you then. Cheers!</p>
  </div>`;

  return await sendgrid.send({
    to,
    from: process.env.FROM_EMAIL,
    subject: 'Your conference ticket',
    html,
  });
}

/**
 * This function sends an email to the host.
 */
async function sendEmailToHost({ ticketId, attendee }: HostEmail) {
  const html = `
  <div>
  <p>Hi host,</p>
  <p>A new attendee has signed up for the conference. Here are the details:</p>
  <ul>
    <li>Email: ${attendee.email}</li>
    <li>First name: ${attendee.firstname}</li>
    <li>Last name: ${attendee.lastname}</li>
    <li>Role: ${attendee.role}</li>
    <li>Company: ${attendee.company}</li>
    <li>Owns Airblocks?: ${attendee.airblocks}</li>
  </ul>
  <br />
  <p>And this is the attendee's ticket id: ${ticketId}</p>
  </div>`;

  return await sendgrid.send({
    to: process.env.FROM_EMAIL,
    from: process.env.FROM_EMAIL,
    subject: 'Conf registration: a new attendee has signed up',
    html,
  });
}

async function handler(req: CustomRequest, res: NextApiResponse) {
  try {
    // Generate a random string to count as ticketId.
    const ticketId = nanoid();

    // Prepare data for confirmation email
    const attendeeEmailData = {
      to: req.body.email,
      ticketId,
      firstname: req.body.firstname,
    };

    // Prepare data for notification email to host.
    const hostEmailData = {
      ticketId,
      attendee: req.body,
    };

    // Wait for both promises
    await Promise.all([
      sendEmailToAttendee(attendeeEmailData),
      sendEmailToHost(hostEmailData),
    ]);

    return res.status(200).end();
  } catch (error) {
    return res.status(500).end();
  }
}

export default handler;
export { sendEmailToAttendee, sendEmailToHost };
