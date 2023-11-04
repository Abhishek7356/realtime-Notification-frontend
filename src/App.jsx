import { useEffect, useState } from 'react';
import './App.css';
import { io } from "socket.io-client";
import Navbar from './components/Navbar';
import PostCard from './components/PostCard';
import { posts } from './datas';

function App() {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("https://realtime-notification-app.onrender.com/"));
    // console.log(socket);
  }, [])

  useEffect(() => {
    if (user) {
      socket?.emit("addNewUser", user)
    }
  }, [user, socket])

  const handleLogin = () => {
    if (username) {
      setUser(username)
    }
  }

  return (
    <div className=" h-screen flex justify-center items-center bg-slate-200">
      {user ?
        <div className='w-[400px] h-[80%] overflow-scroll'>
          <Navbar socket={socket} />
          {posts.map((item, key) => (
            <PostCard key={key} feed={item} socket={socket} user={user} />
          ))}
          <span className='absolute top-5 right-5 font-bold text-xl tracking-wider'>{user}<i class="fa-solid fa-user ml-2"></i></span>
        </div>
        :
        <div className='flex flex-col justify-center items-center gap-5'>
          <input onChange={(e) => setUsername(e.target.value)} className='p-3 w-72 focus:border-0 shadow-md border-0 outline-none focus:shadow-lg duration-200' type="text" placeholder='Enter your name' />
          <button onClick={handleLogin} className='bg-gray-600 text-white border-0 px-5 py-2 rounded-full font-bold hover:translate-x-1 cursor-pointer duration-200'>Log In <i class="fa-solid ml-2 fa-arrow-right"></i></button>
        </div>
      }

    </div>
  );
}

export default App;
