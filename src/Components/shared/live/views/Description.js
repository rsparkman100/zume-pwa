import React from 'react';
import Link from '@material-ui/core/Link';
import { useAppTranslation, useLocalizedAsset } from 'Components/zume/translationHooks';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useTranspiler } from 'Components/zume/transpilerHooks';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'underline',
  },
}));

export default function Description({ d }) {
  const trans = useAppTranslation();
  const asset = useLocalizedAsset();
  const classes = useStyles();
  const transpile = useTranspiler();

  if (!d) {
    return null;
  }
  if (typeof d === 'string') {
    return <p>{transpile(trans(d))}</p>;
  }

  // handles descriptions that are composed of arrays like ["first line", "second line"]
  function processArray(lines, i = 0) {
    return lines.map((l, j) => {
      if (typeof l === 'string') {
        return <p key={`line-${i}-${j}`}>{transpile(trans(l))}</p>;
      }
      if (Array.isArray(l)) {
        return processArray(l, i + 1);
      }
      return processObject(l, `${i}-${j}`);
    });
  }

  // handles { "t": "title", "d": "description"} like objects.
  function processObject(obj, i) {
    if (obj.type) {
      const domKey = `obj-${i}`;
      switch (obj.type) {
        case 'link': {
          const { key, label } = obj.payload;
          return (
            <Link className={classes.link} href={asset(key)} target="_blank">
              {label}
            </Link>
          );
        }
        case 'image': {
          const { image, alt } = obj.payload;
          return <img key={domKey} src={asset(image)} alt={trans(alt)} style={{ width: '100%' }} />;
        }
        case 'caption': {
          const { text } = obj.payload;
          return (
            <Typography key={domKey} variant="caption">
              {trans(text)}
            </Typography>
          );
        }
        default:
          break;
      }
    }

    return (
      <div key={`descriptionObj${i}`}>
        {obj.t ? <h4>{transpile(trans(obj.t))}</h4> : null}
        <Description d={obj.d} />
      </div>
    );
  }

  if (Array.isArray(d)) {
    return processArray(d);
  }
  return processObject(d);
}
