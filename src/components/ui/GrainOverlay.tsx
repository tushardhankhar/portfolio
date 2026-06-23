/**
 * Fixed film-grain texture over the whole page.
 * Pure CSS (SVG noise data-URI defined in globals.css `.grain`).
 */
export default function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />;
}
