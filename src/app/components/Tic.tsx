"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type Player = "X" | "O" | null
type Board = Player[]
type Difficulty = "easy" | "medium" | "hard"
type GameState = "playing" | "won" | "lost" | "draw"

export default function NeonTicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  const [scores, setScores] = useState({ wins: 0, losses: 0, draws: 0 })
  const [gameState, setGameState] = useState<GameState>("playing")
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [isAiThinking, setIsAiThinking] = useState(false)
  const [winningLine, setWinningLine] = useState<number[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [showDefeat, setShowDefeat] = useState(false)

  const checkWinner = (board: Board): { winner: Player | "draw" | null; line: number[] } => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ]

    for (const line of lines) {
      const [a, b, c] = line
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line }
      }
    }

    return {
      winner: board.every((cell) => cell !== null) ? "draw" : null,
      line: [],
    }
  }

  const getAvailableMoves = (board: Board): number[] => {
    return board.map((cell, index) => (cell === null ? index : -1)).filter((index) => index !== -1)
  }

  const minimax = (
    board: Board,
    depth: number,
    isMaximizing: boolean,
    alpha = Number.NEGATIVE_INFINITY,
    beta: number = Number.POSITIVE_INFINITY,
  ): number => {
    const { winner } = checkWinner(board)

    if (winner === "O") return 10 - depth
    if (winner === "X") return depth - 10
    if (winner === "draw") return 0

    const availableMoves = getAvailableMoves(board)

    if (isMaximizing) {
      let maxEval = Number.NEGATIVE_INFINITY
      for (const move of availableMoves) {
        board[move] = "O"
        const moveValue = minimax(board, depth + 1, false, alpha, beta)
        board[move] = null
        maxEval = Math.max(maxEval, moveValue)
        alpha = Math.max(alpha, moveValue)
        if (beta <= alpha) break
      }
      return maxEval
    } else {
      let minEval = Number.POSITIVE_INFINITY
      for (const move of availableMoves) {
        board[move] = "X"
        const moveValue = minimax(board, depth + 1, true, alpha, beta)
        board[move] = null

        if (moveValue < minEval) {
          minEval = moveValue
        }
      }
      return minEval
    }
  }

  const getAiMove = (board: Board, difficulty: Difficulty): number => {
    const availableMoves = getAvailableMoves(board)

    if (difficulty === "easy") {
      // 70% random, 30% optimal
      if (Math.random() < 0.7) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)]
      }
    } else if (difficulty === "medium") {
      // 30% random, 70% optimal
      if (Math.random() < 0.3) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)]
      }
    }

    // Hard difficulty or optimal move for medium/easy
    let bestMove = availableMoves[0]
    let bestValue = Number.NEGATIVE_INFINITY

    for (const move of availableMoves) {
      board[move] = "O"
      const moveValue = minimax(board, 0, false)
      board[move] = null

      if (moveValue > bestValue) {
        bestValue = moveValue
        bestMove = move
      }
    }

    return bestMove
  }

  const handleCellClick = async (index: number) => {
    if (board[index] || gameState !== "playing" || currentPlayer === "O") return

    const newBoard = [...board]
    newBoard[index] = "X"
    setBoard(newBoard)

    const { winner, line } = checkWinner(newBoard)
    if (winner) {
      setWinningLine(line)
      if (winner === "X") {
        setGameState("won")
        setScores((prev) => ({ ...prev, wins: prev.wins + 1 }))
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 3000)
      } else if (winner === "draw") {
        setGameState("draw")
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
      }
      return
    }

    setCurrentPlayer("O")
    setIsAiThinking(true)

    // AI move with delay for better UX
    setTimeout(
      () => {
        const aiMove = getAiMove(newBoard, difficulty)
        newBoard[aiMove] = "O"
        setBoard([...newBoard])
        setIsAiThinking(false)

        const { winner: aiWinner, line: aiLine } = checkWinner(newBoard)
        if (aiWinner) {
          setWinningLine(aiLine)
          if (aiWinner === "O") {
            setGameState("lost")
            setScores((prev) => ({ ...prev, losses: prev.losses + 1 }))
            setShowDefeat(true)
            setTimeout(() => setShowDefeat(false), 3000)
          } else if (aiWinner === "draw") {
            setGameState("draw")
            setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
          }
        } else {
          setCurrentPlayer("X")
        }
      },
      500 + Math.random() * 1000,
    ) // Random delay for more natural feel
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setGameState("playing")
    setWinningLine([])
    setShowCelebration(false)
    setShowDefeat(false)
  }

  const resetScores = () => {
    setScores({ wins: 0, losses: 0, draws: 0 })
  }

  // Fixed color particles
  const fixedParticles = [
    { left: "10%", top: "15%" },
    { left: "20%", top: "70%" },
    { left: "30%", top: "40%" },
    { left: "40%", top: "80%" },
    { left: "50%", top: "20%" },
    { left: "60%", top: "60%" },
    { left: "70%", top: "35%" },
    { left: "80%", top: "75%" },
    { left: "90%", top: "25%" },
    { left: "15%", top: "50%" },
    { left: "25%", top: "85%" },
    { left: "35%", top: "30%" },
    { left: "45%", top: "65%" },
    { left: "55%", top: "10%" },
    { left: "65%", top: "55%" },
    { left: "75%", top: "45%" },
    { left: "85%", top: "60%" },
    { left: "95%", top: "35%" },
    { left: "60%", top: "90%" },
    { left: "80%", top: "10%" },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6 relative">
      {/* Enhanced CSS for advanced animations */}
      <style jsx>{`
        @keyframes neon-glow {
          0%, 100% { 
            text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px currentColor;
          }
          50% { 
            text-shadow: 0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor, 0 0 12px currentColor;
          }
        }
        @keyframes cell-pop {
          0% { transform: scale(0.8) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes winning-pulse {
          0%, 100% { 
            background: rgba(236, 72, 153, 0.3);
            transform: scale(1);
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
          }
          50% { 
            background: rgba(236, 72, 153, 0.6);
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(236, 72, 153, 0.8);
          }
        }
        @keyframes celebration {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(5deg); }
        }
        @keyframes defeat-shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes ai-thinking {
          0%, 100% { opacity: 0.3; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes particle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
        @keyframes rainbow-border {
          0% { border-color: #ec4899; }
          25% { border-color: #8b5cf6; }
          50% { border-color: #3b82f6; }
          75% { border-color: #06b6d4; }
          100% { border-color: #ec4899; }
        }
        @keyframes screen-flash {
          0%, 100% { background: transparent; }
          50% { background: rgba(236, 72, 153, 0.1); }
        }
        @keyframes difficulty-glow {
          0%, 100% { box-shadow: 0 0 10px currentColor; }
          50% { box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
        }
        .neon-title { animation: neon-glow 2s ease-in-out infinite; }
        .cell-animate { animation: cell-pop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .winning-cell { animation: winning-pulse 1s ease-in-out infinite; }
        .celebration-mode { animation: celebration 0.5s ease-in-out infinite; }
        .defeat-mode { animation: defeat-shake 0.5s ease-in-out 3; }
        .ai-thinking { animation: ai-thinking 1s ease-in-out infinite; }
        .particle-animation { animation: particle-float 3s ease-in-out infinite; }
        .rainbow-border { animation: rainbow-border 2s linear infinite; }
        .screen-flash { animation: screen-flash 0.3s ease-in-out 3; }
        .difficulty-selected { animation: difficulty-glow 1s ease-in-out infinite; }
        .glass-effect {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .glass-hover:hover {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }
      `}</style>

      {/* Celebration/Defeat Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 screen-flash">
          <div className="text-center celebration-mode">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-6xl font-bold text-green-400 neon-title mb-4">YOU WIN!</h2>
            <div className="text-2xl text-green-300">Congratulations! 🏆</div>
          </div>
        </div>
      )}

      {showDefeat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="text-center defeat-mode">
            <div className="text-8xl mb-4">😔</div>
            <h2 className="text-6xl font-bold text-red-400 neon-title mb-4">YOU LOSE!</h2>
            <div className="text-2xl text-red-300">Better luck next time! 💪</div>
          </div>
        </div>
      )}

      {/* Fixed Color Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {fixedParticles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full particle-animation opacity-60"
            style={{
              left: p.left,
              top: p.top,
              background: i % 3 === 0
                ? "linear-gradient(to right, #f472b6, #a78bfa)"
                : i % 3 === 1
                  ? "linear-gradient(to right, #60a5fa, #818cf8)"
                  : "linear-gradient(to right, #fbbf24, #f472b6)"
            }}
          />
        ))}
      </div>

      {/* Difficulty Selection */}
      <div className="glass-effect rounded-2xl p-6 shadow-xl">
        <h3 className="text-center text-purple-200 mb-4 font-semibold">AI Difficulty</h3>
        <div className="flex gap-3">
          {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
            <Button
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                difficulty === diff
                  ? `difficulty-selected ${
                      diff === "easy"
                        ? "bg-green-500 text-white"
                        : diff === "medium"
                          ? "bg-yellow-500 text-black"
                          : "bg-red-500 text-white"
                    }`
                  : "glass-effect text-purple-200 hover:bg-white/20"
              }`}
            >
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Score Board */}
      <div className="glass-effect rounded-2xl p-6 shadow-xl hover:shadow-purple-500/25 transition-all duration-300 glass-hover">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-green-400 text-xl font-bold neon-title">Wins</div>
            <div className="text-3xl font-bold">{scores.wins}</div>
            <div className="text-purple-300 text-sm">You</div>
          </div>
          <div>
            <div className="text-purple-400 text-xl font-bold neon-title">Draws</div>
            <div className="text-3xl font-bold">{scores.draws}</div>
          </div>
          <div>
            <div className="text-red-400 text-xl font-bold neon-title">Losses</div>
            <div className="text-3xl font-bold">{scores.losses}</div>
            <div className="text-purple-300 text-sm">AI</div>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div
        className={`glass-effect rounded-3xl p-6 shadow-2xl transition-all duration-500 ${
          isAiThinking ? "ai-thinking" : "hover:shadow-purple-500/30"
        } ${gameState === "won" ? "rainbow-border" : ""}`}
      >
        <div className="grid grid-cols-3 gap-3 w-72 h-72">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className={`glass-effect rounded-xl flex items-center justify-center text-4xl font-bold transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-purple-500/30 border-purple-300/30 ${
                winningLine.includes(index) ? "winning-cell" : ""
              } ${isAiThinking && !cell ? "ai-thinking" : ""}`}
              disabled={!!cell || gameState !== "playing" || currentPlayer === "O"}
            >
              {cell && (
                <span
                  className={`${cell === "X" ? "text-pink-400 neon-title" : "text-blue-400 neon-title"} cell-animate`}
                >
                  {cell}
                </span>
              )}
              {isAiThinking && !cell && (
                <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Game Status */}
      <div className="text-center glass-effect rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
        <div className="text-purple-200 text-lg">
          {gameState === "playing" ? (
            isAiThinking ? (
              <span className="text-blue-400 neon-title">AI is thinking... 🤖</span>
            ) : currentPlayer === "X" ? (
              <span className="text-pink-400 neon-title">Your turn! ✨</span>
            ) : (
              <span className="text-blue-400 neon-title">AI`s turn 🎯</span>
            )
          ) : gameState === "won" ? (
            <span className="text-green-400 neon-title celebration-mode">You Won! 🎉</span>
          ) : gameState === "lost" ? (
            <span className="text-red-400 neon-title">AI Won! 🤖</span>
          ) : (
            <span className="text-yellow-400 neon-title">It is a Draw! 🤝</span>
          )}
        </div>
        <div className="text-purple-300 text-sm mt-1">
          {gameState === "playing" ? "Click any empty cell to make your move" : "Game Over - Start a new game!"}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={resetGame}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 rounded-xl px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-pink-500/50"
        >
          New Game 🎮
        </Button>
        <Button
          onClick={resetScores}
          className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white border-0 rounded-xl px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/50"
        >
          Reset Scores 📊
        </Button>
      </div>
    </div>
  )
}