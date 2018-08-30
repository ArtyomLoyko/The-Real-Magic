import './../../screens/game-intro/audio/game-intro-audio.mp3';
import './../../screens/story/audio/game-field-audio.mp3';
import './../../screens/battle/audio/battle-field-audio.mp3';
import './../../screens/battle/audio/hero-audio.mp3';
import './../../screens/battle/audio/monster-audio.mp3';

export default class AudioGenerator {
  constructor() {
    this.gameIntroAudio = document.getElementById('game-intro-audio');
    this.storiesAudio = document.getElementById('stories-audio');
    this.battleAudio = document.getElementById('battle-field-audio');
    this.heroAudio = document.getElementById('hero-audio');
    this.monsterAudio = document.getElementById('monster-audio');
    this.recordsAudio = document.getElementById('records-audio');
  }

  startGameIntroAudio() {
    this.gameIntroAudio.currentTime = 0;
    this.gameIntroAudio.play();
  }

  stopGameIntroAudio() {
    this.gameIntroAudio.pause();
  }

  startStoriesAudio() {
    this.storiesAudio.currentTime = 0;
    this.storiesAudio.play();
  }

  stopStoriesAudio() {
    this.storiesAudio.pause();
  }

  startBattleAudio() {
    this.battleAudio.currentTime = 0;
    this.battleAudio.play();
  }

  stopBattleAudio() {
    this.battleAudio.pause();
  }  

  startHeroAudio() {
    this.heroAudio.play();
  }

  stopHeroAudio() {
    this.heroAudio.pause();
  } 

  startMonsterAudio() {
    this.monsterAudio.play();
  }

  stopMonsterAudio() {
    this.monsterAudio.pause();
  } 

  startRecordsAudio() {
    this.recordsAudio.currentTime = 0;
    this.recordsAudio.play();
  }

  stopRecordsAudio() {
    this.recordsAudio.pause();
  } 
}