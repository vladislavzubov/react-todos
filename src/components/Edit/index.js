import React from "react";


export default class Edit extends React.Component {
  state = {
    text: this.props.text
  };

  componentDidMount() {
    // ставим фокус в input
    this.nameInput.focus()
  }

  handleChange = (e) => {
    this.setState({ text: e.currentTarget.value })
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { text } = this.state;
      if (text.trim()) {
        this.props.editTextFromInput(text)
      }
    }
  };

  render() {
    const { text } = this.state;
    return (
      <div className="edit-input">
        <input className="edit-input"
               onChange={this.handleChange}
               value={text}
               onKeyPress={this.handleKeyPress}
               ref={(input) => {
                 this.nameInput = input;
               }}
        />
      </div>
    )
  }
}