import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import {Route,Routes} from "react-router-dom"
import Index from './component/Index'
import "./App.css"
import Error from './component/Error'
import Login from './component/Login'
import NewUser from './component/NewUser'
import Addsong from './component/Addsong'
import AdminPanel from './component/AdminPanel'
import PlaySong from './component/PlaySong'
import Artistpanel from './component/Artistpanel'
import Playlist from './component/Playlist'
import Recent from './component/Recent'
import Search from './component/Search'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Index></Index>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/newuser' element={<NewUser></NewUser>}></Route>
      <Route path='/playSong/:songimg/:song/:name' element={<PlaySong></PlaySong>}></Route>
      <Route path='/Artistpanel/:img/:name/:bio' element={<Artistpanel></Artistpanel>}></Route>
      <Route path='/admin' element={<AdminPanel></AdminPanel>}></Route>
      <Route path='/playlist' element={<Playlist></Playlist>}></Route>
      <Route path='/recent' element={<Recent></Recent>}></Route>
      <Route path='/search/:name' element={<Search></Search>}></Route>
      <Route path='*' element={<Error></Error>}></Route>
    </Routes>
    </>
  )
}

export default App
