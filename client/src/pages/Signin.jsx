import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useSelector, useDispatch } from 'react-redux'
import { signinSuccess, signinFailure, signinStart } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

export default function Signin() {
    const [formData, setFormData] = useState({})
    const { loading, error: errorMessage } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData({ ...formData, [id]: value.trim() })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.password || formData.password === "" || !formData.email || formData.email === "") {
            return dispatch(signinFailure("Please fill out All fields"))
        }
        try {
            dispatch(signinStart)
            const res = await fetch("/api/auth/signin", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success == false) {
                dispatch(signinFailure(data.message))
            }
            if (res.ok) {
                dispatch(signinSuccess(data))
                navigate('/')
            }
        } catch (err) {
            dispatch(signinFailure(err.message))
        }
    }
    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                {/* left side */}
                <div className='flex-1'>
                    <Link to="/" className='font-bold dark:text-white text-4xl' >
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>AmirHajitbar</span>
                        Blog
                    </Link>
                    <p className='text-sm mt-5'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus numquam rem quas nihil ex maxime!
                    </p>
                </div>
                {/* right side */}
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your email' />
                            <TextInput
                                type='email'
                                placeholder='name@company.com'
                                id='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Your password' />
                            <TextInput
                                type='password'
                                placeholder='***************'
                                id='password'
                                onChange={handleChange}
                            />
                        </div>
                        <Button gradientDuoTone="purpleToPink" type='submit' disabled={loading}>
                            {
                                loading ?
                                    (
                                        <>
                                            <Spinner size='sm' />
                                            <span className='pl-3'>Loading ....</span>
                                        </>
                                    )
                                    : 'Sign In'
                            }
                        </Button>
                        <OAuth />
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Dont Have an Account?</span>
                        <Link to="/sign-up" className='text-blue-500'>Sign Up</Link>
                    </div>
                    {
                        errorMessage && (
                            <Alert className='mt-5' color="failure">
                                {errorMessage}
                            </Alert>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
