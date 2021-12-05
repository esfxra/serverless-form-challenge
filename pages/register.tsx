import type { NextPageWithLayout } from '../types';

import Layout from '../components/Layout';
import Form from '../components/Form';
import styles from '../page_styles/register.module.scss';

const Register: NextPageWithLayout = function () {
  return (
    <>
      <h1 className={styles.title}>Register for the conference</h1>
      <p className={styles.text}>
        We will send a ticket to your email, and more details on how to attend
        soon.
      </p>
      <Form />
    </>
  );
};

Register.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout title="Register - Wayru Conf 2022">{page}</Layout>;
};

export default Register;
