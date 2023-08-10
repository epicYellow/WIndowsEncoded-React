import React from 'react';
import Style from './Input.module.scss';

const Hover = (props) => {
    return (
        <div className={props.Hover ? Style.HoverModalCon : 'hide'}>
            <div className={Style.HoverModal}>
                {props.text}
            </div>
        </div>
    );
};

export default Hover;