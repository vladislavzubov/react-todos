import React from "react";

export default class AddItem extends React.Component {
  state = {
    text: ""
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { text } = this.state;
      if (text.trim()) {
        this.props.handleItems({
          id: +new Date(),
          checked: false,
          text,
        });
        this.setState({ text: "" });
      }
    }
  };
  clickBtnInAdd = (e) => {
    e.preventDefault();
    this.props.clickBtnInAdd();
  };
  handleChange = (e) => {
    this.setState({ text: e.currentTarget.value })
  };

  render() {
    const { text } = this.state;
    const showBtn = this.props.countAllItems > 0;
    return (
      <div className="app__add">
        <div className="app_add-check-all">
          {showBtn && <button className="check-all-btn" onClick={this.clickBtnInAdd}/>}
        </div>
        <div className="app__add-input">
          <input
            className="app__input-text"
            placeholder="What needs to be done?"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={text}
          />
        </div>
      </div>
    )
  }
}
