import { useForm } from "react-hook-form";
import axios from "axios";
import Head from 'next/head'
import Link from "next/link";
import Router from 'next/router'
import toast from 'react-hot-toast';

const registerUrl = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/register`;

export default function Signup() {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    const requestConfg = {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY
      }
    }
    const requestBody = {
      email: data.email,
      password: data.password,
      username: data.username
    }

    if(data.email || data.password || data.username){
      axios.post(registerUrl, requestBody, requestConfg).then(response => {
        toast.success('Successfully registered', {
          duration: 2000,
          position: 'top-center',
        });
        Router.push('/login')
      }).catch(error => {
        if(error.response.status === 401){
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
    }else{
      toast.error("All fields are required !", {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign Up to your account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="bg-gray-900">
        <div className="flex justify-center h-screen">
            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/5">
                <div className="flex-1">
                    <div className="text-center">
                      <Link href="/" passHref>
                        <a>
                          <img
                            src="/images/logo/logo_white.svg"
                            className="cursor-pointer h-10 mx-auto"
                            alt="Logo"
                          />
                        </a>
                      </Link>
                      <p className="mt-3 text-gray-300">Sign up to access your account</p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div>
                              <label htmlFor="username" className="block mb-2 text-sm text-gray-200">Username</label>
                              <input {...register("username")} placeholder="johnDoe" type="text" name="username" id="username" className="block w-full px-4 py-2 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                          </div>

                          <div className="mt-6">
                              <label htmlFor="email" className="block mb-2 text-sm text-gray-200">Email Address</label>
                              <input {...register("email")} placeholder="example@example.com" type="email" name="email" id="email" className="block w-full px-4 py-2 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                          </div>

                          <div className="mt-6">
                              <div className="flex justify-between mb-2">
                                  <label htmlFor="password" className="text-sm text-gray-200">Password</label>
                                  <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                              </div>

                              <input {...register("password")} name="password" id="password" placeholder="Your Password" type="password" className="block w-full px-4 py-2 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                          </div>

                          <div className="mt-6">
                            <button type="submit"
                              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                              Sign Up
                            </button>
                          </div>

                        </form>

                        <p className="mt-6 text-sm text-center text-gray-400">You already have an account? <a href="/login" className="text-blue-500 focus:outline-none focus:underline hover:underline">Log in</a>.</p>
                    </div>
                </div>
            </div>

            <div className="hidden bg-cover lg:block lg:w-3/5" style={{backgroundImage : 'url(./adolfo-felix-Yi9-QIObQ1o-unsplash.jpg)'}}>
                <div className="flex items-end pb-6 h-full px-20 bg-gray-900 bg-opacity-40">
                    <div className="mx-auto">
                      <p className="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )

}
