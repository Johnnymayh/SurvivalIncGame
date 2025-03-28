export default function Actions({ takingDamage, setTakingDamage }) {
    return (
      <div className="bg-gray-800 p-2 rounded-lg">
        <button 
          onClick={() => setTakingDamage(!takingDamage)} 
          className={`w-full p-2 rounded-lg text-sm font-bold ${
            takingDamage ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {takingDamage ? 'STOP' : 'START'}
        </button>
      </div>
    );
  }