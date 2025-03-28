import React, { useEffect, useState } from 'react';

const EnemySpawner = ({ levelWidth, levelHeight }) => {
  const [enemies, setEnemies] = useState([]);

  useEffect(() => {
    const newEnemies = [];
    for (let i = 0; i < 5; i++) {
      newEnemies.push({
        id: i,
        x: levelWidth - 512, // Left or right
        y: levelHeight - 512, // Top or bottom
        sprite: Math.random() > 0.5 ? '/Slime.png' : '/imP.png',
      });
    }
    setEnemies(newEnemies);
  }, [levelWidth, levelHeight]);

  return (
    <>
      {enemies.map((enemy) => (
        <img
          key={enemy.id}
          src={enemy.sprite}
          alt="Enemy"
          style={{
            position: 'absolute',
            left: `${enemy.x}px`,
            top: `${enemy.y}px`,
            width: '512px',
            height: '512px',
          }}
        />
      ))}
    </>
  );
};

export default EnemySpawner;
