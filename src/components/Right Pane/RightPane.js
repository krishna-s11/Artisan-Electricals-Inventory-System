import React from 'react'
import './rightPane.css'
import TopPane from '../TopPane/TopPane'
import ViewProducts from '../ViewProducts/ViewProducts'

const RightPane = ({setView}) => {
    return (
        <div className='right-pane'>
            <TopPane setView={setView} />
            <ViewProducts/>
        </div>
    )
}

export default RightPane
