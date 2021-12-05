import type { NextPage } from 'next';

import Layout from '../components/Layout';

import styles from '../page_styles/success.module.scss';

const Success: NextPage = function () {
  return (
    <Layout title="Success - Wayru Conf 2022">
      <h1 className={styles.title}>
        Great news! You are registered to attend Wayru Conf 2022.
      </h1>
      <p className={styles.text}>
        You should be receiving an email with more information shortly. Make
        sure to check your spam folder just in case.
      </p>
      <p className={styles.text}>
        Thank you for the interest in our products, and for being part of our
        fantastic community.
      </p>
    </Layout>
  );
};

export default Success;
