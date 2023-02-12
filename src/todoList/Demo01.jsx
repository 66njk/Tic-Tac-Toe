import { Component } from "react";

// class DomeA extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             todo: "",
//             list: []
//         }
//     }
//     getTodo(e) {
//         this.setState({ todo: e.target.value })
//     }
//     confirm() {
//         if (!this.state.todo.trim()) {
//             alert("输入框必须有内容~")
//             return;
//         }
//         this.setState(state => ({
//             list: [...state.list, { id: Date.now(), task: state.todo }]
//         }))
//         this.setState({
//             todo: ""
//         })
//     }
//     addByEnter(e) {
//         if (e.keyCode === 13) {
//             this.confirm();
//         }
//     }
//     delTodo(id) {
//         this.setState(state => ({
//             list: state.list.filter(item => item.id !== id)
//         }))
//     }
//     render() {
//         let { todo, list } = this.state;
//         return (
//             <div>
//                 <div>
//                     {/* 输入框中的数据,需要靠状态来控制,这样的输入框,叫受控表单,默认不受控 */}
//                     {/* v-model: :value + @input */}
//                     <input
//                         type="text"
//                         value={todo}
//                         onChange={e => this.getTodo(e)}
//                         onKeyUp={e => this.addByEnter(e)}
//                     />
//                     <button onClick={(e) => this.confirm(e)}>添加</button>
//                 </div>
//                 <div>
//                     {
//                         list.map((item, idnex, arr) => (
//                             <div key={item.id}>
//                                 <span>{item.id}</span> -- <span>{item.task}</span>
//                                 <button onClick={() => this.delTodo(item.id)}>删除</button>
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>
//         )
//     }
// }

// export default DomeA;

// // ------------------------------------------------------------------
// import { useState } from "react"

// function DemoA() {
//     let [todo, setTodo] = useState("")
//     let [list, setList] = useState([])
//     let confirm = () => {
//         if (!todo.trim()) return;
//         setList([...list, { id: Date.now(), task: todo }])
//         setTodo("")
//     }
//     let delTodo = (id) =>{
//         setList(list.filter(ele => ele.id != id))
//     }
//     let addByEnter = e => {
//         if (e.keyCode === 13) {
//             confirm();
//         }
//     }
//     return (
//         <div>
//             <div>
//                 <input type="text" value={todo}
//                     onChange={e => setTodo(e.target.value)}
//                     onKeyUp={e => addByEnter(e)}
//                 />
//                 <button onClick={confirm}>添加</button>
//                 <hr />
//                 <div className="ok">
//                     {
//                         list.map(item => (
//                             <div key={item.id}>
//                                 <span>{item.id}</span>
//                                 <span>--</span>
//                                 <span>{item.task}</span>
//                                 <button onClick={() => delTodo(item.id)}>X</button>
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

class DemoA extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [Array(9).fill(null)],
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
      status: "x先走",
      steps: 0,
    };
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  renderList() {
    if (this.state.history.length === 1) return;
    let renderList = this.state.history.filter((item, index) => index !== 0);
    return renderList.map((item, index) => {
      return (
        <li key={index} style={{ listStyle:'none' }}>
          <button value={index + 1} onClick={this.changeCurrent.bind(this)}>
            回到第{index + 1}步
          </button>
        </li>
      );
    });
  }
  changeCurrent(e) {
    // console.hhhhh(e.currentTarget.value);
    // console.hhhhh(e.currentTarget.value % 2 === 0 ? false : true);
    this.setState({
      squares: this.state.history[e.currentTarget.value],
      xIsNext: e.currentTarget.value % 2 === 0 ? true : false,
      status: "Next player:" + (e.currentTarget.value % 2 === 0 ? "X" : "O"),
      steps: e.currentTarget.value,
    });
    }
    restart() {
        this.setState({
          history: [Array(9).fill(null)],
          squares: Array(9).fill(null),
          xIsNext: true,
          winner: null,
          status: "x先走",
          steps: 0,
        });
    }
  handleClick(i) {
    this.setState(
      {
        winner: calculateWinner(this.state.squares),
      },
      () => {
        this.setState(
          {
            history: this.state.history.filter(
              (item, index) => Number(index) <= this.state.steps
            ),
          },
          () => {
            if (!this.state.squares[i] && !this.state.winner) {
              let clone = [...this.state.squares];
              clone[i] = this.state.xIsNext ? "X" : "O";
              this.setState(
                {
                  steps: this.state.steps + 1,
                  squares: clone,
                  xIsNext: !this.state.xIsNext,
                  history: [...this.state.history, clone],
                },
                () => {
                  this.setState(
                    {
                      winner: calculateWinner(this.state.squares),
                    },
                    () => {
                      if (this.state.winner) {
                        this.setState({
                          status: "Winner: " + this.state.winner,
                        });
                      } else {
                        this.setState({
                          status:
                            "Next player:" + (!this.state.xIsNext ? "O" : "X"),
                        });
                      }
                    }
                  );
                }
              );
            } else if (this.state.winner) {
              alert(`${this.state.winner}获胜`);
            }
          }
        );
      }
    );
  }
  render() {
    return (
      <div>
        <div className="status">{this.state.status}</div>
        <div
          style={{
            display: "flex",
          }}
        >
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
            </div>
          <button onClick={()=>{this.restart()}}>回到开始</button>
        <ul> {this.renderList()}</ul> 
      </div>
    );
  }
}
// class Square extends Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
function Square(props) {
  return (
    <button
      style={{
        background: "#fff",
        border: "1px solid #999",
        fontSize: "24px",
        fontWeight: "bold",
        lineHeight: "34px",
        height: "34px",
        marginRight: "-1px",
        marginTop: "-1px",
        padding: "0",
        textAlign: "center",
        width: "34px",
      }}
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//优化版，有的属性可以当作计算属性写在render里
// function Square(props) {
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }

// class Board extends React.Component {
//   renderSquare(i) {
//     return (
//       <Square
//         value={this.props.squares[i]}
//         onClick={() => this.props.onClick(i)}
//       />
//     );
//   }

//   render() {
//     return (
//       <div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [
//         {
//           squares: Array(9).fill(null),
//         },
//       ],
//       stepNumber: 0,
//       xIsNext: true,
//     };
//   }

//   handleClick(i) {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[history.length - 1];
//     const squares = current.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? "X" : "O";
//     this.setState({
//       history: history.concat([
//         {
//           squares: squares,
//         },
//       ]),
//       stepNumber: history.length,
//       xIsNext: !this.state.xIsNext,
//     });
//   }

//   jumpTo(step) {
//     this.setState({
//       stepNumber: step,
//       xIsNext: step % 2 === 0,
//     });
//   }

//   render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber];
//     const winner = calculateWinner(current.squares);

//     const moves = history.map((step, move) => {
//       const desc = move ? "Go to move #" + move : "Go to game start";
//       return (
//         <li key={move}>
//           <button onClick={() => this.jumpTo(move)}>{desc}</button>
//         </li>
//       );
//     });

//     let status;
//     if (winner) {
//       status = "Winner: " + winner;
//     } else {
//       status = "Next player: " + (this.state.xIsNext ? "X" : "O");
//     }

//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board
//             squares={current.squares}
//             onClick={(i) => this.handleClick(i)}
//           />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <ol>{moves}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// // ========================================

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Game />);

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

export default DemoA;
