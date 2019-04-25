import { IScales } from './scales';

// adds scales <option> to <select id="scales"> DOM Node
export const addScales = (scales: IScales) => {
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
