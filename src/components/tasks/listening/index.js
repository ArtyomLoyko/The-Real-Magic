import './index.css';
import { sample, findKey } from 'lodash';
import $ from 'jquery';
import dictionary from './data/dictionary.json';

export default function listeningTask(handleEnter) {
  this.selectedMagic = 'Keen Ear';
  this.checkedResult = null;

  const battleAudio = document.getElementById('battle-field-audio');
  const answerFieldListening = document.getElementById('answer-field-listening');
  const taskField = document.getElementById('task-field-listening');
  const taskAudio = document.getElementById('listening-audio');
  const listening = document.getElementById('listening');
  const entryField = document.getElementById('answer-field-listening');
  const spellBtnListening = document.getElementById('spell-btn-listening');
  const audioSrc = sample(dictionary);
  const src = require(`${audioSrc}`);
  const word = findKey(dictionary, word => word === audioSrc);

  battleAudio.pause();
  answerFieldListening.value = '';
  taskAudio.setAttribute('src', src);
  taskField.classList.remove('hidden');

  listening.addEventListener('click', () => {
    taskAudio.play();
  });

  const spellBtnHandler = () => {
    $(document).unbind('keydown');
    spellBtnListening.removeEventListener('click', spellBtnHandler);

    this.checkedResult = word === entryField.value.toLowerCase();
    this.checkResult();
    battleAudio.play();
  };

  spellBtnListening.addEventListener('click', spellBtnHandler);
  handleEnter(spellBtnHandler);
}