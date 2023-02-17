import { data } from 'jquery';
import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
import $ from "jquery"
import axios from 'axios'
const Artistpanel = () => {
    const artist=useParams();
    const [isplay, setisplay] = useState(false);
    const [songs, setsongs] = useState([]);

    useEffect(() => {
        const md = sessionStorage.getItem('theme')
        document.body.className = md;
        axios.get("http://localhost:8000/getSong").then((res) => {
    
          setsongs(res.data);
        }).catch((err) => {
          console.log(err);
        })
    
      }, [])
  return (
    <>
      <div className='container playbox  mt-5 shadow-lg p-3 mb-5 rounded'>
        <div className='row'>
          <div className='col-md-4 playleft'>
            <div className='mt-5'>
              <img src={'http://localhost:8000/getSong/' + artist.img} className="playimg" id='sogimg'></img>
            </div>
          </div>
          <div className='col-md-8 playright'>
            <div className='mt-5'>
              <div className='row'>
                <div className='sogdetail'>
                  <h5 className='sname'>{artist.name}</h5>
                <div className='mt-3'>
                   <p>{artist.bio}</p>
                </div>
                <div className='mt-4'>
                  <button className='artall btn btn-primary'>Play All</button>
                </div>
                </div>
              </div>              
            </div>
          </div>
        </div>
      </div>

      <div className='songsuggestion'>

        {
          songs.map((data) => {
              if(data.Artist===artist.name){                
            let simg = `http://localhost:8000/getSong/${data.SongImg}`
            let song = `http://localhost:8000/getSong/${data.Song}`
            return (
              <div className='container' key={data._id}>
                <div className='card mt-3 shadow-lg rounded crd'>
                  <div className='card-body'>
                    <div className='row'>
                      <div className="col-md-2">
                        <img src={simg} className="sugimg mt-2"></img>
                      </div>
                      <div className="col-md-10 py-4 sugbox">
                      <div>
                        <h5>{data.Name}</h5>
                      </div>
                      <div className='pla'>
                  
                      <i className='fa fa-play-circle' onClick={(ev)=>{
                        let sog = document.getElementById('sog');
                       
                       let br= ev.target.offsetParent;
                       $(".crd").removeClass('bor');
                       $(br).addClass('bor');                       
         
                        sog.src = song;
                        $('.pla i').removeClass("fa fa-pause")
                        $('.pla i').addClass("fa fa-play-circle")
                        if (isplay) {                        
                          sog.pause();
                          setisplay(false);
                          ev.target.className = "fa fa-play-circle";
                          $('#plays').removeClass("fa fa-pause")
                          $('#plays').addClass("fa fa-play-circle")
                        }
                        else {             
                          
                          sog.play();
                          setisplay(true);
                          ev.target.className = "fa fa-pause";
                          $('#plays').removeClass("fa fa-play-circle")
                          $('#plays').addClass("fa fa-pause")
                       
                        }
                      }}></i>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            }
          })
        }

      </div>
      <audio id='sog' src='' onEnded={(ev)=>{
   $('.pla i').removeClass("fa fa-pause")
   $('.pla i').addClass("fa fa-play-circle")
      }}></audio>
    </>
  )
}

export default Artistpanel
