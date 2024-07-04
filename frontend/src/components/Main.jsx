import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';




const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

//(FOR LOCAL STORAGE)

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            console.log(passwords)
            setpasswordArray(JSON.parse(passwords));
        }else{
            setpasswordArray([])
        }
    }, [])


//(FOR EXTERNAL BACKEND)    

    // const getPasswords = async () =>{
    //     let req = await fetch("http://localhost:2000/")
    //     let passwords = await req.json()
    //     console.log(passwords)
    //     setpasswordArray(passwords)
    // }

    // useEffect(() => {
    //   getPasswords()
    // }, [])
    


    const showPassword = () => {
        // passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }
    }

    const savePassword = async () => {
            if(form.site.length > 1){
                toast('Password Saved...', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: "Bounce"
                    });

                //after editing same id one will be deleted
                // await fetch("http://localhost:2000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })    

                //(FOR EXTERNAL BACKEND)         
                // await fetch("http://localhost:2000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

                //(FOR LOCAL STORAGE)
                setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
                localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
                console.log([...passwordArray, {...form, id: uuidv4()}])
                setform({ site: "", username: "", password: "" })
            }else{
                toast('Cannot be empty', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: "Bounce"
                    });
            }
        
    }

    const deletePassword = async (id) => {
        toast('Password Deleted...', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: "Bounce"
            });
        // console.log(id)

        //(FOR EXTERNAL BACKEND) 
        // await fetch("http://localhost:2000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
        
        //(FOR LOCAL STORAGE)
        setpasswordArray(passwordArray.filter((item)=>item.id !== id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item)=>item.id !== id)))
    }

    const editPassword = async (id) => {


        // console.log(passwordArray.filter(i=>i.id===id)[0])     // will show the direct object ...
        // console.log({...passwordArray.filter(i=>i.id===id)[0]})      // will show the copy of the object...
       
        // setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setform({...passwordArray.filter(i=>i.id===id)[0]})
        setpasswordArray(passwordArray.filter((item)=>item.id !== id ))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item)=>item.id !== id )))
    }

    const copyText = (e) => {
        toast('Copied to Clipboard...', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: "Bounce"
            });
        navigator.clipboard.writeText(e)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className=" p-3 md:mycontainer min-h-[88.2vh] ">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-gray-400'> &lt;</span>

                    <span>PassSvr</span><span className='text-gray-400'>/&gt;</span>

                </h1>
                <p className='text-gray-400 text-lg text-center'>Your Password Saver</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input onChange={handleChange} value={form.site} placeholder='Enter Site' className='rounded-full border-2 bg-transparent text-slate-100 border-slate-100 w-full p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input onChange={handleChange} value={form.username} placeholder='Enter Username' className='rounded-full border-2 bg-transparent text-slate-100 border-slate-100 w-[50%] p-4 py-1' type="text" name="username" id="username" />
                        <div className="relative w-[50%]">

                            <input onChange={handleChange} value={form.password} ref={passwordRef} placeholder='Enter Password' className='rounded-full border-2  bg-transparent text-slate-100 border-slate-100 w-full p-4 py-1' type="password" name="password" id="password" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword} >
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2  bg-black-700 text-white border-slate-100 hover:bg-slate-100 hover:text-black rounded-full px-8 py-2 w-fit border-2 '>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Save</button>
                </div>

                <div className="passwords">
                    {passwordArray.length === 0 && <div className='font-bold text-2xl py-4 text-slate-100'> No Saved passwords... </div>}
                    {passwordArray.length != 0 && <h2 className='font-bold text-2xl py-4 text-slate-100'>Your Passwords...</h2>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-transparent border-2 rounded-3xl  text-white  '>
                            <tr className='border-slate-100'>
                                <th className='py-2 border-slate-100'>Site</th>
                                <th className='py-2 border-l-2 border-slate-100'>Username</th>
                                <th className='py-2 border-l-2 border-slate-100'>Password</th>
                                <th className='py-2 border-l-2 border-slate-100'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-slate-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => editPassword(item.id) }>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager