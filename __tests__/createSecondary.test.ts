import { createSecondaryDominants } from '../src/createSecondary';
import { notes } from '../src/notes';
import { DORIAN, scales } from '../src/scales';
import { setNewScale } from '../src/setNewScale';
describe('createSecondaryDominants', () => {
  test('should create secondary dominants and insert them into DOM', () => {
    document.body.innerHTML = `
      <div id="secdominant">
      </div>
    `;
    const currentScale = setNewScale('D', DORIAN, scales, notes);

    const secDom = document.getElementById('secdominant');
    const secDomChildrenCount = secDom && secDom.childElementCount;
    expect(secDomChildrenCount).toBe(0);

    createSecondaryDominants(currentScale, notes);

    const secDom2 = document.getElementById('secdominant');
    const secDomChildrenCount2 = secDom2 && secDom2.childElementCount;
    expect(secDomChildrenCount2).toBe(6);
    const secDomChildren2 =
      secDom2 && [...secDom2.children].map(node => node.innerHTML);
    expect(secDomChildren2).toEqual([
      'B → Em',
      'C → F',
      'D → G',
      'E → Am',
      'F# → B°',
      'G → C'
    ]);
  });
});
