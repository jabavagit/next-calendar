import React from 'react';

interface FloatingActionButtonProps {
  onClick: () => void;
  position?: 'left' | 'right';
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  position = 'right',
}) => (
  <button
    className={`fixed bottom-6 z-40 btn btn-primary btn-circle shadow-lg
      ${position === 'left' ? 'left-6' : 'right-6'}`}
    title="Crear evento"
    onClick={onClick}
    style={{
      width: 56,
      height: 56,
      fontSize: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    +
  </button>
);

export default FloatingActionButton;
