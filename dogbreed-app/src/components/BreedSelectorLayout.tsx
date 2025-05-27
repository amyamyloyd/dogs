import React from 'react';

interface BreedSelectorLayoutProps {
  children: React.ReactNode; // Will hold the individual breed buttons/cards
}

const layoutStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap', // Allows items to wrap to the next line on smaller screens
  justifyContent: 'center', // Center items horizontally
  gap: '20px', // Space between breed items
  padding: '20px',
  maxWidth: '900px', // Max width for the container
  margin: '0 auto', // Center the container itself
};

function BreedSelectorLayout({ children }: BreedSelectorLayoutProps) {
  return (
    <div style={layoutStyle}>
      {children}
    </div>
  );
}

export default BreedSelectorLayout; 