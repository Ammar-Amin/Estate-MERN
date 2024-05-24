import React from 'react'

function CreateListing() {
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='my-7 text-2xl sm:text-3xl font-semibold text-center'>Create a Listing</h1>
            <form className='flex flex-col gap-6 sm:flex-row'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type='text'
                        placeholder='Name'
                        className='p-3 border rounded-lg'
                        id='name' maxLength='60' minLength='10'
                        required
                    />
                    <textarea type='text'
                        placeholder='Description'
                        className='p-3 border rounded-lg'
                        id='description'
                        required
                    />
                    <input type='text'
                        placeholder='Address'
                        className='p-3 border rounded-lg'
                        id='address'
                        required
                    />
                    {/* Checkboxes  */}
                    <div className='flex flex-wrap gap-5'>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' className='w-4 sm:w-5' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sell' className='w-4 sm:w-5' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-4 sm:w-5' />
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-4 sm:w-5' />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' className='w-4 sm:w-5' />
                            <span>Offer</span>
                        </div>
                    </div>
                    {/* BHK  */}
                    <div className=' flex flex-col gap-3'>
                        <div className='flex flex-wrap gap-6'>
                            <div className='flex items-center gap-2'>
                                <input type='number' id='bedroom' min='1' max='10' required className='py-1 sm:py-2 px-3 border border-gray-300 rounded-md' />
                                <span>Bedroom</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type='number' id='hall' min='1' max='10' required className='py-1 sm:py-2 px-3 border border-gray-300 rounded-md' />
                                <span>Hall</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type='number' id='kitchen' min='1' max='10' required className='py-1 sm:py-2 px-3 border border-gray-300 rounded-md' />
                                <span>Kitchen</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4 flex-1'>
                    <div className='flex flex-wrap gap-3'>
                        <div className=' flex items-center gap-2'>
                            <input type='number' id='regularPrice' min='50' max='1000000' required className='p-3 border border-gray-300 rounded-md' />
                            <p>Regular Price <span className='text-xs sm:text-sm'>($/month)</span></p>
                        </div>
                        <div className=' flex items-center gap-2'>
                            <input type='number' id='discountPrice' min='50' max='1000000' required className='p-3 border border-gray-300 rounded-md' />
                            <p>Discount Price <span className='text-xs sm:text-sm'>($/month)</span></p>
                        </div>
                    </div>
                    <p className='font-semibold'>Images:
                        <span className='ml-2 font-normal text-gray-600'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className='flex gap-4'>
                        <input
                            type='file'
                            id='images'
                            accept='image/*' multiple
                            className='p-3 border border-gray-400 rounded w-full'
                        />
                        <button className='p-3 border border-green-800 text-green-800 rounded uppercase hover:shadow-lg disabled:opacity-90'>Upload</button>
                    </div>
                    <button className='p-3  bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>Create listing</button>
                </div>
            </form>
        </main>
    )
}

export default CreateListing