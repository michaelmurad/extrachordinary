import { clearChords } from '../src/clearChords';

describe('clearChords', () => {
  test('should clear chords from classname chords elements', () => {
    document.body.innerHTML = `
      <div id="1">
        <span class="chords">D°</span>
        <span class="chords">D°</span>
        <span class="chords">D°</span>
      </div>
      <div id="2">
        <span class="chords">D°</span>
        <span class="chords">D°</span>
        <span class="chords">D°</span>
      </div>
    `;
    clearChords();
    const div1 = document.getElementById('1');
    const div1Children = div1 && div1.childElementCount;
    const div2 = document.getElementById('2');
    const div2Children = div2 && div2.childElementCount;
    const totalChildren =
      div1Children && div2Children && div1Children + div2Children;
    expect(totalChildren).toBe(0);
  });
});
