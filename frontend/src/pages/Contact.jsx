import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({ listing }) {
    let [landlord, setLandlord] = useState(null)
    let [message, setMessage] = useState('')

    useEffect(() => {
        const getLandlordData = async () => {
            let res = await fetch(`/api/user/${listing.userRef}`)
            let data = await res.json();
            if (data.success === false) {
                console.log(data.message)
            }
            setLandlord(data);
        }
        getLandlordData()
    }, [listing.userRef]);

    return (
        <>
            {landlord && (
                <div className='my-3 flex flex-col gap-3'>
                    <p>
                        Contact <span className='font-semibold'>{landlord.username}</span>
                        {' '}for{' '}
                        <span className='font-semibold'>{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea
                        name='message'
                        id='message'
                        rows='2'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='Enter your message here...'
                        className='w-full border p-3 rounded-lg'
                    ></textarea>

                    <Link
                        to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                        className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                    >
                        Send Message
                    </Link>
                </div>
            )
            }
        </>
    )
}
