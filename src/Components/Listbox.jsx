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
                    <button key={idx}
                        onClick={clicked}
                        id={item.track.id}>
                            
                            {item.track.name +" Artiste:"+item.track.artists[0].name}
                    </button>)
                }
            </div>
        </div>
        

    );
}

export default Listbox;