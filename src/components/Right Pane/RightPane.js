import React from 'react'
import './rightPane.css'
import {Switch,Route} from 'react-router-dom'
import TopPane from '../TopPane/TopPane'
import ViewProducts from '../ViewProducts/ViewProducts'
import OrderList from '../OrderList/OrderList'
import Reports from '../ReportDashboard/Reports'
import Profile from '../Profile/Profile'
import ProjectManagement from '../ProjectManagement/ProjectManagement'

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
            </Switch>
        </div>
    )
}

export default RightPane
