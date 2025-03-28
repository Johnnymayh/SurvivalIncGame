import { formatNumber } from '../utils/helpers';

export default function Prestige({
  prestigeCurrency,
  prestigeMultiplier,
  currency,
  totalCurrencyEarned, // Add this prop
  prestigeReset
}) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-4">
      <h2 className="text-xl font-semibold mb-2">Prestige</h2>
      
      <div className="bg-gray-700 p-4 rounded-lg">
        <p className="mb-2">Current Prestige: {prestigeCurrency}</p>
        <p className="mb-2">Current Bonus: {prestigeMultiplier}x currency</p>
        <p className="mb-2">Total Currency Ever Earned: {formatNumber(totalCurrencyEarned)}</p>
        <p className="mb-4">Earned this run: {formatNumber(totalCurrencyEarned)} (would give {Math.floor(totalCurrencyEarned / 10000)} prestige)</p>
        
        <button 
          onClick={prestigeReset} 
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded transition disabled:opacity-50"
          disabled={currency < 10000}
        >
          Prestige Reset (min 10k totalCurrencyEarned)<br/>
          Gain {Math.floor(totalCurrencyEarned/ 10000)} prestige
        </button>
      </div>
    </div>
  );
}