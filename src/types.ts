export type StarSize = 'lg' | '2x' | '3x' | '4x' | '5x';

/** Default Heroicons-style star path (`viewBox` must match {@link DEFAULT_STAR_VIEW_BOX}). */
export const DEFAULT_STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z';

export const DEFAULT_STAR_VIEW_BOX = '0 0 20 20';

export interface StarIconOptions {
  /**
   * SVG `d` for the symbol (same outline for empty/half outline and fill).
   * Use with a matching `viewBox`.
   */
  path?: string;
  /**
   * SVG `viewBox` for the icon, e.g. `"0 0 24 24"`.
   * Must match the coordinate system of `path`.
   */
  viewBox?: string;
  /** Stroke width in SVG user units for empty and half-outline (default: 1.25). */
  strokeWidth?: number;
  /**
   * Color for the empty / track outline (unfilled part).
   * Sets `--stars-track` on the root; falls back to CSS when omitted.
   */
  emptyColor?: string;
  /**
   * Horizontal fraction of `viewBox` width filled for the “half” state (0–1, default 0.5 = left half).
   * Use e.g. `0.45` for icons with extra padding.
   */
  halfWidthFraction?: number;
}

export interface StarProps {
  /** Current rating from 0 to 5 in steps of 0.5 */
  value: number;
  /** Fill color for active segments (sets `--stars-fill`) */
  color?: string;
  /** Visual size preset (maps to pixel size on the SVG) */
  size?: StarSize;
  /** Called when the user selects a new rating */
  onValueChange: (value: number) => void;
  /** Optional class on the outer wrapper */
  className?: string;
  /** Accessible label for the rating control (default: "Rating") */
  'aria-label'?: string;
  /**
   * Gap between icons. Number = pixels, string = any CSS length (e.g. `"0.35rem"`).
   */
  gap?: number | string;
  /** Fine-grained control over SVG shape, stroke, and empty color */
  icon?: StarIconOptions;
}
