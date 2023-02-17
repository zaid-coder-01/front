import React, { useState,useEffect } from 'react'
import LeftSide from './LeftSide';
import $ from 'jquery'
import Navbar from './Navbar';
import {useParams} from "react-router-dom"
import axios from 'axios';

const Search = () => {
    const search = useParams();
  const [isvis,setisvis]=useState();
  const [isplay, setisplay] = useState(false);
  const [songs, setsongs] = useState([]);
  const [uname, setuname] = useState("");
  useEffect(() => { 
    if (sessionStorage.getItem("users") != null) {
      const user = sessionStorage.getItem("users");
      const users = JSON.parse(user)
      setuname(users.uname)
    }
    let sear=search.name;
    axios.post("http://localhost:8000/getSearch",{sear}).then((res) => {
        setsongs(res.data);
    }).catch((err) => {
        console.log(err);
    })   
  },[songs,uname])
  return (
    <>
       <div className='container-fluid'>
        <div className='row'>
          <div className='mt-3 bar'>
            <i className='fa fa-bars' id="barr" onClick={()=>{
              if(isvis)
              {
                $('.leftnav').css("display","none")
                setisvis(false);
              }
              else{
                $('.leftnav').css("display","block")
                setisvis(true);
              }             
            }}></i>
          </div>
          <LeftSide></LeftSide>
          <div className='col-md-10 rightnav'>
    <Navbar></Navbar>
    <div className='container-fluid'>
        <div className='mt-3 my-3 row row-cols-1 row-cols-md-5 g-4'>
        {
songs.map((data) => {
    let url = `http://localhost:8000/getSong/${data.SongImg}`
    let song = `http://localhost:8000/getSong/${data.Song}`
    let send = `/playSong/${data.SongImg}/${data.Song}/${data.Name}`
    return (
<div className='col'>
    <div className='card text-center xyz'>
        <div>
            <a href={send}><img src={url} className="sogimg"></img></a>
        </div>
        <div className='playicon'>
            <i className="fa fa-play" aria-hidden="true" onClick={(ev) => {
                let sog = document.getElementById('sog');

                $('.playicon i').removeClass("fa fa-pause")
                $('.playicon i').addClass("fa fa-play")
                sog.src = song;
                if (isplay) {
                    sog.pause();
                    setisplay(false);
                    ev.target.className = "fa fa-play";
                }
                else {
                    sog.play();                                                               
                    setisplay(true);
                    ev.target.className = "fa fa-pause";
                }               
            }}></i>
        </div>
        <h6 className='mt-2'>{data.Name}</h6>
    </div>
</div>
    )
})
        }
        <audio id="sog" onEnded={() => {
            $('.playicon i').removeClass("fa fa-pause")
            $('.playicon i').addClass("fa fa-play")
        }}></audio>
        </div>
        </div>
        </div>
  
        </div>
      </div>
    </>
  )
}

export default Search
