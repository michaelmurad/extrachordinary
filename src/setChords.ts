import { clearChords } from './clearChords';
import { createChords } from './createChords';
import { createSecondaryDominants } from './createSecondary';
import { findChord } from './findChord';
import { IScales } from './scales';
import { setNewScale } from './setNewScale';

interface ISetChordalIntervalObject {
  scale: string;
  root: string;
  notes: string[];
  scales: IScales;
  setCurrentScaleNotes: any;
  chordTouchHandle: any;
}

// adds chords to DOM
export const setChordalIntervals = (
  setChordalIntervalsObject: ISetChordalIntervalObject,
  ): any => {
  const {
    scale,
    root,
    notes,
    scales,
    setCurrentScaleNotes,
    chordTouchHandle,
  } = setChordalIntervalsObject;
  const currentScaleNotes = setNewScale(root, scale, scales, notes, setCurrentScaleNotes);
  const chordsExist = document.getElementsByClassName('chords');
  if (chordsExist.length) { clearChords(); }
  // this is an array of all the chords in the scale
  const chords = createChords(currentScaleNotes);
  // find tonic
  const tonicEle = document.getElementById('tonics');
  // set tonic I III VI
  const span1: HTMLElement = document.createElement('span');
  span1.className = 'chords';

  const span2 = span1.cloneNode(true) as HTMLElement;
  const span3 = span1.cloneNode(true) as HTMLElement;
  span1.innerHTML = findChord(chords[0], notes);
  span2.innerHTML = findChord(chords[2], notes);
  span3.innerHTML = findChord(chords[5], notes);
  tonicEle && tonicEle.appendChild(span1);
  tonicEle && tonicEle.appendChild(span2);
  tonicEle && tonicEle.appendChild(span3);
  // find predominant
  const predominantEl = document.getElementById('predominant');
  // set pre-dominant II IV
  const preDom2 = span1.cloneNode() as HTMLElement;
  const preDom4 = span1.cloneNode() as HTMLElement;
  preDom2.innerHTML = findChord(chords[1], notes);
  preDom4.innerHTML = findChord(chords[3], notes);
  predominantEl && predominantEl.appendChild(preDom2);
  predominantEl && predominantEl.appendChild(preDom4);
  // find dominant
  const dominantEl = document.getElementById('dominant');
  // // set dominant V VII
  const dom5 = span1.cloneNode() as HTMLElement;
  const dom7 = span1.cloneNode() as HTMLElement;
  dom5.innerHTML = findChord(chords[4], notes);
  dom7.innerHTML = findChord(chords[6], notes);

  dominantEl && dominantEl.appendChild(dom5);
  dominantEl && dominantEl.appendChild(dom7);
  // // set secondary dominant
  createSecondaryDominants(currentScaleNotes, notes);
  const chordClass = document.getElementsByClassName('chords');
  const secChordClass = document.getElementsByClassName('sec-chords');
  // adds event listener to each node to play chord sound with synth
  [...chordClass].forEach((element) =>  element.addEventListener('click', chordTouchHandle));
  [...secChordClass].forEach((element) =>  element.addEventListener('click', chordTouchHandle));

};
