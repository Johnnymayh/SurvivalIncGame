export default function DamageButton({ takingDamage, setTakingDamage }) {
    return (
      <div className="bg-gray-800 p-3 rounded-lg">
        <button 
          onClick={() => setTakingDamage(!takingDamage)}
          className={`w-full p-3 rounded-lg font-bold ${
            takingDamage 
              ? 'bg-yellow-600 hover:bg-yellow-700' 
              : 'bg-purple-600 hover:bg-purple-700'
          } transition-colors`}
        >
          {takingDamage ? '■ STOP TAKING DAMAGE' : '▶ START TAKING DAMAGE'}
        </button>
      </div>
    );
  }