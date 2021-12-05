import type { AttendeeData } from '../types';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import styles from './Form.module.scss';

function validateEmail(email: string) {
  const result =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  if (!result) {
    return 'This email is invalid. Check the format.';
  } else {
    return true;
  }
}

function validateLettersOnly(text: string) {
  const result = /^[a-zA-Z ]+$/.test(text);

  if (!result) {
    return 'Your input should consist of alphabet letters only.';
  } else {
    return true;
  }
}

/**
 * @todo Handle request error on the UI (consider using a toast)
 */
const Form = function (): JSX.Element {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AttendeeData>({ mode: 'onChange' });

  async function onSubmit(data: AttendeeData) {
    const result = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      router.push('/success');
    } else {
      // Replace alert with toast
      alert('There was an issue when we tried to register you for conference.');
      reset();
    }
  }

  return (
    <form
      id="registerForm"
      className={styles.form}
      onSubmit={handleSubmit(async (data) => await onSubmit(data))}
    >
      <div className={styles.field}>
        <label>Email</label>
        <input
          type="text"
          {...register('email', {
            required: 'This is required.',
            validate: { emailFormat: validateEmail },
          })}
        />
        {errors.email && (
          <div className={styles.error}>*{errors.email.message}</div>
        )}
      </div>

      <div className={styles.field}>
        <label>First name</label>
        <input
          type="text"
          {...register('firstname', {
            required: 'This is required.',
            validate: { lettersOnly: validateLettersOnly },
          })}
        />
        {errors.firstname && (
          <div className={styles.error}>*{errors.firstname.message}</div>
        )}
      </div>

      <div className={styles.field}>
        <label>Last name</label>
        <input
          type="text"
          {...register('lastname', {
            required: 'This is required.',
            validate: { lettersOnly: validateLettersOnly },
          })}
        />
        {errors.lastname && (
          <div className={styles.error}>*{errors.lastname.message}</div>
        )}
      </div>

      <div className={styles.field}>
        <label>Job role</label>
        <input
          type="text"
          {...register('role', {
            required: 'This is required.',
            validate: { lettersOnly: validateLettersOnly },
          })}
        />
        {errors.role && (
          <div className={styles.error}>*{errors.role.message}</div>
        )}
      </div>

      <div className={styles.field}>
        <label>Company</label>
        <input
          type="text"
          {...register('company', {
            required: 'This is required.',
            validate: { lettersOnly: validateLettersOnly },
          })}
        />
        {errors.company && (
          <div className={styles.error}>*{errors.company.message}</div>
        )}
      </div>

      <label>Do you own AirBlocks?</label>
      <div className={styles['field-radius']}>
        <div className={styles.radio}>
          <input
            {...register('airblocks', { required: 'This is required.' })}
            type="radio"
            value="Yup"
          />
          <label>Yup</label>
        </div>

        <div className={styles.radio}>
          <input
            {...register('airblocks', {
              required: 'This is required.',
              validate: { lettersOnly: validateLettersOnly },
            })}
            type="radio"
            value="Nope"
          />
          <label>Nope</label>
        </div>

        <div className={styles.radio}>
          <input
            {...register('airblocks', { required: 'This is required.' })}
            type="radio"
            value="Interested"
          />
          <label>Not yet, but I&apos;d like to learn more</label>
        </div>
        {errors.airblocks && (
          <div className={styles.error}>*{errors.airblocks.message}</div>
        )}
      </div>

      <button type="submit" className={styles.button}>
        Register for Wayru Conf
      </button>
    </form>
  );
};

export default Form;
export { validateEmail };
