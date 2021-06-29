import React from 'react'
import './rightPane.css'
import TopPane from '../TopPane/TopPane'

const RightPane = ({setView}) => {
    return (
        <div className='right-pane'>
            <TopPane setView={setView} />
        </div>
    )
}

export default RightPane
