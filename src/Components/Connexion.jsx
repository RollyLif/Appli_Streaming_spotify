import React, { useEffect, useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import logo from "../assets/Logofinal.png"
import { gapi } from "gapi-script";
import Playlist from "./Playlist";

function Connexion() {
  const [profile, setProfile] = useState([]);
  const clientId = "817294362644-g4qb4p2trqq6otjclu04ugiapioh3qk8.apps.googleusercontent.com";


  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
    console.log(profile);

  });

  const ConnexionReussie = (res) => {
    console.log("logique");
    console.log(res);
    setProfile(res.profileObj);
  };

  const ConnexionEchoue = (err) => {
    console.log("failed", err);
  };

  const logOut = () => {
    setProfile(null);
  };

  return (
    <div>
      {(profile) ? (
        <div>
        <Playlist nom={profile.name} image={profile.imageUrl}/>
        <GoogleLogout
            clientId={clientId}
            buttonText="Log out"
            onLogoutSuccess={logOut}
          />
        </div>
      ) : (
          <section className="connect">
              <img src={logo} alt='logo' className="logo"/>
              <p className="presentation">Application de streaming basé sur l'API Spotify</p>
              <GoogleLogin
                ClientId={clientId}
                buttonText="Connexion avec Google"
                onSuccess={ConnexionReussie}
                onFailure={ConnexionEchoue}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                className = "boutonGoogle"
              />
          </section>
      )}
    </div>
  );
}

export default Connexion;