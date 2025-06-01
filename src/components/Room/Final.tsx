import React, {useState} from 'react';
import '../../styles/Final.css';
import { useNavigate } from 'react-router-dom';
import { reqGameDel } from '../../utils/api';

const Final: React.FC<{final: string, id: string}> = ({final, id}) => {
    const navigate = useNavigate();

    const handlSubmit = async () =>
    {
        try {
            if (id) {
                await reqGameDel(id);
                navigate("/");
            }
        } catch (error) {
            console.error('Ошибка при получении комнаты:', error);
        }
    }

    return (
        <div className="final">
            <div className="final__headline">Вы: {final}</div>
            <button className="final__button" onClick={handlSubmit}>Закончить</button>
        </div>
    );
}

export default Final;
