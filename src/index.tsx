import React, { FC,  useState } from 'react'
import ReactDom from 'react-dom'
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
        const newSquares = values.squares.slice()
        newSquares[square] = values.xIsNext ? 'X' : 'O'
        setAllValues({...values, squares: newSquares})
    }

    function renderSquare(square: number) {
        return (<Square value={values.squares[square]} onClick= {() => handleClick(square) }/>)
    }

    const status = 'Next player: X'

    return (
        <div>
            <div className="status">{status}</div>
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
        </div>
    )
}


type SquareProps = {
    value?: string
    onClick: {}
}

const Square: React.FC<SquareProps> = ( { value, onClick = {} }) => {
    const [ state, setState ] = useState<string>()
    return (
    <button
      className="square"
      onClick={() => onClick}
    >{state}</button>
    )
}

