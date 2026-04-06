import React, { useId, useMemo } from 'react';
import type { StarProps, StarSize } from './types';
import './Stars.css';

const MAX = 5;

/** Heroicons-style 20×20 star path */
const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z';

const SIZE_PX: Record<StarSize, number> = {
  lg: 20,
  '2x': 28,
  '3x': 36,
  '4x': 44,
  '5x': 52,
};

function clampValue(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(MAX, Math.max(0, value));
}

function handleStarClick(value: number, index: number, onValueChange: (v: number) => void) {
  const target = index + 1;
  if (value === target) {
    onValueChange(index + 0.5);
    return;
  }
  if (index === 0 && value === 0.5) {
    onValueChange(0);
    return;
  }
  if (value === index + 0.5) {
    onValueChange(target);
    return;
  }
  onValueChange(target);
}

export function Stars({
  value: rawValue,
  color = '#ffc308',
  size = '2x',
  onValueChange,
  className,
  'aria-label': ariaLabel = 'Rating',
}: StarProps): React.ReactElement {
  const value = clampValue(rawValue);
  const baseId = useId().replace(/:/g, '');
  const sizeKey: StarSize = size in SIZE_PX ? size : '2x';
  const px = SIZE_PX[sizeKey];

  const style = useMemo(
    () =>
      ({
        '--stars-fill': color,
      }) as React.CSSProperties,
    [color],
  );

  return (
    <div
      className={['stars', className].filter(Boolean).join(' ')}
      style={style}
      role="group"
      aria-label={ariaLabel}
    >
      {Array.from({ length: MAX }, (_, index) => {
        const delta = value - index;
        const state = delta >= 1 ? 'full' : delta >= 0.5 ? 'half' : 'empty';
        const clipId = `${baseId}-half-${index}`;

        return (
          <button
            key={index}
            type="button"
            className="stars__btn"
            aria-label={`Set rating to ${index + 1} of ${MAX}`}
            onClick={() => handleStarClick(value, index, onValueChange)}
          >
            <svg
              className="stars__svg"
              width={px}
              height={px}
              viewBox="0 0 20 20"
              aria-hidden
            >
              <defs>
                <clipPath id={clipId}>
                  <rect x="0" y="0" width="10" height="20" />
                </clipPath>
              </defs>

              {state === 'empty' && (
                <path
                  className="stars__outline"
                  d={STAR_PATH}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.25}
                  strokeLinejoin="round"
                />
              )}

              {state === 'full' && (
                <path className="stars__fill" d={STAR_PATH} fill="currentColor" />
              )}

              {state === 'half' && (
                <>
                  <path
                    className="stars__outline"
                    d={STAR_PATH}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.25}
                    strokeLinejoin="round"
                  />
                  <g clipPath={`url(#${clipId})`}>
                    <path
                      className="stars__fill stars__fill--half"
                      d={STAR_PATH}
                      fill="currentColor"
                    />
                  </g>
                </>
              )}
            </svg>
          </button>
        );
      })}
    </div>
  );
}
