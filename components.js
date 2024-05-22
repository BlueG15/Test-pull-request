function MetaPanelWelcome() {
  const innerHTML = `
    <b>Remove noise from audio using <a>DFT</a></b>
    <div style="height: 10px"></div>
    <div style="padding: 30px; text-align: justify">
    This application uses FFT to denoise an input audio file.  <br>
    The alogrithm works as follows: <br>
    <br>
    1) Convert the audio file to PCM data (pulse code modulation) <br>
    2) Run FFT on the PCM data <br>
    3) Remove unwanted frequencies <br>
    4) Run iFFT to get a new PCM <br>
    <br>
    The leniency slider adjusts how much the filter function removes <br>
    </div>
    <div style="height: 40px"></div>
  `;

  return innerHTML;
}

function LoadingIcon() {
  return `
    <img src="./loading.svg" style="height: 150px;" />
    <b style="margin-bottom: 30px">Processing file . . .</b>
    <br />
  `;
}

/**
 * @param {string} name File name
 * @param {string} size File size
 * @returns {string}
 */
function FileInfo(name = "unnamed.unknown", size = "Unknown") {
  return `
    <h3 class="m10 tac">Current file<br/>${name}</h3>
    <h3 class="m10">File size: ${size}</h3>
    <br />
    <button 
      style="
        background: #1dea79; 
        margin-bottom: 20px; 
        max-width: none;
      " 
      onclick="applyFFTOnOriginal()"
    >
        Process file
    </button>
  `;
}

/**
 * @param {string} name File name
 * @returns {string}
 */
function FileDone(name = "unnamed.unknown", lemo = 3) {
  return `
    <h2 class="m10">File: ${name}</h2>
    <h3 class="m10">Process complete (Leniency modifer: ${lemo})</h3>
    <br />
    <button 
      style="
        background: #1dea79; 
        margin-bottom: 20px; 
        max-width: none;
      " 
      onclick="downloadAudio()"
    >
        Download
    </button>
    <button 
      style="
        background: #cd545b; 
        margin-bottom: 20px; 
        max-width: none;
      " 
      onclick="resetAudio()"
    >
        Do it again!
    </button>
  `;
}
