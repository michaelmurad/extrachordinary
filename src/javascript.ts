const chordinary = () => {
  // synth and its effects
  const reverb = new window.Tone.JCReverb(.1).connect(window.Tone.Master);
  const synth = new window.Tone.PolySynth(4, window.Tone.Synth).chain(reverb);

  const notes = [
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
    'B',
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
    'B',
  ];

  const IONIAN = 'Ionian';
  const DORIAN = 'Dorian';
  const PHRYGIAN = 'Phrygian';
  const LYDIAN = 'Lydian';
  const MIXOLYDIAN = 'Mixolydian';
  const AEOLIAN = 'Aeolian';
  const LOCRIAN = 'Locrian';
  const NATURAL_MINOR = 'Natural Minor';
  const HARMONIC_MINOR = 'Harmonic Minor';

  interface IScales {
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

  const scales: IScales = {
    [IONIAN]: [1, 3, 5, 6, 8, 10, 12],
    [DORIAN]: [1, 3, 4, 6, 8, 10, 11],
    [PHRYGIAN]: [1, 2, 4, 6, 8, 9, 11],
    [LYDIAN]: [1, 3, 5, 7, 8, 10, 12],
    [MIXOLYDIAN]: [1, 3, 5, 6, 8, 10, 11],
    [AEOLIAN]: [1, 3, 4, 6, 8, 9, 11],
    [LOCRIAN]: [1, 2, 4, 6, 7, 9, 11],
    [NATURAL_MINOR]: [1, 3, 4, 6, 8, 9, 11],
    [HARMONIC_MINOR]: [1, 3, 4, 6, 8, 9, 12],
  };
  return () => {
    // plays chord in Synth based on string provided from DOM Node
    const playChord = (chord: string) => {
      const time = '200n';
      const octive = 3;
      // this gets the root note and removes chord symbol
      const i = chord.length === 3 ? chord.slice(0, 2) : chord[0];
      // finds the root note index
      const rootIndex = notes.findIndex((note) => note === i);
      if (chord.endsWith('m')) {
        // plays minor chord
        const iii = notes[rootIndex + 3];
        const v = notes[rootIndex + 7];
        synth.triggerAttackRelease([i + octive, iii + octive, v + octive], time);
      } else if (chord.endsWith('°')) {
        // plays diminished chord
        const iii = notes[rootIndex + 3];
        const v = notes[rootIndex + 6];
        synth.triggerAttackRelease([i + octive, iii + octive, v + octive], time);
      } else if (chord.endsWith('+')) {
        // plays augmented chord
        const iii = notes[rootIndex + 4];
        const v = notes[rootIndex + 8];
        synth.triggerAttackRelease([i + octive, iii + octive, v + octive], time);
      } else {
        // plays Major chord
        const majorI = chord;
        const majorRootIndex = notes.findIndex((note) => note === majorI);
        const iii = notes[majorRootIndex + 4];
        const v = notes[majorRootIndex + 7];
        synth.triggerAttackRelease([majorI + octive, iii + octive, v + octive], time);
      }
    };

    // plays chord on touch
    const chordTouchHandle = (e: any) => {
      if (e && e.target && e.target.innerHTML)  {
        return playChord(e.target.innerHTML);
      }
    };

    // adds scales <option> to <select id="scales"> DOM Node
    const addScales = () => {
      const scalesEl = document.getElementById('scale');
      const scaleList = Object.keys(scales);
      scaleList.forEach((scale) => {
        const optionToInsert = document.createElement('option');
        optionToInsert.innerHTML = scale;
        if (scalesEl) {
          scalesEl.appendChild(optionToInsert);
        }
      });

    };

    // creates an array where the root note is the 0 index
    const setNewScale = (tonic: string, scale: string): string[] => {
      const newScale: string[] = scales[scale].map(
        (note: number) => notes.slice(notes.findIndex((root) => root === tonic))[note - 1]);
      return newScale;
    };

    // determines chord type based on intervals
    const findChord = (chord: string | Array<string | undefined>): string => {
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

    // creates chordal progression based on scale using triads
    const createChords = (
        key: string[],
        chordsList: Array<string | Array<string | undefined>> = [],
      ): Array<string | Array<string | undefined>> => {
      if (chordsList.length > 6) {
        return chordsList;
      }
      let chord: string[] = [];
      for (let i = 0; chord.length < 3; i += 2) {
        chord = [...chord, key[i]];
      }
      const cycledScale = [...key.slice(1), key[0]];
      return createChords(cycledScale, [...chordsList, chord]);
    };

    // adds chords to DOM
    const setChordalIntervals = (scale: string = IONIAN, root: string = 'C') => {
      const chordsExist = document.getElementsByClassName('chords');
      if (chordsExist.length) { clearChords(); }
      // this is an array of all the chords in the scale
      const chords = createChords(setNewScale(root, scale));
      // find tonic
      const tonicEle = document.getElementById('tonics');
      // set tonic I III VI
      const span1 = document.createElement('span');
      span1.className = 'chords';

      const span2 = span1.cloneNode(true);
      const span3 = span1.cloneNode(true);

      span1.innerHTML = findChord(chords[0]);
      span2.innerHTML = findChord(chords[2]);
      span3.innerHTML = findChord(chords[5]);
      tonicEle && tonicEle.appendChild(span1);
      tonicEle && tonicEle.appendChild(span2);
      tonicEle && tonicEle.appendChild(span3);
      // find predominant
      const predominantEl = document.getElementById('predominant');
      // set pre-dominant II IV
      const preDom2 = span1.cloneNode();
      const preDom4 = span1.cloneNode();
      preDom2.innerHTML = findChord(chords[1]);
      preDom4.innerHTML = findChord(chords[3]);
      predominantEl && predominantEl.appendChild(preDom2);
      predominantEl && predominantEl.appendChild(preDom4);
      // find dominant
      const dominantEl = document.getElementById('dominant');
      // // set dominant V VII
      const dom5 = span1.cloneNode();
      const dom7 = span1.cloneNode();
      dom5.innerHTML = findChord(chords[4]);
      dom7.innerHTML = findChord(chords[6]);

      dominantEl && dominantEl.appendChild(dom5);
      dominantEl && dominantEl.appendChild(dom7);
      // // set secondary dominant

      const chordClass = document.getElementsByClassName('chords');
      // adds event listener to each node to play chord sound with synth
      [...chordClass].forEach((element) =>  element.addEventListener('click', chordTouchHandle));

    };

    // removes all clickable chords from DOM
    const clearChords = () => {
      const chords = document.getElementsByClassName('chords');
      [...chords].forEach((chord) => {
        chord && chord.parentNode && chord.parentNode.removeChild(chord);
      });
    };

    // changes clickabel chords based on Tonic
    const tonicSelect = (e: any) => {
      const selected = e.target.options[e.target.options.selectedIndex].text;
      const scale: any = document.getElementById('scale');
      const key = scale && scale.options && scale.options[scale.options.selectedIndex].text;
      setChordalIntervals(key || IONIAN, selected || 'C');
    };

    // changes clickabel chords based on scale/mode
    const scaleSelect = (e: any) => {
      const selectedScale = e.target.options[e.target.options.selectedIndex].text;
      const tonicElement: any = document.getElementById('tonic');
      const tonic = tonicElement.options[tonicElement.options.selectedIndex].text;
      setChordalIntervals(selectedScale, tonic);
    };

    // adds event listener to tonic select
    const tonicEl = document.getElementById('tonic');
    tonicEl && tonicEl.addEventListener('change', tonicSelect);

    // adds event listener to scale select
    const scaleEl = document.getElementById('scale');
    scaleEl && scaleEl.addEventListener('change', scaleSelect);

    // init onload
    setChordalIntervals(IONIAN, 'C');
    addScales();
}; };

onload = chordinary();
