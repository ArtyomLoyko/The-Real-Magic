import './index.css';

export default class GameIntro {
  constructor(gameData, stories, audio) {
    this.gameData = gameData;
    this.stories = stories;
    this.audio = audio;
    this.wrapper = document.querySelector('.wrapper');
    this.gameIntroField = document.querySelector('.intro-page');
  }

  createIntroField() {
    this.wrapper.classList.add('hidden');
    this.gameIntroField.classList.remove('hidden');
    this.addEventOnNextBtn();
    this.audio.startGameIntroAudio();
  }

  addEventOnNextBtn() {
    const nextBtn = document.getElementById('introNextBtn');

    nextBtn.addEventListener('click', () => {
      this.gameData.name = document.getElementById('user-name').value;
      this.gameData.age = document.getElementById('age').value;
      this.gameData.email = document.getElementById('email').value;
      this.gameData.difficulty = document.querySelector('input[name="difficulty"]:checked').value;
      this.gameData.hero = document.querySelector('input[name="hero"]:checked').value;
      this.gameData.spellsDone = 0;
      this.gameData.level = 0;
      this.gameData.saveToStorage();
      this.audio.stopGameIntroAudio();
      this.gameIntroField.classList.add('hidden');
      this.stories.createStoryField();
    });
  }
}