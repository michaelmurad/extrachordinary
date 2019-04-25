import { IScales } from './scales';

// creates an array where the root note is the 0 index
export const setNewScale = (
  tonic: string,
  scale: string,
  scales: IScales,
  notes: string[]
): string[] => {
  const newScale: string[] = scales[scale].map(
    (note: number) =>
      notes.slice(notes.findIndex(root => root === tonic))[note - 1]
  );
  return newScale;
};
