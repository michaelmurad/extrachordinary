// creates chordal progression based on scale using triads
export const createChords = (
  key: string[],
  chordsList: Array<string | Array<string | undefined>> = [],
): Array<string | Array<string | undefined>> => {
if (chordsList.length > 6) {
  return chordsList;
}
let chord: string[] = [];
for (let i = 0; chord.length < 3; i += 2) {
  chord = [...chord, key[i]];
}
const cycledScale = [...key.slice(1), key[0]];
return createChords(cycledScale, [...chordsList, chord]);
};
