import React from 'react'
import { useEffect,useState } from 'react'
import $ from 'jquery'
const AdminLeft = () => {
    const [pic, setpic] = useState("default.png");
    const [islog, setislog] = useState(false);
    const [uname, setuname] = useState("");
    const [mode, setmode] = useState("light");
    const [songs, setsongs] = useState([]);

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
        }
        else {
          setmode("light");
          sessionStorage.setItem("theme", "light");
        }
    
      }
    
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
        <input className="form-control" type="text" placeholder="Search" ></input>
        <button className="" type="submit"><i className='fa fa-search'></i></button>
      </form>
            <div className='navIteam mt-5'>              
            
                  <div className='naviteams'>
                  <li ><i className="fa fa-moon-o"></i><a onClick={mod}>Mode</a></li>
                  </div>  

                  <div className='naviteams'>
                  <li><i className="fa fa-home" aria-hidden="true"></i><a>Dashboard</a></li>
                  </div>

                  <div className='naviteams'>
                  <li><i className="fa fa-history" aria-hidden="true"></i><a>Add Song</a></li>
                  </div>

                  <div className='naviteams'>
                  <li><i className="fa fa-list" aria-hidden="true"></i><a>Add Artist</a></li>
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

export default AdminLeft