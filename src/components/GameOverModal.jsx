import { formatTime } from '../utils/helpers';

export default function GameOverModal({
  timeSurvived,
  currency,
  resetGame
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-red-900 p-6 rounded-lg max-w-md text-center">
        <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
        <p className="mb-2">You survived for {formatTime(timeSurvived)}</p>
        <p className="mb-4">Earned {Math.floor(currency / 100)} prestige currency</p>
        <button 
          onClick={resetGame} 
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
}