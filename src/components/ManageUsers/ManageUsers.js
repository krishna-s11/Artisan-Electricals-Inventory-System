import React, { useEffect, useState } from 'react'
import './manageUsers.css'
import {FaSearch} from 'react-icons/fa'
import AddUsers from '../AddUsers/AddUsers';
import firebase from '../../firebase';
import DeleteBox from '../DeleteBox/DeleteBox'

const ManageUsers = () => {
    
    const [display,setDisplay] = useState(false);
    const [users,setUsers] = useState([]);
    const [id,setId] = useState('');
    const [deleteDisplay,setDeleteDisplay] = useState(false)

    useEffect(() => {
        firebase.firestore().collection('users').onSnapshot((querySnap) => {
            setUsers(querySnap.docs.map(doc => ({id: doc.id, user: doc.data()})));
        });
    },[])

    const deleteUsers = async (id) => {
        await firebase.firestore().collection('users').doc(id).delete();
    }

    return (
        <div className='manage-users'>
             {
                deleteDisplay?<DeleteBox deleteFun={() => {deleteUsers(id)}} close={() => setDeleteDisplay(false)} />:null
            }
            {
                display?<AddUsers close={() => {setDisplay(false)}} id={id} />:null
            }
            <div className='vp-top'>
                <h2>Manage Users</h2>
                <div className='vp-action-bar'>
                    {/* <div class="search-box">
                        <button class="btn-search"><FaSearch/></button>
                        <input type="text" class="input-search" placeholder="Type to Search..."></input>
                    </div> */}
                    <button className='btn btn-add_items' onClick={() => {setDisplay(true)}}>New +</button>
                </div>
            </div>
            <table class="fl-table">
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th colSpan='2'>Action</th>
                </tr>   
                </thead>
                <tbody>
                    {
                        users && users.map((user,i) => {
                                return(
                                    <tr>
                                    <td>{i+1}</td>
                                    <td>{user.user.name}</td>
                                    <td>{user.user.email}</td>
                                    <td>{user.user.inventory?'Inventory,':null} {user.user.orders?'Orders,': null} {user.user.projects?'Projects,': null} {user.user.users?'Users': null}</td>
                                    <td><p className='btn-del' onClick={() => {setId(user.id); setDeleteDisplay(true)}}>Delete</p></td>
                                    <td><p className='btn-edit' onClick={() => {setId(user.id); setDisplay(true)}}>Edit</p></td>
                                </tr>
                                )
                        })   
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ManageUsers
