import { addScales } from './addScales';
import { notes } from './notes';
import { playChord } from './playChord';
import { IONIAN, scales } from './scales';
import { setChordalIntervals } from './setChords';

export const chordinary = () => {
  // synth and its effects
  const tone = (window as any).Tone;
  const reverb = new tone.JCReverb(0.1).connect(tone.Master);
  const synth = new tone.PolySynth(4, tone.Synth).chain(reverb);

  let currentScale: string = IONIAN;
  let currentTonic: string = notes[0];
  let currentScaleNotes: string[] = [];

  return () => {
    // plays chord on touch
    const chordTouchHandle = (e: any) => {
      if (e && e.target && e.target.innerHTML) {
        return playChord(e.target.innerHTML, notes, synth);
      }
    };

    const setCurrentScaleNotes = (newNotes: string[]) => {
      currentScaleNotes = newNotes;
    };

    const setChordalIntervalsObject = {
      chordTouchHandle,
      notes,
      root: currentTonic,
      scale: currentScale,
      scales,
      setCurrentScaleNotes
    };

    // changes clickabel chords based on Tonic
    const tonicSelect = (e: any) => {
      currentTonic = e.target.options[e.target.options.selectedIndex].text;
      setChordalIntervals(setChordalIntervalsObject);
    };

    // changes clickabel chords based on scale/mode
    const scaleSelect = (e: any) => {
      currentScale = e.target.options[e.target.options.selectedIndex].text;
      setChordalIntervals(setChordalIntervalsObject);
    };

    // adds event listener to tonic select
    const tonicEl = document.getElementById('tonic');
    tonicEl && tonicEl.addEventListener('change', tonicSelect);

    // adds event listener to scale select
    const scaleEl = document.getElementById('scale');
    scaleEl && scaleEl.addEventListener('change', scaleSelect);

    // init onload
    setChordalIntervals(setChordalIntervalsObject);
    addScales(scales);
  };
};
