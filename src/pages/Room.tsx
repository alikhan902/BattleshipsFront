import React, {useEffect, useLayoutEffect, useState} from 'react';
import '../styles/Room.css';
import { RoomType, RoomMessage, CellType, CellExportType } from '../types/types';
import {getGameRoom, reqGameTurn} from "../utils/api"
import { useNavigate, useParams } from 'react-router-dom';
import Cell from "../components/Room/Cell"
import Final from '../components/Room/Final';

function Room() {
    const [room, setRoom] = useState<RoomType>({id: "",
  name: "",
  turn: "",
  current_turn: "",
  player_field: [],
  opponent_field: []})
    const { id } = useParams<{ id: string }>();
    const [final, setFinal] = useState<{isFinal: boolean, final: string, id: string}>({isFinal: false, final: "", id: ""})
    const [waiting, setWaiting] = useState<boolean>(true)
    const navigate = useNavigate();
    let interval:NodeJS.Timer;

    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await getGameRoom(id!);
                setRoom(resp);
            } catch (error) {
                console.error('Ошибка при получении комнаты:', error);
                clearInterval(interval)
                navigate('/')
            }
        };
        fetchData()
        interval = setInterval(fetchData, 1000)
    }, []); 

    useEffect(() => {
    if (room) {
        let countOfOpponent = 0
        let countOfPlayer = 0
        if(room.current_turn == "Ваш ход")
        {
            setWaiting(false)
        }
        else
        {
            setWaiting(true)
        }
        console.log(room)
        if(room.player_field.length < 1)
        {
            return
        }
        for(let x: number = 0; x < 100; x++)
        {
            if(room.opponent_field[x].has_ship && room.opponent_field[x].is_shot)
            {
                countOfOpponent++;
            }
            if(room.player_field[x].has_ship && room.player_field[x].is_shot)
            {
                countOfPlayer++;
            }
        }
        if(countOfOpponent >= 16)
        {
            setFinal({isFinal: true, final: "Выиграли", id: id!})
            clearInterval(interval)
            setWaiting(true)
        }
        if(countOfPlayer >= 16)
        {
            setFinal({isFinal: true, final: "Проиграли", id: id!})
            clearInterval(interval)    
            setWaiting(true)
        }
    }
    }, [room]);

    const updateTurn = async (cell: CellType) =>
    {
        try {
            if (id) {
                await reqGameTurn(id, cell);
                const resp = await getGameRoom(id);
                setRoom(resp);
            }
        } catch (error) {
            console.error('Ошибка при получении комнаты:', error);
        }
    }

    return (
        <div className="room">
            <div className="header">
                <div className="header__roomName">{room?.name}</div>
            </div>
            <div className="gameZone">
                <div className="field">
                    {room?.player_field?.map((cell: CellType) => (
                        <Cell key={`${cell.x}-${cell.y}`} cell={cell} my={true} updateTurn={updateTurn} isWaiting={waiting}></Cell>
                     ))}
                </div>
                <div className="field">
                     {room?.opponent_field?.map((cell: CellType) => (
                        <Cell key={`${cell.x}-${cell.y}`} cell={cell} my={false} updateTurn={updateTurn} isWaiting={waiting}></Cell>
                     ))}
                </div>
            </div>
            <div className="info">
                <div className="info__turn">Ход: {room?.turn}</div>
                <div className="info__turnOwner">Чей ход: {room?.current_turn}</div>
            </div>
            {final.isFinal ?
            <Final final={final.final} id={final.id}></Final> : <></>
            }
        </div>
    );
}

export default Room;
