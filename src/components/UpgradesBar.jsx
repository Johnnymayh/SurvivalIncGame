import { formatNumber } from '../utils/helpers';

export default function UpgradesBar({
  defenseCost,
  regenerationCost,
  healthCost,
  currencyGainCost,
  upgradeDefense,
  upgradeRegeneration,
  upgradeHealth,
  upgradeCurrencyGain,
  takingDamage,
  setTakingDamage,
  currency,
  defenseUpgrades = 0,
  regenerationUpgrades = 0,
  healthUpgrades = 0,
  currencyUpgrades = 0
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-2 border-t border-gray-700">
      <div className="flex overflow-x-auto space-x-2">
        {/* Damage Toggle Button */}
        <button
          onClick={() => setTakingDamage(!takingDamage)}
          className={`flex-shrink-0 px-4 py-2 rounded ${
            takingDamage 
              ? 'bg-yellow-600 hover:bg-yellow-700' 
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {takingDamage ? '■ STOP' : '▶ START'}
        </button>

        {/* Defense Upgrade */}
        <button
          onClick={upgradeDefense}
          disabled={currency < defenseCost}
          className={`flex-shrink-0 px-4 py-2 rounded ${
            currency >= defenseCost
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
         Level {defenseUpgrades} Defense ({formatNumber(defenseCost)}) + {5 * Math.pow(2, Math.floor(defenseUpgrades/10))} defense
        </button>

        {/* Regeneration Upgrade */}
        <button
          onClick={upgradeRegeneration}
          disabled={currency < regenerationCost}
          className={`flex-shrink-0 px-4 py-2 rounded ${
            currency >= regenerationCost
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
         Level {regenerationUpgrades} Regen ({formatNumber(regenerationCost)}) + {2 * Math.pow(2, Math.floor(regenerationUpgrades/10))} /s
        </button>

        {/* Health Upgrade */}
        <button
          onClick={upgradeHealth}
          disabled={currency < healthCost}
          className={`flex-shrink-0 px-4 py-2 rounded ${
            currency >= healthCost
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
         Level {healthUpgrades} Health ({formatNumber(healthCost)}) + {50 * Math.pow(2, Math.floor(healthUpgrades/10))} HP
        </button>

        {/* Currency Gain Upgrade */}
        <button
          onClick={upgradeCurrencyGain}
          disabled={currency < currencyGainCost}
          className={`flex-shrink-0 px-4 py-2 rounded ${
            currency >= currencyGainCost
              ? 'bg-yellow-600 hover:bg-yellow-700'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
         Level {currencyUpgrades} Gold ({formatNumber(currencyGainCost)}) * 1.01
        </button>
      </div>
    </div>
  );
}