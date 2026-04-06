export type StarSize = 'lg' | '2x' | '3x' | '4x' | '5x';

export interface StarProps {
  /** Current rating from 0 to 5 in steps of 0.5 */
  value: number;
  /** Fill color for active star segments */
  color?: string;
  /** Visual size preset (maps to pixel dimensions on the SVG) */
  size?: StarSize;
  /** Called when the user selects a new rating */
  onValueChange: (value: number) => void;
  /** Optional class on the outer wrapper */
  className?: string;
  /** Accessible label for the rating control (default: "Rating") */
  'aria-label'?: string;
}
