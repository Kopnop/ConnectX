// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect, useCallback } from "react";
import Footer from "./Components/Footer";
// const BOARD_SIZE = 5
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
  const [winCon, setWinCon] = useState(4)
  // const [lastClicked, setLastClicked] = useState({x: null, y: null})

  //do once on mount/startup and on reset
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

  // const checkWinnerWholeBoard = useCallback(() => {
  //   if (!board || board.length < boardSize) return;

  //   for (let y = 0; y < boardSize; y++) {
  //     for (let x = 0; x < boardSize; x++) {
  //       // Skip unnecessary checks
  //       if (y >= boardSize - winCon + 1 || x >= boardSize - winCon + 1) continue;

  //       let squareValue = board[y][x];
  //       if (squareValue === "-") continue;

  //       // Check vertically
  //       let count = 1;
  //       for (let i = y + 1; i < boardSize; i++) {
  //         if (board[i][x] === squareValue) {
  //           count++;
  //         } else {
  //           break;
  //         }
  //       }
  //       if (count >= winCon) {
  //         setGameIsOver(true);
  //         return true;
  //       }

  //       // Check horizontally
  //       count = 1;
  //       for (let i = x + 1; i < boardSize; i++) {
  //         if (board[y][i] === squareValue) {
  //           count++;
  //         } else {
  //           break;
  //         }
  //       }
  //       if (count >= winCon) {
  //         setGameIsOver(true);
  //         return true;
  //       }

  //       // Check diagonally down-right
  //       count = 1;
  //       for (let i = 1; i < winCon; i++) {
  //         if (y + i >= boardSize || x + i >= boardSize) break;
  //         if (board[y + i][x + i] === squareValue) {
  //           count++;
  //         } else {
  //           break;
  //         }
  //       }
  //       if (count >= winCon) {
  //         setGameIsOver(true);
  //         return true;
  //       }

  //       // Check diagonally up-right
  //       count = 1;
  //       for (let i = 1; i < winCon; i++) {
  //         if (y - i < 0 || x + i >= boardSize) break;
  //         if (board[y - i][x + i] === squareValue) {
  //           count++;
  //         } else {
  //           break;
  //         }
  //       }
  //       if (count >= winCon) {
  //         setGameIsOver(true);
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }, [board, boardSize, winCon]);

  useEffect(() => {
    checkWinnerWholeBoardNew()
  }, [board, checkWinnerWholeBoardNew])

  // function initiateBoard() {

  // }

  // function checkWinnerFromSquare(isXTurn, x, y) {
  //   let squareValue = board[x][y]
  //   console.log(isXTurn ? "X" : "O")
  //   console.log(`${x},${y}`)
  //   console.log(board[x][y])
  //   return
  // }



  function handleClick(x, y) {
    if (gameIsOver)
      return

    // slice only makes a shallow copy of the array -> the inner arrays(rows) are still references
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


    // checkWinnerFromSquare(isXTurn, x, y)

    // if (isXTurn) {
    //   newBoard[y][x] = "X"
    //   setIsXTurn(false)
    // } else {
    //   newBoard[y][x] = "O"
    //   setIsXTurn(true)
    // }
    // setBoard(newBoard)

    // console.log(`${x},${y}`)
    // console.log(board[y][x])    
  }

  // function resetBoard() {
  //   // setResetTrigger(resetTrigger + 1)
  //   setResetTrigger(prev => prev + 1)
  // }

  const changeSettings = (event) => {
    event.preventDefault()

    setBoardSize(event.target.elements.inputFieldSize.value)
    setWinCon(event.target.elements.inputFieldWinCon.value)
    setResetTrigger(prev => prev + 1)
  }

  return (
    <main>
      <h1 className="title">this is the board<br /></h1>
      {gameIsOver ? <p>{isXTurn ? "O" : "X"} won! Congrats!</p> : <p>Next Turn: {isXTurn ? "X" : "O"}</p>}
      {boardSize < winCon ? <div><h1>invalid board size</h1><h1>board size must be bigger than win condition</h1></div>:
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

      {/* <form onSubmit={changeBoardSize}><p>Board size:</p><input defaultValue={boardSize} type="number" name="inputFieldSize"></input><button type="submit">confirm</button></form>
        <form onSubmit={changeWinCon}><p>Win Condition:</p><input defaultValue={winCon} type="number" name="inputFieldWin"></input><button type="submit">confirm</button></form> */}

      <form onSubmit={changeSettings}>
        <label>
          Board Size:
          <input
            type="number"
            defaultValue={boardSize}
            name="inputFieldSize"
          />
        </label>
        <label>
          Win Condition:
          <input
            type="number"
            defaultValue={winCon}
            name="inputFieldWinCon"
          />
        </label>
        <button type="submit">Confirm</button>
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
