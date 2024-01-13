import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Login() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Zamiast useHistory()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://bike.local/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
    
            if (!response.ok) {
                alert('Nieudane logowanie');
                return;
            }
    
            const data = await response.json();
            console.log(data);
            if (data.status === 'success') {
                setIsLoggedIn(true);
                navigate("/"); // Przekierowanie po udanym zalogowaniu
            } else {
                alert('Nieudane logowanie');
            }
        } catch (error) {
            console.error("Wystąpił błąd:", error);
            alert('Nieudane logowanie');
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit">Zaloguj</button>
        </form>
    );
}

export default Login;
