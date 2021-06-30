import React from 'react'
import './rightPane.css'
import {Switch,Route} from 'react-router-dom'
import TopPane from '../TopPane/TopPane'
import ViewProducts from '../ViewProducts/ViewProducts'
import OrderList from '../OrderList/OrderList'

const RightPane = ({setView}) => {
    return (
        <div className='right-pane'>
            <TopPane setView={setView} />
            <Switch>
                <Route
                    exact
                    path='/dashboard/products'
                    component={ViewProducts}
                />
                <Route
                    exact
                    path='/dashboard/orders'
                    component={OrderList}
                />
            </Switch>
        </div>
    )
}

export default RightPane
