# Weather Wear Clothes

A minimalist's web application that takes the effort out of deciding  what to wear by algorithmically determining an outfit each day according to the weather 

## Table Of Contents
- [User Story](#User-Story)
- [Setup](#Setup)
- [Technology](#Technology)
- [Link to depolyed app](#Link-to-depolyed-app)

## User Story
```
As a minimalist who likes simple and effecient
I want to be able to upload and edit details of my wardobe as well as my current location
Then have them tied to the weather and occasion
So that I can open the app and it will have decided an outfit for me to wear each day based on these entries
```

## Setup

### Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure the following API keys in your `.env` file:

   **Firebase Configuration** (Required)
   - Set up a Firebase project at [https://firebase.google.com/](https://firebase.google.com/)
   - Add your Firebase configuration values

   **OpenWeatherMap API** (Required)
   - Get a free API key at [https://openweathermap.org/api](https://openweathermap.org/api)
   - Add it to `REACT_APP_OPENWEATHER_API_KEY`

   **Remove.bg API** (Optional - for background removal)
   - Get a free API key at [https://www.remove.bg/users/sign_up](https://www.remove.bg/users/sign_up)
   - Free tier: 50 API calls/month with preview resolution
   - Add it to `REACT_APP_REMOVEBG_API_KEY`
   - If not configured, outfit images will be uploaded without background removal

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Technology

Front end
* HTML5
* CSS3
* Javascript
* JSX
* Bootstrap
* React
* React Slick
* Material UI
* Anime.JS

Back end
* Firebase
* Openweathermap API
* Remove.bg API (Background Removal)
* Moment.JS


# Link To Deployed App
![picture](public/screenshot.png)
https://weatherwearclothes.com
