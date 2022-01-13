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
