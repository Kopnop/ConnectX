// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect, useCallback } from "react";
import Footer from "./Components/Footer";
const MAX_BOARD_SIZE = 25
// const WIN_CON = 3

function SquareNew(props) {
  // console.log("value: " + value)
  return (
    <button onClick={props.func} className="square">{props.value}</button>
  )
}

function Board() {
  const [board, setBoard] = useState([])
  const [isXTurn, setIsXTurn] = useState(true)
  const [resetTrigger, setResetTrigger] = useState(0)
  const [gameIsOver, setGameIsOver] = useState(false)
  const [boardSize, setBoardSize] = useState(18)
  const [newBoardSize, setNewBoardSize] = useState(18)
  const [winCon, setWinCon] = useState(5)
  const [newWinCon, setNewWinCon] = useState(5)
  // const [lastClicked, setLastClicked] = useState({x: null, y: null})

  useEffect(() => {
    //fill board array
    let newBoard = []
    for (let y = 0; y < boardSize; y++) {
      let row = []
      for (let x = 0; x < boardSize; x++) {
        // row.push(["(" + x + "," + y + ")"])
        row.push("-")
      }
      newBoard.push(row)
    }
    setBoard(newBoard)
    setGameIsOver(false)
    setIsXTurn(true)
  }, [resetTrigger, boardSize, winCon])

  const checkWinnerWholeBoardNew = useCallback(() => {
    if (!board || board.length < 1) return;

    const rows = board.length
    const cols = board[0].length

    //horizontally
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c] !== "-" && Array.from({ length: winCon }, (_, i) => board[r][c + i]).every(val => val === board[r][c])) {
          setGameIsOver(true)
          return board[r][c];
        }
      }
    }
    // Check columns
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r <= rows - winCon; r++) {
        if (board[r][c] !== "-" && Array.from({ length: winCon }, (_, i) => board[r + i][c]).every(val => val === board[r][c])) {
          setGameIsOver(true)
          return board[r][c];
        }
      }
    }

    // Check diagonals (top-left to bottom-right)
    for (let r = 0; r <= rows - winCon; r++) {
      for (let c = 0; c <= cols - winCon; c++) {
        if (board[r][c] !== "-" && Array.from({ length: winCon }, (_, i) => board[r + i][c + i]).every(val => val === board[r][c])) {
          setGameIsOver(true)
          return board[r][c];
        }
      }
    }

    // Check diagonals (top-right to bottom-left)
    for (let r = 0; r <= rows - winCon; r++) {
      for (let c = winCon - 1; c < cols; c++) {
        if (board[r][c] !== "-" && Array.from({ length: winCon }, (_, i) => board[r + i][c - i]).every(val => val === board[r][c])) {
          setGameIsOver(true)
          return board[r][c];
        }
      }
    }

    // No winner found
    return 0;

  }, [board, winCon])

  useEffect(() => {
    checkWinnerWholeBoardNew()
  }, [board, checkWinnerWholeBoardNew])

  function handleClick(x, y) {
    if (gameIsOver)
      return

    // ! slice only makes a shallow copy of the array -> the inner arrays(rows) are still references
    // let newBoard = board.slice()

    if (board[y][x] === "X" || board[y][x] === "O") {
      return
    }

    setBoard(prev => {
      const newBoard = prev.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === y && colIndex === x ? (isXTurn ? "X" : "O") : cell)
      )
      return newBoard
    })
    setIsXTurn(prev => !prev)   
  }

  function changeBoardSize(event) {
    if (event.target.value < 1)
      return
    if (Number(event.target.value) > MAX_BOARD_SIZE)
      return
    setNewBoardSize(event.target.value)
  }

  function changeWinCon(event) {
    if (Number(event.target.value) > newBoardSize) {
      setNewWinCon(newBoardSize)
      return
    } else if (event.target.value < 1)
      return
    setNewWinCon(event.target.value)
  }

  const changeSettings = (event) => {
    event.preventDefault()

    setBoardSize(Number(event.target.elements.inputFieldSize.value))
    setWinCon(Number(event.target.elements.inputFieldWinCon.value))
    setResetTrigger(prev => prev + 1)
  }

  return (
    <main>
      <h1 className="title">Connect X<br /></h1>
      <p>Get {winCon} in a row to win</p>
      {gameIsOver ? <p className="winnerText">{isXTurn ? "O" : "X"} won! Congrats!</p> : <p>Next Turn: {isXTurn ? "X" : "O"}</p>}
      {boardSize < winCon ? <div><h1>invalid board size</h1><h1>board size must be bigger than win condition</h1></div> :
        <section className="gameboard">
          {board.map((row, yIndex) => (
            <div key={yIndex}>
              {row.map((value, xIndex) => (
                <SquareNew
                  value={value}
                  func={() => handleClick(xIndex, yIndex)}
                  key={xIndex + "," + yIndex}
                />
              ))}
            </div>
          ))}
        </section>
      }
      <p>current board size: {boardSize}. current win condition: {winCon}</p>
      {/* <form onSubmit={changeBoardSize}><p>Board size:</p><input defaultValue={boardSize} type="number" name="inputFieldSize"></input><button type="submit">confirm</button></form>
        <form onSubmit={changeWinCon}><p>Win Condition:</p><input defaultValue={winCon} type="number" name="inputFieldWin"></input><button type="submit">confirm</button></form> */}

      <form onSubmit={changeSettings}>
        <label>
          Board Size:
          <input
            type="number"
            name="inputFieldSize"
            value={newBoardSize}
            onChange={changeBoardSize}
          />
        </label>
        <label>
          Win Condition:
          <input
            type="number"
            name="inputFieldWinCon"
            value={newWinCon}
            onChange={changeWinCon}
          />
        </label>
        <button type="submit">Confirm & Reset</button>
      </form>
      {/* <form onSubmit={changeWinCon}><p>Win Condition:</p><input></input><button>confirm</button></form> */}

      <button onClick={() => setResetTrigger(prev => prev + 1)}>Reset Board</button>
    </main>
  )
}

function App() {
  return (
    <div>
      <Board />
      <Footer />
    </div>
  );
}

export default App;
