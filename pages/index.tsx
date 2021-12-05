import type { NextPageWithLayout } from '../types';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '../components/Layout';
import styles from '../page_styles/index.module.scss';

const Home: NextPageWithLayout = function () {
  return (
    <>
      <Image
        src="/wayru_iso_white.png"
        alt="Wayru logo icon"
        width={200}
        height={200}
      />
      <h1 className={styles.title}>Wayru Conf 2022</h1>
      <p className={styles.text}>
        Find out what updates are coming to our distributed network.
      </p>
      <p className={styles.text}>
        August 26 | Online | <span className={styles.time}>10:00 AM GMT-5</span>
      </p>
      <Link href="/register">
        <a className={styles.register}>Register</a>
      </Link>
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout title="Wayru Conf 2022">{page}</Layout>;
};

export default Home;
