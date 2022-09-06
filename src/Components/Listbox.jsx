import React from 'react';

const Listbox = props => {

    const clicked = e => {
        e.preventDefault();
        props.clicked(e.target.id);
    }    

    return (
        <div >
            <div className="list-group">
                {
                    props.items.map((item, idx) => 
                    <div key={idx}
                        id={item.track.id}>
                        <p>{item.track.name}</p>
                        <img src={item.track.album.images[2].url} alt="photo" />
                        <p>{item.track.artists[0].name}</p>
                    </div>)
                }
            </div>
        </div>
        

    );
}

export default Listbox;