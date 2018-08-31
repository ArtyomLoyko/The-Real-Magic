import './public/css/fonts.css';
import './public/css/normalize.css';

import LoadingScreenGenerator from './components/loading';
import MagicsMenu from './components/modal-dialog';
import main from './screens/home';
import GameIntro from './screens/game-intro';
import StoriesGenerator from './screens/story';
import BattleGenerator from './screens/battle';
import GameEnding from './screens/game-over';
import TableRecordsGenerator from './screens/score';
import GameData from './public/js/gameData';
import magicsList from './public/js/magicsList';
import AudioGenerator from './public/js/audio';
import Character from './public/js/characters';
import CharactersAnimation from './public/js/animation';
import KeyboardController from './public/js/keyboardController';

const loadingScreen = new LoadingScreenGenerator();
const keyboard = new KeyboardController();
const audio = new AudioGenerator();
const gameData = new GameData();
const currentHero = new Character();
const currentMonster = new Character();
const charactersAnimation = new CharactersAnimation(gameData); 
const magics = new MagicsMenu(magicsList, keyboard);
const records = new TableRecordsGenerator(audio, keyboard);
const gameEnding = new GameEnding(records, keyboard);
const battle = new BattleGenerator(
  gameData, magics, magicsList, 
  currentHero, currentMonster, charactersAnimation, 
  gameEnding, records, audio, keyboard,
);
const stories = new StoriesGenerator(battle, audio, keyboard);
const gameIntro = new GameIntro(gameData, stories, audio, keyboard);

main(gameIntro);