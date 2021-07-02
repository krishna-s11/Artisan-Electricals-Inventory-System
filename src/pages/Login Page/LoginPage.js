import React, {useState} from 'react'
import './loginPage.css'
import imgCover from '../../assets/login-cover3.jpg'
import {Link} from 'react-router-dom'

const LoginPage = () => {

    const [start,setStart] = useState(false);

    const employee = {
        backgroundColor: '#58c0ca',
        transform: 'translateX(128px)',
        width: '130px',
        transition: 'all 0.4s ease-in'
    }

    const admin = {
        backgroundColor: '#58c0ca',
        transform: 'translateX(0)',
        transition: 'all 0.4s ease-in'
    }

    return (
        <div className='login-page'>
             <div class="background">
                <div class="cube"></div>
                <div class="cube"></div>
                <div class="cube"></div>
                <div class="cube"></div>
                <div class="cube"></div>
            </div>
            <div class="content">
                <div class='login-lg'>
                    <h2>Member Login</h2>
                    <div class='login-role'>
                        <div className='select-box' style={start?employee:admin}></div>
                        <p style={start?{color:'#000'}:{color:'#fff'}} onClick={() => setStart(false)}>I am admin</p>
                        <p style={start?{color:'#fff'}:{color:'#000'}} onClick={() => setStart(true)}>I am employee</p>
                    </div>
                    <div>
                    <div class="form__group">
                        <input type="text" class="form__input" id="text" placeholder="Username" required></input>
                        <label for="text" class="form__label">Username</label>
                    </div>
                    <div class="form__group">
                        <input type="password" class="form__input" id="password" placeholder="Password" required></input>
                        <label for="password" class="form__label">Password</label>
                    </div>
                    </div>
                    <Link to='/dashboard/products'><button className='btn btn-login'>Login</button></Link>
                </div>
                <div class='cover-lg'>
                        <img src={imgCover} className='cover-img'></img>
                        <h3>Artisan inventory system</h3>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
