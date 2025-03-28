export default function HealthDisplay({ health, maxHealth, damageAnimation, healAnimation }) {
    const healthPercentage = (health / maxHealth) * 100;
    
    return (
      <div className={`bg-gray-800 p-4 rounded-lg ${
        damageAnimation ? 'damage-animation' : ''} ${
        healAnimation ? 'heal-animation' : ''}`}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-md font-semibold">HP: {Math.round(health)} / {maxHealth}</span>
          <span className="text-sm text-gray-400 ml-2">({Math.round(healthPercentage)}%)</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="health-bar bg-red-600 rounded-full h-3" 
            style={{ width: `${healthPercentage}%` }}
          ></div>
        </div>
      </div>
    );
  }
