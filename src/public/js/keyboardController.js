import $ from 'jquery';

export default class KeyboardController {
  constructor() {
    this.ENTER = 13;
    this.SPACE = 32; 
    this.ESCAPE = 27;
    this.ARROW_UP = 38;
    this.ARROW_DOWN = 40;
    this.ARROW_RIGHT = 39;
    this.ARROW_LEFT = 37;
  }

  handleEnter(handler) {
    $(document).bind('keydown', (event) => {
      if (event.keyCode === this.ENTER) {
        handler();
      }
    });
  }

  handleEsc(handler) {
    $(document).bind('keydown', (event) => {
      if (event.keyCode === this.ESCAPE) {
        handler();
      }
    });
  }
}