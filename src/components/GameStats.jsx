import { formatTime, formatNumber } from '../utils/helpers';

export default function GameStats({
  level,
  timeSurvived,
  defense,
  defenseMultiplier,
  regeneration,
  regenerationMultiplier,
  damage,
  takingDamage,
  currencyGainMultiplier,
  unlockedLevels,
  switchLevel,
  currency,
  onShowPrestige,
  showPrestige,
  prestige
}) {
  const effectiveDamage = Math.max(damage - defense, 1);
  const isRegenerating = regeneration > effectiveDamage && takingDamage;

  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-4">
      <h2 className="text-lg font-semibold">STATS</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Level: </span>
          <span className="font-medium">{level}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Time Survived: </span>
          <span className="font-medium">{formatTime(timeSurvived)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Defense: </span>
          <span className="font-medium">{defense} (x{defenseMultiplier})</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Regen: </span>
          <span className="font-medium">{regeneration}/s (x{regenerationMultiplier})</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Damage Taken: </span>
          <span className={`font-medium ${isRegenerating ? 'text-green-400' : ''}`}>
            {isRegenerating ? '0' : effectiveDamage} / s
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Currency: </span>
          <span className="font-medium">{Math.floor(currency)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Gold Multiplier: </span>
          <span className="font-medium">x{(currencyGainMultiplier || 0).toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Prestige: {[prestige]} </span>
          <button 
            onClick={onShowPrestige}
            className={`text-blue-400 hover:text-blue-300 ${
              showPrestige ? 'font-bold underline' : ''
            }`}
          >
            {showPrestige ? 'Hide ▲' : 'View ▼'}
          </button>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-md font-medium mb-2">LEVELS</h3>
        <div className="flex flex-wrap gap-2">
          {unlockedLevels.map(lvl => (
            <button
              key={lvl}
              onClick={() => switchLevel(lvl)}
              className={`px-3 py-1 rounded-md ${
                level === lvl ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}