import React, { useState, useEffect } from 'react';

interface Fact {
  id: string;
  text: string;
  imageUrl?: string; // Image is optional for now
}

interface FactCardProps {
  fact: Fact;
  onClick?: (factId: string) => void; // Optional click handler
}

export function FactCard({ fact, onClick }: FactCardProps): React.ReactElement {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (fact.imageUrl) {
      setImageStatus('loading');
      setCurrentImageUrl(fact.imageUrl); 
    } else {
      setImageStatus('error'); // No image URL provided
      setCurrentImageUrl(undefined);
    }
  }, [fact.imageUrl]);

  const cardStyle: React.CSSProperties = {
    width: '150px',
    minHeight: '200px',
    padding: '10px',
    border: '2px solid var(--secondary-color)',
    borderRadius: '10px',
    backgroundColor: 'var(--background-color)',
    boxShadow: isHovered || isFocused ? '0px 6px 12px rgba(0,0,0,0.15)' : '0px 3px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'transform 0.2s ease-in-out, boxShadow 0.2s ease-in-out, outline 0.1s ease-in-out',
    transform: isHovered || isFocused ? 'scale(1.03)' : 'scale(1)',
    fontFamily: 'var(--font-family-sans-serif)',
    outline: isFocused && onClick ? '3px solid var(--accent-color)' : 'none',
    outlineOffset: '2px',
  };

  const imageContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: '6px',
    backgroundColor: '#eee', // Placeholder background if no image
    marginBottom: '10px',
  };

  const imageStyle: React.CSSProperties = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    display: imageStatus === 'loaded' ? 'block' : 'none', // Only show if loaded
  };

  const textStyle: React.CSSProperties = {
    fontSize: '1rem',
    lineHeight: '1.4',
    color: 'var(--text-color-dark)',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5px',
  };

  const placeholderTextStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    color: '#888',
  };

  return (
    <div
      style={cardStyle}
      onClick={() => onClick && onClick(fact.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => { if(onClick) setIsFocused(true); }}
      onBlur={() => setIsFocused(false)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`Fun fact: ${fact.text}`}
    >
      <div style={imageContainerStyle}>
        {imageStatus === 'loading' && <span style={placeholderTextStyle}>Loading image...</span>}
        {imageStatus === 'error' && <span style={placeholderTextStyle}>(Cute image coming soon!)</span>}
        {currentImageUrl && (
          <img 
            src={currentImageUrl} 
            alt={`Illustration for fact: ${fact.text}`} 
            style={imageStyle} 
            onLoad={() => setImageStatus('loaded')}
            onError={() => setImageStatus('error')}
          />
        )}
      </div>
      <p style={textStyle}>{fact.text}</p>
    </div>
  );
} 