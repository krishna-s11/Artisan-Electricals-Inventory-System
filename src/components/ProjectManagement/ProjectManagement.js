import React, { useEffect, useState } from 'react'
import './projectManagement.css'
import {FaSearch} from 'react-icons/fa'
import AssignProject from '../AssignProject/AssignProject'
import firebase from '../../firebase'

const ProjectManagement = () => {

    const [display,setDisplay] = useState(false);
    const [projects,setProjects] = useState([]);
    const [id,setId] = useState('');

    useEffect(() => {
        firebase.firestore().collection('projects').get()
        .then(querySnap => {
            setProjects(querySnap.docs.map(doc => ({id: doc.id, data: doc.data()})));
        })
    })

    return (
        <div className='project-management'>
        {
            display?<AssignProject close={() => {setDisplay(false)}} id={id} />:null   
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
                        <th colSpan='2'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        projects && projects.map((project,i) => {
                            const data = project.data;
                            return( 
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.add1} {data.add2}</td>
                                    <td>{data.visit}</td>
                                    <td>{data.assigned}</td>
                                    <td>{data.description}</td>
                                    <td><p className='btn-del'>Delete</p></td>
                                    <td onClick={() => {setId(project.id);setDisplay(true)}}><p className='btn-edit'>Edit</p></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
        </div>
    )
}

export default ProjectManagement
