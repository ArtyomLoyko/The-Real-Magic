import './index.css';

export default class TableRecordsGenerator {
  constructor(audio, keyboard) {
    this.audio = audio;
    this.keyboard = keyboard;
  }

  registerResult(difficulty, name, email, age, level, spellsDone) {
    let recordTable = {};

    if (localStorage.recordTable === undefined) {
      recordTable = { 
        "easy": [], 
        "medium": [], 
        "hard": [], 
      };
    } else {
      recordTable = JSON.parse(localStorage.recordTable);
    }

    recordTable[difficulty].push({
      name,  
      email, 
      age,
      level,
      spellsDone,
    });

    localStorage.recordTable = JSON.stringify(recordTable);
  }

  static getResultsFor(difficulty) {
    return JSON.parse(localStorage.recordTable)[difficulty];
  }

  static getTopResults(results) {
    results.sort((a, b) => b.spellsDone - a.spellsDone);
    return results.slice(0, 10);
  }

  static renderResults(results, baseElement) {
    if (!results.length) {
      baseElement.textContent = 'no results yet';
      baseElement.style.marginLeft = '0px';
      baseElement.style.paddingLeft = '0px';
    } else {
      results.forEach((result) => {
        const element = document.createElement("li");

        element.textContent = `name: ${result.name}, age: ${result.age}, 
          email: ${result.email}, your level is: ${result.level},  
          you have comleted: ${result.spellsDone} spells.`;
        baseElement.appendChild(element);
      });
    }
  }

  showRecordTable() {
    const recordTable = document.getElementById('record-page');
    const restartBtn = document.getElementById('restart-btn');
    const resultsEasy = TableRecordsGenerator.getTopResults(
      TableRecordsGenerator.getResultsFor('easy'),
    );
    const resultsMedium = TableRecordsGenerator.getTopResults(
      TableRecordsGenerator.getResultsFor('medium'),
    );
    const resultsHard = TableRecordsGenerator.getTopResults(
      TableRecordsGenerator.getResultsFor('hard'),
    );

    TableRecordsGenerator.renderResults(resultsEasy, document.getElementById('easy-result'));
    TableRecordsGenerator.renderResults(resultsMedium, document.getElementById('medium-result'));
    TableRecordsGenerator.renderResults(resultsHard, document.getElementById('hard-result'));
    this.audio.startRecordsAudio();

    const restartBtnHandler = () => {
      location.reload();
    };

    restartBtn.addEventListener('click', restartBtnHandler);
    this.keyboard.handleEnter(restartBtnHandler);

    recordTable.classList.remove('hidden');
  }
}