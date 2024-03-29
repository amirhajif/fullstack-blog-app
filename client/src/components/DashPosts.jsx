import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user)
    const [posts, setPosts] = useState([])
    console.log(posts)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
                const data = await res.json()
                if (res.ok) setPosts(data.posts)

            } catch (err) {
                console.log(err)
            }
        }
        if (currentUser.isAdmin) {
            fetchPosts()
        }
    }, [currentUser._id])
    return (
        <div>DashPosts</div>
    )
}
