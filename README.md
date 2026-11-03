# Postcards from my Jungle

A lo-fi jungle imagined by three generative models: 50 animals that never existed, 16 voices, and an invented language.

**Site:** https://ngeline-e.github.io/postcards-from-my-jungle/ 

## Training strategy
I trained a 64×64 UNet diffusion model from scratch in Colab on a free T4 GPU, using about 10,000 photos from Rapidata/Animals-10 (ten species). Mixing species is intentional: the model blends them into chimeras. To speed up training I resized all images once and kept them on the GPU, and used fp16 mixed precision, EMA weights and a cosine noise schedule. My first attempt ran at about 3.7 seconds per step because the T4 was using emulated bfloat16; switching to fp16 fixed it. The final run used 10,000 steps with batch size 32.

## Images, sounds and language
I sampled 50 images with DDIM (100 steps) and upscaled them to 256 px; the softness suits the lo-fi look. Sounds come from Stable Audio Open 1.0, which is trained on sound effects, unlike the music model in the course notebook. I wrote sixteen prompts, each describing a real-sounding source (a frog, an owl, bamboo) plus a setting, with durations from 2 to 20 seconds, and generated three candidates for each, keeping the loudest. The animal language was written by Claude. I asked for sixteen short phrases built on a small reusable lexicon of about twenty roots, so they read as one language, and matched each phrase to a creature and its sound by order. Each image uses voice number i mod 16, so every animal has a phrase and a sound.

## Improving quality
Images: a larger model and resolution (128 px or latent diffusion), more varied training data, class conditioning, and curating the best samples. Sounds: layering two generations, pitch shifting, and picking the best of several candidates by ear. Language: a proper grammar, so phrases could be combined rather than just reused.

## AI assistance
I used Claude (Anthropic) to adapt the course notebooks, write the website and generate the animal phrases. I used the free version.
