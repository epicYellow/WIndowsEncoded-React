import React, { useState } from 'react';
import Style from './Badges.module.scss'
import badgeModal from '../BadgeModal/badgeModal';

const Badges = (props) => {
    return (
        <>

            <div className={`${Style.BoxOne} ${props.className}`}>

                <div className={`${props.className ? props.classname : ""} ${props.type === "BadgeOne"
                        ? Style.BadgeOne
                        : props.type === "BadgeTwo"
                            ? Style.BadgeTwo
                            : Style.BadgeThree
                    }`}

                >

                </div>
                <h4>Gold Badge</h4>

            </div>






        </>


    );
};

export default Badges;