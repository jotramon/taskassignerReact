import React from 'react';  
import '../style/popup.css';

function Popup ({text, closePopup}: any) {

    return (  
        <div className='popup'>  
            <div className='popup\_inner'>  
                <h1>{text}</h1>  
                <button onClick={closePopup}>close me</button>  
            </div>  
        </div>  
    );  
}    

export default Popup;