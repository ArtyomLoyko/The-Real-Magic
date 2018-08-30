import './index.css';

export default class LoadingScreenGenerator {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.hideLoadingScreen();
  }

  hideLoadingScreen() {
    window.onload = () => {
      this.loadingScreen.classList.toggle('hidden');
      document.body.style.overflow = 'auto';
    };
  }
}