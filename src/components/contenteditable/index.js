import React from 'react';
// import renderToString from 'react-dom/server';

export default class ContentEditable extends React.Component {
  constructor() {
    super();
    this.emitChange = this.emitChange.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    let { props, htmlEl } = this;
    if (!htmlEl) {
      return true;
    }
    if (nextProps.html !== htmlEl.innerHTML && nextProps.html !== props.html) {
      return true;
    }
    let optional = ['style', 'className', 'disabled', 'tagName'];
    return optional.some(name => props[name] !== nextProps[name]);
  }

  componentDidUpdate() {
    if ( this.htmlEl && this.props.html !== this.htmlEl.innerHTML ) {
      this.htmlEl.innerHTML = this.props.html;
    }
  }

  emitChange(evt) {
    if (!this.htmlEl) return;
    let html = this.htmlEl.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      evt.target = { value: html };
      this.props.onChange(evt);
    }
    this.lastHtml = html;
  }

  getCurrentCarret(evt) {
    let caretOffset = 0;
    let range = window.getSelection().getRangeAt(0);
    let preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(evt.target);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  }

  createMarkup() {
    return {__html: this.props.html};
  }

  render() {
    let { tagName, html, ...props } = this.props;
    return (
      <div disabled = {props.disabled}
           onChange = {props.onChange}
           ref = {(e) => { this.htmlEl = e; }}
           onInput = {this.emitChange}
           onBlur = {this.props.onBlur || this.emitChange}
           contentEditable = {!this.props.disabled}
           dangerouslySetInnerHTML = {this.createMarkup()}
           onMouseUp = {this.getCurrentCarret}
           onKeyUp = {this.getCurrentCarret}
           >
           </div>
    );
  }
}
