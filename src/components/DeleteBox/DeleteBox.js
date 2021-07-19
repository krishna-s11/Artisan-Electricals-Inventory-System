import React from 'react'
import './deleteBox.css'
import warning from '../../assets/warning-ico.png'

const DeleteBox = ({deleteFun, close}) => {
    return (
        <div className='delete-box'>
            <div className='delete-card'>
                <div className='dl-top'>
                    <h2>Delete Data</h2>
                </div>
                <div className='delete-content'>
                    <img src={warning} alt=''></img>
                    <p>This will permanently delete the data.</p>
                </div>
                <div className='dl-action-box'>
                    <button className='btn btn-cancel' onClick={close}>Cancel</button>
                    <button className='btn btn-delete' onClick={() => {deleteFun(); close()}}>Start Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteBox
