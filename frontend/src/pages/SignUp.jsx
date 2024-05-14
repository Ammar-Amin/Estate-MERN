import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
    let [formData, setFormData] = useState({})
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState(null)

    let navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.entries(formData).length == 0) return alert("Please enter a valid form")
        try {
            setLoading(true)
            const res = await fetch('/api/auth/signup',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                setLoading(false)
                setError(data.message);
                return;
            }
            setLoading(false)
            setError(null)
            navigate('/sign-in')
        } catch (err) {
            console.log(err);
            setError(err.message)
            setLoading(false)
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='my-7 text-3xl text-center font-semibold'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type="text"
                    className='p-3 border rounded-lg'
                    name='username'
                    placeholder='Username'
                    onChange={handleChange} />
                <input
                    type="email"
                    className='p-3 border rounded-lg'
                    name='email'
                    placeholder='Email'
                    onChange={handleChange} />
                <input
                    type="password"
                    className='p-3 border rounded-lg'
                    name='password'
                    placeholder='Password'
                    onChange={handleChange} />
                <button disabled={loading}
                    className='my-1 p-3 text-white bg-slate-700 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
                    {
                        loading ? "loading..." : "sign up"
                    }
                </button>
            </form>
            <div className='flex gap-3 mt-4'>
                <p>Already have an account?</p>
                <Link to='/sign-in'>
                    <span className='text-blue-600'>Sign In</span>
                </Link>
            </div>
            {
                error && <p className='text-red-500 mt-5'>{error}</p>
            }
        </div>
    )
}
