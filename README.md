# 🐦 Birds Go Mad
 
A side-scrolling shooter built with p5.js / Game Lab where you defend your castle against waves of evil birds.
 
## Gameplay
 
You control a red bird flying beside a castle. Evil birds swoop in from the right, firing bullets. Shoot them down before they breach the castle — or before they hit you three times.
 
## Controls
 
| Key | Action |
|-----|--------|
| `↑` / `↓` | Move bird up / down |
| `Space` | Shoot |
| `R` | Restart after game over |
 
## Rules
 
- You have **3 lives** (hearts). Lose one each time an enemy bullet hits you.
- You have **3 bullets** in reserve. One reloads every second automatically.
- The game ends if you run out of lives **or** an evil bird reaches the left edge.
- Each evil bird you shoot earns **1 point**.
## Assets
 
All sprites and animations are loaded from an `images/` folder:
 
```
images/
├── background.png
├── redbird/      # player bird animation frames
├── evilbird/     # enemy bird animation frames
├── smoke/        # hit effect frames
├── castle.png / castle_d.png
├── bull.png      # player bullet
├── ebull.png     # enemy bullet
└── heart0.png
```
 
## Running the Game

It is also available to play at  for free at https://jackydevx.github.io/BirdsGoMad/
Open `index.html` in a browser or serve locally (e.g. `npx serve .` or `python -m http.server 8000`).
