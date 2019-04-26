import { notes } from '../src/notes';
import {
  AEOLIAN,
  DORIAN,
  HARMONIC_MINOR,
  IONIAN,
  LOCRIAN,
  LYDIAN,
  MIXOLYDIAN,
  NATURAL_MINOR,
  PHRYGIAN,
  scales
} from '../src/scales';
import { setNewScale } from '../src/setNewScale';

describe('setNewScale', () => {
  describe('test scale implementation based on intervals', () => {
    test('should display all notes', () => {
      const all12Notes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

      const fakeScalesObject = {
        all12Notes,
        ...scales
      };
      const newScale = setNewScale('C', 'all12Notes', fakeScalesObject, notes);
      expect(newScale).toEqual([
        'C',
        'C#',
        'D',
        'D#',
        'E',
        'F',
        'F#',
        'G',
        'G#',
        'A',
        'A#',
        'B'
      ]);
    });
  });
  describe('testing scales', () => {
    test('creates new array of notes in the Ionian scale', () => {
      const newScale = setNewScale('C', IONIAN, scales, notes);
      expect(newScale).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    });
    test('works in other keys', () => {
      const newScale = setNewScale('C#', IONIAN, scales, notes);
      expect(newScale).toEqual(['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C']);
    });
    test('Dorian is accurate', () => {
      const newScale = setNewScale('D', DORIAN, scales, notes);
      expect(newScale).toEqual(['D', 'E', 'F', 'G', 'A', 'B', 'C']);
    });
    test('Aeolian is accurate', () => {
      const newScale = setNewScale('A', AEOLIAN, scales, notes);
      expect(newScale).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    });
    test('Locrian is accurate', () => {
      const newScale = setNewScale('B', LOCRIAN, scales, notes);
      expect(newScale).toEqual(['B', 'C', 'D', 'E', 'F', 'G', 'A']);
    });
    test('Lydian is accurate', () => {
      const newScale = setNewScale('F', LYDIAN, scales, notes);
      expect(newScale).toEqual(['F', 'G', 'A', 'B', 'C', 'D', 'E']);
    });
    test('Mixolydian is accurate', () => {
      const newScale = setNewScale('G', MIXOLYDIAN, scales, notes);
      expect(newScale).toEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F']);
    });
    test('Phrygian is accurate', () => {
      const newScale = setNewScale('E', PHRYGIAN, scales, notes);
      expect(newScale).toEqual(['E', 'F', 'G', 'A', 'B', 'C', 'D']);
    });
    test('Harmonic minor is accurate', () => {
      const newScale = setNewScale('A', HARMONIC_MINOR, scales, notes);
      expect(newScale).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G#']);
    });
    test('natural minor is accurate', () => {
      const newScale = setNewScale('A', NATURAL_MINOR, scales, notes);
      const aeolian = setNewScale('A', AEOLIAN, scales, notes);
      expect(newScale).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
      expect(newScale).toEqual(aeolian);
    });
  });
});
