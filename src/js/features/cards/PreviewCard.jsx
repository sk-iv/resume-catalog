import React from 'react';
import PropTypes from 'prop-types';
import { useMeasure } from 'react-use';
import marked from 'marked';
import Grid, { GridTile } from '../../ui/Grid';
import Paper from '../../ui/Paper';
import Chip from '../../ui/Chip';
import Timeline from '../timeline';
import Link from '../../ui/Link';
import { Link as RouterLink } from "react-router-dom";

const PreviewCard = ({
  id, title, subtitle, text, chips, units, img
}) => {
  const [ref, {
    width,
  }] = useMeasure();

  return (
    <Paper style={{ marginTop: '50px' }}>
      <Grid style={{ backgroundColor: '#fff' }}>
        <GridTile size={4}>
          <div
            style={{
              background: '#fff',
              border: '25px solid #fff',
              boxSizing: 'content-box',
              transform: 'translateY(-40px)',
              margin: '0 auto',
              maxWidth: '200px',
              maxHeight: '200px',
              overflow: 'hidden',
            }}
            className="shadow shadow-1"
          >
            <img
              alt={title}
              style={{ objectFit: 'contain', objectPosition: '50% 50%', width: '100%' }}
              src={img}
            />
          </div>
        </GridTile>
        <GridTile offset={5} size={8}>
          <Grid direction="column" className="p-3">
            <Link
              component={RouterLink}
              to={{ pathname: `/edit/card/${id}` }}
              style={{
                position: 'absolute', top: 0, right: 0, margin: '.3rem',
              }}
            >
              Редактировать
            </Link>
            <GridTile>
              <h2 className="mb-2">{title}</h2>
            </GridTile>
            <GridTile ref={ref}>
              <div className="mb-2 h4">{subtitle}</div>
              <div
                dangerouslySetInnerHTML={{ __html: marked(text) }}
                style={{ color: '#6f6f6f' }}
              />
              <Timeline units={units} width={width} caption="Опыт" className="mt-3" />
            </GridTile>
            <GridTile>
              {
              chips.map((el) => (
                <Chip key={Math.random().toString(36).substr(2, 9)} label={el} />
              ))
            }
            </GridTile>
          </Grid>
        </GridTile>
      </Grid>
    </Paper>
  );
};
export default PreviewCard;

PreviewCard.propTypes = {
  /**
   * The id of the card.
   */
  id: PropTypes.string.isRequired,
  /**
   * The name of the user.
   */
  title: PropTypes.string.isRequired,
  /**
   * The positin of the user.
   */
  subtitle: PropTypes.string,
  /**
   * Markdown secondary text.
   */
  text: PropTypes.string,
  /**
   * Skills.
   */
  chips: PropTypes.arrayOf(PropTypes.string),
  units: PropTypes.array,
  /**
   * // TODO: dummy image if img empty
   */
  img: PropTypes.string
};
