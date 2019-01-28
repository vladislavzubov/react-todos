import React from "react";

export default class Edit extends React.Component {
  state = {
    text: this.props.text
  };

  componentDidMount() {
    // ставим фокус в input
    this.editInput.focus()
  }

  handleChange = (e) => {
    this.setState({ text: e.currentTarget.value })
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.editItemText(e);
    }
  };
  editItemText = (e) => {
    e.preventDefault();
    const { text } = this.state;
    if (text.trim()) {
      this.props.editTextFromInput(text)
    }
  };

  render() {
    const { text } = this.state;
    return (
      <div className="edit-input">
        <input
          className="edit-input"
          onChange={this.handleChange}
          onBlur={this.editItemText}
          value={text}
          onKeyPress={this.handleKeyPress}
          ref={(input) => {
            this.editInput = input;
          }}
        />
      </div>
    )
  }
}