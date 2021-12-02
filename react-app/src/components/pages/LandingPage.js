import {React,useState} from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'


export default function LandingPage() {
    const [Username,setusername]=useState('');
    const[password,setpassword]=useState('');
    
    var data = {
        uname: Username,
        pwd: password,
    }
    const loginsubmit=()=>
    {
        const url = "http://localhost:3002"+"/login";
        
        const postMethod= {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        }
        fetch(url,postMethod)
      .then(response => {
        const statusCode = response.status
      
        
        if (statusCode == 200) {
          alert('Login Sucessfully')
        }
        else if(statusCode==400)
        {
            alert("Username/Password invalid")
        }
        else if(statusCode==404)
        {
            alert("User not exists")
        }
        response.json().then(responseJson => {
         
        
           alert( responseJson.message)
         
        })
      })
      .catch(error => {
        console.error(error)
      })
    }
    return (
        <div className="text-center m-5-auto">
            <h1 style={{color:'white'}}>Sign in</h1>
            <form onSubmit={loginsubmit}>
                <p>
                    <label>Username or email address</label><br/>
                    <input type="text" name="first_name" required onChange={e => setusername(e.target.value)} />
                </p>
                <br></br>
                <p>
                    <label>Password</label>
                    
                    <br/>
                    <input type="password" name="password" required onChange={e => setpassword(e.target.value)}/>
                </p>
                <br></br>
                <Link style={{color:'red'}} to="/forget-password"><label className="right-label">Forget password?</label></Link>
                <br></br> <br></br>
                <p>
                    <button id="sub_btn" type="submit" >Login</button>
                </p>
                
            </form>
            <footer>
                <p style={{color:'white'}}>First time? <Link style={{color:'white'}} to="/register">Create an account</Link>.</p>
                
            </footer>
        </div>
    )
}

