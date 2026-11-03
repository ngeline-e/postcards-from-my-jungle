# Postcards from my Jungle

A lo-fi jungle imagined by three generative models: 50 animals that never existed, 16 voices, and an invented language.

**Site:** https://github.com/ngeline-e/postcards-from-my-jungle/tree/main

## Training strategy
I trained a 64×64 UNet diffusion model from scratch in Colab on `Rapidata/Animals-10` (about 10,000 photos of ten species). Mixing species is intentional: the model blends them into chimeras. I changed one setting at a time: dataset size (1,000 vs 10,000 images), resolution (32 vs 64 px) and training length (5,000 vs 20,000 steps). More data and steps gave clearer shapes, while small datasets made the model copy its training photos, which I checked by comparing each output with its nearest training image. The final run uses cosine noise scheduling, EMA weights and 20,000 steps.

## Images, sounds and language
I sampled 50 images with DDIM (100 steps) and upscaled them to 256 px; the softness suits the lo-fi look. Sounds come from Stable Audio Open 1.0, which is trained on sound effects, unlike the music model in the course notebook. I wrote sixteen prompts, each describing a real-sounding source (a frog, an owl, bamboo) plus a setting, with durations from 2 to 20 seconds. The language was written by Claude from a structured prompt (`language-prompt.md`) demanding a reusable lexicon of about twenty roots, so the phrases feel like one language. The prompt also asked for a sound description of each creature, which fed the audio prompts. Each image uses voice number i mod 16, so every animal has a phrase and a sound.

## Improving quality
Images: a larger model and resolution (128 px or latent diffusion), more varied training data, class conditioning, and curating the best samples. Sounds: layering two generations, pitch shifting, and picking the best of several candidates by ear. Language: a proper grammar, so phrases could be combined rather than just reused.

## AI assistance
I used Claude (Anthropic) to adapt the course notebooks, write the website and generate the animal phrases. I used the free version.
