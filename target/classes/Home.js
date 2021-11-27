import './Home.css';

function Home() {

    return (
        <div className="centerForm">
            <form action="lobby" name = "homeForm" onsubmit = "return validateNickname()">
                <input type="text" name="nickname" placeholder="Your nickname"/>
                    <div style={{"width": "100%",   "display": "flex", "justify-content": "space-between"}}>
                        <input type="text" name="id" id="join" placeholder="Enter room id" id="join"/>
                            <input type="submit" name="join" value="Join" id="joinBtn"/>
                    </div>
                    <input type="submit" name="create_room" value="Create room"/>
            </form>
        </div>
    );
}

function validateNickname() {
    var nickname = document.forms["homeForm"]["nickname"].value;
    alert(nickname);
    return false;
}

export default Home;