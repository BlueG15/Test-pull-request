const globalEmitter = new EventEmitter();

const audioSrc = {
  original: new CustomAudio(),
  modified: new CustomAudio(),
};

const iHaveToDoItLikeThis = {
  dontLaugh: () => {},
  imNewToThis: () => {},
  leniencyModifer: 3,
  currentFile: null,
  imDoingIt: false,
};

/**
 * Generate a random string
 * @param {number} length Length of ID
 * @returns {string} RandID
 */
function generateRandomId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Play audio buffer on (original / modified) context / audio channel
 * @param {AudioBuffer} buffer Audio Buffer
 * @param {number} offset Play offset (seconds)
 * @param {"original" | "modified"} channelID Which audio context to play
 */
function playAudioBuffer(buffer, offset = 0, channelID = "original") {
  if (channelID !== "modified" && channelID !== "original") return;
  audioSrc[channelID].play(buffer, offset);
}

/**
 * Stop audio playback from both channel
 */
function stopImmidiateAudioPlayback() {
  audioSrc.modified.pause();
  audioSrc.original.pause();
}

/**
 * Modify text/color of the 'Choose an audio file'
 * @param {string} text Button text
 * @param {string} color Button color (background-color property in string)
 */
function changeButtonState(text = "Choose a file", color = "#e608b2") {
  const target = document.getElementById("select-button");
  target.innerText = text;
  target.style.backgroundColor = color;
}

/**
 * Set meta info innerHTML
 * @param {string} innerHTML DOM's inner HTML
 */
function setMetaInfoInnerHTML(innerHTML = "") {
  const target = document.getElementById("meta-info-panel");
  target.innerHTML = innerHTML;
}

function slideAudioPanel(show = true) {
  const t = document.getElementById("main-wrapper");
  if (show) {
    t.classList.add("in");
  } else {
    t.classList.remove("in");
  }
}

function downloadAudio() {
  const { currentFile, leniencyModifer } = iHaveToDoItLikeThis;

  const name = currentFile.name.split(".");

  audioSrc.modified.download(
    name.slice(0, name.length - 1).join(".") + "-leniency-" + leniencyModifer
  );
}

function resetAudio() {
  // const self = document.getElementById("reset-audio-btt");

  const { currentFile } = iHaveToDoItLikeThis;

  console.log(this.target);
  iHaveToDoItLikeThis.imNewToThis();
  setMetaInfoInnerHTML(FileInfo(currentFile?.name, currentFile?.size));

  audioSrc.modified.pause();

  // self?.remove();
}

function getInput() {
  return document.getElementById("audio-input");
}

function openFileExplorer() {
  const inputTarget = getInput();

  if (inputTarget) {
    inputTarget.click();
  }
}

function handleInputChange() {
  const file = this.files[0];
  const reader = new FileReader();

  if (!file) return;

  setMetaInfoInnerHTML(LoadingIcon());

  //? Not sure about this decision, you can comment it out.
  stopImmidiateAudioPlayback();

  reader.onload = function () {
    const audioContext = new AudioContext();
    audioContext.decodeAudioData(this.result, function (audioBuffer) {
      playAudioBuffer(audioBuffer, 0, "original");
      // playAudioBuffer(audioBuffer, 10, "modified");
      slideAudioPanel(true);

      changeButtonState("Change file");
      const size = Math.round(file.size / 1000).toLocaleString() + " KB";
      setMetaInfoInnerHTML(FileInfo(file.name, size));

      iHaveToDoItLikeThis.currentFile = {
        name: file.name,
        size: size,
      };

      iHaveToDoItLikeThis.imNewToThis();
    });
  };

  reader.readAsArrayBuffer(file);
  // console.log(file);
}

function applyFFTOnOriginal() {
  if (iHaveToDoItLikeThis.imDoingIt) return;

  if (!audioSrc.original.__CURRENT_BUFFER__) return;

  document.body.classList.add("loading");

  const buffer = audioSrc.original.__CURRENT_BUFFER__;
  const worker = new Worker("./worker/applyFFTtoOriginal.js");
  const _ = iHaveToDoItLikeThis.leniencyModifer;

  if (buffer.numberOfChannels === 1) {
    const b = buffer.getChannelData(0);
    worker.postMessage([b, b, _]);
  } else {
    worker.postMessage([buffer.getChannelData(0), buffer.getChannelData(1), _]);
  }

  iHaveToDoItLikeThis.imDoingIt = true;

  worker.onmessage = (e) => {
    document.body.classList.remove("loading");

    const edittedBuffer = new AudioBuffer({
      length: buffer.length,
      numberOfChannels: 2,
      sampleRate: buffer.sampleRate,
    });

    const [resLeft, resRight] = e.data;
    edittedBuffer.copyToChannel(new Float32Array(resLeft), 0);
    edittedBuffer.copyToChannel(new Float32Array(resRight), 1);

    audioSrc.modified.play(edittedBuffer);
    setMetaInfoInnerHTML(FileDone(iHaveToDoItLikeThis.currentFile.name, _));
    iHaveToDoItLikeThis.dontLaugh();

    iHaveToDoItLikeThis.imDoingIt = false;
  };
}

function init() {
  const t = getInput();

  t.addEventListener("change", handleInputChange, false);

  const originalPlayer = audioSrc.original.getControls("", 36);
  const modifiedPlayer = audioSrc.modified.getControls("", 36);

  modifiedPlayer.classList.add("modified");

  const wrapper = document.getElementById("audio-player-wrapper");
  // wrapper.append(originalPlayer, modifiedPlayer);
  wrapper.append(originalPlayer);

  const sliderWrapper = document.createElement("div");
  const slider = document.createElement("input");
  const sliderValue = document.createElement("h3");
  const initialValue = iHaveToDoItLikeThis.leniencyModifer;

  sliderWrapper.className = "flex aictr jcctr g20 flexing frame mini";
  sliderValue.className = "slider-value";

  slider.type = "range";
  slider.min = 1;
  slider.max = 100;
  slider.step = 0.2;
  slider.className = "flexing modifier-slider";

  slider.value = initialValue;
  sliderValue.innerText = initialValue;

  slider.oninput = (e) => {
    if (iHaveToDoItLikeThis.imDoingIt) {
      return;
    }

    const v = Math.round(e.target.value * 10) / 10;
    sliderValue.innerText = v;
    iHaveToDoItLikeThis.leniencyModifer = v;
  };

  sliderWrapper.append("Leniency modifer", slider, sliderValue);

  iHaveToDoItLikeThis.dontLaugh = () => {
    wrapper.append(modifiedPlayer);
    sliderWrapper.remove();
  };
  iHaveToDoItLikeThis.imNewToThis = () => {
    modifiedPlayer.remove();
    wrapper.append(sliderWrapper);
  };

  setMetaInfoInnerHTML(MetaPanelWelcome());
}

function showGroup() {
  const name = [
    "Thành viên nhóm 1",
    "[2312046]  BÙI NGỌC MINH",
    "[2312865]  BÙI THANH QUÍ",
    "[2312329]  BÙI TRỌNG NGUYÊN",
    "[2313722]  BÙI VŨ MINH TRỰT",
    "[2313865]  CAO ĐOÀN THẢO VÂN",
    "[2310629]  CAO PHÁT ĐẠT",
    "[2313420]  CAO SỸ VĂN TIẾN"
  ];

  alert(name.join("\n"));
}
