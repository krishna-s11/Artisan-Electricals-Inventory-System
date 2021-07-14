import React,{useEffect, useState} from 'react'
import './newOrder.css'
import {AiOutlineClose} from 'react-icons/ai'
import firebase from '../../firebase'
import tool1 from '../../assets/tool-1.jpg'

const db = firebase.firestore();

const NewOrder = ({close, id}) => {

    const [order,setOrder] = useState({
        emp_name: 'Krishna Saxena',
        name: '',
        add1: '',
        add2: '',
        add3: '',
        requiredBy: '',
        material: '',
        sku: '',
        productId: '',
        outOfStock: false,
        note: '',
        quantity: '',
        status: 'processing'
    });

    const [products,setProducts] = useState([]);
    const[display,setDisplay] = useState(false);

    const handleChange = (e) => {
        setOrder({
            ...order,
            [e.target.id]: e.target.value
        })
    }

    const handleQuantity = (e) => {
        if(order.material == ''){
            console.log('select an item first')
        }
        else{
            setOrder({...order,[e.target.id]: e.target.value})
            const ids = products.map(item => {return item.id})
            const productID = ids.find(element => element === order.productId);
            let product = [];
            for (let i = 0; i < products.length; i++){
                if(products[i].id === productID){
                    product.push(products[i]);
                }
            }
            let stock = parseInt(product[0].data.quantity);
            console.log(stock);
            if(e.target.value > stock){document.getElementById('stock-warn').style.display = 'block'; setOrder({...order,outOfStock:true})}
            else document.getElementById('stock-warn').style.display = 'none';
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!id){
            await db.collection('orders').add(order);

        }else{
            await db.collection('orders').doc(id).update(order);
        }
        if(order.outOfStock){
        await db.collection('notification').add({
            emp_id: '12345',
            emp_name: 'Harry Potter',
            emp_photoUrl: '',
            mssg: 'requested a new order. (Out of Stock)',
            outofStock: true,
            time: Date.now()
        })
        }
        else{
        await db.collection('notification').add({
            emp_id: '12345',
            emp_name: 'Harry Potter',
            emp_photoUrl: '',
            mssg: 'requested a new order',
            outofStock: false,
            time: Date.now()
        })
        }
    }

    useEffect(() => {
        if(id){
            db.collection('orders').doc(id).get()
            .then((doc) => {
                if(doc.exists){
                    setOrder(doc.data());
                }else{
                    console.log('no data found');
                }
            })
        }
        db.collection('products').get()
        .then((querySnap) => {
            setProducts(querySnap.docs.map(doc => ({id: doc.id, data: doc.data()})));
        });
    },[id])

    return (
        <div className='new-order'>
            <div className='new-order-card'>
                <div className='add-card-top'>
                    <h2>New Order</h2>
                    <AiOutlineClose id='btn-close' onClick={() => {close()}} />
                </div>
                <div className='add-cd-main-container'>
                    <div className='add-card-content' id='order-content'>
                        <div className='add-col-1'>
                            <div className='form-row'>
                                <p>Project Name:</p>
                                <input type="text" class="form__input order add-input" id="name" onChange={handleChange} placeholder="Project Name" defaultValue={order.name} required></input>
                            </div>
                            <div className='form-row'>
                                <p>Project Address Line 1:</p>
                                <input type="text" class="form__input order add-input" id="add1" onChange={handleChange} placeholder="Address Line 1" defaultValue={order.add1} required></input>
                            </div>
                            <div className='form-row'>
                                <p>Project Address Line 2:</p>
                                <input type="text" class="form__input order add-input" id="add2" onChange={handleChange} placeholder="Address Line 2" defaultValue={order.add2} required></input>
                            </div>
                            <div className='form-row'>
                                <p>Project Address Line 3:</p>
                                <input type="text" class="form__input order add-input" id="add3" onChange={handleChange} placeholder="Address Line 3" defaultValue={order.add3} required></input>
                            </div>
                        </div>
                        <div className='add-col-2'>
                            <div className='form-row'>
                                <p>Required by:</p>
                                <input type="date" class="form__input order add-input" id="requiredBy" onChange={handleChange} defaultValue={order.requiredBy} required></input>
                            </div>
                            <div className='form-row'>
                                <p>Extra Note :</p>
                                <textarea type="text" class="form__input order textarea add-input orderText" id="note" onChange={handleChange} placeholder="Write your note here" defaultValue={order.note} required></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='bottom-cd-container'>
                        <div className='form-row'>
                            <p>Material:</p>
                            <input type="text" class="form__input order add-input" id="material" onChange={handleChange} onClick={() => {setDisplay(!display)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                {display?(
                                <div className='selection-box'>
                                    {
                                        products && products.map((product,i) => {
                                            const data = product.data;
                                            return(
                                                <div className='product-selection-container' key={i} onClick={() => {
                                                    setOrder({
                                                        ...order,
                                                        sku: data.sku,
                                                        material: data.name,
                                                        productId: product.id
                                                    })
                                                    
                                                    document.getElementById('material').value = data.name;
                                                    console.log(order);
                                                    setTimeout(() => {
                                                        setDisplay(false)
                                                    },500)
                                                }}>
                                                <div>
                                                    <p className='sl-title'>{data.name}</p>
                                                    <div className='lower-sl-box'>
                                                        <p className='sl-info'>SKU: {data.sku}</p>
                                                        <p className='sl-info'>Available: {data.quantity}</p>
                                                    </div>
                                                </div>
                                                <img src={tool1} alt=''></img>
                                            </div>
                                            )
                                        })   
                                    }
                                </div>):null
                                }
                        </div>
                        <div className='form-row'>
                            <p>Quantity:</p>
                            <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                <input type="text" class="form__input order add-input" id="quantity" onChange={handleQuantity} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                <p style={{fontSize: '13px', color: 'red', display:'none'}} id='stock-warn'>Requested number of item is not available in stock.</p>
                            </div>
                        </div>  
                        <div style={{width: '100%', display:'flex', justifyContent: 'center'}}>
                            <button className='btn btn-place-order' onClick={handleSubmit} >Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewOrder
