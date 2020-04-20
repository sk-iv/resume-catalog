import * as React from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';
import Tooltip from '../../ui/Tooltip';

const Polygon = React.forwardRef(({
  points, fill, strokeWidth, stroke,
}, ref) => (
    <polygon
      stroke={stroke}
      strokeWidth={strokeWidth}
      ref={ref}
      fill={fill}
      points={points}
    />
  )
);

Polygon.propTypes = {
  points: PropTypes.string,
  fill: PropTypes.string,
  strokeWidth: PropTypes.string,
  stroke: PropTypes.string,
};

const Timeline = ({
  units = [], width = 100, caption, className,
}) => {
  if (!units.length) return 'Нет опыта';

  return (
    <svg height={caption ? 50 : 40} className={className} style={{ width: '100%' }}>
      {
        units.map((unit) => (
          <g key={Math.random().toString(36).substr(2, 9)} style={{ transform: `translateX(${parseInt(width * unit.offset, 10)}px)` }}>
            <Tooltip
              title={(
                <div>
                  <div className="strong mb-1">
                    {unit.title}
                  </div>
                  <div>{unit.subtitle}</div>
                  <div>{unit.experienceTimeinterval}</div>
                  {
                  unit.text && (
                  <div
                    dangerouslySetInnerHTML={{ __html: marked(unit.text) }}
                    style={{ color: '#ccc' }}
                  />
                  )
                }

                </div>
)}
              PopperProps={{ style: { width: '150px' } }}
              placement="top"
            >
              <Polygon
                points={`0,30 5,0 ${parseInt(width * unit.width - 5, 10)},0 ${parseInt(width * unit.width, 10)},30`}
                fill={unit.accent ? 'hsl(var(--color-accent-start), 0.5)' : '#00000020'}
                strokeWidth="2"
                stroke="#00000040"
              />
            </Tooltip>
          </g>
        ))
      }
      <line x1="0" y1="30" x2={width} y2="30" stroke="black" />
      {
        caption && <text x="0" y="43" style={{ fontSize: '0.8rem', fill: '#848484' }}>{caption}</text>
      }
    </svg>
  );
};

export default Timeline;

Timeline.propTypes = {
  /**
   * Blocks expressing the beginning and end of a period.
   */
  units: PropTypes.array,
  /**
   * Width parent div.
   */
  width: PropTypes.number,
  /**
   * Caption bottom of the timeline.
   */
  caption: PropTypes.string,
};
