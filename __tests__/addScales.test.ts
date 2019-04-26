import { addScales } from '../src/addScales';
import { scales } from '../src/scales';

describe('addScales', () => {
  test('adds scales to DOM node with scale id', () => {
    document.body.innerHTML =
      '<div class="scale">' +
      '  Select scale/mode' +
      '  <select id="scale">' +
      '  </select>' +
      '</div>';
    addScales(scales);
    const scalesEl = document.getElementById('scale');
    const childrenArray =
      scalesEl && [...scalesEl.children].map(option => option.innerHTML);
    expect(childrenArray).toEqual(Object.keys(scales));
  });
});
