import React from 'react';
import Style from './VotingSystem.module.scss'

const VotingSystem = () => {
    return (
        <div className={Style.votingSystem}>
            <div className={Style.chev_up}></div>
            <p className={Style.votes}>110</p>
            <div className={Style.chev_down}></div>
        </div>
    );
};

export default VotingSystem;