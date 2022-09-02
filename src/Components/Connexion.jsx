import React, { useEffect, useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import logo from "../assets/Logo.png"
import { gapi } from "gapi-script";

function Connexion() {
  const [check, setCheck] = useState(false);
  const [profile, setProfile] = useState([]);
  const clientId =
    "817294362644-g4qb4p2trqq6otjclu04ugiapioh3qk8.apps.googleusercontent.com";
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const ConnexionReussie = (res) => {
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
    <div className="connect">
      {profile ? (
        <div>
          <GoogleLogout
            clientId={clientId}
            buttonText="Log out"
            onLogoutSuccess={logOut}
          />
        </div>
      ) : (
          <section className="connect">
                <img src={logo} alt='logo' />
              <p>Application de streaming basé sur l'API Spotify</p>
              <GoogleLogin
                ClientId={clientId}
                buttonText="Connexion avec Google"
                onSuccess={ConnexionReussie}
                onFailure={ConnexionEchoue}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />
          </section>
      )}
    </div>
  );
}

export default Connexion;
