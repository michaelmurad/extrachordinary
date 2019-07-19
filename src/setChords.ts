import { clearChords } from './clearChords';
import { createChords } from './createChords';
import { createSecondaryDominants } from './createSecondary';
import { findChord } from './findChord';
import { IScales } from './scales';
import { setNewScale } from './setNewScale';

interface ISetChordalIntervalObject {
  scales: IScales;
  chordTouchHandle: any;
  notes: string[];
}

// adds chords to DOM
export const setChordalIntervals = (
  setChordalIntervalsObject: ISetChordalIntervalObject,
  root: string,
  scale: string
): any => {
  const { notes, scales, chordTouchHandle } = setChordalIntervalsObject;
  const currentScaleNotes = setNewScale(root, scale, scales, notes);
  const chordsExist = document.getElementsByClassName('chords');

  if (chordsExist.length) {
    clearChords();
  }
  // this is an array of all the chords in the scale
  const chords = createChords(currentScaleNotes);

  // This is a base chord node that will be cloned
  const chordNode: HTMLElement = document.createElement('span');
  chordNode.className = 'chords';

  const tonicI = chordNode.cloneNode(true) as HTMLElement;
  const tonicIII = chordNode.cloneNode(true) as HTMLElement;
  const tonicVI = chordNode.cloneNode(true) as HTMLElement;
  const preDomII = chordNode.cloneNode(true) as HTMLElement;
  const preDomIV = chordNode.cloneNode(true) as HTMLElement;
  const domV = chordNode.cloneNode(true) as HTMLElement;
  const domVII = chordNode.cloneNode(true) as HTMLElement;

  const tonicEle = document.getElementById('tonics');
  const predominantEl = document.getElementById('predominant');
  const dominantEl = document.getElementById('dominant');

  // set tonic I III VI
  tonicI.innerHTML = findChord(chords[0], notes);
  tonicIII.innerHTML = findChord(chords[2], notes);
  tonicVI.innerHTML = findChord(chords[5], notes);
  tonicEle && tonicEle.appendChild(tonicI);
  tonicEle && tonicEle.appendChild(tonicIII);
  tonicEle && tonicEle.appendChild(tonicVI);

  // set pre-dominant II IV
  preDomII.innerHTML = findChord(chords[1], notes);
  preDomIV.innerHTML = findChord(chords[3], notes);
  predominantEl && predominantEl.appendChild(preDomII);
  predominantEl && predominantEl.appendChild(preDomIV);

  // set dominant V VII
  domV.innerHTML = findChord(chords[4], notes);
  domVII.innerHTML = findChord(chords[6], notes);
  dominantEl && dominantEl.appendChild(domV);
  dominantEl && dominantEl.appendChild(domVII);

  // // set secondary dominant
  createSecondaryDominants(currentScaleNotes, notes);
  // adds event listener to each node to play chord sound with synth
  [...document.getElementsByClassName('chords')].forEach(element =>
    element.addEventListener('click', chordTouchHandle)
  );
};
