import React,{useEffect} from 'react'
import './imageViewer.css'
import {AiFillCloseCircle} from 'react-icons/ai'

const ImageViewer = ({image,close}) => {

    document.addEventListener('mouseup', function (e){
        var container = document.getElementById('view-box');
        if(container){
        if(!container.contains(e.target)){
            close();
        }
        }
    } )

    return (
        <div className='image-viewer'>
            <AiFillCloseCircle id='img-viewer-close' onClick={close}/>
            <div id='view-box'>
                <img src={image} alt=''></img>
            </div>
        </div>
    )
}

export default ImageViewer
