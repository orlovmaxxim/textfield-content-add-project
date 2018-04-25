import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Base from './components/base-component';
import initialValue from './value.json';
import './App.css';

const addSubstr = (pos, str, oldStr) => {
  var beforeSubStr = oldStr.substring(0, pos);
  var afterSubStr = oldStr.substring(pos, oldStr.length);
  return beforeSubStr + str + afterSubStr;
}

const noop = e => e.preventDefault();

class App extends Component {

  state = {
    value: Value.fromJSON(initialValue),
    currentCarret: 3,
		html: "Hello <div class='inline-test'>inline text</div>&nbsp;",
  };
  
  handleChange = evt => {
    this.setState({html: evt.target.value});
  };

  addNameComponentToCursor = (name) => {
    const newInlineBlock = `<div class='inline-test' contenteditable='false'>${name}</div>`;
    const newHtml = addSubstr(this.state.currentCarret, newInlineBlock, this.state.html);
    this.setState({ html: newHtml });
    const { value } = this.state
    const change = value.change()

    change
      .insertInline({
        type: 'billet',
        isVoid: true,
        data: { name },
      })
      .collapseToStartOfNextText()
      .focus()
    this.onChange(change)
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }
  
  renderNode = props => {
    const { attributes, children, node, isSelected } = props
    switch (node.type) {
      case 'paragraph': {
        return <p {...attributes}>{children}</p>
      }
      case 'billet': {
        const { data } = node
        const name = data.get('name')
        return (
          <span
            className={`billet ${isSelected ? 'selected' : ''}`}
            {...props.attributes}
            contentEditable={false}
            onDrop={noop}
          >
            {name}
          </span>
        )
      }
      default:
        break;
    }
  }

  renderEditor = () => {
    return (
      <div className="editor">
        <Editor
          placeholder="please, write your text..."
          value={this.state.value}
          onChange={this.onChange}
          renderNode={this.renderNode}
        />
      </div>
    )
}

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="left-panel">
            <h2 className="App-title">You can choose and add block into your text field:</h2>
            <ul className="list">
              <li className="list__element">
                <Base name="Hello" onAdd={this.addNameComponentToCursor}/>
              </li>
              <li className="list__element">
                <Base name="Second Base" onAdd={this.addNameComponentToCursor}/>
              </li>
              <li className="list__element">
                <Base name="woman" onAdd={this.addNameComponentToCursor}/>
              </li>
              <li className="list__element">
                <Base name="custom" onAdd={this.addNameComponentToCursor}/>
              </li>
              <li className="list__element">
                <Base name="person" onAdd={this.addNameComponentToCursor}/>
              </li>
              <li className="list__element">
                <Base name="Third Base Component" onAdd={this.addNameComponentToCursor}/>
              </li>
              <li className="list__element">
                <Base name="government" onAdd={this.addNameComponentToCursor}/>
              </li>
              <li className="list__element">
                <Base name="number" onAdd={this.addNameComponentToCursor}/>
              </li>
              <li className="list__element">
                <Base name="would" onAdd={this.addNameComponentToCursor}/>
              </li>
              <li className="list__element">
                <Base name="important" onAdd={this.addNameComponentToCursor}/>
              </li>
              <li className="list__element">
                <Base name="work" onAdd={this.addNameComponentToCursor}/>
              </li>
              <li className="list__element">
                <Base name="Fourth Base Component" onAdd={this.addNameComponentToCursor}/>
              </li>
            </ul>
          </div>
          <div className="right-panel">
            {this.renderEditor()}
            {/* <EditorComponent
              html={this.state.html}
              disabled={false}
              onChange={this.handleChange}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
