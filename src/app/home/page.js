'use client'
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useRouter } from 'next/navigation';




const Home = () => {
    const passwordRef = useRef()
    const router = useRouter()
    const [passVisibility, setpassVisibility] = useState(false)
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const [userId, setuserId] = useState('')


    const getUser = async () => {
        try {
            let res = await fetch("/api/userPresent", {
                method: "GET",
            })
            let data = await res.json();
            if (res.status == 200) {
                setuserId(data.userid)
                getPass();
            }
            else {
                toast.error('Please Sign-In first!',{
                    position: 'top-right'
                    })
                router.push('/signin')
            }
        } catch (err) {
            console.log(err)

        }
    }

    const getPass = async () => {
        try {
          let res = await fetch("/api/getpass", {
            method: "GET",
          });
          let data = await res.json();
          console.log(res, data);
          if (data.message === "No documents found") {
            toast.error("No saved passwords found!", {
              position: "top-right",
            });
          } else if (res.status == 200) {
            setpasswordArray(data);
          } else {
            toast.error("Try refreshing page!", {
              position: "top-right",
            });
          }
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(() => {
        getUser();
    }, [])


    const savePassword = async () => {
        if (form.site.length > 1 && form.password.length > 1 && form.username.length > 1) {
            try {
                let res = await fetch("/api/createpass", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({ ...form, userid: userId }),
                })
                if (res.status == 200) {
                    toast.success('Password Saved...', {
                        position: "top-right",
                    });
                    getPass();
                    setform({ site: "", username: "", password: "" })
                }
                else {
                    toast.error('Try refreshing page!', {
                        position: "top-right",
                    })
                }
            } catch (err) {
                console.log(err)

            }
        } else {
            toast.error('Cannot be empty', {
                position: "top-right",
            });
        }

    }


    const deletePassword = async (id) => {
        try {
            let res = await fetch(`/api/deletepass/${id}`, {
                method: "DELETE"
            })
            if (res.status == 200) {
                setpasswordArray(passwordArray.filter((item) => item.id !== id))
                toast.success('Password Deleted...', {
                    position: "top-right",
                });
            }
            else {
                toast.error("Try Again!", {
                    position: "top-right",
                })
            }
        } catch (err) {
            console.log(err)

        }
    }



    const copyText = (e) => {
        toast.success('Copied to Clipboard...', {
            position: "top-right",
        });
        navigator.clipboard.writeText(e)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Toaster
                position="top-right" />
            <div className="p-3 md:container max-w-screen-lg mx-auto my-5">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-gray-400'> &lt;</span>
                    <span>PassSvr</span><span className='text-gray-400'>/&gt;</span>
                </h1>
                <p className='text-gray-400 text-lg text-center'>Your Password Saver</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center max-w-screen-lg mx-auto">
                    <input
                        onChange={handleChange}
                        value={form.site}
                        placeholder='Enter Site'
                        className='rounded-full border-2 bg-transparent text-slate-100 border-slate-100 w-full p-4 py-1'
                        type="text"
                        name="site"
                        id="site"
                    />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input
                            onChange={handleChange}
                            value={form.username}
                            placeholder='Enter Username/Id'
                            className='rounded-full border-2 bg-transparent text-slate-100 border-slate-100 w-full md:w-[48%] p-4 py-1'
                            type="text"
                            name="username"
                            id="username"
                        />
                        <div className="relative w-full md:w-[48%]">
                            <input
                                onChange={handleChange}
                                value={form.password}
                                ref={passwordRef}
                                placeholder='Enter Password'
                                className='rounded-full border-2 bg-transparent text-slate-100 border-slate-100 w-full p-4 py-1'
                                type={passVisibility ? "text" : "password"}

                                name="password"
                                id="password"
                            />
                            <span className='absolute right-[8px] top-[5px] text-2xl cursor-pointer text-white' onClick={() => setpassVisibility(!passVisibility)}>
                                {passVisibility ? <FiEyeOff /> : <FiEye />}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={savePassword}
                        className='flex justify-center items-center gap-2 bg-black-700 text-white border-slate-100 hover:bg-slate-100 hover:text-black rounded-full px-8 py-2 w-fit border-2'
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        ></lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords mx-auto text-center">
                    {passwordArray.length === 0 && <div className='font-bold text-2xl py-4 text-slate-100'> No Saved passwords... </div>}
                    {passwordArray.length !== 0 && <h2 className='font-bold text-2xl py-4 text-slate-100'>Your Passwords...</h2>}
                    {passwordArray.length !== 0 && (
                        <div className="overflow-auto md:max-w-screen-xl mx-auto">
                            <table className="table-auto w-full rounded-md overflow-hidden ">
                                <thead className='bg-transparent border-2 rounded-3xl text-white'>
                                    <tr className='border-slate-100'>
                                        <th className='py-2 border-slate-100'>Site</th>
                                        <th className='py-2 border-l-2 border-slate-100'>Username/Id</th>
                                        <th className='py-2 border-l-2 border-slate-100'>Password</th>
                                        <th className='py-2 border-l-2 border-slate-100'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-slate-100 text-black'>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index}>
                                            <td className='py-2 border border-black border-l-white text-center'>
                                                <div className='flex items-center justify-center'>
                                                    <a href={item.site} target='_blank'>{item.site}</a>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-black text-center'>
                                                <div className='flex items-center justify-center'>
                                                    <span>{item.username}</span>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-black text-center'>
                                                <div className='flex items-center justify-center'>
                                                    <span>{"*".repeat(item.password.length)}</span>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='justify-center py-2 border border-r-white border-black text-center'>
                                                <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}
                                                    ></lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>


        </>
    )
}

export default Home