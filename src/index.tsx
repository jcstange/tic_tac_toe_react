import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


type IBoard = {
    squares: string[],
    xIsNext: boolean
}

const Board: React.FC = () => {
    const [ values, setAllValues ] = useState<IBoard>({
        squares: Array(9).fill(null),
        xIsNext: true 
    }) 

    function handleClick(square: number) {
        if(didGameEnd()) return
        const newSquares = values.squares.slice()
        newSquares[square] = values.xIsNext ? 'X' : 'O'
        setAllValues({...values, squares: newSquares, xIsNext: !values.xIsNext})
    }

    function renderSquare(square: number) {
        return (<Square value={values.squares[square]} onClick= {() => handleClick(square) }/>)
    }

    function calculateWinner(squares: string[]) : string | null {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for(let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
                return squares[a]
            }
        }

        return null
    }

    function didGameEnd(): boolean {
        if(calculateWinner(values.squares)) return true
        for(let i = 0; i < values.squares.length; i++)
            if(values.squares[i] == null) return false 
        return true
    }
    
    function getStatusString() : string {
        const winner = calculateWinner(values.squares)
        let status: string
        if(winner) status = 'Winner: ' + winner
        else {
            if(didGameEnd()) status = 'End of the game!'
            else status = 'Next player: ' + (values.xIsNext ? 'X' : 'O')
        }

        return status
    }

    function reset() {
        setAllValues({...values, squares: Array(9).fill(null), xIsNext: true})
    }

    return (
        <div>
            <div className="status">{getStatusString()}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <button onClick={()=> reset()}>RESET</button>
        </div>
    )
}


type SquareProps = {
    value?: string
    onClick: () => void 
}

const Square: React.FC<SquareProps> = ( { value, onClick }) => {
    return (
    <button
      className="square"
      style={{ width:60, height:60}}
      onClick={() => onClick()}
    >{value}</button>
    )
}

const Game: React.FC = () => 
    <div className="game">
        <div className="game-board">
            <Board />
        </div>
        <div className="game-info">
            <div>{/*status*/}</div>
            <ol>{/* TODO */}</ol>
        </div>
    </div>


ReactDOM.render(
    <Game />,
    document.getElementById('root')
)
