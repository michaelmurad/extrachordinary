import { addScales } from './addScales';
import { notes } from './notes';
import { playChord } from './playChord';
import { IONIAN, scales } from './scales';
import { setChordalIntervals } from './setChords';

export const chordinary = () => {
  // synth and its effects
  const tone = (window as any).Tone;
  const reverb = tone && new tone.JCReverb(0.1);
  const vol = tone && new tone.Volume(-12);
  const comp = tone && new tone.Compressor(-30, 3);
  const synth =
    tone &&
    new tone.PolySynth(4, tone.Synth).chain(reverb, comp, vol, tone.Master);
  let currentScale: string = IONIAN;
  let currentTonic: string = notes[0];

  return () => {
    // plays chord on touch
    const chordTouchHandle = (e: any) => {
      if (e && e.target && e.target.innerHTML) {
        return playChord(e.target.innerHTML, notes, synth);
      }
    };

    const setChordalIntervalsObject = {
      chordTouchHandle,
      notes,
      scales
    };

    // changes clickable chords based on Tonic
    const tonicSelect = (e: any) => {
      currentTonic = e.target.options[e.target.options.selectedIndex].text;
      setChordalIntervals(
        setChordalIntervalsObject,
        currentTonic,
        currentScale
      );
    };

    // changes clickabel chords based on scale/mode
    const scaleSelect = (e: any) => {
      currentScale = e.target.options[e.target.options.selectedIndex].text;
      setChordalIntervals(
        setChordalIntervalsObject,
        currentTonic,
        currentScale
      );
    };

    // adds event listener to tonic select
    const tonicEl = document.getElementById('tonic');
    tonicEl && tonicEl.addEventListener('change', tonicSelect);

    // adds event listener to scale select
    const scaleEl = document.getElementById('scale');
    scaleEl && scaleEl.addEventListener('change', scaleSelect);

    // init onload
    setChordalIntervals(setChordalIntervalsObject, currentTonic, currentScale);
    addScales(scales);
  };
};
