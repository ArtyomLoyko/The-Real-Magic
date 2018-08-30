export default class Character {
  startRound(name) {
    this.name = name;
    this.health = 100;
  }

  takeDamage(damage) {
    this.health = this.health - damage;

    if (this.health < 0) {
      this.health = 0;
    }
  }

  heal(points) {
    this.health = this.health + points;
    
    if (this.health > 100) {
      this.health = 100;
    }
  }
}

