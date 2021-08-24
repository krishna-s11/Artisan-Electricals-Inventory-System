import React,{useContext, useEffect, useState} from 'react'
import './orderInfo.css'
import {AiOutlineClose} from 'react-icons/ai'
import firebase from '../../firebase'
import { AuthContext } from '../../Auth'
import { toast } from 'react-toastify'
import ImageViewer from '../ImageViewer/ImageViewer'

const OrderInfo = ({close,id}) => {

    const [order,setOrder] = useState([]);
    const [imgSrc,setImgSrc] = useState('');
    const [imagePreview, setImagePreview] = useState(false);

    useEffect(() => {
        firebase.firestore().collection('orders').doc(id).get()
        .then(doc => {
            if(doc.exists){
                setOrder(doc.data());
            }
        })
    },[id])

    const acceptBtn = async () => {
        await firebase.firestore().collection('orders').doc(id).update({
            status: 'accepted'
        });
        await firebase.firestore().collection('stats').doc('orders').update({
            approved: firebase.firestore.FieldValue.increment(1),
            pending: firebase.firestore.FieldValue.increment(-1)
        })
        toast.success('Order accepted !');
        close();
    }
    const declineBtn = async () => {
        await firebase.firestore().collection('orders').doc(id).update({
            status: 'declined'
        })
        await firebase.firestore().collection('stats').doc('orders').update({
            rejected: firebase.firestore().FieldValue.increment(1),
            pending: firebase.firestore().FieldValue.decrement(1)
        })
        toast.error('Order rejected !');
        close();
    }

    return (
        <div className='product-info-pg'>
            {
                imagePreview? <ImageViewer image={imgSrc} close={() => {setImagePreview(false)}}/>:null
            }
            <div className='product-info'>
                <div className='pd-title-box'>
                    <AiOutlineClose className='btn-cross' onClick={close}/>
                    <h3>{order.name}</h3>
                </div>
                <div className='pd-info-box od-info' style={{marginTop: '50px'}}>
                    <p>Employee Name: <span>{order.emp_name}</span></p>
                    <p>Project Name: <span>{order.name}</span></p>
                    <p>Project Address: <span>{order.add1} {order.add2} {order.add3} </span></p>
                    <p>Required By: <span>{order.requiredBy} </span></p>
                    <p>Extra note: <span>{order.note} </span></p>
                    <p>Material:</p>
                    <table class="fl-table">
                        <thead>
                        <tr>
                            <th>Preview</th>
                            <th>Name</th>
                            <th>Qty.</th>
                        </tr>   
                        </thead>
                        <tbody>
                            {order.material1?<tr>
                                <td onClick={() => {setImgSrc(order.img1); setImagePreview(true)}}><img alt='' src={order.img1} className='product-preview'></img></td>
                                <td className='od-data'>{order.material1}</td>
                                <td>{order.quantity1}</td>
                            </tr>:null}
                            {order.material2?<tr>
                                <td onClick={() => {setImgSrc(order.img2); setImagePreview(true)}}><img alt='' src={order.img2} className='product-preview'></img></td>
                                <td className='od-data'>{order.material2}</td>
                                <td>{order.quantity2}</td>
                            </tr>:null}
                            {order.material3?<tr>
                                <td onClick={() => {setImgSrc(order.img3); setImagePreview(true)}}><img alt='' src={order.img3} className='product-preview'></img></td>
                                <td className='od-data'>{order.material3}</td>
                                <td>{order.quantity3}</td>
                            </tr>:null}
                            {order.material4?<tr>
                                <td onClick={() => {setImgSrc(order.img4); setImagePreview(true)}}><img alt='' src={order.img4} className='product-preview'></img></td>
                                <td className='od-data'>{order.material4}</td>
                                <td>{order.quantity4}</td>
                            </tr>:null}
                            {order.material5?<tr>
                                <td onClick={() => {setImgSrc(order.img5); setImagePreview(true)}}><img alt='' src={order.img5} className='product-preview'></img></td>
                                <td className='od-data'>{order.material5}</td>
                                <td>{order.quantity5}</td>
                            </tr>:null}
                            {order.material6?<tr>
                                <td onClick={() => {setImgSrc(order.img6); setImagePreview(true)}}><img alt='' src={order.img6} className='product-preview'></img></td>
                                <td className='od-data'>{order.material6}</td>
                                <td>{order.quantity6}</td>
                            </tr>:null}
                            {order.material7?<tr>
                                <td onClick={() => {setImgSrc(order.img7); setImagePreview(true)}}><img alt='' src={order.img7} className='product-preview'></img></td>
                                <td className='od-data'>{order.material7}</td>
                                <td>{order.quantity7}</td>
                            </tr>:null}
                            {order.material8?<tr>
                                <td onClick={() => {setImgSrc(order.img8); setImagePreview(true)}}><img alt='' src={order.img8} className='product-preview'></img></td>
                                <td className='od-data'>{order.material8}</td>
                                <td>{order.quantity8}</td>
                            </tr>:null}
                            {order.material9?<tr>
                                <td onClick={() => {setImgSrc(order.img9); setImagePreview(true)}}><img alt='' src={order.img9} className='product-preview'></img></td>
                                <td className='od-data'>{order.material9}</td>
                                <td>{order.quantity9}</td>
                            </tr>:null}
                            {order.material10?<tr>
                                <td onClick={() => {setImgSrc(order.img10); setImagePreview(true)}}><img alt='' src={order.img10} className='product-preview'></img></td>
                                <td className='od-data'>{order.material10}</td>
                                <td>{order.quantity10}</td>
                            </tr>:null}
                            {order.material11?<tr>
                                <td onClick={() => {setImgSrc(order.img11); setImagePreview(true)}}><img alt='' src={order.img11} className='product-preview'></img></td>
                                <td className='od-data'>{order.material11}</td>
                                <td>{order.quantity11}</td>
                            </tr>:null}
                            {order.material12?<tr>
                                <td onClick={() => {setImgSrc(order.img12); setImagePreview(true)}}><img alt='' src={order.img12} className='product-preview'></img></td>
                                <td className='od-data'>{order.material12}</td>
                                <td>{order.quantity12}</td>
                            </tr>:null}
                            {order.material13?<tr>
                                <td onClick={() => {setImgSrc(order.img13); setImagePreview(true)}}><img alt='' src={order.img13} className='product-preview'></img></td>
                                <td className='od-data'>{order.material13}</td>
                                <td>{order.quantity13}</td>
                            </tr>:null}
                            {order.material14?<tr>
                                <td onClick={() => {setImgSrc(order.img14); setImagePreview(true)}}><img alt='' src={order.img14} className='product-preview'></img></td>
                                <td className='od-data'>{order.material14}</td>
                                <td>{order.quantity14}</td>
                            </tr>:null}
                            {order.material15?<tr>
                                <td onClick={() => {setImgSrc(order.img15); setImagePreview(true)}}><img alt='' src={order.img15} className='product-preview'></img></td>
                                <td className='od-data'>{order.material15}</td>
                                <td>{order.quantity15}</td>
                            </tr>:null}
                            {order.material16?<tr>
                                <td onClick={() => {setImgSrc(order.img16); setImagePreview(true)}}><img alt='' src={order.img16} className='product-preview'></img></td>
                                <td className='od-data'>{order.material16}</td>
                                <td>{order.quantity16}</td>
                            </tr>:null}
                            {order.material17?<tr>
                                <td onClick={() => {setImgSrc(order.img17); setImagePreview(true)}}><img alt='' src={order.img17} className='product-preview'></img></td>
                                <td className='od-data'>{order.material17}</td>
                                <td>{order.quantity17}</td>
                            </tr>:null}
                            {order.material18?<tr>
                                <td onClick={() => {setImgSrc(order.img18); setImagePreview(true)}}><img alt='' src={order.img18} className='product-preview'></img></td>
                                <td className='od-data'>{order.material18}</td>
                                <td>{order.quantity18}</td>
                            </tr>:null}
                            {order.material19?<tr>
                                <td onClick={() => {setImgSrc(order.img19); setImagePreview(true)}}><img alt='' src={order.img19} className='product-preview'></img></td>
                                <td className='od-data'>{order.material19}</td>
                                <td>{order.quantity19}</td>
                            </tr>:null}
                            {order.material20?<tr>
                                <td onClick={() => {setImgSrc(order.img20); setImagePreview(true)}}><img alt='' src={order.img20} className='product-preview'></img></td>
                                <td className='od-data'>{order.material20}</td>
                                <td>{order.quantity20}</td>
                            </tr>:null}
                        </tbody>
                    </table>
                    {/* <p>Meterial SKU: <span>{order.sku1} </span></p>
                    <p>Meterial ID: <span>{order.productId1} </span></p> */}
                </div>
                {/* { */}
                    {/* currentUser && currentUser.orders?( */}
                        <div className='pd-info-action-container'>
                            <button className='btn btn-accept' onClick={acceptBtn}>Accept</button>
                            <button className='btn btn-decline' onClick={declineBtn}>Decline</button>
                        </div>
                    {/* )
                    :null    */}
                {/* } */}
            </div>
        </div>
    )
}

export default OrderInfo
