import { METHODS } from "http";
import { AuthResponse, GameSectionType, CreateGameMessage, RoomType, RoomMessage, CellType } from '../types/types';
import { getCookie } from "./session_token";


const BASE_URL = "http://localhost:8000/api";

export const signup = async (username: string, password: string): Promise<AuthResponse> => {
    let resp = await request("/signup/", "POST", true, {}, JSON.stringify({username: username, password: password}));
    const status = resp.status
    resp = await resp.json();
    return {
        ...resp,
        status: status
    };
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
    let resp = await request("/login/", "POST", true, {}, JSON.stringify({username: username, password: password}));
    const status = resp.status
    resp = await resp.json();
    return {
          ...resp,
          status: status
    };
}

export const getRooms = async (): Promise<GameSectionType[]> => {
    const csrfToken = getCookie('csrftoken') ?? "";
    let resp = await request("/my_rooms/", "GET", true, {'X-CSRFToken': csrfToken});
    resp = await resp.json();
    return resp;
}

export const createGame = async (name: string): Promise<CreateGameMessage> => {
    const csrfToken = getCookie('csrftoken') ?? "";
    let resp = await request("/create_room/", "POST", true, {'X-CSRFToken': csrfToken}, JSON.stringify({
      opponent_username: name
    }));
    const status = resp.status
    resp = await resp.json();
    return {
          ...resp,
          status: status
    };
}

export const getGameRoom = async (id: string): Promise<RoomType> => {
    const csrfToken = getCookie('csrftoken') ?? "";
    let resp = await request(`/my_room/${id}/`, "GET", true, {'X-CSRFToken': csrfToken});
    const status = resp.status
    resp = await resp.json();
    return resp;
}

export const reqGameRoom = async (id: string, room: RoomType): Promise<RoomMessage> => {
    const csrfToken = getCookie('csrftoken') ?? "";
    let resp = await request(`/my_room/${id}/`, "POST", true, {'X-CSRFToken': csrfToken},
      JSON.stringify({
        ...room
      })
    );
    const status = resp.status
    resp = await resp.json();
    return resp;
}

export const reqGameTurn = async (id: string, cell: CellType): Promise<RoomType> => {
    const csrfToken = getCookie('csrftoken') ?? "";
    let resp = await request(`/my_room/${id}/update/${cell.x}/${cell.y}/`, "PUT", true, {'X-CSRFToken': csrfToken}, JSON.stringify({
      has_ship: cell.has_ship,
      is_shot: cell.is_shot,
      is_mis_shot: cell.is_mis_shot
    }));
    const status = resp.status
    resp = await resp.json();
    return resp;
}

export const reqGameDel = async (id: string) => {
    const csrfToken = getCookie('csrftoken') ?? "";
    let resp = await request(`/my_room/${id}/delete/`, "DELETE", true, {'X-CSRFToken': csrfToken});
}

const request = async (url: string, method: string, credentials: boolean, headers: HeadersInit, body: BodyInit | null = null): Promise<any> => {
    const baseUrl = "https://battleshipsback.onrender.com/api";

    // Получаем CSRF токен из cookies
    const csrfToken = getCookie('csrftoken');

    // Обновляем заголовки запроса
    const updatedHeaders = {
        'Content-Type': 'application/json',
        ...headers,
        ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {}),  // Добавляем CSRF токен, если он есть
    };

    // Выполняем запрос
    const response = await fetch(`${baseUrl}${url}`, {
        method: method,
        credentials: credentials ? "include" : undefined,  // Если нужно передавать куки
        headers: updatedHeaders,
        body: body,
    });

    // Обработка ошибок
    if (!response.ok) {
        if (response.status >= 400) {
            const errorText = await response.text();
            throw new Error(`Ошибка сервера: ${response.status} - ${errorText}`);
        }
    }

    return response;  // Возвращаем JSON-ответ
};
