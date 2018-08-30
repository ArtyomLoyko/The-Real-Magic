import './index.css';
import { sample, findKey } from 'lodash';
import $ from 'jquery';
import dictionary from './data/dictionary.json';

export default function geographyTask() {
  this.selectedMagic = 'Crazy Geography';
  this.checkedResult = null;

  const answerFieldGeography = document.getElementById('answer-field-geography');
  const taskField = document.getElementById('task-field-geography');
  const entryField = document.getElementById('answer-field-geography');
  const spellBtnGeography = document.getElementById('spell-btn-geography');
  const flagImg = document.getElementById('flag');
  const flag = sample(dictionary);
  const src = require(`${flag}`);
  const country = findKey(dictionary, (country) => {
    return country === flag;
  });

  answerFieldGeography.value = '';
  taskField.classList.remove('hidden');
  flagImg.setAttribute('src', src);  

  $(spellBtnGeography).one('click', () => {
    this.checkedResult = country === entryField.value.toLowerCase();
    this.checkResult();
  });
}