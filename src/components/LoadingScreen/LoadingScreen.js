import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    // Try to load the gif, fall back to CSS spinner if not available
    let loadingGif;
    try {
        loadingGif = require('../../images/peacock-loading.gif');
    } catch (e) {
        loadingGif = null;
    }

    return (
        <div className="loading-screen">
            {loadingGif ? (
                <img
                    src={loadingGif}
                    alt="Loading..."
                    className="peacock-gif"
                />
            ) : (
                <div className="loading-spinner"></div>
            )}
        </div>
    );
};

export default LoadingScreen;
