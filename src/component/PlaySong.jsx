import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import $, { data } from "jquery"
import axios from 'axios'
import {WhatsappShareButton,WhatsappIcon} from 'react-share'

const PlaySong = () => {
  const params = useParams();
  const [isplay, setisplay] = useState(false);
  const [issug, setissug] = useState(false);
  const [songs, setsongs] = useState([]);
  const [Range, setRange] = useState(0);
  const [Cur, setCur] = useState(0);
  const [Time, setTime] = useState('0:0');
  const [cTime, setcTime] = useState('0:0');
  const [index, setindex] = useState(0);
  
  let p;

  const loadSong=(song)=>{
    let sog= document.getElementById("sog");
    let sogimg= document.getElementById("sogimg");
    sog.src="http://localhost:8000/getSong/"+song.Song
    sogimg.src="http://localhost:8000/getSong/"+song.SongImg
    $('.sname').text(song.Name);
      sog.play();
      setisplay(true);
      $('#plays').removeClass("fa fa-play-circle")
      $('#plays').addClass("fa fa-pause")
       setissug(true);
  }
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
              <img src={'http://localhost:8000/getSong/' + params.songimg} className="playimg" id='sogimg'></img>
            </div>
          </div>
          <div className='col-md-8 playright'>
            <div className='mt-4'>
              <div className='row'>
                <div className='sogdetail'>
                  <h5 className='sname'>{params.name}</h5>
                </div>
              </div>
              <div className='row'>                
                <div className='sogslider'>
                <div className='time me-2'>
                     <div> <h5>{cTime}</h5> </div>
                     <div><h5> {Time}</h5> </div>                     
                </div>

                  <div><input type="range" id='rg'  value={Range} min='0' max='100' onChange={(ev)=>{ 
                 
                 let sog=document.getElementById('sog'); 
               sog.currentTime = ev.target.value * (sog.duration / 100);
             
              }}

                 className="slider"></input></div>
                  <div className='playcomp'>
                  <div className='sogicondiv'>
                    <div className='sogIcon'><i className='fa fa-backward' onClick={()=>{
                        setindex((index - 1 + songs.length)% songs.length);
                    
                        loadSong(songs[index]);
                        let d=document.querySelectorAll(".crd")[index];
                        p=document.querySelectorAll(".crd i")[index];
                        $('.pla i').removeClass("fa fa-pause")
                        $('.pla i').addClass("fa fa-play-circle")
                       $(".crd").removeClass('bor');
                       $(d).addClass('bor');
                       $(p).removeClass("fa fa-play-circle")
                       $(p).addClass("fa fa-pause")
                       $("#plays").removeClass("fa fa-play-circle")
                       $("#plays").addClass("fa fa-pause")
                    }}></i></div>
                    <div className='sogIcon pla'><i className='fa fa-play-circle' id='plays' onClick={(ev) => {
                      let sog = document.getElementById('sog');
                      if(!issug){
                      sog.src = "http://localhost:8000/getSong/" + params.song;
                      }
                      if (isplay) {
                        sog.pause();
                        setisplay(false);
                        ev.target.className = "fa fa-play";
                        $(".pla i").removeClass("fa fa-pause");
                        $(".pla i").addClass("fa fa-play-circle");
                      }
                      else {
                        sog.play();                        
                        setisplay(true);
                        ev.target.className = "fa fa-pause";
                        $(p).removeClass("fa fa-play-circle")
                        $(p).addClass("fa fa-pause")
                      }
                    }}></i></div>
                    <div className='sogIcon'><i className='fa fa-forward' onClick={()=>{
                        setindex((index + 1)% songs.length);
              
                        loadSong(songs[index])
                       let d=document.querySelectorAll(".crd")[index];
                       p=document.querySelectorAll(".crd i")[index];
                       $('.pla i').removeClass("fa fa-pause")
                       $('.pla i').addClass("fa fa-play-circle")
                       $(".crd").removeClass('bor');
                       $(d).addClass('bor');
                       $(p).removeClass("fa fa-play-circle")
                       $(p).addClass("fa fa-pause")
                       $("#plays").removeClass("fa fa-play-circle")
                       $("#plays").addClass("fa fa-pause")

                    }}></i></div>
                  </div>

                  <div className='playmoresection mt-3'>
                     <div>
                     <i className='fa fa-volume-up' id='mu' onClick={()=>{
                        let sog = document.getElementById('sog');
                       if(sog.muted){
                        $('#mu').removeClass("fa fa-volume-off")
                        $('#mu').addClass("fa fa-volume-up")
                        sog.muted=false;
                       }
                       else{
                        $('#mu').removeClass("fa fa-volume-up")
                        $('#mu').addClass("fa fa-volume-off")
                        sog.muted=true;
                       }
                     }}></i>
                     </div>
                     <div>
                     <WhatsappShareButton url='http://localhost:3000/playSong/1655889245981-musiczone-raatan.jpeg/1655889245953-musiczone-Raatan%20Lambiyan(PagalWorld.com.se).mp3/raatan%20lambiya'>                  
                      <WhatsappIcon size={26} round={true} />
                     </WhatsappShareButton>
                     </div>
                     <div>
                     <a href={"http://localhost:8000/getSong/"+ params.song}><i className='fa fa-download'></i></a>
                     </div>
                     <div>
                     <a href={"http://localhost:8000/getSong/"+ params.song} download><i className='fa fa-plus'>&nbsp;Playlist</i></a>
                     </div>
                  </div>
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
                        let sogimg = document.getElementById('sogimg');
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
                          sogimg.src=simg;
                          $('.sname').text(data.Name);
                          sog.play();
                          setisplay(true);
                          ev.target.className = "fa fa-pause";
                          $('#plays').removeClass("fa fa-play-circle")
                          $('#plays').addClass("fa fa-pause")
                          setissug(true);
                        }
                      }}></i>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }

      </div>
      <audio id='sog' src='' onEnded={(ev)=>{
      $('.pla i').removeClass("fa fa-pause")
      $('.pla i').addClass("fa fa-play-circle")
      }}  onTimeUpdate={(ev)=>{  
        let rg=document.getElementById('rg'); 
        let sog=document.getElementById('sog'); 


        let dut = Math.floor( sog.duration/ 60);
        let dusec = Math.floor(sog.duration % 60);
        let s=`${dut}:${dusec}`
        setTime(s);

        let cut = Math.floor( sog.currentTime/ 60);
        let cusec = Math.floor(sog.currentTime % 60);
        let csec=`${cut}:${cusec}`
        setcTime(csec)  

        rg = sog.currentTime * (100 / sog.duration);
        setRange(rg);     
      }}></audio>
    </>
  )
}

export default PlaySong