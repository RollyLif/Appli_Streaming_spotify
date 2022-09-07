import React from "react";
import { SiApplemusic } from "react-icons/si";
import { FaMicrophoneAlt } from "react-icons/fa";

const Listbox = (props) => {
  const clicked = (e) => {
    e.preventDefault();
    props.clicked(e.target.id);
  };

  return (
    <div>
      <div className="list-group">
        {props.items.map((item, idx) => (
          <div key={idx} id={item.track.id} className="track">
            <iframe
              style={{borderRadius:"12px"}}
              src={`https://open.spotify.com/embed/track/${item.track.id}?utm_source=generator&theme=0`}
              width="100%"
              height="100"
              frameBorder="0"
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
            <p className="Songtitle">
              {" "}
              <SiApplemusic /> {item.track.name}
            </p>
            <img
              src={item.track.album.images[1].url}
              alt="photo"
              className="albumImage"
            />
            <p className="artist">
              {" "}
              <FaMicrophoneAlt />
              {item.track.artists[0].name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listbox;
