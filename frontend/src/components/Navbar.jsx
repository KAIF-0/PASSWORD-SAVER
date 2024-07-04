import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-transparent text-white border-2 rounded-3xl mt-10 '>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

                <div className="logo font-bold text-white text-2xl mt-6">
                    <span className='text-black text-3xl'> &lt;</span>

                    <span className='text-gray-400'>PassSvr</span><span className='text-black text-3xl'>/&gt;</span>


                </div>
                <button className='text-white bg-gray-400 my-5 mx-2 rounded-3xl flex  justify-between items-center ring-black ring-4'>
                    <lord-icon
                        src="https://cdn.lordicon.com/eodeknny.json"
                        trigger="hover"
                        style={{ "width": "40px", "height": "25px" }}>
                    </lord-icon>

                </button>
            </div>
        </nav>
    )
}

export default Navbar