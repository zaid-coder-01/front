import React from 'react'
import { useEffect, useState } from 'react'
import $ from 'jquery'
import axios from 'axios'
import Navbar from './Navbar'
import Artists from './Artists'
const RightSide = () => {
    const [isplay, setisplay] = useState(false);
    const [songs, setsongs] = useState([]);
    const [uname, setuname] = useState("");
    useEffect(() => {    
        if (sessionStorage.getItem("users") != null) {
            const user = sessionStorage.getItem("users");
            const users = JSON.parse(user)                       
            setuname(users.uname)           
          }
        axios.get("http://localhost:8000/getSong").then((res) => {

            setsongs(res.data);
        }).catch((err) => {
            console.log(err);
        })

        const md = sessionStorage.getItem('theme')
        document.body.className = md
    }, [songs])
    return (
        <>
<div className='col-md-10 rightnav'>
    <Navbar></Navbar>
    <div className='rightimg'>
        <img src='rightback.jpg' className=''></img>
    </div>
    <div className='container-fluid'>
        <Artists></Artists>
        <div className='mt-3 my-3 row row-cols-1 row-cols-md-5 g-4'>
        {
songs.map((data) => {
    let url = `http://localhost:8000/getSong/${data.SongImg}`
    let song = `http://localhost:8000/getSong/${data.Song}`
    let send = `/playSong/${data.SongImg}/${data.Song}/${data.Name}`
    return (
<div className='col' key={data._id}>
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
                    let fo={
                        uname:uname, Name:data.Name,Artist:data.Artist,                                
                        Song:data.Song,SongImg:data.SongImg                                
                    }
                     let recent=localStorage.getItem(uname);

                     if(recent==null)
                     {
                      let dat=[];
                      dat.push(fo);
                      localStorage.setItem(uname,JSON.stringify(dat));
                     }
                     else{
                         let name="";
                        let dats=JSON.parse(recent);
                        name=dats.find((datas)=>datas.Song===data.Song)
                        
                        if(name){}                                  
                        else{
                        dats.push(fo);
                        localStorage.setItem(uname,JSON.stringify(dats));
                        }
                    }
                                                
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
</>
    )
}

export default RightSide