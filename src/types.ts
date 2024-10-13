export interface StarProps {
    value: number;
    color?: string;
    size?: 'lg' | '2x' | '3x' | '4x' | '5x';
    onValueChange: (value: number) => void;
};