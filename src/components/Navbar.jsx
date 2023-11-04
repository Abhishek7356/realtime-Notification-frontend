import React, { useEffect, useState } from 'react'

function Navbar({ socket }) {

    const [notification, setNotification] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        socket.on("getNotify", (data) => {
            // console.log(data);
            setNotification((prev) => [...prev, data])
        })
    }, [])

    const handleRead = () => {
        setOpen(false);
        setNotification([])
    }

    console.log(notification);

    let notificationList = notification.map((item) => {
        return (
            <p>{item.sender + " " + item.type} your post</p>
        )
    })

    return (
        <div className='bg-[#4a73a9] text-white h-[60px] relative flex justify-between px-2 items-center'>
            <h4 className='text-xl'>NOTIFY APP</h4>
            <div className='flex gap-4'>
                <i onClick={() => setOpen(!open)} class="fa-solid text-2xl fa-bell relative">{notification.length > 0 && <div className='w-[17px] h-[17px] rounded-full flex justify-center items-center bg-green-500 absolute top-0 right-0 text-xs' style={{ top: '-5px', right: '-5px' }}>{notification.length}</div>}</i>
                <i class="fa-solid text-2xl fa-envelope relative"></i>
                <i class="fa-solid text-2xl fa-gear"></i>
            </div>
            {open && <div className='absolute shadow-md flex flex-col px-5  bg-slate-600' style={{ right: '0', top: '60px' }}>
                {notificationList}
                <button onClick={handleRead} className='px-2 py-2 bg-slate-300 rounded-full border-0 mb-2'>Mark as read</button>
            </div>}
        </div>
    )
}

export default Navbar