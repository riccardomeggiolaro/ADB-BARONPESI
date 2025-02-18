pnpm remove bcrypt
npm install -g node-gyp
export NODE_GYP_FORCE_PYTHON=python3
pnpm add bcrypt --ignore-scripts
cd node_modules/bcrypt
node-gyp rebuild