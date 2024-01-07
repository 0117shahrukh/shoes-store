"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/app/firebase/firebase'
import InputControl from '../InputControl/page'
import Loader from '@/app/components/Loader'





const Login = () => {
    const [loading, setLoading] = useState(false);
    const route = useRouter()
    const [errorMsg, setErrorMsg] = useState('')
    const [submitBtnDisable, setSubmitBtnDisable] = useState(false)
    const [value, setValue]= useState({
    email : '',
    password : ''

    })

    const inputHandle = ()=>{
        setLoading(true)
       if (!value.email || !value.password) {
        setErrorMsg('Fill all fields');
        setLoading(false)
        return;
       }

       setErrorMsg('')
       setSubmitBtnDisable(true)
       signInWithEmailAndPassword(auth,value.email,value.password)
       .then(async(res)=>{
        setSubmitBtnDisable(false)
    
        route.push('/')
        setLoading(false)
       
       
       }).catch((error)=>{
        setSubmitBtnDisable(false)
       setErrorMsg(error.message)
       console.log(error.message)
       setLoading(false)
       })
    }
    return (
        <div className=' flex items-center justify-center h-screen bg-gray-100 '>
           {loading && <Loader />}

           <div className='w-full max-w-md bg-white rounded shadow-md p-8'>
            <h2 className='text-2xl font-semibold text-center mb-6'>Login</h2>
            <div className=' capitalize block text-gray-700 font-semibold mb'>

                <InputControl className='mb-4 w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500'  label="email"  placeholder='Enter Email Address' 
                 onChange={(e)=>
                    setValue((prev)=>({...prev, email : e.target.value}))}
                />
                
                </div>
              
              <div className='capitalize block text-gray-700 font-semibold mb-2'>
                
                  <InputControl  className='mb-4 w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500' label="password" placeholder='Enter password Address'
                   onChange={(e)=>
                    setValue((prev)=>({...prev, password : e.target.value}))}
                  />
                  </div>
            
            <div>
            <b className='text-sm text-red-500 mt-1'>{errorMsg}</b>
                <button className='btn w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded focus:outline-none focus:ring focus:ring-blue-200'
                onClick={inputHandle}
                disabled={submitBtnDisable}
                >Login</button>
                
            </div>
            <p className='text-sm text-center text-gray-700'>
                    Create to new account? <span>
                        <Link className='text-blue-500 hover:underline' href={'/sign'}>Sign up</Link>
                    </span>
                </p>
            </div>
           
        </div>
    )
}

export default Login

