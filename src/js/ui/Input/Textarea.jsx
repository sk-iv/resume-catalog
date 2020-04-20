// import EventListener from "react-event-listener";
// import PropTypes from "prop-types";
// import React from "react";
// import classnames from "classnames";
// import {debounce} from "../utils/debounce";
// if (process.env.WEBPACK) {
//
//     require("./textarea.css");
//
// }
// const ROWS_HEIGHT = 24;
//
//
// /**
//  * @ignore - internal component.
//  */
// class Textarea extends React.Component {
//
//   state = {
//       "height": null
//   };
//
//   componentWillMount () {
//
//       /*
//        * <Input> expects the components it renders to respond to 'value'
//        * So that it can check whether they are dirty
//        */
//       this.value = this.props.value || this.props.defaultValue || "";
//       this.setState({
//           "height": Number(this.props.rows) * ROWS_HEIGHT
//       });
//
//   }
//
//   componentDidMount () {
//
//       this.syncHeightWithShadow(null);
//
//   }
//
//   componentWillReceiveProps (nextProps) {
//
//       if (
//           nextProps.value !== this.props.value ||
//       Number(nextProps.rowsMax) !== Number(this.props.rowsMax)
//       ) {
//
//           this.syncHeightWithShadow(null, nextProps);
//
//       }
//
//   }
//
//   /*
//    * ComponentWillUnmount() {
//    *   this.handleResize.cancel();
//    * }
//    */
//
//   shadow = null;
//
//   singlelineShadow = null;
//
//   input = null;
//
//   value = null;
//
//   handleResize = debounce((event) => {
//
//       this.syncHeightWithShadow(event);
//
//   }, 166);
//
//   syncHeightWithShadow (event, props = this.props) {
//
//       if (this.shadow && this.singlelineShadow) {
//
//           // The component is controlled, we need to update the shallow value.
//           if (typeof this.props.value !== "undefined") {
//
//               this.shadow.value = props.value == null ? "" : String(props.value);
//
//           }
//
//           const lineHeight = this.singlelineShadow.scrollHeight;
//           let newHeight = this.shadow.scrollHeight;
//
//           /*
//            * Guarding for jsdom, where scrollHeight isn't present.
//            * See https://github.com/tmpvar/jsdom/issues/1013
//            */
//           if (newHeight === undefined) {
//
//               return;
//
//           }
//
//           if (Number(props.rowsMax) >= Number(props.rows)) {
//
//               newHeight = Math.min(Number(props.rowsMax) * lineHeight, newHeight);
//
//           }
//
//           newHeight = Math.max(newHeight, lineHeight);
//
//           if (this.state.height !== newHeight) {
//
//               this.setState({
//                   "height": newHeight
//               });
//
//           }
//
//       }
//
//   }
//
//   handleRefInput = (node) => {
//
//       this.input = node;
//       if (this.props.textareaRef) {
//
//           this.props.textareaRef(node);
//
//       }
//
//   };
//
//   handleRefSinglelineShadow = (node) => {
//
//       this.singlelineShadow = node;
//
//   };
//
//   handleRefShadow = (node) => {
//
//       this.shadow = node;
//
//   };
//
//   handleChange = (event) => {
//
//       this.value = event.target.value;
//
//       if (typeof this.props.value === "undefined" && this.shadow) {
//
//           // The component is not controlled, we need to update the shallow value.
//           this.shadow.value = this.value;
//           this.syncHeightWithShadow(event);
//
//       }
//
//       if (this.props.onChange) {
//
//           this.props.onChange(event);
//
//       }
//
//   };
//
//   render () {
//
//       const {
//           className,
//           defaultValue,
//           onChange,
//           rows,
//           rowsMax,
//           textareaRef,
//           value,
//           ...other
//       } = this.props;
//
//       return (
//           <div
//               className="textarea--root"
//               style={{"height": this.state.height}}
//           >
//               <EventListener
//                   onResize={this.handleResize}
//                   target="window"
//               />
//               <textarea
//                   aria-hidden="true"
//                   className={classnames("textarea--shadow", "textarea")}
//                   readOnly
//                   ref={this.handleRefSinglelineShadow}
//                   rows="1"
//                   tabIndex={-1}
//                   value=""
//               />
//               <textarea
//                   aria-hidden="true"
//                   className={classnames("textarea--shadow", "textarea")}
//                   defaultValue={defaultValue}
//                   readOnly
//                   ref={this.handleRefShadow}
//                   rows={rows}
//                   tabIndex={-1}
//                   value={value}
//               />
//               <textarea
//                   className={classnames("textarea", className)}
//                   defaultValue={defaultValue}
//                   onChange={this.handleChange}
//                   rows={rows}
//                   value={value}
//                   {...other}
//                   ref={this.handleRefInput}
//               />
//           </div>
//       );
//
//   }
//
// }
//
// Textarea.propTypes = {
//
//     /**
//      * @ignore
//      */
//     "className": PropTypes.string,
//
//     /**
//      * @ignore
//      */
//     "defaultValue": PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number
//     ]),
//
//     /**
//      * @ignore
//      */
//     "disabled": PropTypes.bool,
//
//     /**
//      * @ignore
//      */
//     "onChange": PropTypes.func,
//
//     /**
//      * Number of rows to display when multiline option is set to true.
//      */
//     "rows": PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number
//     ]),
//
//     /**
//      * Maximum number of rows to display when multiline option is set to true.
//      */
//     "rowsMax": PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number
//     ]),
//
//     /**
//      * Use that property to pass a ref callback to the native textarea element.
//      */
//     "textareaRef": PropTypes.func,
//
//     /**
//      * @ignore
//      */
//     "value": PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number
//     ])
// };
//
// Textarea.defaultProps = {
//     "rows": 1
// };
//
// export default Textarea;
