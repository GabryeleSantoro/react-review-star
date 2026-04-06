import React, { useId, useMemo } from 'react';
import {
  DEFAULT_STAR_PATH,
  DEFAULT_STAR_VIEW_BOX,
  type StarIconOptions,
  type StarProps,
  type StarSize,
} from './types';
import './Stars.css';

const MAX = 5;

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

function parseViewBox(viewBox: string): { x: number; y: number; w: number; h: number } {
  const parts = viewBox
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n)) || parts[2] <= 0 || parts[3] <= 0) {
    const fb = parseViewBox(DEFAULT_STAR_VIEW_BOX);
    return fb;
  }
  return { x: parts[0], y: parts[1], w: parts[2], h: parts[3] };
}

function clampHalfFraction(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0.5;
  return Math.min(1, Math.max(0.02, n));
}

interface ResolvedIcon {
  path: string;
  viewBox: string;
  strokeWidth: number;
  emptyColor: string | undefined;
  halfWidthFraction: number;
}

function resolveIcon(icon: StarIconOptions | undefined): ResolvedIcon {
  return {
    path: icon?.path ?? DEFAULT_STAR_PATH,
    viewBox: icon?.viewBox ?? DEFAULT_STAR_VIEW_BOX,
    strokeWidth: icon?.strokeWidth ?? 1.25,
    emptyColor: icon?.emptyColor,
    halfWidthFraction: clampHalfFraction(icon?.halfWidthFraction),
  };
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
  gap,
  icon: iconProp,
}: StarProps): React.ReactElement {
  const value = clampValue(rawValue);
  const baseId = useId().replace(/:/g, '');
  const sizeKey: StarSize = size in SIZE_PX ? size : '2x';
  const px = SIZE_PX[sizeKey];
  const icon = resolveIcon(iconProp);
  const vb = useMemo(() => parseViewBox(icon.viewBox), [icon.viewBox]);

  const style = useMemo(() => {
    const s: React.CSSProperties = { '--stars-fill': color } as React.CSSProperties;
    if (icon.emptyColor != null) {
      (s as React.CSSProperties & { '--stars-track': string })['--stars-track'] = icon.emptyColor;
    }
    if (gap != null) {
      (s as React.CSSProperties & { '--stars-gap': string })['--stars-gap'] =
        typeof gap === 'number' ? `${gap}px` : gap;
    }
    return s;
  }, [color, icon.emptyColor, gap]);

  const clipW = vb.w * icon.halfWidthFraction;

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
        const path = icon.path;
        const sw = icon.strokeWidth;

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
              viewBox={icon.viewBox}
              aria-hidden
            >
              <defs>
                <clipPath id={clipId}>
                  <rect x={vb.x} y={vb.y} width={clipW} height={vb.h} />
                </clipPath>
              </defs>

              {state === 'empty' && (
                <path
                  className="stars__outline"
                  d={path}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={sw}
                  strokeLinejoin="round"
                />
              )}

              {state === 'full' && <path className="stars__fill" d={path} fill="currentColor" />}

              {state === 'half' && (
                <>
                  <path
                    className="stars__outline"
                    d={path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={sw}
                    strokeLinejoin="round"
                  />
                  <g clipPath={`url(#${clipId})`}>
                    <path className="stars__fill stars__fill--half" d={path} fill="currentColor" />
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
