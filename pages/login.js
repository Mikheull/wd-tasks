import { useForm } from "react-hook-form";
import axios from "axios";
import Head from 'next/head'
import Link from "next/link";
import toast from 'react-hot-toast';
import Router, { useRouter } from 'next/router'

const loginUrl = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/login`;

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const router = useRouter()

  const onSubmit = data => {
    const requestConfg = {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY
      }
    }
    const requestBody = {
      email: data.email,
      password: data.password
    }

    if(data.email || data.password){
      axios.post(loginUrl, requestBody, requestConfg).then(response => {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

        toast.success('Successfully connected', {
          duration: 2000,
          position: 'top-center',
        });
        
        Router.push((router.query.return_url) ? '/'+router.query.return_url : '/app')
      }).catch(error => {
        console.log(error);
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
        <title>Sign In</title>
        <meta name="description" content="Sign In to your account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="bg-gray-900">
        <div className="flex justify-center h-screen">
            <div className="hidden bg-cover lg:block lg:w-2/5" style={{backgroundImage : 'url(./michael-dam-mEZ3PoFGs_k-unsplash.jpg)'}}>
                <div className="flex items-end pb-6 h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                      <p className="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae</p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-3/5">
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
                      <p className="mt-3 text-gray-300">Sign in to access your account</p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div>
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
                              Log In
                            </button>
                          </div>

                        </form>

                        <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="/signup" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a>.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
