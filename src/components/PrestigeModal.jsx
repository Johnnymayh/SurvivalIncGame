import { formatNumber } from '../utils/helpers';

export default function PrestigeModal({
  prestigeCurrency,
  prestigeMultiplier,
  totalCurrencyEarned,
  prestigeReset,
  onClose
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Prestige</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Current Prestige: </span>
            <span className="font-medium">{prestigeCurrency}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Current Bonus: </span>
            <span className="font-medium">{prestigeMultiplier.toFixed(2)}x</span>
          </div>
          
          <div className="flex justify-between">
            <span>Total Earned: </span>
            <span className="font-medium">{Math.floor(totalCurrencyEarned)}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Would give: </span>
            <span className="font-medium">{Math.floor(totalCurrencyEarned / 10000)} prestige</span>
          </div>
          
          <div className="flex space-x-2 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={prestigeReset}
              disabled={totalCurrencyEarned < 10000}
              className={`flex-1 px-4 py-2 rounded ${
                totalCurrencyEarned >= 10000
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-500 cursor-not-allowed'
              }`}
            >
              Prestige (Min 10k)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}