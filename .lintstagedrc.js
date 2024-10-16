// https://nextjs.org/docs/app/building-your-application/configuring/eslint#lint-staged
// https://github.com/lint-staged/lint-staged?tab=readme-ov-file#task-concurrency

import path from 'path';
import micromatch from 'micromatch';

export default {
  '*.css': ['stylelint --fix', 'prettier --write'],
  '*.{js,jsx,ts,tsx}': (absolutePaths) => {
    const cwd = process.cwd();
    const relativePaths = absolutePaths.map((file) => path.relative(cwd, file));
    const nextFiles = micromatch(relativePaths, [
      '{app,components,lib,utils,types}/**/*',
    ]);

    const notNextFiles = relativePaths.filter(
      (file) => !nextFiles.includes(file),
    );

    const commands = [];

    if (nextFiles.length > 0) {
      commands.push(
        `next lint --fix --file ${nextFiles.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`,
      );
    }

    if (notNextFiles.length > 0) {
      commands.push(`eslint ${notNextFiles.join(' ')}`);
    }

    if (relativePaths.length > 0) {
      commands.push(`prettier --write ${relativePaths.join(' ')}`);
    }

    return commands;
  },
  '!(*.css|*.js|*.jsx|*.ts|*.tsx)': ['prettier --write --ignore-unknown'],
};
