import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import '../styles/Home.css';
import GameSection from '../components/Home/gameSection';
import CreateGame from '../components/Home/createGame';
import {getRooms} from "../utils/api"
import { Link, useNavigate } from 'react-router-dom';
import { GameSectionType } from '../types/types';

function Home() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [games, setGames] = useState<GameSectionType[]>([]);
    const [createGame, setCreateGame] = useState<string>("0");
    const isFirstRender = useRef(true);

    useEffect(() => {
    const fetchData = async () => {
        try {
            const resp = await getRooms();
            if (Array.isArray(resp))
                setGames(resp);
        } catch (error) {
            console.error('Ошибка при получении игр:', error);
        }
    };

    fetchData();
    },  []);

    useEffect(() => {
        if(isFirstRender.current)
        {
            isFirstRender.current = false
            return
        }
        navigate(`/room/${createGame}`)
    }, [createGame]);


    const handleSubmitShowModal = () => {
        setShowModal(prevShowModal => {return !prevShowModal})
    };

    const createGameSuccess = (id: string) =>
    {
        setCreateGame(id)
    }


    return (
        <div className="home">
            {showModal && (
                <CreateGame handleSubmitShowModal={handleSubmitShowModal} createGameSuccess={createGameSuccess}></CreateGame>
            )}
            <div className="homeblock">
                <div className="homeblock__header">
                    <h1 className="header__heading">
                        Морской бой
                    </h1>
                    <Link className="header__link" to='/login'>Авторизация</Link>
                </div>
                <div className="gameList">
                    {games?.map((game: GameSectionType) => (
                        <GameSection 
                            key={game.id} 
                            id={game.id} 
                            name={game.name} 
                            turn={game.turn} 
                            created_at={game.created_at}></GameSection>
                     ))}
                </div>
                <div className="footer">
                    <button className="footer__createGame" onClick={handleSubmitShowModal}>
                        Создать игру
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
