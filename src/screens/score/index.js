import './index.css';

export default class TableRecordsGenerator {
  constructor(audio) {
    this.audio = audio;
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
      name: name,  
      email: email, 
      age: age,
      level: level,
      spellsDone: spellsDone,
    });

    localStorage.recordTable = JSON.stringify(recordTable);
  }

  getResultsFor(difficulty) {
    return JSON.parse(localStorage.recordTable)[difficulty];
  }

  getTopResults(results) {
    results.sort((a, b) => b.spellsDone - a.spellsDone);

    return results.slice(0, 10);
  }

  renderResults(results, baseElement) {
    if (!results.length) {
      baseElement.textContent = 'no results yet';
      baseElement.style.marginLeft = '0px';
      baseElement.style.paddingLeft = '0px';
    } else {
      results.forEach((result) => {
        const element = document.createElement("li");

        element.textContent = `name: ${result.name}; age: ${result.age}; 
          email: ${result.email}; your level is: ${result.level};  
          you have comleted: ${result.spellsDone} spells;`
        baseElement.appendChild(element);
      });
    }
  }

  showRecordTable() {
    const recordTable = document.getElementById('record-page');
    const restartBtn = document.getElementById('restart-btn');
    const startPage = document.querySelector('.wrapper');
    const resultsEasy = this.getTopResults(this.getResultsFor('easy'));
    const resultsMedium = this.getTopResults(this.getResultsFor('medium'));
    const resultsHard = this.getTopResults(this.getResultsFor('hard'));

    this.renderResults(resultsEasy, document.getElementById('easy-result'));
    this.renderResults(resultsMedium, document.getElementById('medium-result'));
    this.renderResults(resultsHard, document.getElementById('hard-result'));
    this.audio.startRecordsAudio();

    restartBtn.addEventListener('click', () => {
      location.reload();
      // this.audio.stopRecordsAudio();
      // recordTable.classList.add('hidden');
      // startPage.classList.remove('hidden');
    });

    recordTable.classList.remove('hidden');
  }
}