export type AttendeeData = {
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  company: string;
  airblocks: 'yup' | 'nope' | 'interested';
};

export type AttendeeEmail = {
  to: string;
  ticketId: string;
  firstname: string;
};

export type HostEmail = {
  ticketId: string;
  attendee: AttendeeData;
};
