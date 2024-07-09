"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'flowbite-react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';



const Navbar = () => {
    const [presentUser, setpresentUser] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const getUser = async () => {
            try {
                let res = await fetch("/api/userPresent", {
                    method: "GET",
                })
                if (res.status == 200) {
                    setpresentUser(true)
                } else {
                    setpresentUser(false)
                }
            } catch (err) {
                setpresentUser(false)
                console.log(err)

            }
        }
        getUser();
    }, [presentUser])


    const handleSignOut = async () => {
        try {
            let res = await fetch("/api/signout", {
                method: "PUT",
            })
            if (res.status == 200) {
                toast.success("Sign-Out Successfull!", {
                    position: 'top-right'
                })
                setpresentUser(false)
                router.push('/signin', { scroll: false })
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <nav className='bg-transparent text-white border-2 rounded-3xl mx-2'>
            <Toaster />
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

                <Link href={'/'}><div className="logo font-bold text-white text-2xl ">
                    <span className='text-white text-3xl'> &lt;</span>
                    <span className='text-gray-600'>PassSvr</span><span className='text-white text-3xl'>/&gt;</span>
                </div></Link>
                <div className='flex space-x-3'>
                    <div className='text-white bg-gray-400 my-5 mx-2 px-2 rounded-3xl flex  justify-between items-center ring-black ring-4'>
                        {presentUser ? (
                            <Dropdown label="@ACTIVE " inline>
                                <button onClick={handleSignOut} > <Dropdown.Item>
                                    Sign Out</Dropdown.Item></button>
                            </Dropdown>
                        ) : (<Link href="/signin" className=" ml-28 border-white text-center  px-4 py-1 rounded-full font-bold hover:bg-white hover:text-black">
                            Sign In
                        </Link>)}

                    </div>
                    <button className='text-white bg-gray-400 my-5 mx-2 rounded-3xl flex  justify-between items-center ring-black ring-4'>
                        <lord-icon
                            src="https://cdn.lordicon.com/eodeknny.json"
                            trigger="hover"
                            style={{ "width": "40px", "height": "25px" }}>
                        </lord-icon>

                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar