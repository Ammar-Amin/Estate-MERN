import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

export default function ListingItem({ listing }) {
    return (
        <div className='bg-lime-100 w-full sm:w-[300px] shadow-md hover:shadow-lg overflow-hidden rounded-lg'>
            <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt='listing image'
                    className='h-[170px] w-full sm:w-[300px] object-cover hover:scale-105 transition-scale duration-200' />
                <div className='p-3 mt-1 flex flex-col gap-2'>
                    <p className='text-lg font-semibold truncate text-slate-700'>{listing.name}</p>
                    <div className='text-sm text-gray-600 flex gap-1 items-center'>
                        <MdLocationOn className='w-4 h-4' />
                        <p>{listing.address}</p>
                    </div>
                    <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
                    <p className='font-semibold text-gray-600'>$
                        {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' / month'}
                    </p>

                </div>
            </Link>
        </div>
    )
}

