import React from 'react';

const CLIENT_ID = '2d3360aa9f3d44e7a0d76cc858d9fdcb';
const REDIRECT_URI = "localhost:5173/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

function Home(){
    return(
        <div>
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
        </div>
    );
    
}

export default Home;