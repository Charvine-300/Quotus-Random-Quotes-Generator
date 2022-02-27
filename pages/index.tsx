import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Desktop from '../public/pattern-divider-desktop.svg'
import Mobile from '../public/pattern-divider-mobile.svg'
import Dice from '../public/icon-dice.svg'
import styles from '../styles/Home.module.css'

interface QuoteProps {
  slip: {
    id: number,
    advice: string
  }
}

const Home = ({slip}: QuoteProps) => {
  const [image, setImage] = useState(Mobile);
  const [width, setWidth] = useState(295);

  useEffect(() => {
    if (document.body.clientWidth >= 768) {
      setImage(Desktop);
      setWidth(370);
    }
  }, [])

  function newQuote() {
    window.location.reload();
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Quotus | Random Quote Generator </title>
        <meta name="description" content="A web application that generates random quotes" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <main className={styles.main}>
        <div className={styles.card}> 
          <p> Advice #{slip.id} </p>
          <h2> 
            &quot;{slip.advice}&quot;
          </h2>
          <div className={styles.divide}>
            <Image src={image} width={width} height={16} alt='Divider Icon' />
          </div>
          <div className={styles.cube} onClick={newQuote}>
            <div className={styles.align}>
              <Image src={Dice} width={24} height={24} alt="Quotus Icon" />
            </div>
          </div>
        </div>
        
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.adviceslip.com/advice');
  const data = await res.json();
  const slip = data.slip;

  return {
    props: {
      slip
    }
  }
}