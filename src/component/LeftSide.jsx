import React from 'react'
import { useEffect,useState } from 'react'
import $ from 'jquery'
import axios from 'axios'
const LeftSide = () => {
    const [pic, setpic] = useState("default.png");
    const [islog, setislog] = useState(false);
    const [uname, setuname] = useState("");
    const [mode, setmode] = useState("light");
    const [songs, setsongs] = useState([]);
    const [srh, setsrh] = useState([]);
    useEffect(() => {

        if (sessionStorage.getItem("users") != null) {
          const user = sessionStorage.getItem("users");
          const users = JSON.parse(user)
          const pics = `http://localhost:8000/users/${users.pic}`
          setpic(pics);
          setuname(users.uname)
          setislog(true)
        }
        const md = sessionStorage.getItem('theme')
        document.body.className = md
      }, [mode])
      const logout = () => {
        sessionStorage.removeItem("users");
        setislog(false);
        setpic("default.png")
      }
      const mod = () => {
        if (mode === "light") {
          setmode("dark");
          sessionStorage.setItem("theme", "dark");
        }else {
          setmode("light");
          sessionStorage.setItem("theme", "light"); } }    
    
  return (
    <>
            <div className='col-md-2 leftnav'>
            <div className='text-center mt-4 lname'>
              <img src={pic} className='userprf '></img>
              <br></br>
              {islog ?
                <a style={{ "textDecoration": "none", "fontWeight": "bold", "cursor": "pointer" }} className="usname" >{uname}</a>
                :
                <a href='login' style={{ "textDecoration": "none", "fontWeight": "bold" }} >LOGIN</a>
              }
            </div>
            <form className="d-flex mt-4 srch">
        <input className="form-control" autoComplete='off' type="text" id="wr" onChange={(ev)=>{
          setsrh(ev.target.value);
          let sear=srh.toString();
          axios.post("http://localhost:8000/getSearch",{sear}).then((res) => {
          
          setsongs(res.data);
            if(ev.target.value!='')
            {
              $('.srlist ul li').remove();
              songs.map((data)=>{           
                $('.srlist ul').append(`<li id='dd'>${data.Name}</li>`)
              })              
            }
            else{ $('.srlist ul li').remove(); }
      
            $(document).on('click', '#dd', function () {
                $('#wr').val($(this).text());
              $('.srlist ul').html("");
            });

        }).catch((err) => {
            console.log(err);
        })
          }} placeholder="Search" name="srh"></input>
        <a href={'/search/'+srh}><i className='fa fa-search'></i></a>
      </form>
      {/* srch list */}
      <div className='srlist'>
        <ul>
          
        </ul>
      </div>
            <div className='navIteam mt-5'>              
            
                  <div className='naviteams'>
                  <li ><i className="fa fa-moon-o"></i><a onClick={mod}>Mode</a></li>
                  </div>  

                  <div className='naviteams'>
                  <li><i className="fa fa-home" aria-hidden="true"></i><a href='/'>Home</a></li>
                  </div>

                  <div className='naviteams'>
                  <li><i className="fa fa-history" aria-hidden="true"></i><a href='/recent'>Recent</a></li>
                  </div>

                  <div className='naviteams'>
                 { islog ?
                  <li><i className="fa fa-list" aria-hidden="true"></i><a href='/playlist'>Playlist</a></li>:
                  <li><i className="fa fa-list" aria-hidden="true"></i><a href='/login'>Playlist</a></li>
                 }
                  </div>
                  <div className='naviteams'>
                  <li><i className="fa fa-download" aria-hidden="true"></i><a>Download</a></li>
                  </div>
                  
                  {islog ?
                  <div className='naviteams'>
                    <li ><i className="fa fa-sign-out" aria-hidden="true"></i><a onClick={logout} >LOGOUT</a></li></div>
                    :
                    ""
                  }           
            
            </div>
          </div>
    </>
  )
}

export default LeftSide