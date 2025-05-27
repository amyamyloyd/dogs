import React, { useState } from 'react';

interface AgeSelectorProps {
  onAgeSelected: (age: { years: number; months: number } | null) => void;
}

export function AgeSelector({ onAgeSelected }: AgeSelectorProps): React.ReactElement {
  const [selectedYears, setSelectedYears] = useState<number | null>(null);
  const [selectedMonths, setSelectedMonths] = useState<number | null>(null);

  const handleYearSelect = (year: number) => {
    setSelectedYears(year);
    // Reset months if years change
    setSelectedMonths(null); 
  };

  const handleMonthSelect = (month: number) => {
    setSelectedMonths(month);
  };

  const handleSubmit = () => {
    if (selectedYears !== null && selectedMonths !== null) {
      onAgeSelected({ years: selectedYears, months: selectedMonths });
    } else if (selectedYears !== null) {
      // If only years are selected, assume 0 months
      onAgeSelected({ years: selectedYears, months: 0 });
    }
    // If nothing is selected, it's like a skip, but we have a dedicated skip button
  };

  const handleSkip = () => {
    onAgeSelected(null);
  };

  const years = [1, 2, 3, 4, 5];
  const months = Array.from({ length: 12 }, (_, i) => i); // 0-11

  // Basic styling (will be refined)
  const selectorContainerStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: 'var(--background-color-light)',
    borderRadius: '15px',
    textAlign: 'center',
    fontFamily: 'var(--font-family-sans-serif)',
    maxWidth: '500px',
    margin: '20px auto',
    boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
  };

  const headingStyle: React.CSSProperties = {
    color: 'var(--primary-color)',
    fontSize: '1.8rem',
    marginBottom: '20px',
  };

  const sectionHeadingStyle: React.CSSProperties = {
    color: 'var(--text-color-dark)',
    fontSize: '1.2rem',
    marginTop: '20px',
    marginBottom: '10px',
  };

  const buttonGroupStyle: React.CSSProperties = {
    margin: '15px 0',
  };

  const itemButtonStyle: React.CSSProperties = {
    padding: '10px 15px',
    margin: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: '2px solid var(--accent-color)',
    borderRadius: '8px',
    backgroundColor: 'var(--text-light-color)',
    color: 'var(--text-color)',
    transition: 'background-color 0.2s, border-color 0.2s',
  };
  
  const selectedItemButtonStyle: React.CSSProperties = {
    ...itemButtonStyle,
    backgroundColor: 'var(--accent-color)',
    color: 'var(--text-light-color)',
    borderColor: 'var(--primary-color-dark)',
  };

  const actionButtonStyle: React.CSSProperties = {
    ...itemButtonStyle,
    padding: '12px 25px',
    fontSize: '1.1rem',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    borderColor: 'var(--primary-color-dark)',
    margin: '10px'
  };
  
  const skipButtonStyle: React.CSSProperties = {
    ...itemButtonStyle,
    backgroundColor: 'transparent',
    color: 'var(--secondary-color)',
    borderColor: 'var(--secondary-color)',
  };

  return (
    <div style={selectorContainerStyle}>
      <h2 id="age-selector-heading" style={headingStyle}>How old are you, little explorer?</h2>
      
      <div role="group" aria-labelledby="years-heading">
        <h3 id="years-heading" style={sectionHeadingStyle}>Years</h3>
        <div style={buttonGroupStyle}>
          {years.map(year => (
            <button 
              key={year} 
              onClick={() => handleYearSelect(year)}
              style={selectedYears === year ? selectedItemButtonStyle : itemButtonStyle}
              aria-pressed={selectedYears === year}
              aria-label={`Select ${year} years`}
            >
              {year} {/* We can replace this with cake/candle icons later */}
            </button>
          ))}
        </div>
      </div>

      {selectedYears !== null && (
        <div role="group" aria-labelledby="months-heading">
          <h3 id="months-heading" style={sectionHeadingStyle}>Months</h3>
          <div style={buttonGroupStyle}>
            {months.map(month => (
              <button 
                key={month} 
                onClick={() => handleMonthSelect(month)}
                style={selectedMonths === month ? selectedItemButtonStyle : itemButtonStyle}
                aria-pressed={selectedMonths === month}
                aria-label={`Select ${month} months`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={handleSubmit} 
          disabled={selectedYears === null} 
          style={actionButtonStyle}
          aria-label="Confirm age selection"
        >
          All Set!
        </button>
        <button 
          onClick={handleSkip} 
          style={skipButtonStyle}
          aria-label="Skip age selection"
        >
          Skip for Now
        </button>
      </div>
    </div>
  );
}

// We'll need to import and use this component in App.tsx later.
// Also, need to consider how this interacts with showing breed selection.
// Perhaps this is a modal or a separate view that appears first. 