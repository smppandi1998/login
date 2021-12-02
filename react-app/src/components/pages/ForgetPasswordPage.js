import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

export default function ForgetPasswordPage() {
    return (
        <div className="text-center m-5-auto">
            <h2 style={{color:'white'}}>Reset your password</h2>
            <h5 style={{color:'white'}}>Enter your email address and we will send you a new password</h5>
            <form action="/login">
               <br></br>
                <p>
                    <label id="reset_pass_lbl">Email address</label><br/>
                    <input type="email" name="email" required />
                </p>
                <br></br>
                <p>
                    <button id="sub_btn" type="submit">Send password reset email</button>
                </p>
            </form>
            <footer>
                <p style={{color:'white'}}>First time? <Link style={{color:'white'}} to="/register">Create an account</Link>.</p>
                <p style={{color:'white'}}><Link style={{color:'white'}} to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
