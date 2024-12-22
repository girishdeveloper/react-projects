import {useState} from 'react'

export default function Player({name, symbol, isActive, onClickButton}) {
    const [playerName, setPlayerName] = useState(name)
    const [isEditing, setIsEditing] = useState(false)
    function handleOnClick() {
        setIsEditing((isEditing) => !isEditing)
        if(isEditing) {
            onClickButton(symbol, playerName)
        }
    }
    function handleTextChange(event) {
        setPlayerName(event.target.value);
    }
    let PlayerName = (isEditing) ? 
    <input type="text" value={playerName} onChange={handleTextChange} required /> : 
    <span className="player-name">{playerName}</span>
    let btnCaption = (isEditing) ? 'Save' : 'Edit'
    return (
        <li className={(isActive) ? "active" : ""}>
            <span className="player">{PlayerName}
                <span className="player-symbol"></span>
            </span>
            <button onClick={handleOnClick}>{btnCaption}</button>
        </li>
    )
}