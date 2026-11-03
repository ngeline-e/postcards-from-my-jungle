# Structured prompt used to generate the animal language

Model: Claude (Anthropic). The output was copied into `script.js`.

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

OUTPUT: JSON list of {"name": creature name, "phrase": phrase, "en": English translation,
        "sound": a 1-sentence description of what the creature's voice sounds like}
        Then list the lexicon as "root = meaning".
```

The `sound` field of the result became the text prompt for Stable Audio Open (see `sound-generation.ipynb`).
