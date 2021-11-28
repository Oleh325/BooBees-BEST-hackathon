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
            navigate("lobby", {replace: false})
        }
    }
}

export default Home;