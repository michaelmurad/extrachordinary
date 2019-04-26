import { htmlString } from '../misc/htmlString';
import { chordinary } from '../src/chordinary';
import { scales } from '../src/scales';

describe('chordinary', () => {
  describe('init', () => {
    test('should populate chords', async () => {
      document.body.innerHTML = htmlString;
      chordinary()();
      const chordEls = document.getElementsByClassName('chords');
      const chordElsChildrenCount = chordEls && chordEls.length;
      expect(chordElsChildrenCount).toBe(13);
    });
    test('should populate scales', () => {
      document.body.innerHTML = htmlString;
      chordinary()();
      const scaleEl = document.getElementById('scale');
      const scaleElChildren =
        scaleEl && [...scaleEl.children].map(element => element.innerHTML);
      expect(scaleElChildren).toEqual(Object.keys(scales));
    });
  });
  describe('event handlers', () => {
    test('select tonic change should repopulate chords', () => {
      document.body.innerHTML = htmlString;
      chordinary()();
      const tonicEl = document.getElementById('tonic') as any;
      tonicEl.options[2].selected = 'selected';
      // this triggers event
      const e = document.createEvent('HTMLEvents');
      e.initEvent('change', false, true);
      tonicEl.dispatchEvent(e);

      const chordEls = document.getElementsByClassName('chords');
      expect([...chordEls].map(element => element.innerHTML)).toEqual([
        'D',
        'F#m',
        'Bm',
        'Em',
        'G',
        'A',
        'C#°',
        'B → Em',
        'C# → F#m',
        'D → G',
        'E → A',
        'F# → Bm',
        'G# → C#°'
      ]);
    });
    test('select scale change should repopulate chords', () => {
      document.body.innerHTML = htmlString;
      chordinary()();
      const scaleEl = document.getElementById('scale') as any;
      scaleEl.options[2].selected = 'selected';
      // this triggers event
      const e = document.createEvent('HTMLEvents');
      e.initEvent('change', false, true);
      scaleEl.dispatchEvent(e);

      const chordEls = document.getElementsByClassName('chords');
      expect([...chordEls].map(element => element.innerHTML)).toEqual([
        'Cm',
        'D#',
        'G#',
        'C#',
        'Fm',
        'G°',
        'A#m',
        'G# → C#',
        'A# → D#',
        'C → Fm',
        'D → G°',
        'D# → G#',
        'F → A#m'
      ]);
    });
    test('select scale change then tonic change should repopulate chords', () => {
      document.body.innerHTML = htmlString;
      chordinary()();
      const scaleEl = document.getElementById('scale') as any;
      scaleEl.options[2].selected = 'selected';
      // this triggers event
      const e = document.createEvent('HTMLEvents');
      e.initEvent('change', false, true);
      scaleEl.dispatchEvent(e);

      let chordEls = document.getElementsByClassName('chords');
      expect([...chordEls].map(element => element.innerHTML)).toEqual([
        'Cm',
        'D#',
        'G#',
        'C#',
        'Fm',
        'G°',
        'A#m',
        'G# → C#',
        'A# → D#',
        'C → Fm',
        'D → G°',
        'D# → G#',
        'F → A#m'
      ]);
      const tonicEl = document.getElementById('tonic') as any;
      tonicEl.options[2].selected = 'selected';
      // this triggers event
      tonicEl.dispatchEvent(e);

      chordEls = document.getElementsByClassName('chords');
      expect([...chordEls].map(element => element.innerHTML)).toEqual([
        'Dm',
        'F',
        'A#',
        'D#',
        'Gm',
        'A°',
        'Cm',
        'A# → D#',
        'C → F',
        'D → Gm',
        'E → A°',
        'F → A#',
        'G → Cm'
      ]);
    });
    test('select tonic change then scale change should repopulate chords', () => {
      document.body.innerHTML = htmlString;
      chordinary()();
      const tonicEl = document.getElementById('tonic') as any;
      tonicEl.options[2].selected = 'selected';
      // this triggers event
      const e = document.createEvent('HTMLEvents');
      e.initEvent('change', false, true);
      tonicEl.dispatchEvent(e);

      let chordEls = document.getElementsByClassName('chords');
      expect([...chordEls].map(element => element.innerHTML)).toEqual([
        'D',
        'F#m',
        'Bm',
        'Em',
        'G',
        'A',
        'C#°',
        'B → Em',
        'C# → F#m',
        'D → G',
        'E → A',
        'F# → Bm',
        'G# → C#°'
      ]);
      const scaleEl = document.getElementById('scale') as any;
      scaleEl.options[2].selected = 'selected';
      // this triggers event
      scaleEl.dispatchEvent(e);

      chordEls = document.getElementsByClassName('chords');
      expect([...chordEls].map(element => element.innerHTML)).toEqual([
        'Dm',
        'F',
        'A#',
        'D#',
        'Gm',
        'A°',
        'Cm',
        'A# → D#',
        'C → F',
        'D → Gm',
        'E → A°',
        'F → A#',
        'G → Cm'
      ]);
    });
    test('multiple select tonic changes should repopulate chords', () => {
      document.body.innerHTML = htmlString;
      chordinary()();
      const tonicEl = document.getElementById('tonic') as any;
      tonicEl.options[2].selected = 'selected';
      // this triggers event
      const e = document.createEvent('HTMLEvents');
      e.initEvent('change', false, true);
      tonicEl.dispatchEvent(e);

      let chordEls = document.getElementsByClassName('chords');
      expect([...chordEls].map(element => element.innerHTML)).toEqual([
        'D',
        'F#m',
        'Bm',
        'Em',
        'G',
        'A',
        'C#°',
        'B → Em',
        'C# → F#m',
        'D → G',
        'E → A',
        'F# → Bm',
        'G# → C#°'
      ]);
      tonicEl.options[3].selected = 'selected';
      tonicEl.dispatchEvent(e);
      chordEls = document.getElementsByClassName('chords');
      expect([...chordEls].map(element => element.innerHTML)).toEqual([
        'D#',
        'Gm',
        'Cm',
        'Fm',
        'G#',
        'A#',
        'D°',
        'C → Fm',
        'D → Gm',
        'D# → G#',
        'F → A#',
        'G → Cm',
        'A → D°'
      ]);
    });
    test('multiple select scale changes should repopulate chords', () => {
      document.body.innerHTML = htmlString;
      chordinary()();
      const scaleEl = document.getElementById('scale') as any;
      scaleEl.options[2].selected = 'selected';
      // this triggers event
      const e = document.createEvent('HTMLEvents');
      e.initEvent('change', false, true);
      scaleEl.dispatchEvent(e);

      let chordEls = document.getElementsByClassName('chords');
      expect([...chordEls].map(element => element.innerHTML)).toEqual([
        'Cm',
        'D#',
        'G#',
        'C#',
        'Fm',
        'G°',
        'A#m',
        'G# → C#',
        'A# → D#',
        'C → Fm',
        'D → G°',
        'D# → G#',
        'F → A#m'
      ]);
      scaleEl.options[3].selected = 'selected';
      scaleEl.dispatchEvent(e);
      chordEls = document.getElementsByClassName('chords');
      expect([...chordEls].map(element => element.innerHTML)).toEqual([
        'C',
        'Em',
        'Am',
        'D',
        'F#°',
        'G',
        'Bm',
        'A → D',
        'B → Em',
        'C# → F#°',
        'D → G',
        'E → Am',
        'F# → Bm'
      ]);
    });
  });
});
