import './index.css';
import $ from 'jquery';

export default class GameIntro {
  constructor(gameData, stories, audio, keyboard) {
    this.gameData = gameData;
    this.stories = stories;
    this.audio = audio;
    this.keyboard = keyboard;
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
    const nextBtnHandler = () => {
      $(document).unbind('keydown');
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
    };

    nextBtn.addEventListener('click', nextBtnHandler);
    this.keyboard.handleEnter(nextBtnHandler);
  }
}