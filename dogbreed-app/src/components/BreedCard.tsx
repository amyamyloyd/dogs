import React from 'react';
import { type Breed } from '../utils/breedData'; // Corrected type-only import

interface BreedCardProps {
  breed: Breed;
  onClick: (breedId: string) => void;
  isSelected: boolean;
}

const cardStyle: React.CSSProperties = {
  border: '2px solid var(--accent-color)',
  padding: '10px',
  width: '150px',
  height: '220px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  cursor: 'pointer',
  backgroundColor: 'var(--text-light-color)',
  borderRadius: '10px',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out',
};

const imageStyle: React.CSSProperties = {
  width: '100px',
  height: '100px',
  objectFit: 'contain',
  marginBottom: '10px',
};

const nameStyle: React.CSSProperties = {
  fontSize: '1rem',
  margin: 0,
  color: 'var(--text-color)',
};

function BreedCard({ breed, onClick, isSelected }: BreedCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const dynamicCardStyle: React.CSSProperties = {
    ...cardStyle,
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isHovered ? '0px 5px 15px rgba(0,0,0,0.1)' : 'none',
    borderColor: isSelected ? 'var(--primary-color)' : 'var(--accent-color)',
    borderWidth: isSelected ? '4px' : '2px',
  };
  
  return (
    <button 
      onClick={() => onClick(breed.id)}
      style={dynamicCardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Select ${breed.name}`}
    >
      <img 
        src={breed.imagePath} 
        alt={`${breed.name}`}
        style={imageStyle} 
      />
      <h3 style={nameStyle}>{breed.name}</h3>
    </button>
  );
}

export default BreedCard; 