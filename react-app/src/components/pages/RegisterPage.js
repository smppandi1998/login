import {React,useState} from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

export default function SignUpPage() {
    const [Username,setusername]=useState('');
    const[password,setpassword]=useState('');
    const[email,setemail]=useState('');
    const[checkboxvalue,setcheckboxvalue]=useState(true)
    const [showtextbox,setshowtextbox]=useState(false)
    const[otp,setotp]=useState('')

    const checkboxchange=(value)=>
    {
      if(value)
      {
        var data = {
          uname: Username,
          email:email,
        }
        setshowtextbox(true)
        setcheckboxvalue(false)
        const url = "http://127.0.0.1:3002/"+"sendotp";
          alert(value)
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
         
          if (statusCode == 502) {
            alert('Please turn on server')
          }
          response.json().then(responseJson => {
         
        
           alert( responseJson.message)
         
        })
      })
      .catch(error => {
        console.error(error)
      })
      }
    }
    

    const registersubmit=()=>
    {
      
       if(!otp||!Username||!password||!email)
       {
          alert("Please fill the all details")
       }
       else
       { 
        var data = {
          uname: Username,
          pwd: password,
          email:email,
          otpnum:otp
        }
        const url = "http://localhost:3002/"+"register";
        
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
      
        alert(statusCode)
        if (statusCode == 200) {
          alert('User signed up successfully')
        }
        else if(statusCode==500)
        {
          alert('User signup failed!')
        }
        else if(statusCode==400)
        {
          alert('Invalid OTP or OTP expired');
        }
        response.json().then(responseJson => {
         
        
           alert( responseJson.message)
         
        })
      })
      .catch(error => {
        console.error(error)
      })
       }
    }
   
    return (
        <div className="text-center m-5-auto">
            <h2 style={{color:'white'}}>Join us</h2>
            <h5 style={{color:'white'}}>Create your personal account</h5>
            <form onSubmit={registersubmit} >
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="first_name" placeholder="Enter the username" required onChange={e => setusername(e.target.value)}/>
                </p>
                <br></br>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" placeholder="Enter the email" required onChange={e => setemail(e.target.value)} />
                </p>
                <br></br>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" placeholder="Enter the password" requiredc onChange={e => setpassword(e.target.value)} />
                </p>
                <br></br>
               {checkboxvalue&& <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required onChange={e => checkboxchange(e.target.checked)}/> <span>Verify email id </span>.
                </p>}
                {showtextbox&&<p>
                    <label>OTP</label><br/>
                    <input type="text" name="otp" placeholder="Enter the otp" requiredc onChange={e => setotp(e.target.value)} />
                </p>}
                <br></br>
                <p>
                    <button id="sub_btn" type="submit" >Register</button>
                    
                </p>
            </form>
            <footer>
                <p><Link style={{color:'white'}} to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
