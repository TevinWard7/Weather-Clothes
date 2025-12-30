import React from 'react';
import './LoadingScreen.css';
import mannequinGif from '../../images/mannequin-loading.gif';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <img src={mannequinGif} alt="Loading..." className="loading-gif" />
        </div>
    );
};

export default LoadingScreen;
