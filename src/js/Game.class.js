import { Piano } from './Piano.class';

export class Game {
  #piano = null;
  #gameContainer = null;
  #columnNoteMap = null;
  #noteIdentifier = 0;

  constructor(gameContainer, columnMap) {
    this.#gameContainer = document.querySelector(gameContainer);
    this.#piano = new Piano();

    this.#columnNoteMap = columnMap ?? {
      A4: 1,
      B4: 2,
      C4: 3,
      D4: 4,
    };
  }

  createNote(note, clickEvent = (() => {}), gameoverEvent = (() => {})) {
    const targetColumnNumber = this.#columnNoteMap[note];
    const allColumns = this.gameContainer.querySelectorAll('.column');

    allColumns.forEach((elm) => {
      if (elm.id === `column${targetColumnNumber}`) {
        const newNote = document.createElement('div');

        newNote.classList.add('note', `note-${this.#noteIdentifier++}`);
        newNote.addEventListener('click', (e) => {
          clickEvent(e.target);
          e.target.remove();
        });
        elm.prepend(newNote);
      } else {
        const blankNote = document.createElement('div');

        blankNote.addEventListener('click', (e) => {
          gameoverEvent();
        });

        blankNote.classList.add('note', 'blank');
        elm.prepend(blankNote);
      }
    });
  }

  playNote(note) {
    this.#piano.play(note);
  }

  async setupEnvironment() {
    await this.#piano.initializeSynth();

    this.#gameContainer.style.display = 'flex';
  }

  get gameContainer() {
    return this.#gameContainer;
  }
};
