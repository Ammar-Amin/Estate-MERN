import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function EditListing() {
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        type: 'rent',
        parking: false,
        furnished: false,
        offer: false,
        bedroom: 1,
        hall: 1,
        kitchen: 1,
        regularPrice: 50,
        discountPrice: 0,
        imageUrls: [],
    })
    const [imgUploadError, setImageUploadError] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate()
    const params = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId
            // console.log(listingId)
            let res = await fetch(`/api/listing/get/${listingId}`);
            let data = await res.json();
            if (data.success === false) {
                setError(data.message);
            }
            // console.log(data)
            setFormData(data);
        }
        fetchListing();
    }, [])

    const handleImgUpload = () => {
        // console.log(files)
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true)
            setImageUploadError(false)
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(
                    storeImage(files[i])
                )
            }

            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData,
                    imageUrls: formData.imageUrls.concat(urls)
                });
                setImageUploadError(false)
                setUploading(false);
            }).catch((error) => {
                setImageUploadError(error.message)
            });
        } else {
            setImageUploadError('You can only upload 6 images per listing');
            setUploading(false);
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = file.name + new Date().getTime();
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + ' % done.');
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    })
                }
            )
        })
    }

    const handleDeleteImg = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        })
    }

    const handleChange = (e) => {
        if (e.target.id === 'sell' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id,
            })
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            })
        }

        if (e.target.type === 'text' || e.target.type === 'textarea' || e.target.type === 'number') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (Number(formData.regularPrice) < Number(formData.discountPrice)) return setError('Discount price must be less than Regular Price')
            if (formData.imageUrls.length < 1) return setError('You must upload at least one image')
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/listing/update/${params.listingId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id
                }),
            })
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            // console.log("form data edited successfully", formData)
            navigate(`/listing/${data._id}`)
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='my-7 text-2xl sm:text-3xl font-semibold text-center'>Edit a Listing</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 sm:flex-row'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type='text'
                        placeholder='Name'
                        className='p-3 border rounded-lg'
                        id='name' maxLength='60' minLength='10'
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <textarea type='text'
                        placeholder='Description'
                        className='p-3 border rounded-lg'
                        id='description'
                        required
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <input type='text'
                        placeholder='Address'
                        className='p-3 border rounded-lg'
                        id='address'
                        required
                        value={formData.address}
                        onChange={handleChange}
                    />
                    {/* Checkboxes  */}
                    <div className='flex flex-wrap gap-5'>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' className='w-4 sm:w-5'
                                onChange={handleChange}
                                checked={formData.type === 'rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sell' className='w-4 sm:w-5'
                                onChange={handleChange}
                                checked={formData.type === 'sell'}
                            />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-4 sm:w-5'
                                onChange={handleChange}
                                checked={formData.parking}
                            />
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-4 sm:w-5'
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' className='w-4 sm:w-5'
                                onChange={handleChange}
                                checked={formData.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    {/* BHK  */}
                    <div className=' flex flex-col gap-3'>
                        <div className='flex flex-wrap gap-6'>
                            <div className='flex items-center gap-2'>
                                <input type='number' id='bedroom' min='1' max='10' required className='py-1 sm:py-2 px-3 border border-gray-300 rounded-md'
                                    value={formData.bedroom}
                                    onChange={handleChange} />
                                <span>Bedroom</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type='number' id='hall' min='1' max='10' required className='py-1 sm:py-2 px-3 border border-gray-300 rounded-md'
                                    value={formData.hall}
                                    onChange={handleChange} />
                                <span>Hall</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type='number' id='kitchen' min='1' max='10' required className='py-1 sm:py-2 px-3 border border-gray-300 rounded-md'
                                    value={formData.kitchen}
                                    onChange={handleChange} />
                                <span>Kitchen</span>
                            </div>
                        </div>
                        <div className=' flex items-center gap-2'>
                            <input type='number' id='regularPrice' min='50' max='1000000' required className='p-3 border border-gray-300 rounded-md'
                                value={formData.regularPrice}
                                onChange={handleChange} />
                            <p>Regular Price <span className='text-xs sm:text-sm'>($/month)</span></p>
                        </div>
                        {
                            formData.offer &&
                            <div className=' flex items-center gap-2'>
                                <input type='number' id='discountPrice' min='0' max='1000000' required className='p-3 border border-gray-300 rounded-md'
                                    value={formData.discountPrice}
                                    onChange={handleChange} />
                                <p>Discount Price <span className='text-xs sm:text-sm'>($/month)</span></p>
                            </div>
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-4 flex-1'>
                    <p className='font-semibold'>Images:
                        <span className='ml-2 font-normal text-gray-600'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className='flex gap-4'>
                        <input
                            type='file'
                            id='images'
                            onChange={(e) => setFiles(e.target.files)}
                            accept='image/*' multiple
                            className='p-3 border border-gray-400 rounded w-full'
                        />
                        <button type='button' disabled={uploading} onClick={handleImgUpload} className='p-3 border border-green-800 text-green-800 rounded uppercase hover:shadow-lg disabled:opacity-90'>
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    <p className='text-red-600 text-sm'>{imgUploadError && imgUploadError}</p>
                    <div className='flex flex-wrap justify-evenly'>
                        {
                            formData.imageUrls?.map((url, index) => (
                                <div key={url} className='mb-3'>
                                    <img src={url} alt='img'
                                        className='w-32 h-32 rounded-t-lg object-cover' />
                                    <button onClick={() => handleDeleteImg(index)} className='w-full py-1 rounded-b-md bg-red-300'>Delete</button>
                                </div>)
                            )
                        }
                    </div>
                    <button disabled={loading || uploading} className='p-3  bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>{loading ? "Editing..." : "Edit listing"}</button>
                    {error && <p className='text-red-600 text-sm'>{error}</p>}
                </div>
            </form>
        </main>
    )
}

export default EditListing
