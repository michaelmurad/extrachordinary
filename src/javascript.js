"use strict";
const startUp = () => {
    setChordalIntervals(IONIAN, 'C');
    addScales();
};
let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
onload = startUp;
const IONIAN = 'Ionian';
const DORIAN = 'Dorian';
const PHRYGIAN = 'Phrygian';
const LYDIAN = 'Lydian';
const MIXOLYDIAN = 'Mixolydian';
const AEOLIAN = 'Aeolian';
const LOCRIAN = 'Locrian';
const scales = {
    [IONIAN]: [1, 3, 5, 6, 8, 10, 12],
    [DORIAN]: [1, 3, 4, 6, 8, 10, 11],
    [PHRYGIAN]: [1, 2, 4, 6, 8, 9, 11],
    [LYDIAN]: [1, 3, 5, 7, 8, 10, 12],
    [MIXOLYDIAN]: [1, 3, 5, 6, 8, 10, 11],
    [AEOLIAN]: [1, 3, 4, 6, 8, 9, 11],
    [LOCRIAN]: [1, 2, 4, 6, 7, 9, 11],
};
const addScales = () => {
    const scalesEl = document.getElementById('scale');
    const scaleList = Object.keys(scales);
    scaleList.forEach(scale => {
        const optionToInsert = document.createElement('option');
        optionToInsert.innerHTML = scale;
        if (scalesEl) {
            scalesEl.appendChild(optionToInsert);
        }
    });
};
const setNewScale = (tonic, scale) => {
    console.log(scale);
    let newScale = scales[scale].map((note) => notes.slice(notes.findIndex(root => root === tonic))[note - 1]);
    return newScale;
};
const findChord = (chord) => {
    let root = chord[0];
    let third = chord[1];
    let fifth = chord[2];
    let i = notes.findIndex(c => c === root);
    let iii = notes.slice(i).findIndex(c => c === third);
    let v = notes.slice(i).findIndex(f => f === fifth);
    if (v === 6) {
        return `${root}°`;
    }
    if (iii === 3) {
        return `${root}m`;
    }
    return root;
};
const createChords = (key, index = 0, chordsList = []) => {
    console.log(key);
    if (index > 6)
        return chordsList;
    let chord = [];
    for (let i = index; chord.length < 3; i += 2) {
        chord = [...chord, key[i]];
    }
    index += 1;
    return createChords([...key.slice(1), key[0]], index, [...chordsList, chord]);
};
const setChordalIntervals = (scale = IONIAN, root = 'C') => {
    const chordsExist = document.getElementsByClassName('chords');
    if (chordsExist.length)
        clearChords();
    // this is an array of all the chords in the scale
    const chords = createChords(setNewScale(root, scale));
    console.log(chords);
    // find tonic 
    const tonicEl = document.getElementById('tonics');
    // set tonic I III VI
    const span1 = document.createElement("span");
    span1.className = 'chords';
    const span2 = span1.cloneNode();
    const span3 = span1.cloneNode();
    span1.innerHTML = findChord(chords[0]);
    span2.innerHTML = findChord(chords[2]);
    span3.innerHTML = findChord(chords[5]);
    tonicEl && tonicEl.appendChild(span1);
    tonicEl && tonicEl.appendChild(span2);
    tonicEl && tonicEl.appendChild(span3);
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
    console.log(chords, tonicEl, span1);
};
const clearChords = () => {
    const chords = document.getElementsByClassName('chords');
    [...chords].forEach(chord => {
        chord && chord.parentNode && chord.parentNode.removeChild(chord);
    });
};
const handleSelect = (e) => {
    console.log(e.target.options[e.target.options.selectedIndex].text);
    const selected = e.target.options[e.target.options.selectedIndex].text;
    const major = document.getElementById('major');
    console.log(major);
    // const firstSelected = document.getElementsByClassName('selected-chords')[0]
    // if (major && major.innerHTML && major.innerHTML === 'major'){
    //   console.log('heh')
    //   firstSelected.innerHTML = selected
    // } else {
    //   firstSelected.innerHTML = selected + 'm'
    // }
    const scale = document.getElementById('scale');
    const key = scale && scale.options && scale.options[scale.options.selectedIndex].text;
    console.log("AYYYYYYYY", key, selected);
    setChordalIntervals(key || IONIAN, selected || 'C');
};
const scaleSelect = (e) => {
    console.log(e.target.options[e.target.options.selectedIndex].text);
    const selectedScale = e.target.options[e.target.options.selectedIndex].text;
    const tonic = document.getElementById('tonic').options[document.getElementById('tonic').options.selectedIndex].text;
    console.log('tonic', tonic);
    setChordalIntervals(selectedScale, tonic);
    // const scaleEl = document.getElementById('scale')
    // const firstSelected = document.getElementsByClassName('selected-chords')[0]
    // setChordalIntervals(selected, firstSelected.innerHTML)
    // if (scale && scale.innerHTML && scale.innerHTML === 'major'){
    //   console.log('heh')
    //   firstSelected.innerHTML = selected
    // } else {
    //   firstSelected.innerHTML = selected + 'm'
    // }
};
// const scaleSelect = (e: any) => {
//   const 
//   console.log(e.target.innerHTML)
//   const firstSelected = document.getElementsByClassName('selected-chords')[0]
//   const selected = firstSelected.innerHTML[0]
//   if (e.target.innerHTML === 'major') {
//     e.target.innerHTML = 'minor'
//     firstSelected.innerHTML = `${selected}m`
//   } else {
//     e.target.innerHTML = 'major'
//     firstSelected.innerHTML = selected
//   }
// }
