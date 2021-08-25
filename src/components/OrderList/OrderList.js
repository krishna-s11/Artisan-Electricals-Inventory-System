import React, { useState, useEffect, useContext } from 'react'
import './orderList.css'
import NewOrder from '../NewOrder/NewOrder'
import firebase from '../../firebase'
import OrderInfo from '../OrderInfo/OrderInfo'
import { AuthContext } from '../../Auth'
import DeleteBox from '../DeleteBox/DeleteBox'

const db = firebase.firestore();

const OrderList = ({setNotify, setProfileDrop}) => {
    const [display,setDisplay] = useState(false);
    const [orders,setOrders] = useState([]);
    const [id,setId] = useState('')
    const [deleteDisplay,setDeleteDisplay] = useState(false)
    const [details,setDetails] = useState(false);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        db.collection('orders')
        .onSnapshot(querySnap => {
            setOrders(
                querySnap.docs
                .map(doc => ({id: doc.id, data: doc.data()}))
                .sort(function(x,y){return y.data.timestamp - x.data.timestamp;})
                )
        })
    },[])

    const deleteOrder = async (id) => {
        await firebase.firestore().collection('orders').doc(id).delete();
    }

    console.log(orders);

    return (
        <div className='order-list'>
            {
                deleteDisplay?<DeleteBox deleteFun={() => {deleteOrder(id)}} close={() => setDeleteDisplay(false)} />:null
            }
            {
                display?<NewOrder close={() => setDisplay(false)} id={id} />:null
            }
            {
                details?<OrderInfo close={() => setDetails(false)} id={id}/>:null
            }
            <div className='ol-top'>
                <h2>Order list</h2>
                <div className='vp-action-bar'>
                    {/* <div class="search-box">
                        <button class="btn-search"><FaSearch/></button>
                        <input type="text" class="input-search" placeholder="Type to Search..."></input>
                    </div> */}
                    <button className='btn btn-add_items' onClick={() => {setId('');setDisplay(true)}}>New +</button>
                </div>
            </div>
            <table class="fl-table">
                    <thead id='thead'>
                    <tr>
                        <th></th>
                        <th>Employee Name</th>
                        <th>Project Name</th>
                        <th>Project Address</th>
                        <th>Requested on</th>
                        <th>Required by</th>
                        <th>Notes</th>
                        <th>Status</th>
                        {
                            currentUser && currentUser.user.orders?(
                                <th colSpan='2'>Action</th>
                            )
                            :null
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        orders && orders.map((order,i) => {
                            const data = order.data;
                            return(
                                <tr key={i} style={false?{backgroundColor:'#F88379'}:null}>
                                    <td onClick={() => {setId(order.id) ;setDetails(true); setNotify(); setProfileDrop()}}>{i+1}</td>
                                    <td onClick={() => {setId(order.id) ;setDetails(true); setNotify(); setProfileDrop()}}>{data.emp_name}</td>
                                    <td onClick={() => {setId(order.id) ;setDetails(true); setNotify(); setProfileDrop()}}>{data.name}</td>
                                    <td onClick={() => {setId(order.id) ;setDetails(true); setNotify(); setProfileDrop()}}>{data.add1} {data.add2}</td>
                                    <td onClick={() => {setId(order.id) ;setDetails(true); setNotify(); setProfileDrop()}}>{data.requested}</td>
                                    <td onClick={() => {setId(order.id) ;setDetails(true); setNotify(); setProfileDrop()}}>{data.requiredBy}</td>
                                    <td onClick={() => {setId(order.id) ;setDetails(true); setNotify(); setProfileDrop()}}>{data.note}</td>
                                    <td style={data.status==='declined'?({color: '#f71f20', fontWeight: '600'}):(data.status === 'processing'?({color: '#22a6b3', fontWeight: '600'}):({color: '#3CB371', fontWeight: '600'}))}>{data.status}</td>
                                    <td className='btn-del' style={false?{color:'#FFFF00'}:null} onClick={() => {setId(order.id); setDeleteDisplay(true)}} >Delete</td>
                                    <td className='btn-edit' style={false?{color: '#fff',fontWeight: '600'}:null} onClick={(id) => {setId(order.id); setDisplay(true)}}>Edit</td>
                                </tr>
                            )
                        })
                    }    
                    </tbody>
                </table>
        </div>
    )
}

export default OrderList
