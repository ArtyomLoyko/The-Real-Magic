import './index.css';

export default class GameEnding {
  constructor(records) {
    this.records = records;
    this.endWindow = document.getElementById('end-window');
  }

  createEndingField() {
    const userName = document.getElementById('user-name').value;
    const userNameEnd = document.getElementById('user-name-end');
    const highscrTblBtn = document.getElementById('highscr-tbl-btn');

    userNameEnd.textContent = userName;
    this.showEndingField();

    highscrTblBtn.addEventListener('click', () => {
      this.hideEndingField();
      this.records.showRecordTable();
    });
  }

  showEndingField() {
    this.endWindow.classList.remove('hidden');
  }

  hideEndingField() {
    this.endWindow.classList.add('hidden');
  }
}