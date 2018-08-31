import './index.css';
import $ from 'jquery';

export default class GameEnding {
  constructor(records, keyboard) {
    this.records = records;
    this.keyboard = keyboard;
    this.endWindow = document.getElementById('end-window');
  }

  createEndingField() {
    const userName = document.getElementById('user-name').value;
    const userNameEnd = document.getElementById('user-name-end');
    const highscrTblBtn = document.getElementById('highscr-tbl-btn');

    userNameEnd.textContent = userName;
    this.showEndingField();

    const highscrTblBtnHandler = () => {
      $(document).unbind('keydown');
      this.hideEndingField();
      this.records.showRecordTable();
    };

    highscrTblBtn.addEventListener('click', highscrTblBtnHandler);
    this.keyboard.handleEnter(highscrTblBtnHandler);
  }

  showEndingField() {
    this.endWindow.classList.remove('hidden');
  }

  hideEndingField() {
    this.endWindow.classList.add('hidden');
  }
}