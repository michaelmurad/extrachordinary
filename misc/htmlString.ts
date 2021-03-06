export const htmlString = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <link rel="stylesheet" href="styles.css" />
    <script src= https://cdnjs.cloudflare.com/ajax/libs/tone/13.0.1/Tone.min.js></script>
    <script src="bundle.js"></script>
    <title>ExtraChordinary</title>
  </head>
  <body>
    <div class="header">
      ExtraChordinary
    </div>
    <div class="card">
      <div class="options">
        <div class="tonic">
          Select tonic
          <select id="tonic">
            <option>C</option>
            <option>C#</option>
            <option>D</option>
            <option>D#</option>
            <option>E</option>
            <option>F</option>
            <option>F#</option>
            <option>G</option>
            <option>G#</option>
            <option>A</option>
            <option>A#</option>
            <option>B</option>
          </select>
        </div>
        <div class="scale">
          Select scale/mode
          <select id="scale">
          </select>
        </div>
      </div>
    </div>
    
    <!-- <div class="selected-chords-cont">
      <span class="selected-chords">C</span>
    </div> -->
    <div class="card">
      <div class="harmonic-function-title">Harmonic Function</div>
      <div class="chords-cont-cont">
          <div class="chords-type-cont">
            <div class="chords-title-cont">
              <h3>Tonic</h2>
              <span class="question">?</span>
            </div>
            <div class="chords-cont" id="tonics">
            </div>
          </div>
          <div class="chords-type-cont">
            <div class="chords-title-cont">
                <h3>Pre-Dominant</h2>
                <span class="question">?</span>
            </div>
            <div class="chords-cont" id="predominant">
            </div>
          </div>
          <div class="chords-type-cont">
            <div class="chords-title-cont">
              <h3>Dominant</h2>
              <span class="question">?</span>
            </div>
            <div class="chords-cont" id="dominant">
            </div>
          </div>
          <div class="chords-type-cont">
            <h3>Secondary Dominants</h2>
            <div class="chords-cont" id="secdominant">
            </div>
          </div>
        </div>
    </div>
    
  </body>
</html>
`;
