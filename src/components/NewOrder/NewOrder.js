import React,{useContext, useEffect, useState} from 'react'
import './newOrder.css'
import {AiOutlineClose} from 'react-icons/ai'
import firebase from '../../firebase'
import tool1 from '../../assets/tool-1.jpg'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Auth'

const db = firebase.firestore();

const NewOrder = ({close, id}) => {

    const [order,setOrder] = useState({
        emp_name: '',
        emp_id: '',
        name: '',
        add1: '',
        add2: '',
        add3: '',
        requested: '',
        requiredBy: '',
        material1: '',
        quantity1: '',
        sku1: '',
        productId1: '',
        outOfStock1: false,
        material2: '',
        quantity2: '',
        sku2: '',
        productId2: '',
        outOfStock2: false,
        material3: '',
        quantity3: '',
        sku3: '',
        productId3: '',
        outOfStock3: false,
        material4: '',
        quantity4: '',
        sku4: '',
        productId4: '',
        outOfStock4: false,
        material5: '',
        quantity5: '',
        sku5: '',
        productId5: '',
        outOfStock5: false,
        material6: '',
        quantity6: '',
        sku6: '',
        productId6: '',
        outOfStock6: false,
        material7: '',
        quantity7: '',
        sku7: '',
        productId7: '',
        outOfStock7: false,
        material8: '',
        quantity8: '',
        sku8: '',
        productId8: '',
        outOfStock8: false,
        material9: '',
        quantity9: '',
        sku9: '',
        productId9: '',
        outOfStock9: false,
        material10: '',
        quantity10: '',
        sku10: '',
        productId10: '',
        outOfStock10: false,
        material11: '',
        quantity11: '',
        sku11: '',
        productId11: '',
        outOfStock11: false,
        material12: '',
        quantity12: '',
        sku12: '',
        productId12: '',
        outOfStock12: false,
        material13: '',
        quantity13: '',
        sku13: '',
        productId13: '',
        outOfStock13: false,
        material14: '',
        quantity14: '',
        sku14: '',
        productId14: '',
        outOfStock14: false,
        material15: '',
        quantity15: '',
        sku15: '',
        productId15: '',
        outOfStock15: false,
        material16: '',
        quantity16: '',
        sku16: '',
        productId16: '',
        outOfStock16: false,
        material17: '',
        quantity17: '',
        sku17: '',
        productId17: '',
        outOfStock17: false,
        material18: '',
        quantity18: '',
        sku18: '',
        productId18: '',
        outOfStock18: false,
        material19: '',
        quantity19: '',
        sku19: '',
        productId19: '',
        outOfStock19: false,
        material20: '',
        quantity20: '',
        sku20: '',
        productId20: '',
        outOfStock20: false,
        note: '',
        status: 'processing'
    });

    const [products,setProducts] = useState([]);
    const[display1,setDisplay1] = useState(false);
    const[display2,setDisplay2] = useState(false);
    const[display3,setDisplay3] = useState(false);
    const[display4,setDisplay4] = useState(false);
    const[display5,setDisplay5] = useState(false);
    const[display6,setDisplay6] = useState(false);
    const[display7,setDisplay7] = useState(false);
    const[display8,setDisplay8] = useState(false);
    const[display9,setDisplay9] = useState(false);
    const[display10,setDisplay10] = useState(false);
    const[display11,setDisplay11] = useState(false);
    const[display12,setDisplay12] = useState(false);
    const[display13,setDisplay13] = useState(false);
    const[display14,setDisplay14] = useState(false);
    const[display15,setDisplay15] = useState(false);
    const[display16,setDisplay16] = useState(false);
    const[display17,setDisplay17] = useState(false);
    const[display18,setDisplay18] = useState(false);
    const[display19,setDisplay19] = useState(false);
    const[display20,setDisplay20] = useState(false);
    const {currentUser} = useContext(AuthContext);

    const handleChange = (e) => {
        setOrder({
            ...order,
            [e.target.id]: e.target.value
        })
    }

    const handleQuantity = (e,productId,stockWarn) => {
        if(order.material === ''){
            toast.warning('Select an item first.');
        }
        else{
            setOrder({...order,[e.target.id]: e.target.value})
            const ids = products.map(item => {return item.id})
            const productID = ids.find(element => element === productId);
            let product = [];
            for (let i = 0; i < products.length; i++){
                if(products[i].id === productID){
                    product.push(products[i]);
                }
            }
            let stock = parseInt(product[0].data.quantity);
            console.log(stock);
            if(e.target.value > stock){document.getElementById(stockWarn).style.display = 'block'; setOrder({...order,outOfStock:true})}
            else document.getElementById(stockWarn).style.display = 'none';
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(order.name === '' || order.material1 === '' || order.quantity1 === '' || order.add1 === '' ){
            return toast.error('Fill all the required fields.');
        }
        if(!id){
            await db.collection('orders').add(order);
            await db.collection('stats').doc('orders').update({requests: firebase.firestore.FieldValue.increment(1), pending: firebase.firestore.FieldValue.increment(1)})
            toast.success('Order created successfully.');
            close();
        }else{
            await db.collection('orders').doc(id).update(order);
            toast.success('Order updated successfully.');
            close();
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
        setOrder({
            ...order,
            emp_id: currentUser.id,
            emp_name: currentUser.user.name,
            requested: new Date().getFullYear()+'-0'+(new Date().getMonth()+1)+'-'+new Date().getDate()
        })
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
    console.log(order);
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
                        <div className='bt-row-content'>
                            <div className='bt-row-container'>
                                <div className='form-row bt'>
                                    <p>Material 1:</p>
                                    <input type="text" class="form__input add-input material" id="material1" onChange={handleChange} onClick={() => {setDisplay1(!display1)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                        { display1?(
                                        <div className='selection-box' >
                                            {
                                                products && products.map((product,i) => {
                                                    const data = product.data;
                                                    return(
                                                        <div className='product-selection-container' key={i} onClick={() => {
                                                            setOrder({
                                                                ...order,
                                                                sku1: data.sku,
                                                                material1: data.name,
                                                                productId1: product.id
                                                            })
                                                            
                                                            document.getElementById('material1').value = data.name;
                                                            setTimeout(() => {
                                                                setDisplay1(false)
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
                                    <div className='form-row qt'>
                                        <p>Quantity:</p>
                                        <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                            <input type="text" class="form__input add-input quantity" id="quantity1" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId1,'stock-warn1')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                        </div>
                                    </div>  
                                </div>
                                <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn1'>Requested number of item is not available in stock.</p>
                            </div>
                        <div className='bt-row-content'>
                            <div className='bt-row-container'>
                                <div className='form-row bt'>
                                    <p>Material 2:</p>
                                    <input type="text" class="form__input add-input material" id="material2" onChange={handleChange} onClick={() => {setDisplay2(!display2)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                        { display2?(
                                        <div className='selection-box' >
                                            {
                                                products && products.map((product,i) => {
                                                    const data = product.data;
                                                    return(
                                                        <div className='product-selection-container' key={i} onClick={() => {
                                                            setOrder({
                                                                ...order,
                                                                sku2: data.sku,
                                                                material2: data.name,
                                                                productId2: product.id
                                                            })
                                                            
                                                            document.getElementById('material2').value = data.name;
                                                            setTimeout(() => {
                                                                setDisplay2(false)
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
                                    <div className='form-row qt'>
                                        <p>Quantity:</p>
                                        <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                            <input type="text" class="form__input add-input quantity" id="quantity2" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId2,'stock-warn2')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                        </div>
                                    </div>  
                                </div>
                                <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn2'>Requested number of item is not available in stock.</p>
                            </div>
                        <div className='bt-row-content'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 3:</p>
                                <input type="text" class="form__input add-input material" id="material3" onChange={handleChange} onClick={() => {setDisplay3(!display3)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display3?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku3: data.sku,
                                                            material3: data.name,
                                                            productId3: product.id
                                                        })
                                                            
                                                        document.getElementById('material3').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay3(false)
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
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity3" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId3,'stock-warn2')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn3'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 4:</p>
                                <input type="text" class="form__input add-input material" id="material4" onChange={handleChange} onClick={() => {setDisplay4(!display4)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display4?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku4: data.sku,
                                                            material4: data.name,
                                                            productId4: product.id
                                                        })
                                                            
                                                        document.getElementById('material4').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay4(false)
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
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity4" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId4,'stock-warn2')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn4'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 5:</p>
                                <input type="text" class="form__input add-input material" id="material5" onChange={handleChange} onClick={() => {setDisplay5(!display5)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display5?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku5: data.sku,
                                                            material5: data.name,
                                                            productId5: product.id
                                                        })
                                                            
                                                        document.getElementById('material5').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay5(false)
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
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity5" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId5,'stock-warn5')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn5'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 6:</p>
                                <input type="text" class="form__input add-input material" id="material6" onChange={handleChange} onClick={() => {setDisplay6(!display6)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display6?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku6: data.sku,
                                                            material6: data.name,
                                                            productId6: product.id
                                                        })
                                                            
                                                        document.getElementById('material6').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay6(false)
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
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity6" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId6,'stock-warn6')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn6'>Requested number of item is not available in stock.</p>
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
