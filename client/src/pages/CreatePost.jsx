import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React from 'react'

export default function CreatePost() {
    return (
        <div className='max-w-3xl min-h-full p-3 mx-auto'>
            <h1 className='text-center text-3xl font-semibold my-7'>Create a post</h1>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type='text' placeholder='title' required id='title' className='flex-1' />
                    <Select>
                        <option value="uncategorized">select category</option>
                        <option value="javascript">Java Script</option>
                        <option value="react">React</option>
                        <option value="next">Next   </option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between  border-4 border-dotted border-teal-500 p-3'>
                    <FileInput type='file' accept='iamge/*' />
                    <Button gradientDuoTone='purpleToBlue' type='button' size='sm'>Upload Image</Button>
                </div>
                <ReactQuill theme='snow' placeholder='write something ....' className='h-72 mb-12' required />
                <Button type='submit' gradientDuoTone="purpleToPink">Publish</Button>
            </form>
        </div>
    )
}
