module.exports = {
  '*.{ts,tsx}': [
    'echo "lintstaged paused"'
    // 'eslint --fix',
    // () => 'pnpm typecheck', // Have to run typecheck on all files via a function - can't check just staged files
  ],
};
