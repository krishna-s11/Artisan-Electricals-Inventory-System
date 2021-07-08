import React from 'react'
import './productInfo.css'
import img1 from '../../assets/tool-1.jpg'
import img2 from '../../assets/tool-2.jpg'
import img3 from '../../assets/login-cover3.jpg'
import {AiOutlineClose} from 'react-icons/ai'

const ProductInfo = ({close}) => {
    return (
        <div className='product-info'>
            <div className='pd-title-box'>
                <AiOutlineClose className='btn-cross' onClick={close} />
                <h3>Product Name</h3>
            </div>
            <div className='pd-img-container'>
                <p>Product Images:</p>
                <div className='pd-img-box'>
                    <img alt='' src={img1}></img>
                    <img alt='' src={img2}></img>
                    <img alt='' src={img3}></img>
                    <img alt='' src={img1}></img>
                    <img alt='' src={img2}></img>
                    <img alt='' src={img3}></img>
                    <img alt='' src={img1}></img>
                    <img alt='' src={img2}></img>
                    <img alt='' src={img3}></img>
                </div>
            </div>
            <div className='pd-info-box'>
                <p>Name: <span>Measurement Items</span></p>
                <p>SKU: <span>38401dkdkfe</span></p>
                <p>Category: <span>Measurement</span></p>
                <p>Sub-category: <span>Tools </span></p>
                <p>Units of measurement: <span>cm</span></p>
                <p>Dimensions: <span>20cm x 30cm</span> </p>
                <p>Serial number: <span>20cm x 30cm</span> </p>
            </div>
        </div>
    )
}

export default ProductInfo
