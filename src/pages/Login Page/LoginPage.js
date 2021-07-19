import React, {useContext, useEffect, useState} from 'react'
import './loginPage.css'
import { useHistory } from 'react-router-dom';
import imgCover from '../../assets/login-cover3.jpg'
import firebase from '../../firebase';
import { AuthContext } from '../../Auth';
import { toast } from 'react-toastify';

const LoginPage = () => {

    const [start,setStart] = useState(false);
    const [users,setUsers] = useState([]);
    const {currentUser,setCurrentUser} = useContext(AuthContext)

    const history = useHistory();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

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

    useEffect(() => {
        if(currentUser){
            history.goForward();
        }
        firebase.firestore().collection('users').get().then((querySnap)  => {
            setUsers(querySnap.docs.map(doc => ({id:doc.id, user: doc.data()})));
        })
        toast.success(users);
    },[currentUser,history])

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePass = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email === '' || password === ''){
            return toast.error('Enter login credentials.');
        }
        let success = false;
        for(var i=0; i<users.length; i++){
            if(users[i].user.email === email){
                if(users[i].user.password === password){
                    setCurrentUser(users[i]);
                    history.push('/dashboard/products');
                    success = true
                    return ;
                }
            }
        }
        if(!success){
            toast.error('Invalid username or password !');
        }
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
                        <input type="text" class="form__input" id="text" onChange={handleEmail} placeholder="Username" required></input>
                        <label for="text" class="form__label">Username</label>
                    </div>
                    <div class="form__group">
                        <input type="password" class="form__input" id="password" onChange={handlePass} placeholder="Password" required></input>
                        <label for="password" class="form__label">Password</label>
                    </div>
                    </div>
                     <button className='btn btn-login' onClick={handleSubmit}>Login</button>
                </div>
                <div class='cover-lg'>
                        <img alt='' src={imgCover} className='cover-img'></img>
                        <h3>Artisan inventory system</h3>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
