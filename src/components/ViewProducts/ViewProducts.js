import React from 'react'
import './viewProducts.css'
import {FaSearch} from 'react-icons/fa'
import tool1 from '../../assets/tool-1.jpg'
import tool2 from '../../assets/tool-2.jpg'

const ViewProducts = () => {
    return (
        <div className='view-products'>
            <div className='vp-top'>
                <h2>Inventory list</h2>
                <div className='vp-action-bar'>
                    <div class="search-box">
                        <button class="btn-search"><FaSearch/></button>
                        <input type="text" class="input-search" placeholder="Type to Search..."></input>
                    </div>
                    <button className='btn btn-add_items'>New +</button>
                </div>
            </div>
                <table class="fl-table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Preview</th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Category</th>
                        <th>Serial No.</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>
                            <img src={tool1} className='product-preview'></img>
                        </td>
                        <td>Measurement Items</td>
                        <td>38401dkdkfe</td>
                        <td>Measurement</td>
                        <td>A1393JDKEIDW1</td>
                        <td><p className='btn-del'>Delete</p></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>
                            <img src={tool2} className='product-preview'></img>
                        </td>
                        <td>Hammer</td>
                        <td>38401dkdkfe</td>
                        <td>Tools</td>
                        <td>A1393JDKEIDW1</td>
                        <td><p className='btn-del'>Delete</p></td>
                    </tr>
                    </tbody>
                </table>
        </div>
    )
}

export default ViewProducts
