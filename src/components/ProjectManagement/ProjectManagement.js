import React, { useState } from 'react'
import './projectManagement.css'
import {FaSearch} from 'react-icons/fa'
import AssignProject from '../AssignProject/AssignProject'

const ProjectManagement = () => {

    const [display,setDisplay] = useState(false);

    return (
        <div className='project-management'>
        {
            display?<AssignProject close={() => {setDisplay(false)}} />:null   
        }
             <div className='ol-top'>
                <h2>Manage Projects</h2>
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
                        <th>Project Name</th>
                        <th>Project Address</th>
                        <th>Visit Scheduled</th>
                        <th>Assigned to</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Electrical Vehicle Charging</td>
                        <td>10 Downing Street</td>
                        <td>10/07/2021</td>
                        <td>Sherlock Holmes</td>
                        <td>Job description here</td>
                        <td style={{color: '#529DA6', fontWeight: '600'}}>Processing</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Fire alarm installation</td>
                        <td>221 B Baker Street</td>
                        <td>12/07/2021</td>
                        <td>Harry Potter</td>
                        <td>Job description here</td>
                        <td style={{color: '#529DA6', fontWeight: '600'}}>Accepted</td>
                    </tr>
                    </tbody>
                </table>
        </div>
    )
}

export default ProjectManagement
