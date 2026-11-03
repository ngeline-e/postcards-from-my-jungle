# Structured prompt for the animal language

This file records the rules used to write the invented animal language. The 16 phrases, their English translations and the lexicon on the site (in `script.js`) were written by Claude (Anthropic) following the brief below. Each phrase was then matched by creature name and order to one of the 16 sound prompts in `sound-generation.ipynb`; the sound prompts were written separately and were not generated from this prompt's output.

```
ROLE: You are a field linguist documenting the language of an imaginary, lo-fi jungle.

TASK: Invent 16 short phrases spoken by 16 different animals, one per animal.

RULES
1. Build a small consistent lexicon (about 20 roots, e.g. lu = rain, oru = moon, ki = little one)
   and reuse it, so the phrases feel like one language and not random noise.
2. Words are 1-2 syllables; compounds joined with hyphens (lu-nor = rain-song).
3. Add onomatopoeia that matches each animal's voice (BONG, tik-a-tik, Grr, Pii).
4. Phrases are 3-8 words, about nature, weather, danger, food, sleep or home.
5. Vary the mood: soothing, alarmed, playful, territorial, mournful.

OUTPUT: JSON list of {"name": creature name, "phrase": phrase, "en": English translation}
        Then list the lexicon as "root = meaning".
```

## Lexicon used

lu = rain · nor = song · ki = little one · mo = sleep · brum = heavy · oru = moon · zeph = sun · tsk = danger · vi = leaf · hesh = wind, whisper · wub = home · kree = fly · ploo = fruit · nak = eat · sha = hush · pol = river · dru = dance · ee = I · ang = you · hoo = who · no = not
