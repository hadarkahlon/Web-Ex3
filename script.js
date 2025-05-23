// Keep track of currently playing audio
let currentAudio = null;

// Not learned in class: using AudioContext for fade-in effect
// What happens here:
// - If a song is already playing, it stops and resets
// - A new AudioContext is created
// - The audio volume starts at 0
// - The volume gradually increases to 100% over 2 seconds using linearRampToValueAtTime()
// - This creates a smooth fade-in experience
function playWithFade(filePath) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const context = new (window.AudioContext || window.webkitAudioContext)();
  const audio = new Audio(filePath);
  const source = context.createMediaElementSource(audio);
  const gainNode = context.createGain();

  gainNode.gain.setValueAtTime(0, context.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, context.currentTime + 2);

  source.connect(gainNode).connect(context.destination);
  audio.play();

  currentAudio = audio;
}

// Play sound based on key
function playSoundByKey(key) {
  let filePath = "";

  switch (key) {
    case "o": filePath = "sounds/omer.mp3"; break;
    case "a": filePath = "sounds/agam.mp3"; break;
    case "u": filePath = "sounds/osher.mp3"; break;
    case "n": filePath = "sounds/nasrin.mp3"; break;
    case "d": filePath = "sounds/ness.mp3"; break;
    case "s": filePath = "sounds/sason.mp3"; break;
    case "y": filePath = "sounds/yasmin.mp3"; break;
    case "e": filePath = "sounds/eden.mp3"; break;
    default: return;
  }

  playWithFade(filePath);
}

// Handle button clicks
document.querySelectorAll(".artist").forEach(button => {
  button.addEventListener("click", () => {
    const key = button.classList[1];
    playSoundByKey(key);
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 150);
  });
});

// Handle key presses
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  playSoundByKey(key);

  const button = document.querySelector(`.artist.${key}`);
  if (button) {
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 150);
  }
});
