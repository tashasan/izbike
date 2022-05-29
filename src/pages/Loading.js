import React from 'react';
import ReactLoading from 'react-loading';
import "./Loading.css";

const Loading = ({ type, color, text }) => (
    <div className='d-flex flex-column'>
        <div className='p-2'>
            <ReactLoading type={type} color={color} height={'1%'} width={'2%'} />
        </div>
        <div className='p-2'>
            <small>{text}</small>
        </div>
    </div>
);

export default Loading;