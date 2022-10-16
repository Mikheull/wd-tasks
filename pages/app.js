import { useState, useEffect } from "react";
import Head from 'next/head'

import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'

export default function AppHome() {

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <main className={styles.main}>
          
            App
            
        </main>
      </div>
    </>
  )
}