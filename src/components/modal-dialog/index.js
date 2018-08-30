import './index.css';
import { last } from 'lodash';

export default class MagicsMenu {
  constructor(magicsList) {
    this.magicsList = magicsList;
    this.availableMagics = [];
    this.magicsMenuWindow = document.getElementById('magics-menu-box');
    this.attackMagicsBtn = document.getElementById('attack-magics-btn');
    this.attackMagicsList = document.getElementById('attack-magics-box');
  }

  showMagicsMenu() {
    this.magicsMenuWindow.classList.remove('hidden');
  }

  hideMagicsMenu() {
    this.magicsMenuWindow.classList.add('hidden');
  }

  addEventOnBombBtn(onBomb) {
    const bombBtn = document.getElementById('bomb');

    bombBtn.addEventListener('click', () => {
      this.hideMagicsMenu();
      onBomb();
    });
  }

  addEventOnMedkit(onMedkit) {
    const medkit = document.getElementById('medkit');

    medkit.addEventListener('click', () => {
      this.hideMagicsMenu();
      onMedkit();
    });
  }

  addNewMagic(currentLevel, battleContext) {
    this.availableMagics.push(this.magicsList[currentLevel - 1]);

    const magicsList = document.getElementById('magics-list');
    const newMagic = last(this.availableMagics);
    const magicWrapper = document.createElement('li');

    magicWrapper.textContent = `${newMagic.name}`;
    magicWrapper.addEventListener('click', newMagic.task.bind(battleContext));
    magicsList.appendChild(magicWrapper);
  }

  showMagicsList() {
    this.attackMagicsList.classList.remove('hidden');

    return this.attackMagicsList;
  }

  addEventOnBackBtn() {
    this.attackMagicsBtn.addEventListener('click', () => {
      this.magicsMenuWindow.classList.toggle('hidden');
      this.attackMagicsList.classList.toggle('hidden');
    });
  }
}