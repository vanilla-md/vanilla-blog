import React from 'react';
import classes from './PrimaryLanguage.module.css';

interface PrimaryLanguageProps {
  name: string;
  color?: string;
}

const PrimaryLanguage = ({ name, color }: PrimaryLanguageProps) => {
  return (
    <>
      {color && (
        <>
          <span
            className={classes.LanguageCircle}
            style={{ backgroundColor: color }}
          ></span>{' '}
        </>
      )}
      <span className={classes.PrimaryLanguage}>{name}</span>
    </>
  );
};

export default PrimaryLanguage;
