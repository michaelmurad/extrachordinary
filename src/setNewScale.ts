import { IScales } from './scales';

// creates an array where the root note is the 0 index
export const setNewScale = (
  tonic: string,
  scale: string,
  scales: IScales,
  notes: string[]
): string[] => {
  // Creates a new array that starts at the root note
  const newArray = notes.slice(notes.findIndex(root => root === tonic));
  // Now iterate over the scale inputing the notes a new array
  const newScale: string[] = scales[scale].map(
    (note: number) => newArray[note - 1]
  );
  return newScale;
};
