export const IONIAN = 'Ionian';
export const DORIAN = 'Dorian';
export const PHRYGIAN = 'Phrygian';
export const LYDIAN = 'Lydian';
export const MIXOLYDIAN = 'Mixolydian';
export const AEOLIAN = 'Aeolian';
export const LOCRIAN = 'Locrian';
export const NATURAL_MINOR = 'Natural Minor';
export const HARMONIC_MINOR = 'Harmonic Minor';

export interface IScales {
  [IONIAN]: number[];
  [DORIAN]: number[];
  [PHRYGIAN]: number[];
  [LYDIAN]: number[];
  [MIXOLYDIAN]: number[];
  [AEOLIAN]: number[];
  [LOCRIAN]: number[];
  [NATURAL_MINOR]: number[];
  [HARMONIC_MINOR]: number[];
  [key: string]: number[];
}

export const scales: IScales = {
  [IONIAN]: [1, 3, 5, 6, 8, 10, 12],
  [DORIAN]: [1, 3, 4, 6, 8, 10, 11],
  [PHRYGIAN]: [1, 2, 4, 6, 8, 9, 11],
  [LYDIAN]: [1, 3, 5, 7, 8, 10, 12],
  [MIXOLYDIAN]: [1, 3, 5, 6, 8, 10, 11],
  [AEOLIAN]: [1, 3, 4, 6, 8, 9, 11],
  [LOCRIAN]: [1, 2, 4, 6, 7, 9, 11],
  [NATURAL_MINOR]: [1, 3, 4, 6, 8, 9, 11],
  [HARMONIC_MINOR]: [1, 3, 4, 6, 8, 9, 12]
};
