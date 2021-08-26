import * as Tone from 'tone';

export class Piano {
  #synth = null;
  #synthLoaded = null;

  constructor() {
    this.#synth = new Tone.Synth().toDestination();
  }

  play(note, duration = '8n') {
    this.#synth.triggerAttackRelease(note, duration);
  }

  playSequence(sequence) {
    sequence.forEach(({ note, duration }, index) => {
      this.#synth.triggerAttackRelease(note, duration, index + 1);
    });
  }

  async initializeSynth() {
    await Tone.start();
    this.#synthLoaded = Tone.Transport.state === 'started';
  }

  get isSynthLoaded() {
    return this.#synthLoaded;
  }

  set bpm(bpm) {
    console.log('Bumped BPM to ' + bpm);
    Tone.Transport.bpm.value = bpm;
  }

  get bpm() {
    return Tone.Transport.bpm.value;
  }
};
