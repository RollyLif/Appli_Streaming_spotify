import React, {useState} from 'react'

const  Liste = props => {

    const dropdownChanged = e => {
        props.changed(e.target.value);
    } 
    
    return (
        <div>
            <select value={props.selectedValue} onChange={dropdownChanged}>
            <option key={0}>Select...</option>
                {props.options.map((item, idx) => <option key={idx + 1} value={item.id}>{item.name}</option>)}
            </select>

        </div>
    )
}

export default Liste;