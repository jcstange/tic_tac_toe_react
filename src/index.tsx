import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Colors = {
    black: '#000000',
    white: '#FFFFFF',
    green: '#00FF00',
    red: '#FF0000',
    blue: '#0000FF',
    light_green: '#52C7A2',
    light_red: '#FF9999',
    light_blue: '#9999FF',
    gray: '#AAAAAA'
} 

type IBoard = {
    squares: string[],
    xIsNext: boolean
}

const Board: React.FC = () => {
    const styles = {
        resetButton: {
            fontSize: 25,
            padding: 15,
            marginTop: 30,
            color: Colors.white,
            backgroundColor: Colors.light_green,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Colors.white,
            fontFamily: 'Roboto',
            marginLeft: '33%',
            width: '33%',
            marginRight: '33%',
        },
        status: {
            fontSize: 25,
            fontFamily: 'Roboto',
            padding: 30,
            marginBottom: 25, 
            justifyContent: 'center',
            color: Colors.white,
            backgroundColor: Colors.gray
        },
        boardRow: {
            display: 'flex'
        },
        board: {
            display: 'block',
            width: '90%',
            marginLeft: '5%',
            marginRight: '5%',
            backgroundColor: Colors.gray,
        },
        vDivider: {
            backgroundColor: Colors.gray,
            width: 6,
            height: '100%',
        },
        hDivider: {
            backgroundColor: Colors.gray,
            width: '100%',
            height: 4,
        }
    }

    const [ values, setAllValues ] = useState<IBoard>({
        squares: Array(9).fill("-"),
        xIsNext: true 
    }) 

    function handleClick(square: number) {
        if(didGameEnd()) return
        const newSquares = values.squares.slice()
        if(newSquares[square] !== "-") return
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
            if(squares[a] !== "-" && squares[a]===squares[b] && squares[a]===squares[c]){
                return squares[a]
            }
        }

        return null
    }

    function didGameEnd(): boolean {
        if(calculateWinner(values.squares)) return true
        for(let i = 0; i < values.squares.length; i++)
            if(values.squares[i] === "-") return false 
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
        setAllValues({...values, squares: Array(9).fill("-"), xIsNext: true})
    }

    return (
        <div>
            <div className="status" style={styles.status}>{getStatusString()}</div>
            <div className="board" style={styles.board}>
                <div className="board-row" style={styles.boardRow}>
                    {renderSquare(0)}
                    <div style={styles.vDivider}/>
                    {renderSquare(1)}
                    <div style={styles.vDivider}/>
                    {renderSquare(2)}
                </div>
                {<div style={styles.hDivider}/>}
                <div className="board-row" style={styles.boardRow}>
                    {renderSquare(3)}
                    <div style={styles.vDivider}/>
                    {renderSquare(4)}
                    <div style={styles.vDivider}/>
                    {renderSquare(5)}
                </div>
                {<div style={styles.hDivider}/>}
                <div className="board-row" style={styles.boardRow}>
                    {renderSquare(6)}
                    <div style={styles.vDivider}/>
                    {renderSquare(7)}
                    <div style={styles.vDivider}/>
                    {renderSquare(8)}
                </div>
            </div>
            <button style={styles.resetButton} onClick={()=> reset()}>RESET</button>
        </div>
    )
}


type SquareProps = {
    value?: string
    onClick: () => void 
}

const Square: React.FC<SquareProps> = ( { value, onClick }) => {
    const styles = {
        square: {
            width: '50%',
            paddingBottom: '10%',
            paddingTop: '10%',
            margin: 0,
            fontSize: 50,
            justifyContent: 'center',
            color: Colors.light_green,
            backgroundColor: Colors.white,
            border: 0,
        }
    }

    return (
    <button
      className="square"
      style={styles.square}
      onClick={() => onClick()}
    >{value}</button>
    )
}

const Game: React.FC = () => 
    <div className="game" style={{height:'100%', width: '100%'}}>
        <div className="game-board" style={{height:'100%', width: '100%'}}>
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
