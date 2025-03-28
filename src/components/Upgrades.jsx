import { formatNumber } from '../utils/helpers';

export default function Upgrades({
  defenseCost = 50,
  regenerationCost = 50,
  healthCost = 50,
  currencyGainCost = 50,
  upgradeDefense,
  upgradeRegeneration,
  upgradeHealth,
  upgradeCurrencyGain,
  defenseMultiplier = 1,
  regenerationMultiplier = 1,
  healthMultiplier = 1,
  currencyGainMultiplier = 1,
  defenseUpgrades = 0,
  regenerationUpgrades = 0,
  healthUpgrades = 0,
  currencyGainUpgrades = 0,
  currency = 0
}) {
  return (
    <div className="fixed right-4 top-4 w-80 bg-gray-800 p-4 rounded-lg space-y-4 h-[calc(100vh-2rem)] overflow-y-auto">
      <h2 className="text-lg font-semibold">UPGRADES</h2>
      
      <div className="space-y-3">
        {/* Defense Upgrade */}
        <div className="bg-gray-700 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">Defense </span>
            <span className="text-sm">{formatNumber(defenseCost)} gold</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">+{5 * defenseMultiplier} defense </span>
            <span className="text-xs text-gray-400">Level {defenseUpgrades} {defenseUpgrades % 10 === 0 && defenseUpgrades > 0 && '(DOUBLED)'}</span>
          </div>
          <button
            onClick={upgradeDefense}
            disabled={currency < defenseCost}
            className={`w-full py-2 rounded ${
              currency >= defenseCost
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Upgrade
          </button>
        </div>

        {/* Regeneration Upgrade */}
        <div className="bg-gray-700 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">Regeneration </span>
            <span className="text-sm">{formatNumber(regenerationCost)} gold</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">+{2 * regenerationMultiplier}/s </span>
            <span className="text-xs text-gray-400">Level {regenerationUpgrades} {regenerationUpgrades % 10 === 0 && regenerationUpgrades > 0 && '(DOUBLED)'}</span>
          </div>
          <button
            onClick={upgradeRegeneration}
            disabled={currency < regenerationCost}
            className={`w-full py-2 rounded ${
              currency >= regenerationCost
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Upgrade
          </button>
        </div>

        {/* Health Upgrade */}
        <div className="bg-gray-700 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">Max Health </span>
            <span className="text-sm">{formatNumber(healthCost)} gold</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">+{50 * healthMultiplier} HP </span>
            <span className="text-xs text-gray-400">Level {healthUpgrades} {healthUpgrades % 10 === 0 && healthUpgrades > 0 && '(DOUBLED)'}</span>
          </div>
          <button
            onClick={upgradeHealth}
            disabled={currency < healthCost}
            className={`w-full py-2 rounded ${
              currency >= healthCost
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Upgrade
          </button>
        </div>

        {/* Currency Gain Upgrade */}
        <div className="bg-gray-700 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">Currency Gain </span>
            <span className="text-sm">{formatNumber(currencyGainCost)} gold</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">x{currencyGainMultiplier.toFixed(2)} income </span>
            <span className="text-xs text-gray-400">Level {currencyGainUpgrades} {currencyGainUpgrades % 10 === 0 && currencyGainUpgrades > 0 && '(DOUBLED)'}</span>
          </div>
          <button
            onClick={upgradeCurrencyGain}
            disabled={currency < currencyGainCost}
            className={`w-full py-2 rounded ${
              currency >= currencyGainCost
                ? 'bg-yellow-600 hover:bg-yellow-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}