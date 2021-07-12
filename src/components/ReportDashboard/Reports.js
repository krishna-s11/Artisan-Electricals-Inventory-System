import React from 'react'
import './reports.css'
import orderImg from '../../assets/order-ico.png'
import approvedImg from '../../assets/order-approved.png'
import pendingImg from '../../assets/order-pending.png'
import rejectedImg from '../../assets/order-rejected.png'
import {Line} from 'react-chartjs-2'
import {Doughnut} from 'react-chartjs-2'

const Reports = () => {

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };
      
      const lineOptions = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };


    const doughnutData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
        {
            label: 'No of Orders',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
        ],
    };

    return (
        <div className='reports-pg'>
            <div className='vp-top'>
                <h2>Order Statistics</h2>
            </div>
            <div className='stat-top-sec'>
                <div className='top-stats' id='order-req-stat'>
                    <div className='req-stat-top'>
                        <img alt='' src={orderImg}></img>
                        <h1>129</h1>
                    </div>
                    <p>Total Order Request</p>
                </div>
                <div className='top-stats' id='approved-stat'>
                <div className='req-stat-top'>
                        <img alt='' src={approvedImg}></img>
                        <h1>75</h1>
                    </div>
                    <p>Total Approved Orders</p>
                </div>
                <div className='top-stats' id='pending-stat'>
                <div className='req-stat-top'>
                        <img alt='' src={pendingImg}></img>
                        <h1>27</h1>
                    </div>
                    <p>Total Pending Orders</p>
                </div>
                <div className='top-stats' id='rejected-stat'>
                    <div className='req-stat-top'>
                        <img alt='' src={rejectedImg}></img>
                        <h1>12</h1>
                    </div>
                    <p>Total Rejected Order</p>
                </div>
            </div>
            <div className='chart-container'>
                <div className='line-chart-container'>
                    <Line data={lineData} options={lineOptions} />
                </div>
                <div className='doughnut-chart-container'>
                    <Doughnut data={doughnutData} options={{responsive:true, maintainAspectRatio:false}}/> 
                </div>
            </div>
            <div className='map-container'>
                
            </div>
        </div>
    )
}

export default Reports
