import './index.css';
import 'babel-polyfill';
import { sample } from 'lodash';

export default class BattleGenerator {
  constructor(
    gameData, magics, magicsList, currentHero, 
    currentMonster, charactersAnimation, gameEnding, 
    records, audio, keyboard,
  ) {
    this.gameData = gameData;
    this.magics = magics;
    this.magicsList = magicsList;
    this.currentHero = currentHero;
    this.currentMonster = currentMonster;
    this.charactersAnimation = charactersAnimation;
    this.records = records;
    this.gameEnding = gameEnding;
    this.audio = audio;
    this.keyboard = keyboard;
    this.currentLevel = 0;
    this.battlePage = document.querySelector('.battle-page');

    this.generateProbably = (probability) => {
      const randomNumber = Math.random();
      return randomNumber < probability;
    };

    this.generateMonsterName = () => {
      const descriptions = ['Ugly', 'Big', 'Scary', 'Evil', 'Funny'];
      const species = ['Ogre', 'Orc', 'Monster'];
      const names = ['Charlie', 'George', 'Harry', 'Philipp', 'Andrew'];
      return `${sample(descriptions)} ${sample(species)} ${sample(names)}`;
    };
  }

  createBattleField() {
    const heroName = document.getElementById('hero-name');
    const monsterName = document.getElementById('monster-name');
    const currentLevelBox = document.getElementById('current-level');

    this.currentHero.startRound(this.gameData.name);
    this.currentMonster.startRound(this.generateMonsterName());
    heroName.textContent = this.currentHero.name;
    monsterName.textContent = this.currentMonster.name;
    this.renderHeroHP();
    this.renderMonsterHP();
    this.currentLevel += 1;
    this.gameData.level = this.currentLevel;
    currentLevelBox.textContent = this.currentLevel;
    this.battlePage.classList.remove('hidden');
  }

  addFighters() {
    if (this.currentLevel > 1) {
      const monster = document.getElementById('monster');
      monster.classList.remove(monster.classList[1]);
    }

    this.charactersAnimation.selectCharacters();
    this.charactersAnimation.startMonsterIdle();
    this.charactersAnimation.startHeroIdle();
  }

  useMedkit() {
    this.checkResult = () => {
      const tasksArr = document.querySelectorAll('.task-field');
      const currentTask = Array.from(tasksArr).find(task => !task.classList.contains('hidden'));

      currentTask.classList.add('hidden');

      if (this.checkedResult) {
        this.currentHero.heal(30);
        this.incrementSpellCounter();
      }

      this.renderHeroHP();
      this.startMonstersTurn();
    };

    const healthTask = this.magics.availableMagics[0].task.bind(this);
    healthTask(this.keyboard.handleEnter.bind(this.keyboard));
  }

  useAttack() {
    const attackMagicsList = this.magics.showMagicsList();

    this.checkResult = async () => {
      const tasksArr = document.querySelectorAll('.task-field');
      const currentTask = Array.from(tasksArr).find(task => !task.classList.contains('hidden'));
      const damage = this.magicsList.find(magic => magic.name === this.selectedMagic).value;

      currentTask.classList.add('hidden');
      attackMagicsList.classList.add('hidden');

      if (this.checkedResult) {
        this.audio.startHeroAudio();
        this.charactersAnimation.startHeroAttack();
        this.currentMonster.takeDamage(damage);
        this.renderMonsterHP();
        this.incrementSpellCounter();
      }

      await this.startHeroAnimation();
    };
  }

  startHeroAnimation() {
    return new Promise(resolve => {
      setTimeout(() => {
        const checkHealth = this.checkPlayersHealth();
        if (checkHealth) {
          this.startMonstersTurn();
        }
        resolve();
      }, 2000);
    });
  }

  startMonsterAnimation() {
    return new Promise(resolve => {
      setTimeout(() => {
        const checkHealth = this.checkPlayersHealth();
        if (checkHealth) {
          this.startUsersTurn();
        }
        resolve();
      }, 2000);
    });
  }

  renderHeroHP() {
    const heroHP = document.getElementById('heroHP');
    const heroHealthScale = document.querySelector('.hero-health-scale');

    heroHP.textContent = `${this.currentHero.health}%`;
    heroHealthScale.style.width = `${this.currentHero.health * 2}px`;

    if (this.currentHero.health < 100) {
      heroHealthScale.style.borderTopRightRadius = 0;
      heroHealthScale.style.borderBottomRightRadius = 0;
    } else {
      heroHealthScale.style.borderTopRightRadius = '8px';
      heroHealthScale.style.borderBottomRightRadius = '8px';
    }
  }

  renderMonsterHP() {
    const monsterHP = document.getElementById('monsterHP');
    const monsterHealthScale = document.querySelector('.monster-health-scale');

    monsterHP.textContent = `${this.currentMonster.health}%`;
    monsterHealthScale.style.width = `${this.currentMonster.health * 2}px`;

    if (this.currentMonster.health < 100) {
      monsterHealthScale.style.borderTopLeftRadius = 0;
      monsterHealthScale.style.borderBottomLeftRadius = 0;
    } else {
      monsterHealthScale.style.borderTopLeftRadius = '8px';
      monsterHealthScale.style.borderBottomLeftRadius = '8px';
    }
  }

  incrementSpellCounter() {
    this.gameData.loadFromStorage();
    this.gameData.spellsDone += 1;
    this.gameData.saveToStorage();
  }

  startBattle() {
    this.magics.addNewMagic(this.currentLevel, this);

    if (this.currentLevel === 1) {
      this.onBomb = () => {
        this.useAttack();
      };
  
      this.onMedkit = () => {
        this.useMedkit();
      };
  
      this.magics.addEventOnBombBtn(this.onBomb);
      this.magics.addEventOnMedkit(this.onMedkit);
      this.magics.addEventOnBackBtn();
    }
    
    this.startUsersTurn();
  }

  endGame() {
    this.gameData.loadFromStorage();
    this.records.registerResult(
      this.gameData.difficulty, this.gameData.name,
      this.gameData.email, this.gameData.age,
      this.currentLevel, this.gameData.spellsDone,
    );
    this.audio.stopBattleAudio();
    this.battlePage.classList.add('hidden');
    this.gameEnding.createEndingField();

    this.countLevels = 0;
    this.magics.availableMagics = [];
  }

  checkPlayersHealth() {
    if (this.currentMonster.health === 0) {
      if (this.currentLevel === 5) {
        this.endGame();
        return false;
      }

      const storyPage = document.querySelector('.story-page');
      
      this.battlePage.classList.add('hidden');
      this.audio.stopBattleAudio();
      storyPage.classList.remove('hidden');
      this.audio.startStoriesAudio();
      
      return false;
    } else if (this.currentHero.health === 0) {
      this.endGame();
      return false;
    }

    return true;
  }

  startUsersTurn() {
    this.magics.showMagicsMenu();
  }

  async startMonstersTurn() {
    const canHit = this.generateProbably(0.5);

    if (canHit) {
      const damage = 20;

      this.audio.startMonsterAudio();
      this.charactersAnimation.startMonsterAttack();
      this.currentHero.takeDamage(damage);
      this.renderHeroHP();
    }

    await this.startMonsterAnimation();
  }
}