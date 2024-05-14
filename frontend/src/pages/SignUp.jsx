import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='my-7 text-3xl text-center font-semibold'>Sign Up</h1>
            <form className='flex flex-col gap-4'>
                <input type="text" className='p-3 border rounded-lg' name='username' placeholder='Username' />
                <input type="email" className='p-3 border rounded-lg' name='email' placeholder='Email' />
                <input type="password" className='p-3 border rounded-lg' name='password' placeholder='Password' />
                <button className='my-1 p-3 text-white bg-slate-700 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>sign up</button>
            </form>
            <div className='flex gap-3 mt-4'>
                <p>Already have an account?</p>
                <Link to='/sign-in'>
                    <span className='text-blue-600'>Sign In</span>
                </Link>
            </div>
        </div>
    )
}
