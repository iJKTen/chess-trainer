let ctx: AudioContext | null = null;
const bufferCache = new Map<string, AudioBuffer>();

function getContext(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export function preload(...urls: string[]) {
  const context = getContext();
  for (const url of urls) {
    if (bufferCache.has(url)) continue;
    fetch(url)
      .then(r => r.arrayBuffer())
      .then(buf => context.decodeAudioData(buf))
      .then(decoded => bufferCache.set(url, decoded))
      .catch(() => {});
  }
}

export function playSound(url: string) {
  const context = getContext();
  if (context.state === 'suspended') context.resume().catch(() => {});
  const buffer = bufferCache.get(url);
  if (!buffer) return;
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}

// Unlock AudioContext on first user interaction (required by iOS Safari).
// Once resumed during a gesture, all subsequent playback works regardless of context.
function unlock() {
  getContext().resume().catch(() => {});
}
document.addEventListener('touchstart', unlock, { capture: true, passive: true, once: true });
document.addEventListener('mousedown', unlock, { capture: true, passive: true, once: true });
