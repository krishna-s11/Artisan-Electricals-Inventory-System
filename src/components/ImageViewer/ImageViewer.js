import React from 'react'
import './imageViewer.css'
import {AiFillCloseCircle} from 'react-icons/ai'

const ImageViewer = ({image,close}) => {
    return (
        <div className='image-viewer'>
            <AiFillCloseCircle id='img-viewer-close' onClick={close}/>
            <img src={image} alt=''></img>
        </div>
    )
}

export default ImageViewer
