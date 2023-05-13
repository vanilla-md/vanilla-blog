import fs from 'fs-extra';

try {
  await fs.move('blog/assets', 'public/assets');
  console.log('Blog assets have been successfully moved to public directory.');
} catch (err) {
  console.error(err);
}
