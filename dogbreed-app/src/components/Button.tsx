import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary'; // Optional variant for different button styles
}

function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  // Basic style that can be extended or customized via props or CSS classes
  // For now, it relies on the global button styles in global.css
  // The `variant` prop isn't used yet but is there for future expansion
  return (
    <button {...props}>
      {children}
    </button>
  );
}

export default Button; 