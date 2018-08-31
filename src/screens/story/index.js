import './index.css';
import $ from 'jquery';

export default class StoriesGenerator {
  constructor(battle, audio, keyboard) {
    this.battle = battle;
    this.audio = audio;
    this.keyboard = keyboard;
    this.storyPage = document.querySelector('.story-page');
    this.countLevels = 0;
  }

  createStoryField() {
    this.storyPage.classList.remove('hidden');
    this.addStory(this.countLevels);
    this.addEventOnNextBtn();
    this.audio.startStoriesAudio();
  }

  addEventOnNextBtn() { 
    const nextBtn = document.getElementById('stories-next-btn');

    const nextBtnHandler = () => {
      $(document).unbind('keydown');
  
      this.countLevels += 1;
      this.addStory(this.countLevels);
  
      if (this.countLevels === 5) {
        this.countLevels = 0;
      }
  
      this.storyPage.classList.add('hidden');
      this.audio.stopStoriesAudio();
      this.battle.createBattleField();
      this.battle.addFighters();
      this.audio.startBattleAudio();
      this.battle.startBattle();
    };

    nextBtn.addEventListener('click', nextBtnHandler);
    this.keyboard.handleEnter(nextBtnHandler);
  }

  addStory(story) {
    this.userName = document.getElementById('user-name').value;
    this.storyArr = [
      `In a tent there lived a squat, windy troll named ${this.userName}.
      Not a sunny cosy, backward tent, filled with aardvarks
      and a chilly smell, nor yet a slimy, dirty, scheming tent with
      nothing in it to sit down on or to eat: it was a troll-tent,
      and that means warmth.`,
      `One day, after a troubling visit from the gremlin Maud
      Thunder, ${this.userName} leaves tent and sets out in search of three
      fragile potions. A quest undertaken in the company of trolls,
      witches and quiet giants.`,
      `In the search for the gremlin-guarded potions, ${this.userName} 
      surprises even herself with her resourcefulness and skill as
      a computer programmer.`,
      `During her travels, ${this.userName} rescues a sandwich, an heirloom
      belonging to Maud. But when Maud refuses to try jogging, their
      friendship is over.`,
      `However, Maud is wounded at the Battle of Hastings and the
      two reconcile just before ${this.userName} engages in some serious jogging.`,
    ];

    const storyText = document.getElementById('story-text');
    storyText.textContent = this.storyArr[story];
  }
}
