import { Routes, Route } from 'react-router'
import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Homepage from './pages/Homepage.jsx'
import MoviePage from './pages/MoviePage.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import AIRecommendations from './pages/AIRecommendations.jsx'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore.js'

const App = () => {
    const {fetchUser, fetchingUser} = useAuthStore();
    useEffect(()=> {
        fetchUser()
    }, [fetchUser])

    if(fetchingUser){
        return(
            <p className='text-white'>Loading..</p>
        )
    }

  return (
    <div className='font-bold'>
        <Toaster />
        <Navbar />
        <Routes>
            <Route path={"/"} element={<Homepage />} />
            <Route path={"/movie/:id"} element={<MoviePage />} />
            <Route path={"/signin"} element={<SignIn />} />
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/ai-recommendations"} element={<AIRecommendations />} />
        </Routes>
    </div>
  )
}

export default App