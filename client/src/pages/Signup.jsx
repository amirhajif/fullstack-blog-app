import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react'

export default function Signup() {
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
                    <form className='flex flex-col gap-4'>
                        <div>
                            <Label value='Your username' />
                            <TextInput
                                type='text'
                                placeholder='username'
                                id='username'
                            />
                        </div>
                        <div>
                            <Label value='Your email' />
                            <TextInput
                                type='email'
                                placeholder='name@company.com'
                                id='email'
                            />
                        </div>
                        <div>
                            <Label value='Your password' />
                            <TextInput
                                type='password'
                                placeholder='password'
                                id='password'
                            />
                        </div>
                        <Button gradientDuoTone="purpleToPink" type='submit'>Sign Up</Button>
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Have an account?</span>
                        <Link to="/sign-in" className='text-blue-500'>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
