import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash-es/clamp';
import { useSprings, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import './carousel.css';

const Carousel = ({ pages }) => {
  const index = useRef(0);

  const [props, set] = useSprings(pages.length, (i) => ({
    x: i * window.innerWidth,
    scale: 1,
    display: 'block',
  }));

  const bind = useDrag(({
    down,
    movement: [mx],
    direction: [xDir],
    distance,
    cancel,
  }) => {
    if (down && distance > window.innerWidth / 2) {
      cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)));
    }
    set((i) => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' };
      const x = (i - index.current) * window.innerWidth + (down ? mx : 0);
      const scale = down ? 1 - distance / window.innerWidth / 2 : 1;
      return { x, scale, display: 'block' };
    });
  });

  return (
    <div className="carousel">
      {
        // eslint-disable-next-line react/prop-types
        props.map(({ x, display, scale }, i) => (
          <animated.div
            {...bind()}
            key={Math.random().toString(36).substr(2, 9)}
            style={{ display, transform: x.interpolate((g) => `translate3d(${g}px, 0, 0)`) }}
            className="wrapper"
          >
            <animated.div
              style={{ transform: scale.interpolate((s) => `scale(${s})`), backgroundImage: `url(${pages[i]})` }}
              className="item"
            />
          </animated.div>
        ))
      }
    </div>
  );
};

export default Carousel;

Carousel.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.string).isRequired,
};
