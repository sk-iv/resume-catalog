import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import './Paper.css';


// Класс для корректной работы с Autosuggest
const Paper = (props) => {
  const {
    className: classNameProp,
    component: ComponentProp,
    square,
    elevation,
    ...other
  } = props;

  const className = clsx(
    'shadow',
    [`shadow-${elevation >= 0 ? elevation : 0}`],
    {
      'shadow--rounded': !square,
    },
    classNameProp,
  );

  return (<ComponentProp className={className} {...other} />);
};

Paper.propTypes = {

  /**
     * @ignore
     */
  children: PropTypes.node,

  /**
     * Useful to extend the style applied to components.
     */
  // Classes: PropTypes.object.isRequired,
  /**
     * @ignore
     */
  className: PropTypes.string,

  /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),

  /**
     * Shadow depth, corresponds to `dp` in the spec.
     * It's accepting values between 0 and 24 inclusive.
     */
  elevation: PropTypes.number,

  /**
     * If `true`, rounded corners are disabled.
     */
  square: PropTypes.bool,
};

Paper.defaultProps = {
  component: 'div',
  elevation: 2,
  square: false,
};

export default Paper;
