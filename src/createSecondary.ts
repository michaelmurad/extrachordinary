// creates secondary chords
export const createSecondaryDominants = (
  currentScaleNotes: string[],
  notes: string[]
): void => {
  const secDomEl = document.getElementById('secdominant');
  currentScaleNotes.slice(1).forEach(curNote => {
    const chordEl = document.createElement('span');
    const secondaryRootEl = document.createElement('span');
    chordEl.className = 'chords';
    secondaryRootEl.className = 'secondary-root';
    secondaryRootEl.innerHTML = `curNote`;
    const noteIndex = notes.findIndex(note => note === curNote);
    const vii = notes[noteIndex + 7];
    chordEl.innerHTML = `${vii} &#8594 ${curNote}`;
    secDomEl && secDomEl.appendChild(chordEl);
    // secDomEl && secDomEl.appendChild(secondaryRootEl);
  });
};
