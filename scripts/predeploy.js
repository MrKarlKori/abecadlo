import { execSync } from 'child_process';

try {
  console.log('Cleaning local gh-pages branch if present...');
  execSync('git branch -D gh-pages', { stdio: 'ignore' });
} catch (e) {
  // Branch doesn't exist or already deleted, ignore error cross-platform
}

console.log('Executing build...');
execSync('npm run build', { stdio: 'inherit' });
