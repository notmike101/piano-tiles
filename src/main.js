import { Game } from './js/Game.class';
import './styles/main.scss';

const notes = [
  'A4',
  'B4',
  'C4',
  'D4',
];

const twinkleTwinkle = {
  notes: [
    'C4',
    'C4',
    'G4',
    'G4',
    'A4',
    'A4',
    'G4',
    'F4',
    'F4',
    'E4',
    'E4',
    'D4',
    'D4',
    'C4',
  ],
  columnMap: {
    C4: 1,
    G4: 2,
    A4: 3,
    F4: 4,
    E4: 3,
    D4: 2,
  },
};

const game = new Game('#game', twinkleTwinkle.columnMap);
let noteInterval = 2000;
const intervalCap = 400;
const speedUpAfterNotes = 5;
const noteStep = 150;
let hitNotes = 0;
let noteTimer = null;
let songIndex = 0;

function noteTimerFunction() {
  // const randomNote = notes[Math.floor(Math.random() * notes.length)];
  const randomNote = twinkleTwinkle.notes[songIndex++];
  if (songIndex === twinkleTwinkle.notes.length) {
    songIndex = 0;
  }

  game.createNote(randomNote, (clickedNote) => {
    const notes = document.querySelectorAll('.note:not(.blank)');
    const lastNote = notes[notes.length - 1];

    if (
      (lastNote && lastNote.classList.value === clickedNote.classList.value) 
      || !lastNote
    ) { 
      hitNotes++;
      game.playNote(randomNote);
    } else {
      gameOver();
    }
  }, gameOver);

  const bottomOfGameArea = document.querySelector('#game').getBoundingClientRect().bottom;
  const lastNote = document.querySelector('.note:not(.blank):last-of-type');

  if (lastNote) {
    if (lastNote.getBoundingClientRect().y >= bottomOfGameArea) {
      gameOver();
    }
  }

  if (hitNotes === speedUpAfterNotes) {
    hitNotes = 0;
    noteInterval -= noteStep;

    if (noteInterval < intervalCap) {
      noteInterval = intervalCap;
    }

    clearInterval(noteTimer);

    console.log('Increased to ' + noteInterval);

    noteTimer = setInterval(noteTimerFunction, noteInterval);
  }
}

function gameOver() {
  clearInterval(noteTimer);
  alert('Game Over!');

  document.querySelector('#start-button').style.display = 'block';
  document.querySelector('#game').style.display = 'none';
  document.querySelectorAll('.note').forEach((elm) => {
    elm.remove();
  });
}

document.querySelector('#start-button').addEventListener('click', (event) => {
  event.target.style.display = 'none';
  game.setupEnvironment();

  noteTimer = setInterval(noteTimerFunction, noteInterval);
});
