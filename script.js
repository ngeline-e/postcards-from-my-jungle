// 16 voices. Image i uses voice i % 16, so every animal has a sound and a phrase.
// Sounds are sounds/sound_00.wav … sound_15.wav, in the same order as sound-generation.ipynb.
// Mini-lexicon of the invented language ("Junglish"):
// lu rain · nor song · ki little one · mo sleep · brum heavy · oru moon · zeph sun · tsk danger · vi leaf
// hesh wind/whisper · wub home · kree fly · ploo fruit · nak eat · sha hush · pol river · dru dance · ee I · ang you · hoo who · no not
const TOTAL = 50;
const VOICES = [
  { name: "Mossgrumble",     phrase: "Brum lu-nor, ki-ki mo.",                    en: "Heavy rain-song; little ones, sleep.",        dur: 3 },
  { name: "Tinkerwing",      phrase: "Kree kree oru-vi, ee kree!",                en: "Fly, fly to the moon-leaf, I fly!",           dur: 5 },
  { name: "Pondwhistle",     phrase: "Ploo nak, ang sha.",                        en: "Eat the fruit; you, hush.",                   dur: 4 },
  { name: "Dusk Howler",     phrase: "Zeph mo, oru ang-ang wub.",                 en: "The sun sleeps; the moon calls you home.",    dur: 8 },
  { name: "Clickerjack",     phrase: "Tsk-tsk tsk, vi hesh!",                     en: "Danger, danger! The leaves whisper!",         dur: 12 },
  { name: "Velvet Purrfrog", phrase: "Mrr-lu, mrr-lu, ee wub.",                   en: "Soft rain, soft rain, I am home.",            dur: 6 },
  { name: "Gongbeak",        phrase: "BONG pol-nor, ang dru!",                    en: "The river's song rings out; you dance!",      dur: 10 },
  { name: "Squeakmoth",      phrase: "Pii! Ploo ploo ploo!",                      en: "Eek! Fruit, fruit, fruit!",                   dur: 2 },
  { name: "Rootwhale",       phrase: "Moooo-oru, ki-ki-ki, wub wub, ee nor lu-pol.", en: "Long moon-sleep, little ones, home, home; I sing the rain-river.", dur: 15 },
  { name: "Glasscricket",    phrase: "Tik-a-tik vi-vi hesh.",                     en: "Tick-a-tick, the leaves, the leaves whisper.", dur: 7 },
  { name: "Bramblehoot",     phrase: "Hoo-ang? Hoo-ang? Ee wub.",                 en: "Who are you? Who are you? I am home.",        dur: 9 },
  { name: "Sunsnort",        phrase: "Fff! Zeph brum ploo!",                      en: "Ha! The sun is heavy with fruit!",            dur: 4 },
  { name: "Marshchoir",      phrase: "Nor nor nor-nor, pol lu oru, ki mo, ki mo, sha.", en: "Song, song, song-song; river, rain, moon; little ones sleep, sleep, hush.", dur: 20 },
  { name: "Thornbark",       phrase: "Grr tsk ee! Ang wub-no!",                   en: "Grr, danger, mine! Your home is not here!",   dur: 6 },
  { name: "Lantern-sigher",  phrase: "Haah… oru vi-hesh, ki dru-mo.",             en: "Haah… the moon in the leaf-wind; little ones dance-sleepily.", dur: 11 },
  { name: "Drip-Drummer",    phrase: "Pok pok pok, lu-dru!",                      en: "Pok pok pok, rain-dance!",                    dur: 3 },
];

const $ = id => document.getElementById(id);
const pad = (n, w = 2) => String(n).padStart(w, "0");
const audio = new Audio();
audio.preload = "metadata";
let i = 0, timer = null, typing = null;

// filmstrip
for (let n = 0; n < TOTAL; n++) {
  const b = document.createElement("button");
  b.setAttribute("aria-label", `Animal ${n + 1}`);
  b.innerHTML = `<img loading="lazy" alt="" src="images/animal_${pad(n)}.png">`;
  b.onclick = () => show(n);
  $("strip").appendChild(b);
}

function show(n) {
  i = (n + TOTAL) % TOTAL;
  const v = VOICES[i % VOICES.length], vi = i % VOICES.length;
  audio.pause(); audio.currentTime = 0; setPlaying(false);

  const img = $("photo");
  $("missing").hidden = true; img.hidden = false;
  img.onerror = () => { img.hidden = true; $("missing").hidden = false; };
  img.src = `images/animal_${pad(i)}.png`;

  [...$("strip").children].forEach((b, n) => b.classList.toggle("on", n === i));
  $("strip").children[i].scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  new Image().src = `images/animal_${pad((i + 1) % TOTAL)}.png`;   // preload next
  $("stamp").textContent = `№ ${pad(i + 1, 3)}`;
  $("name").textContent = v.name;
  $("count").textContent = `${i + 1} / ${TOTAL}`;
  $("dur").textContent = `${v.dur}s`;
  $("translation").textContent = v.en;
  $("translation").hidden = true;
  $("translate").textContent = "show translation";
  $("translate").setAttribute("aria-pressed", "false");
  audio.src = `sounds/sound_${pad(vi)}.wav`;
  typewrite(v.phrase);
}

function typewrite(text) {
  clearInterval(typing);
  const el = $("phrase"); el.textContent = "";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = text; return; }
  let k = 0;
  typing = setInterval(() => { el.textContent = text.slice(0, ++k); if (k >= text.length) clearInterval(typing); }, 35);
}

function setPlaying(on) {
  const b = $("play");
  b.classList.toggle("playing", on);
  b.textContent = on ? "■ stop" : "▶ listen";
  b.setAttribute("aria-label", on ? "Stop sound" : "Play sound");
}
function toggleSound() {
  if (!audio.paused) { audio.pause(); audio.currentTime = 0; setPlaying(false); return; }
  audio.play().then(() => setPlaying(true)).catch(() => { $("dur").textContent = "no file"; });
}
audio.addEventListener("timeupdate", () => { $("progress").style.width = audio.duration ? (audio.currentTime / audio.duration * 100) + "%" : "0"; });
audio.addEventListener("loadedmetadata", () => { if (isFinite(audio.duration)) $("dur").textContent = `${Math.round(audio.duration)}s`; });
audio.addEventListener("ended", () => { setPlaying(false); $("progress").style.width = "0"; });
audio.addEventListener("error", () => { $("dur").textContent = "no file"; });

$("prev").onclick = () => show(i - 1);
$("next").onclick = () => show(i + 1);
$("play").onclick = toggleSound;
$("translate").onclick = () => {
  const t = $("translation"), open = t.hidden;
  t.hidden = !open;
  $("translate").textContent = open ? "hide translation" : "show translation";
  $("translate").setAttribute("aria-pressed", String(open));
};
$("auto").onclick = () => {
  const on = !timer;
  if (on) timer = setInterval(() => show(i + 1), 7000); else { clearInterval(timer); timer = null; }
  $("auto").textContent = `autoplay: ${on ? "on" : "off"}`;
  $("auto").setAttribute("aria-pressed", String(on));
};
addEventListener("keydown", e => {
  if (e.key === "ArrowRight") show(i + 1);
  else if (e.key === "ArrowLeft") show(i - 1);
  else if (e.key === " " && e.target.tagName !== "BUTTON") { e.preventDefault(); toggleSound(); }
});

show(0);
