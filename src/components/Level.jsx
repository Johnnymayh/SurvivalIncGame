import React, { useMemo, useRef } from 'react';

// Pool of sprites
const spritePool = [
  '/sprites/slime.png',
  '/sprites/imp.png',
  '/sprites/machine.png',
  '/sprites/priest.png',
  '/sprites/dragon.png',
];

const bossSprite = '/sprites/demon.png'; // Demon sprite for boss levels

export default function Level({ level, width, height, onBossLevel }) {
  // Store assigned sprites for each level
  const levelSprites = useRef({});

  // Use useMemo to assign a sprite to the level
  const sprite = useMemo(() => {
    // Check if the level is a boss level
    const isBossLevel = level % 10 === 0;

    if (isBossLevel) {
      // Assign the boss sprite for boss levels
      levelSprites.current[level] = bossSprite;
      if (onBossLevel) onBossLevel(true); // Notify parent that it's a boss level
      return bossSprite;
    }

    // If the level already has an assigned sprite, return it
    if (levelSprites.current[level]) {
      if (onBossLevel) onBossLevel(false); // Notify parent that it's not a boss level
      return levelSprites.current[level];
    }

    // Randomly assign a sprite from the pool for non-boss levels
    const randomIndex = Math.floor(Math.random() * spritePool.length);
    const assignedSprite = spritePool[randomIndex];
    levelSprites.current[level] = assignedSprite; // Save the assigned sprite
    if (onBossLevel) onBossLevel(false); // Notify parent that it's not a boss level
    return assignedSprite;
  }, [level, onBossLevel]); // Recalculate when the level changes

  return (
    <img
      src={sprite}
      alt={`Level ${level} Sprite`}
      width={width}
      height={height}
      style={{ objectFit: 'contain' }}
    />
  );
}