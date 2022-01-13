// Neptune Mutual Test
// Author: Priyanshu Chauhan
// Last Updated: 14 Jan 2021 2:45 AM

import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Converter from '../components/Converter';

export default function Home() {
  return (
    <div className={styles.container}>
      <Image src="/logo.svg" width={330} height={150} />
      <Converter />
    </div>
  )
}
