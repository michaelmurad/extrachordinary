// plays chord in Synth based on string provided from DOM Node
export const playChord = (chord: string, notes: string[], synth: any) => {
  const time = '200n';
  const octive = 3;
  // this gets the root note and removes chord symbol
  const i = chord.length === 3 ? chord.slice(0, 2) : chord[0];
  // finds the root note index
  const rootIndex = notes.findIndex((note) => note === i);
  if (chord.endsWith('m')) {
    // plays minor chord
    const iii = notes[rootIndex + 3];
    const v = notes[rootIndex + 7];
    synth.triggerAttackRelease([i + octive, iii + octive, v + octive], time);
  } else if (chord.endsWith('°')) {
    // plays diminished chord
    const iii = notes[rootIndex + 3];
    const v = notes[rootIndex + 6];
    synth.triggerAttackRelease([i + octive, iii + octive, v + octive], time);
  } else if (chord.endsWith('+')) {
    // plays augmented chord
    const iii = notes[rootIndex + 4];
    const v = notes[rootIndex + 8];
    synth.triggerAttackRelease([i + octive, iii + octive, v + octive], time);
  } else {
    // plays Major chord
    const majorI = chord.split(' ')[0];
    const majorRootIndex = notes.findIndex((note) => note === majorI);
    const iii = notes[majorRootIndex + 4];
    const v = notes[majorRootIndex + 7];
    synth.triggerAttackRelease([majorI + octive, iii + octive, v + octive], time);
  }
};
