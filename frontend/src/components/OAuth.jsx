import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function OAuth() {
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const googleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)
            // console.log(result)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                }),
            })
            const data = await res.json()
            if (data.success == false) {
                console.log(data.message)
                dispatch(signInFailure("Please Try Again"))
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/')
        } catch (err) {
            console.log("Couldn't sign in with Google", err);
        }
    };

    return (
        <button
            type='button'
            onClick={googleClick}
            className='bg-red-600 hover:opacity-90 text-white p-3 rounded-lg uppercase'
        >
            continue with google
        </button>
    )
}

export default OAuth
