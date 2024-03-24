import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signoutSuccessfull } from '../redux/user/userSlice'


export default function DashSidebar() {
    const location = useLocation()
    const [tab, setTab] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) setTab(tabFromUrl)
    }, [location.search])

    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST'
            })
            const data = await res.json()
            if (!res.ok) {
                console.log(res.message)
            }
            else {
                dispatch(signoutSuccessfull())
            }

        } catch (err) {
            console.log(err.message)
        }

    }
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item as='div' active={tab === 'profile'} icon={HiUser} label={"User"} labelColor="dark" >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                        Logout
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
