import React, { Component } from 'react';


const active = {
    fill:"#000000"     
}

const notActive = {
    fill:"#fde80f"     
}

class DeliveryIcon extends Component 
{
    constructor(props){
        super(props);
    }


    render(){
        return (<div className="icon active">

                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70">
                <g>
                    <path  d="M44.3,46.8c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1c0-1.8-1.4-3.1-3.1-3.1C45.7,43.7,44.3,45.1,44.3,46.8z"/>
                    <polygon points="47.8,30.6 45.5,27.7 44,27.7 44,30.6 	"/>
                    <path   d="M34.3,20.1l-19.2,0v18.2h19.2V20.1z M31,29.2l-4.4,4.5l-1.4-1.4l2-2.1l-8.8,0.1l-0.1-2h8.9l-1.9-2l1.3-1.4
                    L31,29.2z"/>
                    <path  d="M22.3,46.8c0,1.7,1.4,3.1,3.1,3.1c1.7,0,3.1-1.4,3.1-3.1c0-1.8-1.4-3.1-3.1-3.1S22.3,45.1,22.3,46.8z"/>
                    <path  d="M46.9,23.4h-6.5v20.9H43c0.9-1.5,2.5-2.6,4.4-2.6c1.9,0,3.5,1.1,4.4,2.6h2.6V32.5L46.9,23.4z M46.5,25.6l5.6,7
                    H42v-7C42,25.6,46.5,25.6,46.5,25.6z"/>
                    <path d="M11.5,46.3h8.9c-0.1,0.2-0.1,0.3-0.1,0.5c0,2.8,2.3,5.1,5.1,5.1c2.9,0,5.2-2.3,5.1-5.1c0-0.2-0.1-0.3-0.1-0.5h7.9h1h3.1
                    c-0.1,0.2-0.1,0.3-0.1,0.5c0,2.8,2.3,5.1,5.1,5.1s5.1-2.3,5.1-5.1c0-0.2-0.1-0.3-0.1-0.5h3h1h2.1l0-2h-2.1V31.7l-8.5-10.3h-9.6
                    v22.9h-8.5c-0.9-1.5-2.5-2.6-4.4-2.6s-3.5,1.1-4.4,2.6h-9.5V46.3z M44.3,46.8c0-1.7,1.4-3.1,3.1-3.1s3.1,1.3,3.1,3.1
                    c0,1.7-1.4,3.1-3.1,3.1S44.3,48.5,44.3,46.8z M40.4,23.4h6.5l7.5,9.1v11.8h-2.6c-0.9-1.5-2.5-2.6-4.4-2.6c-1.9,0-3.5,1.1-4.4,2.6
                    h-2.6V23.4z M22.3,46.8c0-1.7,1.4-3.1,3.1-3.1c1.7,0,3.1,1.3,3.1,3.1c0,1.7-1.4,3.1-3.1,3.1S22.3,48.5,22.3,46.8z"/>
                    <path d="M13,40.4h23.3V18.1l-23.3,0V40.4z M15.1,20.1l19.2,0v18.2H15.1V20.1z"/>
                    <path d="M52.1,32.6l-5.6-7H42v7H52.1z M47.8,30.6H44v-2.9h1.5L47.8,30.6z"/>
                    <polygon points="26.6,33.6 31,29.2 26.6,24.9 25.3,26.2 27.2,28.2 18.3,28.2 18.4,30.2 27.2,30.1 25.2,32.2 	"/>
                </g>
                </svg>
                {/* <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 33.8">
                <title>Sales Order</title>
                <path className="cls-1" d="M0,28.2H8.9a.9.9,0,0,0-.1.5,5.12,5.12,0,0,0,5.1,5.1A5,5,0,0,0,19,28.7c0-.2-.1-.3-.1-.5h12a.9.9,0,0,0-.1.5,5.1,5.1,0,0,0,10.2,0c0-.2-.1-.3-.1-.5H47v-2H44.9V13.6L36.4,3.3H26.8V26.2H18.3a5.17,5.17,0,0,0-4.4-2.6,5.17,5.17,0,0,0-4.4,2.6H0Zm32.8.5a3.12,3.12,0,0,1,3.1-3.1A3.05,3.05,0,0,1,39,28.7a3.1,3.1,0,0,1-6.2,0ZM28.9,5.3h6.5l7.5,9.1V26.2H40.3a5,5,0,0,0-8.8,0H28.9ZM10.8,28.7a3.12,3.12,0,0,1,3.1-3.1A3.05,3.05,0,0,1,17,28.7a3.1,3.1,0,1,1-6.2,0Z"/>
                <path className="cls-1" d="M1.5,22.3H24.8V0H1.5ZM3.6,2H22.8V20.2H3.6Z"/>
                <path className="cls-1" d="M40.6,14.5,35,7.5H30.5v7Zm-4.3-2H32.5V9.6H34Z"/>
                <polygon className="cls-1" points="15.1 15.5 19.5 11.1 15.1 6.8 13.8 8.1 15.7 10.1 6.8 10.1 6.9 12.1 15.7 12 13.7 14.1 15.1 15.5"/>
                </svg> */}
                    {/* <svg className="delivery activeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" aria-labelledby="delivery">
                        <title id="delivery">
                            delivery
                        </title>
                        <g>
                            <path d="M44.3,46.8c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1c0-1.8-1.4-3.1-3.1-3.1C45.7,43.7,44.3,45.1,44.3,46.8z"/>
                            <polygon points="47.8,30.6 45.5,27.7 44,27.7 44,30.6 	"/>
                            <path d="M34.3,20.1l-19.2,0v18.2h19.2V20.1z M31,29.2l-4.4,4.5l-1.4-1.4l2-2.1l-8.8,0.1l-0.1-2h8.9l-1.9-2l1.3-1.4
                            L31,29.2z"/>
                            <path d="M22.3,46.8c0,1.7,1.4,3.1,3.1,3.1c1.7,0,3.1-1.4,3.1-3.1c0-1.8-1.4-3.1-3.1-3.1S22.3,45.1,22.3,46.8z"/>
                            <path d="M46.9,23.4h-6.5v20.9H43c0.9-1.5,2.5-2.6,4.4-2.6c1.9,0,3.5,1.1,4.4,2.6h2.6V32.5L46.9,23.4z M46.5,25.6l5.6,7
                            H42v-7C42,25.6,46.5,25.6,46.5,25.6z"/>
                            <path d="M11.5,46.3h8.9c-0.1,0.2-0.1,0.3-0.1,0.5c0,2.8,2.3,5.1,5.1,5.1c2.9,0,5.2-2.3,5.1-5.1c0-0.2-0.1-0.3-0.1-0.5h7.9h1h3.1
                            c-0.1,0.2-0.1,0.3-0.1,0.5c0,2.8,2.3,5.1,5.1,5.1s5.1-2.3,5.1-5.1c0-0.2-0.1-0.3-0.1-0.5h3h1h2.1l0-2h-2.1V31.7l-8.5-10.3h-9.6
                            v22.9h-8.5c-0.9-1.5-2.5-2.6-4.4-2.6s-3.5,1.1-4.4,2.6h-9.5V46.3z M44.3,46.8c0-1.7,1.4-3.1,3.1-3.1s3.1,1.3,3.1,3.1
                            c0,1.7-1.4,3.1-3.1,3.1S44.3,48.5,44.3,46.8z M40.4,23.4h6.5l7.5,9.1v11.8h-2.6c-0.9-1.5-2.5-2.6-4.4-2.6c-1.9,0-3.5,1.1-4.4,2.6
                            h-2.6V23.4z M22.3,46.8c0-1.7,1.4-3.1,3.1-3.1c1.7,0,3.1,1.3,3.1,3.1c0,1.7-1.4,3.1-3.1,3.1S22.3,48.5,22.3,46.8z"/>
                            <path d="M13,40.4h23.3V18.1l-23.3,0V40.4z M15.1,20.1l19.2,0v18.2H15.1V20.1z"/>
                            <path d="M52.1,32.6l-5.6-7H42v7H52.1z M47.8,30.6H44v-2.9h1.5L47.8,30.6z"/>
                            <polygon points="26.6,33.6 31,29.2 26.6,24.9 25.3,26.2 27.2,28.2 18.3,28.2 18.4,30.2 27.2,30.1 25.2,32.2 	"/>
                        </g>
                    </svg> */}
             </div>)
        
    }
}

export default DeliveryIcon;