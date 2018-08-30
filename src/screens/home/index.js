import './index.css';

const main = (gameIntro) => {
  const playForm = document.getElementById('play-form');

  playForm.addEventListener('submit', (event) => {
    gameIntro.createIntroField();
    event.preventDefault();
  });
};

export default main;