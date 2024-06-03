import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListingItem from '../components/ListingItem'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'

export default function Home() {
    SwiperCore.use([Navigation])
    const [offerListings, setOfferListings] = useState([])
    const [rentListings, setRentListings] = useState([])
    const [sellListings, setSellListings] = useState([])

    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                let res = await fetch('/api/listing/get?offer=true&limit=4')
                let data = await res.json()
                setOfferListings(data)
                fetchRentListings();
            } catch (err) {
                console.log(err)
            }
        }

        const fetchRentListings = async () => {
            try {
                let res = await fetch('/api/listing/get?type=rent&limit=4')
                let data = await res.json()
                setRentListings(data)
                fetchSellListings();
            } catch (err) {
                console.log(err)
            }
        }

        const fetchSellListings = async () => {
            try {
                let res = await fetch('/api/listing/get?type=sell&limit=4')
                let data = await res.json()
                setSellListings(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchOfferListings();
    }, [])

    return (
        <div>
            {/* top */}
            <div className='flex flex-col gap-6 p-20 sm:p-28 px-3 max-w-6xl mx-auto'>
                <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
                    Find your next <span className='text-slate-500'>perfect</span>
                    <br />
                    place with ease
                </h1>
                <div className='text-gray-500 text-xs sm:text-sm'>
                    Amin Estate is the best place to find your next perfect place to
                    live.
                    <br />
                    We have a wide range of properties for you to choose from.
                </div>
                <Link
                    to={'/search'}
                    className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
                >
                    Let's get started...
                </Link>
            </div>

            {/* swiper */}
            <Swiper navigation>
                {
                    offerListings &&
                    offerListings.length > 0 &&
                    offerListings.map((listing) => (
                        <SwiperSlide>
                            <div key={listing._id}
                                style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover' }}
                                className='h-[250px] sm:h-[500px] lg:h-[600px] xl:h-screen'>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>


            <div className='max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10'>
                {offerListings && offerListings.length > 0 && (
                    <div>
                        <div className='my-3'>
                            <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {offerListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                    </div>
                )}
                {rentListings && rentListings.length > 0 && (
                    <div>
                        <div className='my-3'>
                            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {rentListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                    </div>
                )}
                {sellListings && sellListings.length > 0 && (
                    <div>
                        <div className='my-3'>
                            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sell'}>Show more places for sale</Link>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {sellListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                    </div>

                )}

            </div>



        </div>
    )
}
