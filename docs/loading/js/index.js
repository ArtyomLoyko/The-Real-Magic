const loadingScreen = document.getElementById('loading-screen');
const loadingScreenBtn = document.getElementById('loading-screen-btn');

loadingScreenBtn.addEventListener('click', () => {
  loadingScreen.classList.toggle('hidden');
  document.body.classList.toggle('hidden-content');

  setTimeout(() => {
    loadingScreen.classList.toggle('hidden');
    document.body.classList.toggle('hidden-content');
  }, 5000);
});
