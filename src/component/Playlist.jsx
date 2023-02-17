import React from 'react'
import $ from 'jquery'
import LeftSide from './LeftSide'
import { useEffect,useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
const Playlist = () => {
    const [isvis, setisvis] = useState(false);
    const [playlistPic, setplaylistPic] = useState();
    const [uname, setuname] = useState("");
    const [playlists, setplaylists] = useState([]);
    
    useEffect(() => {
      if (sessionStorage.getItem("users") != null) {
        const user = sessionStorage.getItem("users");
        const users = JSON.parse(user)        
        setuname(users.uname)
      }
      axios.post("http://localhost:8000/getpic",{uname}).then((res) => {
        setplaylists(res.data);
      }).catch((err) => {
        console.log(err);
      })
      const md = sessionStorage.getItem('theme')
      document.body.className = md
      
    }, [playlistPic,playlists])
    
    const sub=()=>{
      let form=new FormData();
      let d=$('#listname').val();
      form.append("name",d);
      form.append("uname",uname);
      form.append("pic",playlistPic);
      axios.post("http://localhost:8000/uploadpic",form).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    }
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
    <div className='container playbox  mt-5 shadow-lg p-3 mb-5 rounded'>
        <div className='row'>
          <div className='col-md-4 playleft'>
            <div className='mt-5 text-center plyupload'>
              <i className='fa fa-picture-o listpic' onClick={()=>{                
                  $('#upload').click();     
              }}></i>
              
              <input type='file' id='upload' hidden onChange={(ev)=>{setplaylistPic(ev.target.files[0])}}></input> 
              <div className='plu'>
              <h3><i className='fa fa-plus'></i></h3>
              </div>
              
            </div>
            
          </div>
          <div className='col-md-8 playright'>
            <div className='mt-5'>
              <div className='row'>
              
               <div className='txt'>
               <div>PLAYLIST NAME</div>
               <h3 id='plnames' onClick={()=>{
                $('#plnames').replaceWith("<input id='listname' type='text' autofocus/>");
              }}>NEW PLAYLIST</h3>
               </div>
              </div>   
              <button onClick={sub} className='mt-3 btn btn-primary'>Add</button>           
            </div>
          </div>
        </div>
      </div>
        <div className='mt-3 my-3 row row-cols-1 row-cols-md-5 g-4'>
          
        {
          playlists.map((data)=>{
            let url = `http://localhost:8000/getSong/${data.pic}`
                return(
                  <div className='col' key={data._id}>
                    <img src={url} className="playlists"></img>
                     <h5 className='plu'>{data.name}</h5>
                  </div>
                )
          })
        }        
        </div>
        </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Playlist