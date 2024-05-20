import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
    let { currentUser } = useSelector(state => state.user)
    return (
        <div className='p-3 max-w-lg mx-auto'>
            {/* <h1 className='text-center text-3xl font-semibold mt-7'>Profile</h1> */}
            <form className='flex flex-col gap-4'>
                <img
                    src={currentUser.avatar}
                    alt='profile'
                    className='my-4 w-24 h-24 rounded-full object-cover cursor-pointer self-center'
                />
                <input type='text' placeholder='Username' name='username' className='p-3 border rounded-lg' />
                <input type='email' placeholder='Email' name='email' className='p-3 border rounded-lg' />
                <input type='password' placeholder='Password' name='password' className='p-3 border rounded-lg' />
                <button className='p-3 uppercase bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-80'>update</button>
            </form>
            <div className='flex justify-between m-5'>
                <span className='text-red-600 cursor-pointer'>Delete account</span>
                <span className='text-red-600 cursor-pointer'>Sign In</span>
            </div>
        </div>
    )
}
