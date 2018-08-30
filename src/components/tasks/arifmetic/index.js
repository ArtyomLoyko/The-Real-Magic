import './index.css';
import { random, sample } from 'lodash';
import $ from 'jquery';
import GameData from './../../../public/js/gameData';

export default function arifmeticTask() {
  this.selectedMagic = 'Mathematical Tornado';
  this.checkedResult = null;
  
  const gameData = new GameData();
  gameData.loadFromStorage();
  const answerFieldArifmetic = document.getElementById('answer-field-arifmetic');
  const taskField = document.getElementById('task-field-arifmetic');
  const mathExpresion = document.getElementById('math-expression');
  const entryField = document.getElementById('answer-field-arifmetic');
  const spellBtnArifmetic = document.getElementById('spell-btn-arifmetic');
  
  let first = null;
  let second = null;
  let operator = null;

  switch (gameData.difficulty) {
    case 'easy': 
      first = random(1, 10);
      second = random(1, 10);
      break;
    case 'medium':
      first = random(10, 20);
      second = random(10, 20);
      break;
    default:
      first = random(10, 50);
      second = random(10, 50);
      break;
  }

  if (second > first) {
    operator = sample(['+', '*']);
  } else {
    operator = sample(['+', '-', '*']);
  }

  mathExpresion.textContent = `${first} ${operator} ${second} = `;
  answerFieldArifmetic.value = '';
  taskField.classList.remove('hidden');

  $(spellBtnArifmetic).one('click', () => {
    const answer = eval(`${first} ${operator} ${second}`);

    this.checkedResult = +entryField.value === answer;
    this.checkResult();
  });
}