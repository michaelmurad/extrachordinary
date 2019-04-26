import { findChord } from '../src/findChord';
import { notes } from '../src/notes';

describe('findChord', () => {
  test('can identify major chord', () => {
    const chord = findChord(['C', 'E', 'G'], notes);
    expect(chord).toBe('C');
  });

  test('can identify minor chord', () => {
    const chord = findChord(['C', 'D#', 'G'], notes);
    expect(chord).toBe('Cm');
  });

  test('can identify augmented chord', () => {
    const chord = findChord(['C', 'D#', 'G#'], notes);
    expect(chord).toBe('C+');
  });

  test('can identify diminished chord', () => {
    const chord = findChord(['C', 'D#', 'F#'], notes);
    expect(chord).toBe('C°');
  });

  test('works with first note being sharp', () => {
    const chord = findChord(['C#', 'E', 'G'], notes);
    expect(chord).toBe('C#°');
  });
});
