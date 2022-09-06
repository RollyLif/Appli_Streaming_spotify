import React, { useState, useEffect } from "react";
import Liste from "./Liste";
import { Credentials } from './Credentials';
import axios from 'axios';
import Listbox from "./Listbox";
import logo from "../assets/Logofinal.png";
import {BsSearch} from 'react-icons/bs';
import {RiPlayList2Line} from 'react-icons/ri';
import {AiFillHome} from 'react-icons/ai';

function Playlist(props) {
  const data = [
    { name: "rolly", data: 1 },
    { name: "kadima", data: 2 },
    { name: "Lifungula", data: 3 },
  ];

  const [token, setToken] = useState("");
  const spotify = Credentials();
  const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
  const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
  const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: []});
  const [trackDetail, setTrackDetail] = useState(null);


const playlistChanged = val => {
    console.log(val);
    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
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

  const genreChanged = val => {
    setGenres({
      selectedGenre: val, 
      listOfGenresFromAPI: genres.listOfGenresFromAPI
    });
    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=50`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then(playlistResponse => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items
      })
    });

  }

  const buttonClicked = e => {
    e.preventDefault();

    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=100`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
    .then(tracksResponse => {
      setTracks({
        selectedTrack: tracks.selectedTrack,
        listOfTracksFromAPI: tracksResponse.data.items
      })
    });
  }
  const listboxClicked = val => {

    const currentTracks = [...tracks.listOfTracksFromAPI];

    const trackInfo = currentTracks.filter(t => t.track.id === val);

    setTrackDetail(trackInfo[0].track);

}
  return (
    <form onSubmit={buttonClicked}>
      <div>
        <div className="entete">
          <img src={logo} alt="logo"/>
          <div className="identite">
            <img src={props.image} alt="photo" />
            <span>{props.nom}</span>
          </div>
        </div>
        <div className="corps">
          <aside>
            <p><AiFillHome className ="icone"/> Acceuil</p>
            <p><RiPlayList2Line className ="icone"/> Playlist</p>
          </aside>
          <div>
            <div className="selection">
              <Liste label="Genre :" options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
              <Liste label="Playlist :" options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged}/>
              <button type="submit"><BsSearch /></button>
            </div>
              <div className="row">
              <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
            </div>
          </div>
        </div>
      
    </div> 
    </form>
  );
}
export default Playlist;
