import React, {useState, useMemo, useEffect} from "react";
import {Avatars} from './Avatars'
import {useNavigate} from "react-router-dom";
import './Home.css';

function Lobby() {

    const [users, setUsers] = useState([])
    const [gameStarted, setGameStarted] = useState(false)
    let navigate = useNavigate();


    useMemo(() => {
       updateUsers()
    }, []);

    useEffect(() => {
        let handle = setInterval(updateUsers, 1000);
        return () => {
            clearInterval(handle);
        }
    })

    function updateUsers() {
        fetch('http://192.168.88.201:8080/getUsers')
            .then(response => response.json())
            .then(data => setUsers(data));
        if (users.length === 0) localStorage.removeItem('userId')
    }

    function startGame() {
        fetch('http://192.168.88.201:8080/startGame')
            .then(response => response.json())
            .then(data => console.log(data));
        setGameStarted(true)
        navigate("/drawroom", {replace: false})
    }

    return (
        <div className="centerForm">
            <ul>
                {
                    users && users.map((user, index) => {
                        return (
                            <div className="listItem">
                                {Avatars[index % Avatars.length]}
                                <p className="listItemText">{user.name}</p>
                            </div>
                        )
                    })
                }
            </ul>
            <br/>
            <div>
                <button disabled={!gameStarted && users.length <3} onClick={startGame}> {/*with love*/}
                    Start
                </button>
            </div>
        </div>
    );
}

export default Lobby;
