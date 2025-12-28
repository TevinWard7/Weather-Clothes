import React from 'react';
import './LoadingScreen.css';
import loadingGif from '../../images/peacock-loading.gif';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <img
                src={loadingGif}
                alt="Loading..."
                className="peacock-gif"
            />
        </div>
    );
};

export default LoadingScreen;
