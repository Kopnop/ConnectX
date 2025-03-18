// import logo from './logo.svg';
// import './App.css';
import Footer from "./Components/Footer";
const GAMEBOARD_SIZE = 3

// function Square(props) {

//   function handleSquareClick(event) {
//     console.log(event.target.id)
//   }

//   return (
//     <button id={props.count}onClick={handleSquareClick}>[{props.count}]</button>
//   )
// }

function SquareNew(props){
  // console.log("value: " + value)
  return (
    <button onClick={props.func}>{props.value}</button>
  )
}

function Board() {
  let board = []
  for (let y=0; y<GAMEBOARD_SIZE; y++) {
    let row = []
    for (let x=0; x<GAMEBOARD_SIZE; x++) {
      // console.log("x: " + x + " y: "+y)
      // board[x][y] = "[]"
      row.push(["(" + x + ","+y+")"])
    }
    board.push(row)
  }

  console.log(board)

  let isXTurn = true;

  function handleClick(x, y) {
    // if (isXTurn) {
    //   event.target.innerText = "X"
    //   isXTurn = false
    //   // console.log(event.target.attributes.x)
    //   console.log( event.target.attributes)
    //   board[event.target.attributes.x][event.target.attributes.y] = "X"
    // } else {
    //   event.target.innerText = "O"
    //   isXTurn = true
    //   board[event.target.attributes.x][event.target.attributes.y] = "O"
    // }
    // console.log(board)
    
  }

  return (
    <main>
      <h1 className="title">this is the board<br /></h1>
      <section className="gameboard">
        {/* <div>
          <Square count={count++}/> <Square count={count++}/> <Square count={count++}/>
        </div>
        <div>
          <Square count={count++}/> <Square count={count++}/> <Square count={count++}/>
        </div>
        <div>
          <Square count={count++}/> <Square count={count++}/> <Square count={count++}/>
        </div> */}

        {/* {board.map((row, yIndex) => <div>{row.map((x, xIndex) => <button onClick={handleClick} key={x} id={x} x={xIndex} y={yIndex-1}>{xIndex},{yIndex-1}</button>)}</div>)} */}

        {board.map((row, yIndex) => (
          <div key={yIndex}>
            {row.map((x, xIndex) => (
              <SquareNew 
                value={board[xIndex][yIndex]} 
                func={() => handleClick(xIndex, yIndex)}  
                key={xIndex+","+yIndex} 
              />
            ))}
          </div>
        ))}


      </section>
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
