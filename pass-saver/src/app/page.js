"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const router = useRouter();

  const getYear = () => {
    const currentYear = new Date().getFullYear();
    return currentYear
  }
  useEffect(() => {

    getYear();
  }, [])

  const handleClick = async () => {
    try {
      let res = await fetch("/api/userPresent", {
        method: "GET",
      })
      if (res.status == 200) {
        router.push('/home', {
          scroll: false
        })
      }
      else {
        toast.error("Login to Save!", {
          position: "top-right",
        })
      }
    } catch (err) {
      setpresentUser(false)
      console.log(err)

    }

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full text-white mt-24">
      <Toaster />
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          SAVE YOUR PASSWORDS !
        </h1>

        <p className="mt-3 text-2xl">
          Fast and simple website for saving your passwords, easy to store.
        </p>

        <div className="mt-16 w-full max-w-screen-md">
          <input placeholder='Enter Password' className='rounded-full border-2  bg-transparent text-slate-100 border-slate-100 w-full p-3 ' type="password" name="password" id="password" />

          <button onClick={handleClick} className="w-full mt-4 p-3 rounded-full bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
