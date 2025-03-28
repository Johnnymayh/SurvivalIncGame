import { useState } from 'react';
import useGameLogic from './hooks/useGameLogic';
import HealthDisplay from './components/HealthDisplay';
import GameStats from './components/GameStats';
import UpgradesBar from './components/UpgradesBar';
import PrestigeModal from './components/PrestigeModal';
import GameOverModal from './components/GameOverModal';

export default function App() {
  const game = useGameLogic();
  const [showPrestige, setShowPrestige] = useState(false);

  const togglePrestige = () => setShowPrestige(!showPrestige);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <style>{`
        .health-bar { transition: width 0.3s; }
        .damage-animation { animation: flashRed 0.5s; }
        .heal-animation { animation: flashGreen 0.5s; }
        @keyframes flashRed {
          0% { background-color: inherit; }
          50% { background-color: #f87171; }
          100% { background-color: inherit; }
        }
        @keyframes flashGreen {
          0% { background-color: inherit; }
          50% { background-color: #4ade80; }
          100% { background-color: inherit; }
        }
        .achievement-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #4f46e5;
          color: white;
          padding: 10px 15px;
          border-radius: 5px;
          z-index: 1000;
          animation: fadeIn 0.5s, fadeOut 0.5s 2.5s;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
      `}</style>

      {/* Main content area */}
      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Survival Incremental</h1>
        
        <HealthDisplay 
          health={game.health} 
          maxHealth={game.maxHealth}
          damageAnimation={game.damageAnimation}
          healAnimation={game.healAnimation}
        />
        
        <GameStats
          level={game.level}
          timeSurvived={game.timeSurvived}
          defense={game.defense}
          defenseMultiplier={game.defenseMultiplier}
          regeneration={game.regeneration}
          regenerationMultiplier={game.regenerationMultiplier}
          damage={game.damage}
          takingDamage={game.takingDamage}
          currencyGainMultiplier={game.currencyGainMultiplier}
          unlockedLevels={game.unlockedLevels}
          switchLevel={game.switchLevel}
          currency={game.currency}
          onShowPrestige={togglePrestige}
          showPrestige={showPrestige}
          prestigeMultiplier={game.prestigeMultiplier}
        />
      </div>

      {/* Bottom control bar */}
      <UpgradesBar
        defenseCost={game.defenseCost}
        regenerationCost={game.regenerationCost}
        healthCost={game.healthCost}
        currencyGainCost={game.currencyGainCost}
        upgradeDefense={game.upgradeDefense}
        upgradeRegeneration={game.upgradeRegeneration}
        upgradeHealth={game.upgradeHealth}
        upgradeCurrencyGain={game.upgradeCurrencyGain}
        takingDamage={game.takingDamage}
        setTakingDamage={game.setTakingDamage}
        currency={game.currency}
        defenseUpgrades={game.defenseUpgrades}
        regenerationUpgrades={game.regenerationUpgrades}
        healthUpgrades={game.healthUpgrades}
        currencyUpgrades={game.currencyGainUpgrades}
      />

      {/* Modals */}
      {showPrestige && (
        <PrestigeModal
          prestigeCurrency={game.prestigeCurrency}
          prestigeMultiplier={game.prestigeMultiplier}
          totalCurrencyEarned={game.totalCurrencyEarned}
          prestigeReset={() => {
            game.prestigeReset();
            setShowPrestige(false);
          }}
          onClose={togglePrestige}
        />
      )}

      {game.health <= 0 && (
        <GameOverModal 
          timeSurvived={game.timeSurvived}
          currency={game.currency}
          resetGame={game.resetGame}
        />
      )}
    </div>
  );
}