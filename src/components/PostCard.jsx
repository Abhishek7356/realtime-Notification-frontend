import React, { useEffect, useState } from 'react'

function PostCard({ feed, socket, user }) {
    const [isLiked, setIsLiked] = useState(false)
    const [onlineUser, setOnlineUser] = useState([])

    const handleNotify = (type) => {
        type == 'liked' && setIsLiked(true)
        type == 'disliked' && setIsLiked(false)
        socket.emit("sendNotify", {
            sender: user,
            receiver: feed.username,
            type
        })
    }
    console.log(onlineUser);
    useEffect(() => {
        socket.on("sendUser", (useradata) => {
            setOnlineUser(useradata);
        })
    }, [socket])

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex flex-col'>
                <div className='flex items-center justify-between gap-2 px-2'>
                    <div className='flex items-center gap-2'>
                        <img src={feed.profile_pic} className='w-[40px] rounded-full h-[40px] object-cover' alt="" />
                        <h3>{feed.username}</h3>
                    </div>
                   {onlineUser.some((item)=>item.username == feed.username) && <p className='flex gap-1 items-center'><p className='h-[15px] w-[15px] rounded-full bg-[green]'></p> Online</p>}

                </div>
                <img src={feed.post} className='w-[100%] h-[200px] object-cover' alt="" />
                <div className='flex px-4 py-2 justify-between'>
                    <div className='flex gap-4'>
                        {isLiked ? <i onClick={() => handleNotify("disliked")} class="fa-solid text-2xl fa-heart text-red-600 cursor-pointer"></i> : <i onClick={() => handleNotify("liked")} class="fa-regular text-2xl fa-heart cursor-pointer"></i>}
                        <i onClick={() => handleNotify("commented on")} class="fa-regular text-2xl fa-comment cursor-pointer"></i>
                        <i onClick={() => handleNotify("shared")} class="fa-regular text-2xl fa-share-from-square cursor-pointer"></i>
                    </div>
                    <i class="fa-solid text-2xl fa-circle-info"></i>
                </div>
            </div>
        </div>
    )
}

export default PostCard