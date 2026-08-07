import { execSync } from 'child_process';
import { rmSync, existsSync } from 'fs';
import { join } from 'path';

// Define the path to the gh-pages cache
const cachePath = join(process.cwd(), 'node_modules', '.cache', 'gh-pages');

try {
  // Clean gh-pages cache folder if it exists
  if (existsSync(cachePath)) {
    console.log('Cleaning gh-pages cache in node_modules...');
    rmSync(cachePath, { recursive: true, force: true });
  }
} catch (e) {
  console.warn('Failed to clean gh-pages cache:', e.message);
}

try {
  console.log('Cleaning local gh-pages branch if present...');
  execSync('git branch -D gh-pages', { stdio: 'ignore' });
} catch (e) {
  // Branch doesn't exist or already deleted, ignore error cross-platform
}

console.log('Executing build...');
execSync('npm run build', { stdio: 'inherit' });
