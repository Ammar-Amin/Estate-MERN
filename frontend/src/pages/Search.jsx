import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingItem from '../components/ListingItem'

export default function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        offer: false,
        parking: false,
        furnished: false,
        sort: 'created_At',
        order: 'desc'
    })
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [listings, setListings] = useState([])
    const [showMore, setShowMore] = useState(false)

    const handleChange = (e) => {

        if (e.target.id === 'searchTerm') {
            setSidebarData({
                ...sidebarData,
                [e.target.id]: e.target.value
            })
        }

        if (e.target.id === 'rent' || e.target.id === 'sell' || e.target.id === 'all') {
            setSidebarData({
                ...sidebarData,
                type: e.target.id
            })
        }

        if (e.target.id === 'offer' || e.target.id === 'parking' || e.target.id === 'furnished') {
            setSidebarData({
                ...sidebarData,
                [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false
            })
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('/')[0] || 'created_At';
            const order = e.target.value.split('/')[1] || 'desc';

            setSidebarData({
                ...sidebarData,
                sort, order,
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(sidebarData)
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm)
        urlParams.set('type', sidebarData.type)
        urlParams.set('offer', sidebarData.offer)
        urlParams.set('parking', sidebarData.parking)
        urlParams.set('furnished', sidebarData.furnished)
        urlParams.set('sort', sidebarData.sort)
        urlParams.set('order', sidebarData.order)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);

        const searchTermInURL = urlParams.get('searchTerm');
        const typeInURL = urlParams.get('type');
        const offerInURL = urlParams.get('offer');
        const parkingInURL = urlParams.get('parking');
        const furnishedInURL = urlParams.get('furnished');
        const sortInURL = urlParams.get('sort');
        const orderInURL = urlParams.get('order');

        if (
            searchTermInURL ||
            typeInURL ||
            offerInURL ||
            parkingInURL ||
            furnishedInURL ||
            sortInURL ||
            orderInURL
        ) {
            setSidebarData({
                searchTerm: searchTermInURL || '',
                type: typeInURL || 'all',
                offer: offerInURL === 'true' ? true : false,
                parking: parkingInURL === 'true' ? true : false,
                furnished: furnishedInURL === 'true' ? true : false,
                sort: sortInURL || 'created_At',
                order: orderInURL || 'desc',
            })
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                setShowMore(false);
                const searchQuery = urlParams.toString();
                const res = await fetch(`/api/listing/get?${searchQuery}`)
                const data = await res.json();
                if (data.success == false) {
                    console.log(data.message)
                    setLoading(false)
                }
                if (data.length > 8) {
                    setShowMore(true)
                } else {
                    setShowMore(false)
                }
                setListings(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [location.search])

    const handleShowMore = async () => {
        const startIndex = listings.length;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();

        let res = await fetch(`/api/listing/get?${searchQuery}`)
        let data = await res.json();
        if (data.success === false) {
            console.log(data.message)
        }
        if (data.length < 9) {
            setShowMore(false);
        }
        setListings([...listings, ...data]);
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='py-7 px-4 sm:p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <input
                            type='text'
                            id='searchTerm'
                            placeholder='Search...'
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                            className='border rounded-lg p-2 sm:p-3 w-full'
                        />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='all'
                                onChange={handleChange}
                                checked={sidebarData.type === 'all'}
                                className='w-5' />
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent'
                                onChange={handleChange}
                                checked={sidebarData.type === 'rent'}
                                className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sell'
                                onChange={handleChange}
                                checked={sidebarData.type === 'sell'}
                                className='w-5' />
                            <span>Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer'
                                onChange={handleChange}
                                checked={sidebarData.offer === true}
                                className='w-5' />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities:</label>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking'
                                onChange={handleChange}
                                checked={sidebarData.parking === true}
                                className='w-5' />
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished'
                                onChange={handleChange}
                                checked={sidebarData.furnished === true}
                                className='w-5' />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select id='sort_order'
                            onChange={handleChange}
                            defaultValue={'created_At/desc'}
                            className='border rounded-lg p-2'>
                            <option value='created_At/desc'>Latest</option>
                            <option value='created_At/asc'>Oldest</option>
                            <option value='regularPrice/desc'>Price high to low</option>
                            <option value='regularPrice/asc'>Price low to hight</option>
                        </select>
                    </div>
                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                        Search
                    </button>
                </form>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-semibold p-3 text-slate-700 mt-2 sm:mt-5'>Listing results:</h1>
                <div className='p-4 sm:p-7 flex flex-wrap gap-6'>
                    {
                        loading && (<p className='text-xl text-slate-700 text-center w-full'>
                            Loading...
                        </p>)
                    }
                    {
                        !loading && listings.length === 0 && (<p className='text-xl text-slate-700'>No listing found!</p>)
                    }
                    {
                        !loading &&
                        listings.length > 0 &&
                        listings.map((listing) => (
                            <ListingItem key={listing._id} listing={listing} />
                        ))
                    }
                    {
                        showMore && (
                            <button onClick={handleShowMore} className='text-green-700 p-4 hover:underline'>Show More</button>)
                    }
                </div>
            </div>
        </div>
    );
}
