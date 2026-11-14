// Remembers which page the visit started on, so the intro splash only plays
// when someone lands directly on Home (and only once per visit).
let landingPath: string | null = null;
let splashPlayed = false;

/** Call during the first client render of any always-mounted component. */
export function noteLanding() {
  if (landingPath === null && typeof window !== "undefined") landingPath = window.location.pathname;
}

export function shouldPlaySplash(): boolean {
  if (typeof window === "undefined") return true; // server render: match the first-load HTML
  noteLanding();
  // Next may pre-render Home in the background while another page is open,
  // so check where the visit started rather than the current URL.
  return !splashPlayed && landingPath === "/";
}

export function markSplashPlayed() {
  splashPlayed = true;
}
