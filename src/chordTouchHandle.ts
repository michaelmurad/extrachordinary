// plays chord on touch
export const chordTouchHandle = (e: any, playChord: any) => {
  if (e && e.target && e.target.innerHTML) {
    // return playChord(e.target.innerHTML, notes, synth);
    return playChord;
  }
};
