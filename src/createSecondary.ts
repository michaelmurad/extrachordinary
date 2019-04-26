import { createChords } from './createChords';
import { findChord } from './findChord';

// creates secondary chords
export const createSecondaryDominants = (
  currentScaleNotes: string[],
  notes: string[]
): void => {
  const secDomEl = document.getElementById('secdominant');
  const chords = createChords(currentScaleNotes);
  currentScaleNotes.slice(1).forEach((curNote, index) => {
    const chordEl = document.createElement('span');
    const secondaryRootEl = document.createElement('span');
    chordEl.className = 'chords';
    secondaryRootEl.className = 'secondary-root';
    secondaryRootEl.innerHTML = `curNote`;
    const noteIndex = notes.findIndex(note => note === curNote);
    const vii = notes[noteIndex + 7];
    const currentChord = findChord(chords[index + 1], notes);
    chordEl.innerHTML = `${vii} &#8594 ${currentChord}`;
    secDomEl && secDomEl.appendChild(chordEl);
  });
};
