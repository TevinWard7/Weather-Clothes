import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <img
                src="https://media.giphy.com/media/3o6ZsW8cFKGKBJe7mM/giphy.gif"
                alt="Loading..."
                className="peacock-gif"
            />
        </div>
    );
};

export default LoadingScreen;
