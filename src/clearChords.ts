// removes all clickable chords from DOM
export const clearChords = () => {
  const chords = document.getElementsByClassName('chords');
  [...chords].forEach((chord) => {
    chord && chord.parentNode && chord.parentNode.removeChild(chord);
  });
};
