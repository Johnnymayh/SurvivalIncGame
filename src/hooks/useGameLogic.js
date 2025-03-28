import { useState, useEffect } from 'react';
import { formatNumber, formatTime } from '../utils/helpers';

export default function useGameLogic() {
  // Game state
  const [health, setHealth] = useState(100);
  const [maxHealth, setMaxHealth] = useState(100);
  const [defense, setDefense] = useState(5);
  const [regeneration, setRegeneration] = useState(1);
  const [currency, setCurrency] = useState(0);
  const [damage, setDamage] = useState(10);
  const [timeSurvived, setTimeSurvived] = useState(0);
  const [takingDamage, setTakingDamage] = useState(false);
  const [totalCurrencyEarned, setTotalCurrencyEarned] = useState(0);
  
  // Upgrade system
  const [defenseCost, setDefenseCost] = useState(50);
  const [regenerationCost, setRegenerationCost] = useState(50);
  const [healthCost, setHealthCost] = useState(50);
  const [currencyGainCost, setCurrencyGainCost] = useState(50);
  const [defenseUpgrades, setDefenseUpgrades] = useState(0);
  const [regenerationUpgrades, setRegenerationUpgrades] = useState(0);
  const [healthUpgrades, setHealthUpgrades] = useState(0);
  const [currencyGainUpgrades, setCurrencyGainUpgrades] = useState(0);
  
  // Level system
  const [level, setLevel] = useState(1);
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [levelTimers, setLevelTimers] = useState({ 1: 0 });
  
  // Prestige
  const [prestigeCurrency, setPrestigeCurrency] = useState(0);
  const [damageAnimation, setDamageAnimation] = useState(false);
  const [healAnimation, setHealAnimation] = useState(false);
  const [achievements, setAchievements] = useState([]);

  // Counters and Multipliers
  const defenseLevel = defenseUpgrades;
  const regenLevel = regenerationUpgrades;
  const healthLevel = healthUpgrades;
  const currencyGainLevel = currencyGainUpgrades;

  const defenseMultiplier = Math.pow(2, Math.floor(defenseLevel / 10));
  const regenerationMultiplier = Math.pow(2, Math.floor(regenLevel / 10));
  const healthMultiplier = Math.pow(2, Math.floor(healthLevel / 10));
  const currencyGainMultiplier = (1.01 ** (currencyGainLevel || 0)) * Math.pow(2, Math.floor((currencyGainLevel || 0) / 10));
  const prestigeMultiplier = 1 + ((Math.log(prestigeCurrency +1) * 3 || 0));

  // Visual effects
  useEffect(() => {
    if (damageAnimation) {
      const timer = setTimeout(() => setDamageAnimation(false), 500);
      return () => clearTimeout(timer);
    }
  }, [damageAnimation]);

  useEffect(() => {
    if (healAnimation) {
      const timer = setTimeout(() => setHealAnimation(false), 500);
      return () => clearTimeout(timer);
    }
  }, [healAnimation]);

  // Main game loop
  useEffect(() => {
    if (takingDamage) {
      const interval = setInterval(() => {
        const effectiveDamage = Math.max(damage - defense, 1);
        const netChange = regeneration - effectiveDamage;
        const newHealth = Math.min(Math.max(health + netChange, 0), maxHealth);
        
        const earnedCurrency = damage * prestigeMultiplier * currencyGainMultiplier;
        
        setHealth(newHealth);
        setCurrency(prev => prev + earnedCurrency);
        setTotalCurrencyEarned(prev => prev + earnedCurrency);
        setTimeSurvived(prev => prev + 1);
        setLevelTimers(prev => ({ ...prev, [level]: (prev[level] || 0) + 1 }));
        
        if (newHealth < health) setDamageAnimation(true);
        if (newHealth > health) setHealAnimation(true);
        checkAchievements();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [takingDamage, damage, defense, regeneration, health, maxHealth, level, prestigeMultiplier]);

  // Level unlocking (10 seconds)
  useEffect(() => {
    if (levelTimers[level] >= 10 && !unlockedLevels.includes(level + 1)) {
      setUnlockedLevels([...unlockedLevels, level + 1]);
      addAchievement(`Unlocked Level ${level + 1}`);
    }
  }, [levelTimers, level, unlockedLevels]);

  // Game over check
  useEffect(() => {
    if (health <= 0) {
      resetGame();
    }
  }, [health]);

  const checkAchievements = () => {
    const newAchievements = [];
    if (timeSurvived >= 60 && !achievements.includes('survive_1min')) newAchievements.push('survive_1min');
    if (timeSurvived >= 300 && !achievements.includes('survive_5min')) newAchievements.push('survive_5min');
    if (currency >= 1000 && !achievements.includes('earn_1k')) newAchievements.push('earn_1k');
    if (level >= 5 && !achievements.includes('reach_level5')) newAchievements.push('reach_level5');
    
    if (newAchievements.length > 0) {
      setAchievements([...achievements, ...newAchievements]);
      newAchievements.forEach(ach => addAchievement(getAchievementName(ach)));
    }
  };

  const getAchievementName = (id) => {
    const names = {
      'survive_1min': 'Survivor (1 min)',
      'survive_5min': 'Veteran (5 min)',
      'earn_1k': 'Rich (1k gold)',
      'reach_level5': 'Adventurer (Lvl 5)'
    };
    return names[id] || id;
  };

  const addAchievement = (name) => {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.textContent = `Achievement: ${name}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const resetGame = () => {
    const newPrestige = prestigeCurrency + Math.floor(totalCurrencyEarned / 10000);
    setPrestigeCurrency(newPrestige);
    setHealth(100);
    setMaxHealth(100);
    setDefense(5);
    setRegeneration(1);
    setCurrency(0);
    setTotalCurrencyEarned(0);
    setDamage(10);
    setTimeSurvived(0);
    setTakingDamage(false);
    setDefenseCost(50);
    setRegenerationCost(50);
    setHealthCost(50);
    setDefenseUpgrades(0);
    setRegenerationUpgrades(0);
    setHealthUpgrades(0);
    setLevel(1);
    setUnlockedLevels([1]);
    setLevelTimers({ 1: 0 });
  };

  const prestigeReset = () => {
    setPrestigeCurrency(prestigeCurrency + Math.floor(totalCurrencyEarned / 10000));
    resetGame();
  };

  const upgradeDefense = () => {
    if (currency >= defenseCost) {
      setCurrency(currency - defenseCost);
      
      // Check if reaching a multiplier level
      if ((defenseUpgrades + 1) % 10 === 0) {
        // Double the multiplier at level 10, 20, 30, etc.
        setDefense(prev => (prev + 5 * defenseMultiplier) * 2);
        setDefenseUpgrades(defenseUpgrades + 1);
        setDefenseCost(Math.ceil(defenseCost * 1.3));
      } else {
      
      // Regular upgrade
      setDefense(defense + (5 * defenseMultiplier));
      setDefenseUpgrades(defenseUpgrades + 1);
      setDefenseCost(Math.ceil(defenseCost * 1.2));
    } }
  };

  const upgradeRegeneration = () => {
    if (currency >= regenerationCost) {
      setCurrency(currency - regenerationCost);
      
      // Check if reaching a multiplier level
      if ((regenerationUpgrades + 1) % 10 === 0) {
        // Double the multiplier at level 10, 20, 30, etc.
        setRegeneration(prev => (prev + 2 * regenerationMultiplier) * 2);
        setRegenerationUpgrades(regenerationUpgrades + 1);
        setRegenerationCost(Math.ceil(regenerationCost * 1.3));
      } else {
      
      // Regular upgrade
      setRegeneration(regeneration + (2 * regenerationMultiplier));
      setRegenerationUpgrades(regenerationUpgrades + 1);
      setRegenerationCost(Math.ceil(regenerationCost * 1.2));
    } }
  };

  const upgradeHealth = () => {
    if (currency >= healthCost) {
      setCurrency(currency - healthCost);
      
      // Check if reaching a multiplier level
      if ((healthUpgrades + 1) % 10 === 0) {
        // Double the multiplier at level 10, 20, 30, etc.
        setMaxHealth(prev => (prev + 50 * healthMultiplier) * 2);
        setHealthUpgrades(healthUpgrades + 1);
        setHealthCost(Math.ceil(healthCost * 1.3));
      } else {
      
      // Regular upgrade
      setMaxHealth(maxHealth + (50 * healthMultiplier));
      setHealth(prev => Math.min(prev + (50 * healthMultiplier), maxHealth + 50));
      setHealthUpgrades(healthUpgrades + 1);
      setHealthCost(Math.ceil(healthCost * 1.2));
    } }
  };

  const upgradeCurrencyGain = () => {
    if (currency >= currencyGainCost) {
      setCurrency(currency - currencyGainCost);
      
      // Check if reaching a multiplier level
      const currentUpgradeLevel = currencyGainUpgrades + 1;
      if (currentUpgradeLevel % 10 === 0) {
        // Double the multiplier at level 10, 20, 30, etc.
        setCurrencyGainUpgrades(currentUpgradeLevel);
      }
      
      setCurrencyGainUpgrades(currentUpgradeLevel);
      setCurrencyGainCost(Math.ceil(currencyGainCost * 1.3));
    }
  };

  const switchLevel = (newLevel) => {
    if (unlockedLevels.includes(newLevel)) {
      setLevel(newLevel);
      setDamage(5 * Math.pow(5, newLevel - 1));
      setTakingDamage(false);
      if (!levelTimers[newLevel]) {
        setLevelTimers(prev => ({ ...prev, [newLevel]: 0 }));
      }
    }
  };

  return {
    // State
    health, maxHealth, defense, regeneration, currency,
    damage, timeSurvived, takingDamage, totalCurrencyEarned,
    defenseCost, regenerationCost, healthCost, currencyGainCost,
    level, unlockedLevels, levelTimers,
    prestigeCurrency, prestigeMultiplier, currencyGainMultiplier,
    defenseUpgrades, regenerationUpgrades, healthUpgrades, currencyGainUpgrades,
    damageAnimation, healAnimation, regenerationMultiplier, healthMultiplier, defenseMultiplier,
    
    // Functions
    upgradeDefense, upgradeRegeneration, upgradeHealth, upgradeCurrencyGain,
    setTakingDamage, switchLevel, resetGame, prestigeReset
  };
}