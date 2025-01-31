import fs from 'fs-extra';

try {
  await fs.copy('blog/assets', 'public/assets');
  console.log('Blog assets have been successfully copied to public directory.');
} catch (err) {
  console.error(err);
}
