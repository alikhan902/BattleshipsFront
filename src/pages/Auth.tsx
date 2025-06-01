import React, {useState} from 'react';
import '../styles/Auth.css';
import {login} from "../utils/api"
import { Link, useNavigate } from 'react-router-dom';
import { AuthResponse } from '../types/types';

function Auth() {
    const [statusInput, setStatusInput] = useState<AuthResponse>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            let message = await login(username, password);
            setStatusInput(message);
        } catch (error: any) {
            setStatusInput({message: error.message});
            setLoading(false);
        }
        setLoading(false);
    };

    return (
        <div className="auth">
            <h1 className="auth__heading">Авторизация</h1>
            <input 
                className="auth__input"
                placeholder="username" 
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <div className={(statusInput?.status ? statusInput?.status : 500 >= 300) ? "auth__message_error" : "auth__message"}>{statusInput?.username}</div>
            <input 
                className="auth__input"
                placeholder="password" 
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <div className={(statusInput?.status ? statusInput?.status : 500 >= 300) ? "auth__message_error" : "auth__message"}>{statusInput?.password}</div>
            <button 
                className="auth__button"
                type="submit" 
                onClick={handleSubmit} 
                disabled={loading}
            >
            {loading ? 'Отправка...' : 'Отправить'}
            </button>
            <div className={(statusInput?.status ? statusInput?.status : 500 >= 300) ? "auth__message_error" : "auth__message"}>{statusInput?.message}</div>
            <Link to="/signup" className="auth__link">Зарегистрироваться</Link>
            <Link to="/" className="auth__link">Главная</Link>
        </div>
    );
}

export default Auth;
