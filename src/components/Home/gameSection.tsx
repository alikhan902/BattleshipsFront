import React, {useState} from 'react';
import '../../styles/GameSection.css';
import { GameSectionType } from '../../types/types';
import { useNavigate } from 'react-router-dom';

const GameSection: React.FC<GameSectionType> = ({ id, name, turn, created_at}) => {
    const navigate = useNavigate();


    return (
        <div className="gameSection">
            <div className="gameSection__number">
                {id}
            </div>
            <div className="gameSection__string">
                {name}
            </div>
            <div className="gameSection__string">
                Ход: {turn}
            </div>
            <div className="gameSection__string">
                Дата: {created_at.split("T")[0]} Время {created_at.split("T")[1].split('.')[0]}
            </div>
            <button className="gameSection__button" onClick={() => navigate(`/room/${id}`)}>
                Старт
            </button>
        </div>
    );
}

export default GameSection;
