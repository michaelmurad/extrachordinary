import { createChords } from '../src/createChords';

describe('createChords', () => {
  test('creates an array with array of triads', () => {
    const chordsList = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const chords = createChords(chordsList);
    expect(chords).toEqual([
      ['C', 'E', 'G'],
      ['D', 'F', 'A'],
      ['E', 'G', 'B'],
      ['F', 'A', 'C'],
      ['G', 'B', 'D'],
      ['A', 'C', 'E'],
      ['B', 'D', 'F']
    ]);
  });
  test('creates an array with array of triads in different key', () => {
    const chordsList = ['D', 'E', 'F', 'G', 'A', 'B', 'C'];
    const chords = createChords(chordsList);
    expect(chords).toEqual([
      ['D', 'F', 'A'],
      ['E', 'G', 'B'],
      ['F', 'A', 'C'],
      ['G', 'B', 'D'],
      ['A', 'C', 'E'],
      ['B', 'D', 'F'],
      ['C', 'E', 'G']
    ]);
  });
});
