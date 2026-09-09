type Listener = () => void;

const listeners = new Set<Listener>();
let visible = false;

const SHOW_DELAY_MS = 550;
const HIDE_DELAY_MS = 250;

export function subscribeNavigationLoader(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function isNavigationLoaderVisible() {
  return visible;
}

function setVisible(next: boolean) {
  visible = next;
  listeners.forEach((listener) => listener());
}

/**
 * Shows the full-screen loading overlay, waits a beat (so it's actually
 * seen), then runs `navigate` and hides the overlay shortly after.
 * Ignored if a navigation is already in flight, so rapid double-taps
 * don't queue up multiple navigations.
 */
export function showNavigationLoader(navigate: () => void) {
  if (visible) return;
  setVisible(true);
  window.setTimeout(() => {
    navigate();
    window.setTimeout(() => setVisible(false), HIDE_DELAY_MS);
  }, SHOW_DELAY_MS);
}
