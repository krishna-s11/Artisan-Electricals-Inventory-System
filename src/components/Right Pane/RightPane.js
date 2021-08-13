import React, { Fragment, useState } from 'react'
import './rightPane.css'
import {Switch,Route} from 'react-router-dom'
import TopPane from '../TopPane/TopPane'
import ViewProducts from '../ViewProducts/ViewProducts'
import OrderList from '../OrderList/OrderList'
import Reports from '../ReportDashboard/Reports'
import Profile from '../Profile/Profile'
import ProjectManagement from '../ProjectManagement/ProjectManagement'
import ManageUsers from '../ManageUsers/ManageUsers'
import MyOrders from '../MyOrders/MyOrders'

const RightPane = ({setView,mob}) => {

    const [notify,setNotify] = useState(true);

    return (
        <div className='right-pane'>
            <TopPane setView={setView} mob={true} notify={notify} setNotify={() => {setNotify(true)}} />
            <Switch>
                <Route
                    path="/dashboard/products"
                    render={() => (
                       <Fragment>
                          <ViewProducts setNotify={() => {setNotify(false)}} />
                       </Fragment>
                    )}
                 />
                <Route
                    exact
                    path='/dashboard/orders'
                    render={() => (
                   <Fragment>
                      <OrderList setNotify={() => {setNotify(false)}} />
                   </Fragment>
                )}
                />
                <Route
                    exact
                    path='/dashboard/reports'
                    component={Reports}
                />
                <Route
                    exact
                    path='/dashboard/profile'
                    component={Profile}
                />
                <Route
                    exact
                    path='/dashboard/manage-projects'
                    component={ProjectManagement}
                />
                <Route
                    exact
                    path='/dashboard/manage-users'
                    component={ManageUsers}
                />
                <Route
                    exact
                    path='/dashboard/my-orders'
                    component={MyOrders}
                />
            </Switch>
        </div>
    )
}

export default RightPane
