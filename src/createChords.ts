// creates chordal progression based on scale using triads
export const createChords = (
  key: string[],
  chordsList: Array<string | Array<string | undefined>> = []
): Array<string | Array<string | undefined>> => {
  // No scales have over 7 notes, so will stop at 7
  if (chordsList.length > 6) {
    return chordsList;
  }
  let chord: string[] = [];
  // creates triads by skipping up a note in scale twice
  for (let i = 0; chord.length < 3; i += 2) {
    chord = [...chord, key[i]];
  }
  // moves up a note in the key
  const cycledScale = [...key.slice(1), key[0]];
  return createChords(cycledScale, [...chordsList, chord]);
};
