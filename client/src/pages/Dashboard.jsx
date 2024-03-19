import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'

export default function Dashboard() {
    const location = useLocation()
    const [tab, setTab] = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) setTab(tabFromUrl)
    }, [location.search])
    return (
        <div>
            <div>
                {/* sidebar */}
                <DashSidebar />
            </div>
            <div>
                {/* rightbar */}
                {tab === 'profile' && <DashProfile />}
            </div>
        </div>
    )
}
