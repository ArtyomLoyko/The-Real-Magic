import arifmeticTask from './../../components/tasks/arifmetic';
import translateTask from './../../components/tasks/translate';
import dragAndDropTask from './../../components/tasks/drag-and-drop';
import listeningTask from './../../components/tasks/listening';
import geographyTask from './../../components/tasks/geography';

const magicsList = [
  {
    name: 'Mathematical Tornado',
    task: arifmeticTask,
    value: 20,
  }, {
    name: 'English Power',
    task: translateTask,
    value: 25,
  }, {
    name: 'Magic Word',
    task: dragAndDropTask,
    value: 30,
  }, {
    name: 'Keen Ear',
    task: listeningTask,
    value: 35,
  }, {
    name: 'Crazy Geography',
    task: geographyTask,
    value: 40,
  },
];

export default magicsList;