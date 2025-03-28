import { formatNumber, formatTime } from '../utils/helpers';

export default function GameUI({
  health, maxHealth, defense, regeneration,
  currency, timeSurvived, level,
  damage, takingDamage, autoDamage,
  unlockedLevels, switchLevel,
  levelTimers, defenseMultiplier,
  regenerationMultiplier, prestigeMultiplier,
  damageAnimation, healAnimation
}) {
  const healthPercentage = (health / maxHealth) * 100;
  const levelProgress = levelTimers[level] ? Math.min(levelTimers[level], 100) : 0;

  return (
    <>
      <div className={`mb-6 p-4 rounded-lg bg-gray-800 ${damageAnimation ? 'damage-animation' : ''} ${healAnimation ? 'heal-animation' : ''}`}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xl font-semibold">Health</span>
          <span className="text-lg">
            {Math.round(health)}/{maxHealth} <span className="text-gray-400">({Math.round(healthPercentage)}%)</span>
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div 
            className="health-bar bg-red-600 rounded-full h-4" 
            style={{ width: `${healthPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Stats</h2>
          <div className="space-y-2">
            <p>Level: {level}</p>
            <p>Time Survived: {formatTime(timeSurvived)}</p>
            <p>Defense: {defense} (x{defenseMultiplier})</p>
            <p>Regeneration: {regeneration}/s (x{regenerationMultiplier})</p>
            <p>Damage Taken: {takingDamage || autoDamage ? Math.max(damage - defense, 1) : 0}/s</p>
            <p>Currency: {formatNumber(currency)}</p>
            <p>Prestige Bonus: {prestigeMultiplier}x</p>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Levels</h2>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span>Level {level} Progress</span>
              <span>{levelProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className="health-bar bg-blue-500 rounded-full h-4" 
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: Math.max(...unlockedLevels) }, (_, i) => i + 1).map((lvl) => (
              <button 
                key={lvl} 
                onClick={() => switchLevel(lvl)}
                className={`px-3 py-1 rounded ${
                  level === lvl ? 'bg-green-600' : 
                  unlockedLevels.includes(lvl) ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}