import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

function Listing() {
    SwiperCore.use([Navigation])
    const [listing, setListing] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
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
                    </div>
                )
            }
        </main>
    )
}

export default Listing
