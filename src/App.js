import React, { useState } from 'react';
import useGameLogic from './hooks/useGameLogic';
import HealthDisplay from './components/HealthDisplay';
import GameStats from './components/GameStats';
import Level from './components/Level';
import UpgradesBar from './components/UpgradesBar';
import PrestigeModal from './components/PrestigeModal';
import GameOverModal from './components/GameOverModal';

export default function App() {
  const game = useGameLogic();
  const [showPrestige, setShowPrestige] = useState(false);
  const [isBossLevel, setIsBossLevel] = useState(false); // Track if the current level is a boss level

  const togglePrestige = () => setShowPrestige(!showPrestige);

  // Callback to handle boss level detection
  const handleBossLevel = (isBoss) => {
    setIsBossLevel(isBoss);
  };

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
      <div
        className="flex flex-1 p-4"
        style={{
          display: 'flex',
          alignItems: 'flex-start', // Align both sections at the top
          justifyContent: 'space-between', // Space between left and right sections
        }}
      >
        {/* Left Section: Stats and Health */}
        <div
          style={{
            flex: 1, // Allow the left section to take up remaining space
            paddingRight: '20px', // Add spacing between left and right sections
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // Align components to the top
            alignItems: 'flex-start', // Align items to the left
          }}
        >
          <h1 className="text-2xl font-bold">Survival Incremental</h1>
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
            damage={isBossLevel ? game.damage * 2 : game.damage} // Double damage on boss levels
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

        {/* Right Section: Sprite/Level */}
        <div
          style={{
            flex: '0 0 auto', // Prevent the right section from stretching
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-start', // Align sprite to the top
          }}
        >
          <Level
            level={game.level}
            width={512}
            height={512}
            onBossLevel={handleBossLevel} // Pass the callback to detect boss levels
          />
        </div>
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