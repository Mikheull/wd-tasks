import { useEffect } from "react";
import axios from "axios";
import Head from 'next/head'
import Router from 'next/router'
import toast from 'react-hot-toast';

import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import ProfileEdit from '../../components/profile/profile'
import PasswordEdit from '../../components/profile/password'
import AvatarEdit from '../../components/profile/avatar'
import { getUser, verifyToken } from '../../hooks/useLocalStorage'

export default function Profile() {
  const user = getUser();
  const verifiedtoken = verifyToken();

  useEffect(() => {
    
    if(!user && verifiedtoken === false){
      Router.push(`/login?return_url=profile`)
    }
    
  }, [verifiedtoken, user])

  const editProfileHandler = (data) => {

    if(verifiedtoken){
      const token = localStorage.getItem('token');
      const updateProfileUrl = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/profile`;

      const requestConfg = {
          headers: {
              'x-api-key': process.env.NEXT_PUBLIC_API_KEY
          }
      }

      const requestBody = {
        username: data.username,
        email: data.email,
        token: token
      }

      axios.patch(updateProfileUrl, requestBody, requestConfg).then(response => {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

        toast.success('Account edited', {
          duration: 2000,
          position: 'top-center',
        });
      }).catch(error => {
        console.log(error)
        if(error.response && (error.response.status === 401 || error.response.status === 403)){
          toast.error(error.response.data.message, {
            duration: 2000,
            position: 'top-center',
          });
        }else{
          toast.error("sorry... the backend server is down! please try again later", {
            duration: 2000,
            position: 'top-center',
          });
        }
      })

    }
   
  }

  const editPasswordHandler = (data) => {

    if(verifiedtoken){
      const token = localStorage.getItem('token');
      const updatePasswordUrl = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/profile/password`;

      const requestConfg = {
          headers: {
              'x-api-key': process.env.NEXT_PUBLIC_API_KEY
          }
      }

      const requestBody = {
        old_password: data.old_password,
        password: data.password,
        token: token
      }

      axios.post(updatePasswordUrl, requestBody, requestConfg).then(response => {
        console.log(response);
        toast.success('Password edited', {
          duration: 2000,
          position: 'top-center',
        });
      }).catch(error => {
        console.log(error)
        if(error.response && (error.response.status === 401 || error.response.status === 403)){
          toast.error(error.response.data.message, {
            duration: 2000,
            position: 'top-center',
          });
        }else{
          toast.error("sorry... the backend server is down! please try again later", {
            duration: 2000,
            position: 'top-center',
          });
        }
      })

    }
   
  }

  return (
    <>
      <div className='bg-gray-900 w-full px-6 mx-auto'>
        <Head>
          <title>My Profile</title>
          <meta name="description" content="Access to your profile" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <ProfileEdit data={user} editHandler={editProfileHandler} />
        <PasswordEdit editPassHandler={editPasswordHandler} />
        {/* <AvatarEdit /> */}

        <Footer />
      </div>
    </>
  )
}
