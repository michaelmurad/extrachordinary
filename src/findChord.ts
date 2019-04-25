// determines chord type based on intervals
export const findChord = (chord: string | Array<string | undefined>, notes: string[]): string => {
  const root = chord[0];
  const third = chord[1];
  const fifth = chord[2];
  const i = notes.findIndex((c) => c === root);
  const iii = notes.slice(i).findIndex((c) => c === third);
  const v = notes.slice(i).findIndex((f) => f === fifth);
  if (v === 8) {
    return `${root}+`;
  }
  if (v === 6) {
    return `${root}°`;
  }
  if (iii === 3) {
    return `${root}m`;
  }
  return root || 'C';

};
