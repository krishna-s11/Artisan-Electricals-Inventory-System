import React, { useState } from 'react'
import './manageUsers.css'
import {FaSearch} from 'react-icons/fa'
import AddUsers from '../AddUsers/AddUsers';

const ManageUsers = () => {
    
    const [display,setDisplay] = useState(false);

    return (
        <div className='manage-users'>
            {
                display?<AddUsers close={() => {setDisplay(false)}}/>:null
            }
            <div className='vp-top'>
                <h2>Manage Users</h2>
                <div className='vp-action-bar'>
                    <div class="search-box">
                        <button class="btn-search"><FaSearch/></button>
                        <input type="text" class="input-search" placeholder="Type to Search..."></input>
                    </div>
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
                    <tr>
                        <td>1</td>
                        <td>Krishna Saxena</td>
                        <td>krishnsaxena69@gmail.com</td>
                        <td>Inventory, Orders, Users</td>
                        <td><p className='btn-del'>Delete</p></td>
                        <td><p className='btn-edit'>Edit</p></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Sherlock Holmes</td>
                        <td>sherlock@gmail.com</td>
                        <td>Inventory, Orders, Projects, Users</td>
                        <td><p className='btn-del'>Delete</p></td>
                        <td><p className='btn-edit'>Edit</p></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ManageUsers
