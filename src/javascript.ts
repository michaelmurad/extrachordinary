const chordinary = () => {
  const reverb = new Tone.JCReverb(.1).connect(Tone.Master);
  const synth = new Tone.PolySynth(4, Tone.Synth).chain(reverb);

  const notes = ['C', 'C#', 'D', 'D#', 'E','F','F#','G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E','F','F#','G', 'G#', 'A', 'A#', 'B'];
  
  const IONIAN = 'Ionian'
  const DORIAN = 'Dorian'
  const PHRYGIAN = 'Phrygian'
  const LYDIAN = 'Lydian'
  const MIXOLYDIAN = 'Mixolydian'
  const AEOLIAN = 'Aeolian'
  const LOCRIAN = 'Locrian'
  const NATURAL_MINOR = 'Natural Minor'
  const HARMONIC_MINOR = 'Harmonic Minor'

  const scales = {
    [IONIAN]: [1,3,5,6,8,10,12],
    [DORIAN]: [1,3,4,6,8,10,11],
    [PHRYGIAN]: [1,2,4,6,8,9,11],
    [LYDIAN]: [1,3,5,7,8,10,12],
    [MIXOLYDIAN]: [1,3,5,6,8,10,11],
    [AEOLIAN]: [1,3,4,6,8,9,11],
    [LOCRIAN]: [1,2,4,6,7,9,11],
    [NATURAL_MINOR]: [1,3,4,6,8,9,11],
    [HARMONIC_MINOR]: [1,3,4,6,8,9,12],
  } 
  return () => {

    const playChord = (chord: string) => {
      const time = '200n'
      const octive = 3
      if (chord.endsWith('m')) {
        let i = chord.length === 3 ? chord.slice(0,2) : chord[0];
        let scale = [...notes.slice(notes.findIndex(note => note === i))]
        let iii = scale[3];
        let v = scale[7];
        synth.triggerAttackRelease([i+octive,iii+octive,v+octive], time);
      } else if (chord.endsWith('°')) {
        let i = chord.length === 3 ? chord.slice(0,2) : chord[0];
        let scale = [...notes.slice(notes.findIndex(note => note === i))]
        let iii = scale[3];
        let v = scale[6];
        synth.triggerAttackRelease([i+octive,iii+octive,v+octive], time);
      } else if (chord.endsWith('+')) {
        let i = chord.length === 3 ? chord.slice(0,2) : chord[0];
        let scale = [...notes.slice(notes.findIndex(note => note === i))]
        let iii = scale[4];
        let v = scale[8];
        synth.triggerAttackRelease([i+octive,iii+octive,v+octive], time);
      } else {
        let i = chord
        let scale = [...notes.slice(notes.findIndex(note => note === chord))]
        let iii = scale[4];
        let v = scale[7];
        synth.triggerAttackRelease([i+octive,iii+octive,v+octive], time);
      }
    }

    const chordTouchHandle = (e: Event) => {
      e && e.target && e.target.innerHTML && playChord(e.target.innerHTML);
    }

    const addScales = () => {
      const scalesEl = document.getElementById('scale')
      const scaleList = Object.keys(scales)
      scaleList.forEach(scale => {
        const optionToInsert = document.createElement('option')
        optionToInsert.innerHTML = scale
        if (scalesEl) {
          scalesEl.appendChild(optionToInsert)
        }
      })

    }
    const setNewScale = (tonic: string, scale: string): string[] => {
      let newScale: string[] = scales[scale].map((note: number) => notes.slice(notes.findIndex(root => root === tonic))[note - 1]);
      console.log('newScalse', newScale)
      return newScale
    }

    const findChord = (chord: string[]) => {
      let root = chord[0];
      let third = chord[1];
      let fifth = chord[2];
      let i = notes.findIndex(c => c === root);
      let iii = notes.slice(i).findIndex(c => c === third);
      let v = notes.slice(i).findIndex(f => f === fifth);
      console.log(i,iii,v)
      if (v === 8) {
        return `${root}+`
      }
      if (v === 6) {
        return `${root}°`
      }
      if (iii === 3) {
        return `${root}m`
      }
      return root; 
      
    }

    const createChords = (key: string[], chordsList: (string | (string | undefined)[])[] = []): (string | (string | undefined)[])[] => {
      console.log('key', key);
      if (chordsList.length > 6) {
        console.log('final chordslist', chordsList)
        return chordsList
      };
      let chord: string[] = [];
      for(let i = 0; chord.length < 3; i+=2) {
        chord = [...chord, key[i]];
      }
      console.log('chordslist', chordsList)
      const cycledScale = [...key.slice(1), key[0]]
      console.log('cycled', cycledScale);
      return createChords(cycledScale, [...chordsList, chord])
    }

    const setChordalIntervals = (scale: string = IONIAN, root: string = 'C') => {
      const chordsExist = document.getElementsByClassName('chords');
      if (chordsExist.length) clearChords();
      // this is an array of all the chords in the scale
      const chords = createChords(setNewScale(root, scale))
      console.log('chords',chords);
      // find tonic 
      const tonicEl = document.getElementById('tonics')
      // set tonic I III VI
      const span1 = document.createElement("span")
      span1.className = 'chords'
      // span1.addEventListener("click", chordTouchHandle)
      const span2 = span1.cloneNode(true)
      // span2.addEventListener("click", chordTouchHandle)
      const span3 = span1.cloneNode(true)
      // span3.onclick = (event) => chordTouchHandle(event);
      span1.innerHTML = findChord(chords[0])
      span2.innerHTML = findChord(chords[2])
      span3.innerHTML = findChord(chords[5])
      tonicEl && tonicEl.appendChild(span1)
      tonicEl && tonicEl.appendChild(span2)
      tonicEl && tonicEl.appendChild(span3)
      // find predominant
      const predominantEl = document.getElementById('predominant')
      // set pre-dominant II IV 
      const preDom2 = span1.cloneNode();
      const preDom4 = span1.cloneNode();
      preDom2.innerHTML = findChord(chords[1])
      preDom4.innerHTML = findChord(chords[3])
      predominantEl && predominantEl.appendChild(preDom2);
      predominantEl && predominantEl.appendChild(preDom4);
      // find dominant
      const dominantEl = document.getElementById('dominant')
      // // set dominant V VII
      const dom5 = span1.cloneNode()
      const dom7 = span1.cloneNode()
      dom5.innerHTML = findChord(chords[4])
      dom7.innerHTML = findChord(chords[6])

      dominantEl && dominantEl.appendChild(dom5)
      dominantEl && dominantEl.appendChild(dom7)
      // // set secondary dominant

      const chordClass = document.getElementsByClassName('chords');
      [...chordClass].forEach(element =>  element.addEventListener("click", chordTouchHandle))
      
    }

    const clearChords = () => {
      const chords = document.getElementsByClassName('chords');
      [...chords].forEach(chord => {
        chord && chord.parentNode && chord.parentNode.removeChild(chord)
      })
    }
    
    chordinary.handleSelect = (e: any) => {
      const selected = e.target.options[e.target.options.selectedIndex].text
      const major = document.getElementById('major')
      const scale = document.getElementById('scale')
      const key = scale && scale.options && scale.options[scale.options.selectedIndex].text
      setChordalIntervals(key || IONIAN, selected || 'C')
    }
    
    chordinary.scaleSelect = (e: any) => {
      const selectedScale = e.target.options[e.target.options.selectedIndex].text
      const tonic = document.getElementById('tonic').options[document.getElementById('tonic').options.selectedIndex].text
      setChordalIntervals(selectedScale, tonic);
    }
    setChordalIntervals(IONIAN, 'C');
    addScales();
}};

onload = chordinary()