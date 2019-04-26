import { htmlString } from '../misc/htmlString';
import { notes } from '../src/notes';
import { IONIAN, scales } from '../src/scales';
import { setChordalIntervals } from '../src/setChords';

describe('setChordalIntervals', () => {
  test('should create tonic chords and insert them into the DOM', () => {
    document.body.innerHTML = htmlString;
    setChordalIntervals(
      {
        chordTouchHandle: jest.fn(),
        notes,
        scales
      },
      'C',
      IONIAN
    );
    const tonicEle = document.getElementById('tonics');
    const tonicElChildrenCount = tonicEle && tonicEle.childElementCount;
    expect(tonicElChildrenCount).toBe(3);
    const tonicElChildren =
      tonicEle && [...tonicEle.children].map(elements => elements.innerHTML);
    expect(tonicElChildren).toEqual(['C', 'Em', 'Am']);
  });
  test('should create predominant chords and insert them into the DOM', () => {
    document.body.innerHTML = htmlString;
    setChordalIntervals(
      {
        chordTouchHandle: jest.fn(),
        notes,
        scales
      },
      'C',
      IONIAN
    );
    const predominantEl = document.getElementById('predominant');
    const predominantElChildrenCount =
      predominantEl && predominantEl.childElementCount;
    const predominantElChildren =
      predominantEl &&
      [...predominantEl.children].map(element => element.innerHTML);
    expect(predominantElChildrenCount).toBe(2);
    expect(predominantElChildren).toEqual(['Dm', 'F']);
  });
  test('should create dominant chords and insert them into the DOM', () => {
    document.body.innerHTML = htmlString;
    setChordalIntervals(
      {
        chordTouchHandle: jest.fn(),
        notes,
        scales
      },
      'C',
      IONIAN
    );
    const dominantEl = document.getElementById('dominant');
    const dominantElChildrenCount = dominantEl && dominantEl.childElementCount;
    const dominantElChildren =
      dominantEl && [...dominantEl.children].map(element => element.innerHTML);
    expect(dominantElChildrenCount).toBe(2);
    expect(dominantElChildren).toEqual(['G', 'B°']);
  });
  test('should set event listeners on .chords', () => {
    document.body.innerHTML = htmlString;
    const chordTouchHandle = jest.fn();
    setChordalIntervals(
      {
        chordTouchHandle,
        notes,
        scales
      },
      'C',
      IONIAN
    );
    const chordClass = document.getElementsByClassName('chords');

    [...chordClass].forEach(element => {
      const elAsAny = element as any;
      elAsAny.click();
    });
    expect(chordTouchHandle).toBeCalledTimes(13);
  });
});
