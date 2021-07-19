import React, { useEffect, useState } from 'react'
import './addUsers.css'
import {AiOutlineClose} from 'react-icons/ai'
import firebase from '../../firebase';
import { toast } from 'react-toastify';

const AddUsers = ({close, id}) => {

    const [userDetails,setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        inventory: false,
        projects: false,
        orders: false,
        users:false
    })

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.id]: e.target.value
        })
    }

    const handleCheckbox = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.id]:e.target.checked
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userDetails.name !== '' && userDetails.email !== '' && userDetails.password !== ''){
            if(!id){
                await firebase.firestore().collection('users').add(userDetails);
            }else{
                await firebase.firestore().collection('users').doc(id).update(userDetails);
            }
            toast.success('Successfully updated');
            close();
        }
        else{
            console.log('fill all required fields');
        }
    }

    useEffect(() => {
        if(id){
            firebase.firestore().collection('users').doc(id).get().then(doc => {
                if(doc.exists) setUserDetails(doc.data());
            })
        }
    },[id])

    return (
        <div className='add-users'>
            <div className='add-users-card'>
                <div className='add-card-top'>
                    <h2>Create New User</h2>
                    <AiOutlineClose id='btn-close' onClick={close} />
                </div>
                <div className='add-user-content'>
                    <div className='form-row'>
                        <p>Name:</p>
                        <input type="text" class="form__input add-input" id="name" placeholder="Full Name" onChange={handleChange} defaultValue={userDetails.name} required></input>
                    </div>
                    <div className='form-row'>
                        <p>Email:</p>
                        <input type="text" class="form__input add-input" id="email" placeholder="Email address" onChange={handleChange} defaultValue={userDetails.email} required></input>
                    </div>
                    <div className='form-row'>
                        <p>Password:</p>
                        <input type="password" class="form__input add-input" id="password" placeholder="Password" onChange={handleChange} defaultValue={userDetails.password} required></input>
                    </div>
                    <div className='form-row'>
                        <p>User Roles:</p>
                        <form>
                        <input type="checkbox" id="inventory" name="inventory" onChange={handleCheckbox} value={true} checked={userDetails.inventory} ></input>
                        <label for="inventory">Inventory</label>
                        <input type="checkbox" id="projects" name="projects" onChange={handleCheckbox} value={true} checked={userDetails.projects} ></input>
                        <label for="projects">Projects</label>
                        <input type="checkbox" id="orders" name="orders" onChange={handleCheckbox} value={true} checked={userDetails.orders}></input>
                        <label for="orders">Orders</label>
                        <input type="checkbox" id="users" name="users" onChange={handleCheckbox} value={true} checked={userDetails.users}></input>
                        <label for="users">Users</label>
                        </form>
                    </div>
                    <div className='user-action-box'>
                        <button className='btn btn-user' onClick={handleSubmit}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUsers
