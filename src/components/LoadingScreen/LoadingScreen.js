import React from 'react';
import './LoadingScreen.css';
import mannequinGif from '../../images/mannequin-loading.gif';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="loading-content">
                <img src={mannequinGif} alt="Loading..." className="loading-gif" />
                <p className="loading-text">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
