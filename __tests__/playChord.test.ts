import { notes } from '../src/notes';
import { playChord } from '../src/playChord';

describe('playChord', () => {
  test('should fire triggerAttackRelease once', () => {
    const synth = {
      triggerAttackRelease: jest.fn()
    };
    playChord('Cm', notes, synth);
    expect(synth.triggerAttackRelease.mock.calls.length).toBe(1);
  });
  test('should play minor chord', () => {
    const synth = {
      triggerAttackRelease: jest.fn()
    };
    playChord('Cm', notes, synth);
    expect(synth.triggerAttackRelease.mock.calls[0][0]).toEqual([
      'C3',
      'D#3',
      'G3'
    ]);
  });
  test('should play major chord', () => {
    const synth = {
      triggerAttackRelease: jest.fn()
    };
    playChord('C', notes, synth);
    expect(synth.triggerAttackRelease.mock.calls[0][0]).toEqual([
      'C3',
      'E3',
      'G3'
    ]);
  });
  test('should play diminished chord', () => {
    const synth = {
      triggerAttackRelease: jest.fn()
    };
    playChord('C°', notes, synth);
    expect(synth.triggerAttackRelease.mock.calls[0][0]).toEqual([
      'C3',
      'D#3',
      'F#3'
    ]);
  });
  test('should play augmented chord', () => {
    const synth = {
      triggerAttackRelease: jest.fn((arr, time) => null)
    };
    playChord('C+', notes, synth);
    expect(synth.triggerAttackRelease.mock.calls[0][0]).toEqual([
      'C3',
      'E3',
      'G#3'
    ]);
  });
  test('should play a major chord when → is present', () => {
    const synth = {
      triggerAttackRelease: jest.fn((arr, time) => null)
    };
    playChord('A → Dm', notes, synth);
    expect(synth.triggerAttackRelease.mock.calls[0][0]).toEqual([
      'A3',
      'C#3',
      'E3'
    ]);
  });
});
