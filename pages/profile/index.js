import { useEffect } from "react";
import Head from 'next/head'
import Router from 'next/router'

import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { verifyToken } from '../../hooks/useLocalStorage'

export default function Profile() {
  const verifiedtoken = verifyToken();

  useEffect(() => {
    
    if(verifiedtoken === false){
      Router.push(`/login?return_url=profile`)
    }
    
  }, [verifiedtoken])

  return (
    <>
      <div className='bg-gray-900 w-full px-6 mx-auto'>
        <Head>
          <title>My Profile</title>
          <meta name="description" content="Access to your profile" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <Footer />
      </div>
    </>
  )
}
