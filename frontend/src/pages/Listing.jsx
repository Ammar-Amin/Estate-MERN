import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from 'react-icons/fa';
import { GiSofa } from "react-icons/gi";
import { GiKitchenScale } from "react-icons/gi";
import { BsSignNoParkingFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import Contact from './Contact';

function Listing() {
    SwiperCore.use([Navigation])
    const [listing, setListing] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false)
    const { currentUser } = useSelector(state => state.user)
    const params = useParams()

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true)
                let res = await fetch(`/api/listing/get/${params.listingId}`)
                let data = await res.json()
                if (data.success === false) {
                    // console.log(data.message)
                    setError(data.message)
                    setLoading(false)
                    return;
                }
                setListing(data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchListing()
    }, [])

    return (
        <main>
            {loading && <p className='text-2xl text-center my-7'>Loading...</p>}
            {error && <p className='text-2xl text-red-600 font-medium text-center my-7'>{error}</p>}
            {listing && !loading && !error &&
                (
                    <div>
                        <div className='relative'>
                            <Swiper navigation>
                                {listing.imageUrls.map((url) => (
                                    <SwiperSlide key={url}>
                                        <div
                                            className='h-[400px] sm:h-[550px]'
                                            style={{
                                                background: `url(${url}) center no-repeat`,
                                                backgroundSize: 'cover',
                                            }}
                                        ></div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className='absolute top-[5%] right-[3%] z-10 border rounded-full w-8 sm:w-12 h-8 sm:h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                                <FaShare
                                    className='text-slate-500'
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        setCopied(true);
                                        setTimeout(() => {
                                            setCopied(false);
                                        }, 1000);
                                    }}
                                />
                            </div>
                            {copied && (
                                <p className='absolute top-[14%] sm:top-[16%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                                    Link copied!
                                </p>
                            )}
                        </div>
                        <div className='flex flex-col max-w-4xl mx-auto p-3 mt-2 mb-7 sm:my-7 gap-4'>
                            <p className='text-xl sm:text-2xl font-semibold'>
                                {listing.name} {" - "}
                                <span className='text-base'>
                                    ${listing.offer
                                        ? listing.discountPrice.toLocaleString('en-US')
                                        : listing.regularPrice.toLocaleString('en-US')}
                                    {listing.type === 'rent' && ' / month'}
                                </span>
                            </p>
                            <p className='flex items-center gap-2 text-slate-600  text-sm'>
                                <FaMapMarkerAlt className='text-green-700' />
                                {listing.address}
                            </p>
                            <div className='flex gap-4'>
                                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                    {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                                </p>
                                {listing.offer && (
                                    <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                        ${+listing.regularPrice - +listing.discountPrice} Off
                                        {/* {" (" + (100 - (listing.discountPrice / listing.regularPrice * 100)).toFixed(2) + "%" + ")"} */}
                                    </p>
                                )}
                            </div>
                            <p className='text-slate-800'>
                                <span className='font-semibold text-black'>Description - </span>
                                {listing.description}
                            </p>
                            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaBed className='text-lg' />
                                    {
                                        listing.bedroom + (listing.bedroom > 1 ? " beds" : " bed")
                                    }
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <GiSofa className='text-lg' />
                                    {
                                        listing.hall + (listing.hall > 1 ? " halls" : " hall")
                                    }
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <GiKitchenScale className='text-lg' />
                                    {
                                        listing.kitchen + (listing.kitchen > 1 ? " kitchens" : " kitchen")
                                    }
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    {listing.parking ?
                                        <FaParking className='text-lg' /> : <BsSignNoParkingFill />
                                    }
                                    {listing.parking ? 'Parking spot' : 'No Parking'}
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaChair className='text-lg' />
                                    {listing.furnished ? 'Furnished' : 'Unfurnished'}
                                </li>
                            </ul>
                            {
                                listing && currentUser._id !== listing.userRef && !contact &&
                                <button onClick={() => setContact(true)} className='w-full border p-3 rounded-lg uppercase text-white bg-slate-700 hover:opacity-95'>
                                    Contact landlord
                                </button>
                            }
                            {contact && <Contact listing={listing} />}
                        </div>
                    </div>
                )
            }
        </main>
    )
}

export default Listing
