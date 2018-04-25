import React, { Component } from 'react';
import './base.css';

export default class Base extends Component {
  handleClick = () => {
    this.props.onAdd(this.props.name);
  }

  render() {
    const { name } = this.props;
    return (
      <div className="base-component" onClick={this.handleClick}>{name}</div>
    );
  }
}
