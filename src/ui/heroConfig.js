// Shared hero settings (kept outside the components so fast refresh keeps working).

// Mobile card clip: insets of the visible band as fractions of the stage height, fully
// applied at scroll progress `end`. Used by HeroSection's clip keyframes and by HeroBg to
// keep the face inside the band while the card shrinks.
export const MOBILE_CLIP = { top: 0.33, bottom: 0.31, end: 0.2 }
