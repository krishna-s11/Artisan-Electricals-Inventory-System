import React from 'react'
import './basicInfo.css'

const BasicInfo = () => {
    return (
        <div className='basic-info'>
            <div style={{ display:'flex'}}>
            <div className='basic-container'>
                <p style={{color: '#999'}}>Basic Information</p>
                <div className='basic-content'>
                    <div className='basic-form-holder'>
                        <p>Full name : </p>
                        <input type="text" class="form__input basic" id="add-input" placeholder="Sherlock Holmes" required></input>
                    </div>
                    <div className='basic-form-holder'>
                        <p>Employee Id: </p>
                        <input type="text" class="form__input basic" id="add-input" placeholder="123456789" required></input>
                    </div>
                    <div className='basic-form-holder'>
                        <p>Mobile no.: </p>
                        <input type="number" class="form__input basic" id="add-input" placeholder="+91 8789733434" required></input>
                    </div>
                </div>
            </div> 
            <div className='basic-security-holder'>
                <p style={{color: '#999'}}>Security Settings</p>
                <div className='basic-content'>
                    <div className='basic-form-holder'>
                        <p>Current password : </p>
                        <input type="password" class="form__input basic" id="add-input" placeholder="" required></input>
                    </div>
                    <div className='basic-form-holder'>
                        <p>New password : </p>
                        <input type="password" class="form__input basic" id="add-input" placeholder="" required></input>
                    </div>
                    <div className='basic-form-holder'>
                        <p>Confirm password : </p>
                        <input type="password" class="form__input basic" id="add-input" placeholder=" " required></input>
                    </div>
                </div>
            </div>
            </div>
            <div className='basic-action-holder'>
                <div style={{width: '50%', textAlign:'center', transform: 'translateX(-20px)'}}>
                    <button className='btn btn-basic-save'>Save</button>
                </div>
                <div>
                    <button style={{backgroundColor: '#58c0ca', transform: 'translateX(-20px)'}} className='btn btn-basic-save'>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default BasicInfo
