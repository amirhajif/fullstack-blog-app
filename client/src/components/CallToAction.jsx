import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className="flex-1 justify-center flex flex-col">
                <h2 className='text-2xl'>
                    Want to Find Source Code?
                </h2>
                <p className='text-gray-500 my-2'>
                    Checkout SourceYub with more than 500 Projects
                </p>
                <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                    <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                        +500 programming source Code
                    </a>
                </Button>
            </div>
            <div className="p-7 flex-1 flex justify-center">
                {/* <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" /> */}
                <img src="https://www.sourceyub.ir/wp-content/uploads/2023/08/sourceyub-logo.svg" />
            </div>
        </div>
    )
}
