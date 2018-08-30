import './index.css';
import { sample, findKey } from 'lodash';
import $ from 'jquery';
import GameData from './../../../public/js/gameData';
import dictionary from './data/dictionary.json';

export default function translateTask() {
  this.selectedMagic = 'English Power';
  this.checkedResult = null;

  const gameData = new GameData();
  gameData.loadFromStorage();
  const answerFieldTranslate = document.getElementById('answer-field-translate');
  const taskField = document.getElementById('task-field-translate');
  const englishWord = document.getElementById('english-word');
  const entryField = document.getElementById('answer-field-translate');
  const spellBtnTranslate = document.getElementById('spell-btn-translate');
  const dictionaryLvl = dictionary[gameData.difficulty];
  const wordTranslate = sample(dictionaryLvl);
  const word = findKey(dictionaryLvl, word => word === wordTranslate);

  answerFieldTranslate.value = '';
  taskField.classList.remove('hidden');
  englishWord.textContent = `${word}: `;

  $(spellBtnTranslate).one('click', () => {
    this.checkedResult = wordTranslate.some(word => word === entryField.value.toLowerCase());
    this.checkResult();
  });
}