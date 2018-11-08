// load and configure the ToneJS sample player
var player = new Tone.Player();

var soundURL = "https://cdn.jsdelivr.net/gh/zenpho/tjs/gonnarain-clip.mp3";
var loader = new Tone.Player();
loader.load(soundURL, function() {
  console.log("loaded " + soundURL);

  player._buffer = loader._buffer.slice(3, 5);
  player.loop = true;
  player.start();

  //Load the buffer into the waveform GUI.
  //Any WebAudio AudioBuffer can be loaded.
  //For Tone.js, these are found in _buffers
  waveform1.setBuffer(player._buffer._buffer);
  waveform1.select(0, 2000);
  waveform1.init();
});

// connect the signal chain
player.connect(Tone.Master);

// when the nexus UI system loads we call this function
nx.onload = function() {
  // set the nexus ui colour scheme for "accented" colours
  nx.colorize("accent", "#1ac");

  // set event listener for any events on the waveform control
  waveform1.on("*", function(data) {
    player.setLoopPoints(data.starttime / 1000, data.stoptime / 1000);
  });
};

console.log("2018nov08-1600");
