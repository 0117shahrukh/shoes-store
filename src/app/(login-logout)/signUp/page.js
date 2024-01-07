"use client"
import { useState } from 'react'
import Link from 'next/link'
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import { auth } from '@/app/firebase/firebase'
import {useRouter} from 'next/navigation'
import InputControl from '../InputControl/page'



const SignIn = () => {
    const route = useRouter()
    const [errorMsg, setErrorMsg] = useState('')
    const [submitBtnDisable, setSubmitBtnDisable] = useState(false)
    const [value, setValue]= useState({
    name : '',
    email : '',
    password : ''

    })

    const inputHandle = ()=>{
       if (!value.name || !value.email || !value.password) {
        setErrorMsg('Fill all fields');
        return;
       }

       setErrorMsg('')
       setSubmitBtnDisable(true)
       createUserWithEmailAndPassword(auth,value.email,value.password)
       .then(async(res)=>{
        setSubmitBtnDisable(false)
        const user = res.user
       await updateProfile(user,{
            displayName : value.name
        });

        route.push('/')
       
       
       }).catch((error)=>{
        setSubmitBtnDisable(false)
       setErrorMsg(error.message)
       })
    }
    return (
        <div className=' flex items-center justify-center h-screen bg-gray-100 '>
            <div className='w-full max-w-md bg-white rounded shadow-md p-8'>
                <h2 className='text-2xl font-semibold text-center mb-6'>Signup</h2>
                <div className=' capitalize block text-gray-700 font-semibold mb'>

                    <InputControl className='mb-4 w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500' label="name" placeholder='Enter your name'
                    onChange={(e)=>
                        setValue((prev)=>({...prev, name : e.target.value}))}
                    />

                </div>

                <div className=' capitalize block text-gray-700 font-semibold mb'>

                    <InputControl className='mb-4 w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500' label="email" placeholder='Enter your email'
                    onChange={(e)=>
                        setValue((prev)=>({...prev, email : e.target.value}))}
                    />

                </div>

                <div className='capitalize block text-gray-700 font-semibold mb-2'>

                    <InputControl className='mb-4 w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500' label="password" placeholder='Enter password Address'
                    onChange={(e)=>
                        setValue((prev)=>({...prev, password : e.target.value}))}
                    />
                </div>

                <div>
                    <b className='text-sm text-red-500 mt-1'>{errorMsg}</b>
                    <button className='btn w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded focus:outline-none focus:ring focus:ring-blue-200'
                    onClick={inputHandle}
                    disabled={submitBtnDisable}
                    >Sign Up</button>

                </div>
                <p className='text-sm text-center text-gray-700'>
                    Already have an account? <span>
                        <Link className='text-blue-500 hover:underline' href={'/signIn'}>Login</Link>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default SignIn

