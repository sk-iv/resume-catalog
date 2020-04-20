import React from 'react';
import clsx from 'clsx';
import icons24 from './icons/24/icons-24.svg';
// import icons96 from './icons/96/icons-96.svg';

function SvgUse({
  name, size, bgImg, color, style, className, outline,
}) {
  const type = {
    xs: {
      size: 24,
      path: `${icons24}#${name}`,
    },
    lg: {
      size: 96,
      path: `/assets/icons/96/${name}.svg#ill`,
    },
  };

  return (

    name === 'none'
      ? (
        <svg
          className={clsx(`icon icon-${type[size].size}`)}
          viewBox={`0 0 ${type[size].size} ${type[size].size}`}
        />
      )
      : (
        <svg
          className={clsx(`icon icon-${type[size].size}`, className, { 'text-white icon-outline': outline })}
          style={{ ...style }}
          viewBox={`0 0 ${type[size].size} ${type[size].size}`}
        >
          {bgImg && <use xlinkHref="/assets/icons/96/effects.svg#shape" />}
          <use
            stroke="inherit"
            xlinkHref={type[size].path}
          />
        </svg>
      )


  );
}
SvgUse.defaultProps = {
  name: 'none',
  size: 'xs',
  bgImg: false,
  color: 'hsla(0, 0%, 0%, 0.4)',
};
SvgUse.muiName = 'SvgIcon';
export default SvgUse;
