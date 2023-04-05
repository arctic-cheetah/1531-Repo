# How to run the frontend

## The easiest way (with npm) -- RECOMMENDED

Run this once on the machine.
```bash
npm install
```

Start up your backend on a specific port. Use 3000 because we are hosting on glitch.com


1) Run:
```
npm run build
```

If your version of node is greater that 16.X,
You'll need to run this first on Linux or MAC:
```
export NODE_OPTIONS=--openssl-legacy-provider
```

2) Then run:
```bash
bash run-easy.sh [ITERATION] [BACKEND PORT]
```
and navigate to http://localhost:3000 to see the frontend.

For example:
```bash
bash run-easy.sh 3 3000
```

Once you have deployed your backend, update line 4 in `run-easy.sh` to contain your deployed backend url. For example, for a url `https://colossal-ruddy-swoop.glitch.me/`, line 4 should be:
```bash
echo "var DEPLOYED_URL = 'https://colossal-ruddy-swoop.glitch.me/'" >> build/config.js
```
