import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    let { currentUser } = useSelector(state => state.user)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', search);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermInUrl = urlParams.get('searchTerm');
        if (searchTermInUrl) {
            setSearch(searchTermInUrl);
        }
    }, [location.search]);

    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='text-sm sm:text-xl font-bold flex flex-wrap'>
                        <span className='text-slate-500'>Amin</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link>
                <form onSubmit={handleSubmit} className='bg-slate-100 p-2 rounded-lg flex items-center'>
                    <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...'
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                    />
                    <button>
                        <FaSearch className='text-slate-600' />
                    </button>
                </form>
                <ul className='flex sm:gap-4 md:gap-6'>
                    <Link to='/' >
                        <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                    </Link>
                    <Link to='/about' >
                        <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                    </Link>
                    <Link to='/profile' >
                        {
                            currentUser
                                ? (
                                    <img
                                        className='w-7 h-7 rounded-full object-cover'
                                        src={currentUser.avatar}
                                        alt='profile'
                                    />
                                )
                                : (
                                    <li className='text-slate-700 hover:underline'>
                                        Sign in
                                    </li>
                                )
                        }
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header
