import { useLayoutEffect, useRef } from "react";
import "./NeonHover.css";

/**
 * Wraps an SVG component. On hover: pointer cursor, neon colors + glow, and
 * the lines draw themselves (see NeonHover.css).
 *
 * Optional props
 *   href         -> renders a real link (opens in a new tab), e.g. a wa.me URL
 *   label        -> accessible name for the link
 *   onMouseEnter / onMouseLeave -> hover callbacks
 *
 * The "drawing" needs each path's length, so it is measured once on mount and
 * stored as a --len CSS variable. The wrapped SVG files are not modified.
 */
const NeonHover = ({
  children,
  className = "",
  href,
  label,
  onMouseEnter,
  onMouseLeave,
}) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.querySelectorAll("path[stroke], path[fill]").forEach((p) => {
      try {
        // +1 so float rounding never leaves a tiny gap at the end of a line
        p.style.setProperty("--len", (p.getTotalLength() + 1).toFixed(2));
      } catch {
        /* element can't be measured: falls back to the CSS default */
      }
    });
  }, []);

  const Tag = href ? "a" : "div";
  const linkProps = href
    ? {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": label,
    }
    : {};

  return (
    <Tag
      ref={ref}
      className={`neon-hover ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...linkProps}
    >
      {children}
    </Tag>
  );
};

export default NeonHover;