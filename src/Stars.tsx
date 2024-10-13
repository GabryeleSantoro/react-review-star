import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt as starHalf, faStar as starEmpty } from '@fortawesome/free-regular-svg-icons';
import { faStar as starFull } from '@fortawesome/free-solid-svg-icons';
import './Stars.css';

// Define the props interface
interface StarProps {
    value: number;
    color?: string;    
    onValueChange: (value: number) => void;
    size?: 'lg' | '2x' | '3x' | '4x' | '5x';
}

export const Stars: React.FC<StarProps> = ({ value, color = '#FFC308', size = '2x', onValueChange }: StarProps) => {
    const MAX_VALUE = 5;

    // Validate props
    if (value < 0 || value > MAX_VALUE) {
        throw new Error("Invalid value. The value must be between 0 and 5.");
    }

    const allowedSizes = ['lg', '2x', '3x', '4x', '5x'];
    if (!allowedSizes.includes(size)) {
        size = '2x';
    }

    function handleStarClick(index: number) {
        if (value === index + 1) {
            onValueChange(index + 0.5);
        } else if (index === 0 && value === 0.5) {
            onValueChange(0);
        } else if (value === index + 0.5) { 
            onValueChange(index + 1 - 0.5);
        } else {
            onValueChange(index + 1);
        }
    }

    return (
        <>
            {Array.from({ length: 5 }, (_, index) => {
                const val = value - index;
                return (
                    <FontAwesomeIcon
                        key={index}
                        icon={val >= 1 ? starFull : val >= 0.5 ? starHalf : starEmpty}
                        color={color}
                        size={size}
                        className={`icon-clickable ${val >= 1 ? 'filled' : val === 0.5 ? 'half-filled' : 'empty'}`}
                        onClick={() => handleStarClick(index)}
                    />
                );
            })}
        </>
    );
};
