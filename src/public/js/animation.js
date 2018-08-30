import { sample } from 'lodash';

const monsters = {
  golem: {
    idle: 'golem-idle',
    attack: 'golem-attack',
  },
  shade: {
    idle: 'shade-idle',
    attack: 'shade-attack',
  },
  werewolf: {
    idle: 'werewolf-idle',
    attack: 'werewolf-attack',
  },
  yeti: {
    idle: 'yeti-idle',
    attack: 'yeti-attack',
  },
};

const heroes = {
  'first-hero': {
    idle: 'hero-idle1',
    attack: 'hero-attack1',
  },
  'second-hero': {
    idle: 'hero-idle2',
    attack: 'hero-attack2',
  },
};

export default class CharactersAnimation {
  constructor(gameData) {
    this.monster = document.getElementById('monster');
    this.hero = document.getElementById('hero');
    this.gameData = gameData;

    this.randomMonster = (monstersObj) => {
      const keys = Object.keys(monstersObj);
      const monsterType = sample(keys);
      return monsterType;
    };

    this.selectHero = () => {
      this.gameData.loadFromStorage();
      const heroType = this.gameData.hero;
      return heroType;
    };
  }

  selectCharacters() {
    this.monsterType = this.randomMonster(monsters);
    this.heroType = this.selectHero();
  }

  startMonsterIdle() {
    this.monster.classList.remove(monsters[this.monsterType].attack);
    this.monster.classList.add(monsters[this.monsterType].idle);
  }

  startMonsterAttack() {
    this.monster.classList.remove(monsters[this.monsterType].idle);
    this.monster.classList.add(monsters[this.monsterType].attack);

    this.monster.addEventListener('animationend', () => {
      this.startMonsterIdle();
    });
  }

  startHeroIdle() {
    this.hero.classList.remove(heroes[this.heroType].attack);
    this.hero.classList.add(heroes[this.heroType].idle);
  }

  startHeroAttack() {
    this.hero.classList.remove(heroes[this.heroType].idle);
    this.hero.classList.add(heroes[this.heroType].attack);

    this.hero.addEventListener('animationend', () => {
      this.startHeroIdle();
    });
  }
}