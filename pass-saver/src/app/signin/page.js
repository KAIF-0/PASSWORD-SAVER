"use client"
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const signin = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const router = useRouter()

    const handleChange = async (e) => {
        setForm({ ...form, [e.target.name]: e.target.value.trim() })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("/api/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(form),
            })
            let data = await res.json();
            if (data.message == "Sign In successfull!") {
                toast.success(data.message,{
                    position: "top-right",
                })
                router.push('/home', { scroll: false })
            } else {
                toast.error(data.message,{
                    position: "top-right",
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                let res = await fetch("/api/userPresent", {
                    method: "GET",
                })
                if (res.status == 200) {
                    toast("You are already Logged-In!",{
                        position: 'top-right'
                    })
                    router.push('/home')
                }
            } catch (err) {
                setpresentUser(false)
                console.log(err)
                
            }
        }
        getUser();
    }, [])

    return (
        <>
            <Toaster />
            <div className="mt-20 flex items-center justify-center">
                <div className="bg-transparent border-slate-100 border-2 shadow-md min-h-[50vh] flex justify-center items-center flex-col rounded-lg p-8 mx-5 max-w-md w-full">
                    <h2 className="text-2xl text-white font-bold text-center mb-6">SIGN IN</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address *"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password *"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-md font-bold hover:bg-gray-800 transition duration-200"
                        //   disabled={loading}
                        >
                            SIGN IN
                        </button>
                        <div className="text-center mt-4">
                            <Link href={"/signup"} className="text-white hover:underline">
                                Don't have an account? Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default signin