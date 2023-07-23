const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breatheAnimation() {
  container.className = 'container grow';
  text.innerHTML = 'Breathe in...';
  setTimeout(() => {
    text.innerHTML = 'Hold';
    // After holding breath, show message to breathe out
    setTimeout(() => {
      container.className = 'container shrink';
      text.innerHTML = 'Breathe out...';
    }, holdTime);
  }, breatheTime);
}
// Init
breatheAnimation();

setInterval(breatheAnimation, totalTime);
