import React, {useEffect, useState } from 'react';
import "../../styles/Cell.css";
import { CellTypeProps, CellType } from '../../types/types';

const Cell: React.FC<CellTypeProps> = ({cell, my, updateTurn, isWaiting}) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) =>
    {
        if(!my)
        {
            const target = e.target as HTMLDivElement;
            if(target.className == "cell")
            {
                if(cell.has_ship)
                {
                    const {is_shot, is_mis_shot, ...cellUP} = cell
                    const cellNew: CellType = {...cellUP, is_shot: true, is_mis_shot: false}
                    updateTurn(cellNew)
                }
                else
                {
                    const {is_shot, is_mis_shot, ...cellUP} = cell
                    const cellNew: CellType = {...cellUP, is_shot: true, is_mis_shot: true}
                    updateTurn(cellNew)
                }
            }
        }
    }

    return (
        <div className={cell.is_shot ? (cell.is_mis_shot ? "cell__miss" : "cell__hit") : my ? (cell.has_ship ? "mycell__boat" : "mycell") : "cell"}
            onClick={!isWaiting ? handleClick : ()=>{}}>
        </div>
    );
}

export default Cell;
