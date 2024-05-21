import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

export default function Profile() {
    let { currentUser } = useSelector(state => state.user)
    let fileRef = useRef(null)
    let [file, setFile] = useState(undefined)
    let [filePer, setFilePer] = useState(0)
    let [uploadErr, setUploadErr] = useState(null)
    let [formData, setFormData] = useState({})

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

    return (
        <div className='p-3 max-w-lg mx-auto'>
            {/* <h1 className='text-center text-3xl font-semibold mt-7'>Profile</h1> */}
            <form className='flex flex-col gap-4'>
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
                <input type='text' placeholder='Username' name='username' className='p-3 border rounded-lg' />
                <input type='email' placeholder='Email' name='email' className='p-3 border rounded-lg' />
                <input type='password' placeholder='Password' name='password' className='p-3 border rounded-lg' />
                <button className='p-3 uppercase bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-80'>update</button>
            </form>
            <div className='flex justify-between m-5'>
                <span className='text-red-600 cursor-pointer'>Delete account</span>
                <span className='text-red-600 cursor-pointer'>Sign In</span>
            </div>
        </div>
    )
}
