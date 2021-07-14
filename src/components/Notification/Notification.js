import React, { useEffect, useState } from 'react'
import userDp from '../../assets/user-dp.jpg'
import './notification.css';
import firebase from '../../firebase';

const Notification = () => {

    const [notifications,setNotifications] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('notification').onSnapshot((snapshot) => {
            setNotifications(snapshot.docs.map(doc => (doc.data())));
        })
    },[])
    console.log(notifications)
    return (
        <div className='notification-drop' id='nt-drop'>
            <div id='triangle'></div>
            <div className='nt-top'>
                <p>Notifications</p>
            </div>
            <div className='nt-main'>
                {
                    notifications && notifications.map((notification,i) => {
                        return(
                            <div key={i} className='nt-card'>
                                <img src={userDp} alt=''></img>
                                <p>{notification.emp_name}<span> {notification.mssg}</span></p>
                            </div>
                        )
                    })   
                }
            </div>
        </div>
    )
}

export default Notification
