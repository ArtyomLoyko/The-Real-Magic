export default class GameData {
  constructor(name, email, age, difficulty, hero, level, spellsDone) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.difficulty = difficulty;
    this.hero = hero;
    this.level = level;
    this.spellsDone = spellsDone;
  }

  saveToStorage() {
    const gamerProfile = {
      name: this.name,
      email: this.email,
      age: this.age,
      difficulty: this.difficulty,
      hero: this.hero,
      level: this.level,
      spellsDone: this.spellsDone,
    };

    localStorage.gamerProfile = JSON.stringify(gamerProfile);
  }

  loadFromStorage() {
    const gamerProfile = JSON.parse(localStorage.gamerProfile);
    
    this.name = gamerProfile.name;
    this.email = gamerProfile.email;
    this.age = gamerProfile.age;
    this.difficulty = gamerProfile.difficulty;
    this.hero = gamerProfile.hero;
    this.level = gamerProfile.level;
    this.spellsDone = gamerProfile.spellsDone;
  }
}