import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutFailure, signOutStart, signOutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'

export default function Profile() {
    let { currentUser, loading, error } = useSelector(state => state.user)
    let fileRef = useRef(null)
    let [file, setFile] = useState(undefined)
    let [filePer, setFilePer] = useState(0)
    let [uploadErr, setUploadErr] = useState(null)
    let [formData, setFormData] = useState({})
    let [updateSuccess, setUpdateSuccess] = useState(false)
    let [showListingsErr, setShowListingsErr] = useState(false)
    let [userListing, setUserListing] = useState([])
    let dispatch = useDispatch()

    useEffect(() => {
        if (file) {
            // console.log(file)
            handleFileUpload(file);
        }
    }, [file])

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + ' % done.');
                setFilePer(Math.round(progress));
            },
            (err) => setUploadErr(err),
            // console.log(uploadErr),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => setFormData({ ...formData, avatar: downloadURL }))
            })
    }
    // console.log(formData)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleDelete = async () => {
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success == false) {
                dispatch(deleteUserFailure(data.message))
                return;
            }

            dispatch(deleteUserSuccess(data))

        } catch (err) {
            dispatch(deleteUserFailure(err.message))
        }
    }

    const handleSubmit = async (e) => {
        setUpdateSuccess(false)
        e.preventDefault();
        try {
            dispatch(updateUserStart())
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.success == false) {
                dispatch(updateUserFailure(data.message))
                return;
            }

            dispatch(updateUserSuccess(data))
            setUpdateSuccess(true);
        } catch (error) {
            // console.log(error)
            dispatch(updateUserFailure(error.message))
        }
    }

    const handleSignOut = async () => {
        try {
            dispatch(signOutStart())
            const res = await fetch('/api/auth/signout');
            const data = await res.json();
            if (data.success == false) {
                dispatch(signOutFailure(data.message));
                return;
            }
            dispatch(signOutSuccess(data))
        } catch (error) {
            dispatch(signOutFailure(error.message));
        }
    }

    const handleShowListings = async () => {
        try {
            setShowListingsErr(false);
            const res = await fetch(`/api/user/listings/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                setShowListingsErr(true);
                return;
            }
            // console.log("All Listings : ", data);
            setUserListing(data)
        } catch (error) {
            setShowListingsErr(true)
        }
    }

    const handleListingDelete = async (listingId) => {
        try {
            const res = await fetch(`/api/listing/delete/${listingId}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            if (data.success === false) {
                console.log(data.message)
                return;
            }

            setUserListing((prev) =>
                prev.filter((listing) => listing._id !== listingId)
            )
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            {/* <h1 className='text-center text-3xl font-semibold mt-7'>Profile</h1> */}
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type='file'
                    ref={fileRef}
                    onChange={(e) => setFile(e.target.files[0])}
                    hidden
                    accept='image/*'
                />
                <img
                    src={formData.avatar || currentUser.avatar}
                    alt='profile'
                    onClick={() => fileRef.current.click()}
                    className='mt-4 w-24 h-24 rounded-full object-cover cursor-pointer self-center'
                />
                <p className='text-sm text-center'>
                    {
                        uploadErr ? (
                            <span className='text-red-600'>Error uploading image (image must be less than 2 mb)</span>
                        ) : filePer > 0 && filePer < 100 ? (
                            <span className='text-slate-600'>Uploading {filePer} %</span>
                        ) : filePer == 100 ? (
                            <span className='text-green-600'>Image Uploaded Successfully</span>
                        ) : ('')
                    }
                </p>
                <input
                    type='text'
                    placeholder='Username'
                    defaultValue={currentUser.username}
                    name='username'
                    className='p-3 border rounded-lg'
                    onChange={handleChange}
                />
                <input
                    type='email'
                    placeholder='Email'
                    defaultValue={currentUser.email}
                    name='email'
                    className='p-3 border rounded-lg'
                    onChange={handleChange}
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='p-3 border rounded-lg'
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className='p-3 uppercase bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-80'
                >
                    {loading ? "loading..." : "update"}
                </button>
                <Link to='/create-listing'
                    className='p-3 uppercase text-white text-center bg-green-700 rounded-lg hover:opacity-90'>
                    Create Listing
                </Link>
            </form>
            <div className='flex justify-between m-5'>
                <span onClick={handleDelete} className='text-red-600 cursor-pointer'>Delete account</span>
                <span onClick={handleSignOut} className='text-red-600 cursor-pointer'>Sign out</span>
            </div>

            <p className='mx-5 font-bold text-red-500'>{error ? error : ''}</p>
            <p className='mx-5 font-bold text-green-500'>{updateSuccess ? 'User is updated successfully' : ''}</p>

            <div className='flex flex-col justify-center gap-2'>
                <button onClick={handleShowListings} className='font-semibold text-green-600'>Show Listings</button>
                <p className='text-sm text-red-600'>{showListingsErr ? "Error Showing Listings!" : ""}</p>
                {
                    userListing &&
                    userListing.length > 0 &&
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-center text-2xl font-medium'>Your Listings</h1>
                        {
                            userListing.map(user => (<div key={user._id}
                                className='bg-slate-200 border-[1px] border-slate-400 p-3 flex justify-between items-center gap-3 rounded-md'>
                                <Link to={`/listing/${user._id}`}>
                                    <img src={user.imageUrls[0]} alt='img'
                                        className='w-20 h-20 object-contain rounded-md'
                                    />
                                </Link>
                                <Link to={`/listing/${user._id}`}
                                    className='flex-1 text-slate-700 font-semibold truncate'>
                                    <p className='hover:underline text-lg'>{user.name}</p>
                                    <p className='text-sm'>{user.address}</p>
                                </Link>
                                <div className='flex flex-col gap-2'>
                                    <button className='px-4 bg-green-600 text-white rounded-md hover:opacity-90'>Edit</button>
                                    <button onClick={() => handleListingDelete(user._id)} className='px-4 bg-red-500 text-white rounded-md hover:opacity-90'>Del</button>
                                </div>
                            </div>))
                        }
                    </div>
                }
            </div>
        </div>
    )
}
