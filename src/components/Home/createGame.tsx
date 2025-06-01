import React, {useState} from 'react';
import { CreateGameMessage, CreateGameProps } from '../../types/types';
import "../../styles/CreateGame.css";
import { createGame } from '../../utils/api';

const CreateGame: React.FC<CreateGameProps> = ({handleSubmitShowModal, createGameSuccess}) => {

    const [statusInput, setStatusInput] = useState<CreateGameMessage>()
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    
        const hadnleCreateGame = async () => {
            setLoading(true);
            try {
                let message = await createGame(name);
                setStatusInput(message);
                console.log(message)
                if(message?.status ?? 500 < 300)
                {
                    createGameSuccess(message?.room_id ?? "")
                    handleSubmitShowModal()
                }
            } catch (error: any) {
                setStatusInput({message: error.message});
                setLoading(false);
            }
            setLoading(false);
        };
    

    return (
        <div className="overlay" onClick={handleSubmitShowModal}>
            <div className="createGame" onClick={(e) => e.stopPropagation()}>
                <div className='closeWindow' onClick={handleSubmitShowModal}>X</div>
                <input 
                    className="createGame__inputName" maxLength={20}
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    />
                <button className="createGame__button" onClick={hadnleCreateGame} disabled={loading}>
                    Создать игру
                </button>
                <div className={"createGame__message"}>{statusInput?.message}</div>
            </div>
        </div>
    );
}

export default CreateGame;
