import type, { ElementType, Node } from 'react';

import PropTypes from 'prop-types';
import React from 'react';
import Transition from 'react-transition-group/Transition';
import classNames from 'classnames';

if (process.env.WEBPACK) {
  require('./collapse.css');
}

const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // Most basic recommended timing
  standard: 300,
  // This is to be used in complex animations
  complex: 375,
  // Recommended when something is entering screen
  enteringScreen: 225,
  // Recommended when something is leaving screen
  leavingScreen: 195,
};


/*
 * Type ProvidedProps = {
 *   Appear: boolean,
 *   Classes: Object,
 *   Component: ElementType,
 *   CollapsedHeight: string,
 *   Timeout: TransitionDuration,
 *   Theme: Object,
 * };
 */


class Collapse extends React.Component {
  static defaultProps = {
    appear: false,
    component: 'div',
    collapsedHeight: '0px',
    timeout: duration.standard,
  };

  wrapper = null;

  autoTransitionDuration = undefined;

  handleEnter = (node) => {
    node.style.height = this.props.collapsedHeight;
    node.style.display = 'block';
    if (this.props.onEnter) {
      this.props.onEnter(node);
    }
  };

  handleEntering = (node) => {
    const { timeout, theme } = this.props;
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;

    if (timeout === 'auto') {
      const duration2 = 300;
      node.style.transitionDuration = `${duration2}ms`;
      this.autoTransitionDuration = duration2;
    } else if (typeof timeout === 'number') {
      node.style.transitionDuration = `${timeout}ms`;
    } else if (timeout) {
      node.style.transitionDuration = `${timeout.enter}ms`;
    } else {
      // The propType will warn in this case.
    }

    node.style.height = `${wrapperHeight}px`;

    if (this.props.onEntering) {
      this.props.onEntering(node);
    }
  };

  handleEntered = (node) => {
    node.style.height = 'auto';
    if (this.props.onEntered) {
      this.props.onEntered(node);
    }
  };

  handleExit = (node) => {
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;
    node.style.height = `${wrapperHeight}px`;
    node.style.display = 'none';

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  handleExiting = (node) => {
    const { timeout, theme } = this.props;
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;

    if (timeout === 'auto') {
      const duration2 = 300;
      node.style.transitionDuration = `${duration2}ms`;
      this.autoTransitionDuration = duration2;
    } else if (typeof timeout === 'number') {
      node.style.transitionDuration = `${timeout}ms`;
    } else if (timeout) {
      node.style.transitionDuration = `${timeout.exit}ms`;
    } else {
      // The propType will warn in this case.
    }

    node.style.height = this.props.collapsedHeight;

    if (this.props.onExiting) {
      this.props.onExiting(node);
    }
  };

  addEndListener = (node, next) => {
    let timeout;

    if (this.props.timeout === 'auto') {
      timeout = this.autoTransitionDuration || 0;
    } else {
      timeout = this.props.timeout;
    }

    setTimeout(next, timeout);
  };

  render() {
    const {
      appear,
      children,
      classes,
      component: ComponentProp,
      collapsedHeight,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      style,
      timeout,
      theme,
      className,
      ...other
    } = this.props;

    return (
      <Transition
        addEndListener={this.addEndListener}
        appear={appear}
        onEnter={this.handleEnter}
        onEntered={this.handleEntered}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        onExiting={this.handleExiting}
        style={{
          minHeight: collapsedHeight,
          ...style,
        }}
        {...other}
      >
        {(state) => (
          <ComponentProp
            className={classNames('collapse--container', {
              'collapse--entered': state === 'entered',
            }, className)}
          >
            <div
              className="collapse--wrapper"
              ref={(node) => {
                this.wrapper = node;
              }}
            >
              <div className="collapse--wrapperInner">
                {children}
              </div>
            </div>
          </ComponentProp>
        )}
      </Transition>
    );
  }
}
Collapse.propTypes = {

  /**
     * @ignore
     */
  appear: PropTypes.bool,

  /**
     * The content node to be collapsed.
     */
  children: PropTypes.node,

  /**
     * Useful to extend the style applied to components.
     */
  classes: PropTypes.object,

  /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     * The default value is a `button`.
     */
  collapsedHeight: PropTypes.string,

  /**
     * The height of the container when collapsed.
     */
  component: PropTypes.node,

  /**
     * If `true`, the component will transition in.
     */
  in: PropTypes.bool,

  /**
     * @ignore
     */
  onEnter: PropTypes.func,

  /**
     * @ignore
     */
  onEntered: PropTypes.func,

  /**
     * @ignore
     */
  onEntering: PropTypes.func,

  /**
     * @ignore
     */
  onExit: PropTypes.func,

  /**
     * @ignore
     */
  onExiting: PropTypes.func,

  /**
     * @ignore
     */
  style: PropTypes.object,

  /**
     * @ignore
     */
  theme: PropTypes.object,

  /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     *
     * Set to 'auto' to automatically calculate transition time based on height.
     */
  // Timeout: PropTypes.TransitionDuration,
};
// Export type TransitionDuration = number | { enter?: number, exit?: number } | 'auto';
export default Collapse;
