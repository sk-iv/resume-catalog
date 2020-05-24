import ClickAwayListener from "../utils/ClickAwayListener";
import EventListener from "react-event-listener";
import Fade from "../Transition/Fade";
import PropTypes from "prop-types";
import React from "react";
import SnackbarContent from "./SnackbarContent";
import classNames from "classnames";
import {createChainedFunction} from "../utils/helpers";
if (process.env.WEBPACK) {

    require("./snackbar.css");

}

class Snackbar extends React.Component {

    static getDerivedStateFromProps (nextProps, prevState) {

        if (typeof prevState.exited === "undefined") {

            return {
                "exited": !nextProps.open
            };

        }

        if (nextProps.open) {

            return {
                "exited": false
            };

        }

        return null;

    }

  state = {};

  componentDidMount () {

      if (this.props.open) {

          this.setAutoHideTimer();

      }

  }

  componentDidUpdate (prevProps) {

      if (prevProps.open !== this.props.open) {

          if (this.props.open) {

              this.setAutoHideTimer();

          } else {

              clearTimeout(this.timerAutoHide);

          }

      }

  }

  componentWillUnmount () {

      clearTimeout(this.timerAutoHide);

  }

  // Timer that controls delay before snackbar auto hides
  setAutoHideTimer (autoHideDuration = null) {

      if (!this.props.onClose || this.props.autoHideDuration == null) {

          return;

      }

      clearTimeout(this.timerAutoHide);
      this.timerAutoHide = setTimeout(() => {

          if (!this.props.onClose || this.props.autoHideDuration == null) {

              return;

          }

          this.props.onClose(null, "timeout");

      }, autoHideDuration || this.props.autoHideDuration || 0);

  }

  timerAutoHide = null;

  handleMouseEnter = (event) => {

      if (this.props.onMouseEnter) {

          this.props.onMouseEnter(event);

      }
      this.handlePause();

  };

  handleMouseLeave = (event) => {

      if (this.props.onMouseLeave) {

          this.props.onMouseLeave(event);

      }
      this.handleResume();

  };

  handleClickAway = (event) => {

      if (this.props.onClose) {

          this.props.onClose(event, "clickaway");

      }

  };

  /*
   * Pause the timer when the user is interacting with the Snackbar
   * or when the user hide the window.
   */
  handlePause = () => {

      clearTimeout(this.timerAutoHide);

  };

  /*
   * Restart the timer when the user is no longer interacting with the Snackbar
   * or when the window is shown back.
   */
  handleResume = () => {

      if (this.props.autoHideDuration != null) {

          if (this.props.resumeHideDuration !== undefined) {

              this.setAutoHideTimer(this.props.resumeHideDuration);
              return;

          }
          this.setAutoHideTimer((this.props.autoHideDuration || 0) * 0.5);

      }

  };

  handleExited = () => {

      this.setState({"exited": true});

  };

  render () {

      const {
          action,
          "anchorOrigin": {vertical, horizontal},
          autoHideDuration,
          children,
          className,
          disableWindowBlurListener,
          message,
          onClose,
          onEnter,
          onEntered,
          onEntering,
          onExit,
          onExited,
          onExiting,
          onMouseEnter,
          onMouseLeave,
          open,
          resumeHideDuration,
          SnackbarContentProps,
          "transition": TransitionProp,
          transitionDuration,
          ...other
      } = this.props;

      // So we only render active snackbars.
      if (!open && this.state.exited) {

          return null;

      }

      const transitionProps = {};

      // The provided transition might not support the direction property.
      if (TransitionProp === Fade) {

          transitionProps.direction = vertical === "top" ? "down" : "up";

      }

      return (
          <EventListener
              onBlur={disableWindowBlurListener ? undefined : this.handlePause}
              onFocus={disableWindowBlurListener ? undefined : this.handleResume}
              target="window"
          >
              <ClickAwayListener onClickAway={this.handleClickAway}>
                  <div
                      className={classNames(
                          "snackbar",
                          "snackbar--anchorOriginBottomRight",
                          className,
                      )}
                      onMouseEnter={this.handleMouseEnter}
                      onMouseLeave={this.handleMouseLeave}
                      {...other}
                  >
                      <TransitionProp
                          appear
                          in={open}
                          onEnter={onEnter}
                          onEntered={onEntered}
                          onEntering={onEntering}
                          onExit={onExit}
                          onExited={createChainedFunction(this.handleExited, onExited)}
                          onExiting={onExiting}
                          timeout={transitionDuration}
                          {...transitionProps}
                      >
                          {children ||
                          <SnackbarContent
                              action={action}
                              message={message}
                              {...SnackbarContentProps}
                          />
                          }
                      </TransitionProp>
                  </div>
              </ClickAwayListener>
          </EventListener>
      );

  }

}

Snackbar.propTypes = {

    /**
     * The action to display.
     */
    "SnackbarContentProps": PropTypes.object,

    /**
     * The anchor of the `Snackbar`.
     */
    "action": PropTypes.node,

    /**
     * The number of milliseconds to wait before automatically calling the
     * `onClose` function. `onClose` should then set the state of the `open`
     * prop to hide the Snackbar. This behavior is disabled by default with
     * the `null` value.
     */
    "anchorOrigin": PropTypes.shape({
        "horizontal": PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.oneOf([
                "left",
                "center",
                "right"
            ])
        ]),
        "vertical": PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.oneOf([
                "top",
                "center",
                "bottom"
            ])
        ])
    }),

    /**
     * If you wish the take control over the children of the component you can use this property.
     * When used, you replace the `SnackbarContent` component with the children.
     */
    "autoHideDuration": PropTypes.number,

    /**
     * Useful to extend the style applied to components.
     */
    // Classes: PropTypes.object.isRequired,
    /**
     * @ignore
     */
    "children": PropTypes.element,

    /**
     * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
     */
    "className": PropTypes.string,

    /**
     * When displaying multiple consecutive Snackbars from a parent rendering a single
     * <Snackbar/>, add the key property to ensure independent treatment of each message.
     * e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and
     * features such as autoHideDuration may be canceled.
     */
    "disableWindowBlurListener": PropTypes.bool,

    /**
     * The message to display.
     */
    "key": PropTypes.any,

    /**
     * Callback fired when the component requests to be closed.
     * Typically `onClose` is used to set state in the parent component,
     * which is used to control the `Snackbar` `open` prop.
     * The `reason` parameter can optionally be used to control the response to `onClose`,
     * for example ignoring `clickaway`.
     *
     * @param {object} event The event source of the callback
     * @param {string} reason Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"`
     */
    "message": PropTypes.node,

    /**
     * Callback fired before the transition is entering.
     */
    "onClose": PropTypes.func,

    /**
     * Callback fired when the transition has entered.
     */
    "onEnter": PropTypes.func,

    /**
     * Callback fired when the transition is entering.
     */
    "onEntered": PropTypes.func,

    /**
     * Callback fired before the transition is exiting.
     */
    "onEntering": PropTypes.func,

    /**
     * Callback fired when the transition has exited.
     */
    "onExit": PropTypes.func,

    /**
     * Callback fired when the transition is exiting.
     */
    "onExited": PropTypes.func,

    /**
     * @ignore
     */
    "onExiting": PropTypes.func,

    /**
     * @ignore
     */
    "onMouseEnter": PropTypes.func,

    /**
     * If true, `Snackbar` is open.
     */
    "onMouseLeave": PropTypes.func,

    /**
     * The number of milliseconds to wait before dismissing after user interaction.
     * If `autoHideDuration` property isn't specified, it does nothing.
     * If `autoHideDuration` property is specified but `resumeHideDuration` isn't,
     * we default to `autoHideDuration / 2` ms.
     */
    "open": PropTypes.bool,

    /**
     * Properties applied to the `SnackbarContent` element.
     */
    "resumeHideDuration": PropTypes.number,

    /**
     * Transition component.
     */
    "transition": PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]),

    /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     */
    "transitionDuration": PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({"enter": PropTypes.number,
            "exit": PropTypes.number})
    ])
};

Snackbar.defaultProps = {
    "anchorOrigin": {
        "vertical": "bottom",
        "horizontal": "center"
    },
    "disableWindowBlurListener": false,
    "transition": Fade,
    "transitionDuration": {
        "enter": 300,
        "exit": 300
    }
};

export default Snackbar;
