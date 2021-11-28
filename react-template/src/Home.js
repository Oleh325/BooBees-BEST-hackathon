import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import './Home.css';

function Home() {
    const [nickname, setNickname] = useState("")
    const [roomId, setRoomId] = useState("")
    let navigate = useNavigate();
    return (
        <div className="centerForm">
            <input type="text" onChange={e => setNickname(e.target.value)} placeholder="Your nickname" />
            <p id="errorMsg"></p>
            <div style={{"width": "100%", "display": "flex", "justify-content": "space-between"}}>
                <input type="text" onChange={e => setRoomId(e.target.value)} placeholder="Enter room id" id="join"/>
                <button id="joinBtn" onClick={validateNickname}>Join</button>
            </div>
            <button onClick={validateNickname} name="create_room">Create room</button>
        </div>
    );



    function validateNickname() {
        if ((nickname.length <3) || (nickname.length > 15)) {
            document.getElementById("errorMsg").innerHTML = "Pls enter a nickname between 3 and 15 chars 🥺👉👈";
            return false;
        } else {
            let url = 'http://192.168.88.201:8080'
            if (localStorage.getItem('userId') === null) {
                url += '/saveUser?name=' + nickname
            } else {
                url += '/updateUser?name=' + nickname + '&id=' + localStorage.getItem('userId')
            }
            fetch(url)
                .then(response => response.json())
                .then(data => localStorage.setItem('userId', data.id));
            navigate("lobby", {replace: false})
        }
    }
}

export default Home;
