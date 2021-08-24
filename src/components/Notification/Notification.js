import React, { useEffect, useState } from 'react'
import './notification.css';
import firebase from '../../firebase';

const Notification = () => {

    const [notifications,setNotifications] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('notification').onSnapshot((snapshot) => {
            setNotifications(snapshot.docs
                .map(doc => (doc.data()))
                .sort(function(x,y){return y.time - x.time}));
        })
    },[])
    
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
