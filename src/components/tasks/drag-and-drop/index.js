import './index.css';
import 'jquery-ui-sortable-npm';

import {
  sample,
  findKey,
  shuffle,
} from 'lodash';

import $ from 'jquery';
import dictionary from './data/dictionary.json';

export default function dragAndDropTask(handleEnter) {
  this.selectedMagic = 'Magic Word';
  this.checkedResult = null;

  const wordBox = document.getElementById('word-box');
  const taskField = document.getElementById('task-field-drag');
  const spellBtnDrag = document.getElementById('spell-btn-drag');
  const wordLetters = sample(dictionary);
  const word = findKey(dictionary, word => word === wordLetters);
  
  $(wordBox).empty();
  shuffle(wordLetters).forEach((i) => {
    wordBox.insertAdjacentHTML('afterBegin', `<div class="letters">${i}</div>`);
  });
  $(wordBox).sortable();
  $(wordBox).disableSelection();
  taskField.classList.remove('hidden');

  const spellBtnHandler = () => {
    $(document).unbind('keydown');
    spellBtnDrag.removeEventListener('click', spellBtnHandler);
    let currentWord = '';

    Array.from(wordBox.children).forEach(letter => {
      currentWord += letter.textContent;
    });
    this.checkedResult = currentWord === word;
    this.checkResult();
  };

  spellBtnDrag.addEventListener('click', spellBtnHandler);
  handleEnter(spellBtnHandler);
}