import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import Liste from "./Liste";
import { Credentials } from './Credentials';
import axios from 'axios';

function App() {
  const data = [
    { name: "rolly", data: 1 },
    { name: "kadima", data: 2 },
    { name: "Lifungula", data: 3 },
  ];

  const [profile, setProfile] = useState([]);
  const [token, setToken] = useState("");
  const spotify = Credentials();
  const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
  const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});

  const genreChanged = val => {
    setGenres({
      selectedGenre: val, 
      listOfGenresFromAPI: genres.listOfGenresFromAPI
    });
}

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization':'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);
      axios("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
        method: "GET",
        headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
      }).then((genreResponse) => {
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items,
        });
      });
    });
  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);


  return (
    <form>
      <div>
        <h1>Muzika</h1>
        <Liste label="Genre :" options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
        <Liste options={data} />
        <button type="submit">Recherche</button>
        
      </div>
    </form>
  );
}
export default App;
