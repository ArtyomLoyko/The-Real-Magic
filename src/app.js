import './public/css/fonts.css';
import './public/css/normalize.css';

import LoadingScreenGenerator from './components/loading/index';
import MagicsMenu from './components/modal-dialog/index';
import main from './screens/home/index';
import GameIntro from './screens/game-intro/index';
import StoriesGenerator from './screens/story/index';
import BattleGenerator from './screens/battle/index';
import GameEnding from './screens/game-over/index';
import TableRecordsGenerator from './screens/score/index';
import GameData from './public/js/gameData';
import magicsList from './public/js/magicsList';
import AudioGenerator from './public/js/audio';
import Character from './public/js/characters';
import CharactersAnimation from './public/js/animation';
import KeyboardController from './public/js/keyboardController';

const loadingScreen = new LoadingScreenGenerator();
const audio = new AudioGenerator();
const gameData = new GameData();
const currentHero = new Character();
const currentMonster = new Character();
const charactersAnimation = new CharactersAnimation(gameData); 
const magics = new MagicsMenu(magicsList);
const records = new TableRecordsGenerator(audio);
const gameEnding = new GameEnding(records);
const battle = new BattleGenerator(
  gameData, magics, magicsList, 
  currentHero, currentMonster, charactersAnimation, 
  gameEnding, records, audio,
);
const stories = new StoriesGenerator(battle, audio);
const gameIntro = new GameIntro(gameData, stories, audio);
const keyboard = new KeyboardController();

main(gameIntro);

