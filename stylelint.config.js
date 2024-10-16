// https://github.com/primer/react/blob/main/stylelint.config.mjs
/* eslint-disable import/no-anonymous-default-export */
/**
 * @type {import('stylelint').Configuration}
 */
export default {
  extends: ['@primer/stylelint-config'],
  rules: {
    // We want to allow type selectors like `svg`
    'selector-max-type': 1,
  },
};
