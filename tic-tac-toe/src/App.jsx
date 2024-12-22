import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import GameOver from './components/GameOver'
import {WINNING_COMBINATIONS} from './winning-combinations.js'

const Players = {X:'Player 1', O:'Player 2'}
const Initial_Game_Board = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function deriveGameBoard(gameTurns) {
  const gameBoard = [...Initial_Game_Board.map(row_array => [...row_array])]
  for(const turn of gameTurns) {
    const {square, player} = turn
    const {rowIndex, colIndex} = square
    gameBoard[rowIndex][colIndex] = player
  }
  return gameBoard;
}
function deriveActivePlayer(gameTurns) {
  let activePlayer = 'X'
  if(gameTurns.length > 0 && gameTurns[0].player == 'X') {
    activePlayer = 'O'
  }
  return activePlayer
}
function deriveWinner(gameBoard, players) {
  let winner = null
  //console.log("paap", gameBoard, players)
  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    if(firstSquareSymbol && 
      (firstSquareSymbol == secondSquareSymbol) && 
      (firstSquareSymbol == thirdSquareSymbol)) {
      winner = players[firstSquareSymbol];
    }
    console.log(winner, firstSquareSymbol, secondSquareSymbol, thirdSquareSymbol)
  }
  return winner
}

function App() {
  const [players, setPlayers] = useState(Players)
  const [gameTurns, setGameTurns] = useState([])
  let isActivePlayer = 'X';
  let hasDraw = null
  let gameBoard = deriveGameBoard(gameTurns)
  let winner = deriveWinner(gameBoard, players)
  hasDraw = (!winner && gameTurns.length == 9)
  function handleRestart() {
    setGameTurns([]);
  }
  
  function handleNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }
  function handleSelectSquare(rowIndex, colIndex) {
      setGameTurns((prevTurns) => {
        let activePlayer = deriveActivePlayer(prevTurns)
        const updatedTurns = [
          {square: {rowIndex, colIndex}, player: activePlayer},
          ...prevTurns
        ]
        return updatedTurns
      })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={Players.X} symbol='X' isActive={isActivePlayer == 'X'} onClickButton={handleNameChange} />
          <Player name={Players.O} symbol='O' isActive={isActivePlayer == 'O'} onClickButton={handleNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} 
        board={gameBoard} />
      </div>
    </main>
  )
  /*{(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} 
        board={gameBoard} />*/
        /*<Log turns={gameTurns} /> */
}

export default App
