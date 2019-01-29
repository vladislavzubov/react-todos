import React from "react";

export default class Footer extends React.Component {
  state = {
    holdFlag: false,
    textDecoration: "none"
  };

  btnClear = () => {
    this.props.handleBtnDeleteClick();
  };

  changeTextDecoration = () => {
    const none = "none";
    const underline = "underline";
    const { textDecoration } = this.state;
    if (textDecoration === none) {
      this.setState({ textDecoration: underline });
    } else {
      this.setState({ textDecoration: none })
    }
  };

  render() {
    const { getCountItemsLeft, numberItems, handleBtnClick } = this.props;
    const { textDecoration } = this.state;
    let visibleBtnDelete = false;
    if (getCountItemsLeft() < numberItems) visibleBtnDelete = true;
    return (
      <div className="app__footer-all">
        <div className="app__footer">
          <div className="app__footer-itemLeft">
            {getCountItemsLeft()} items left
          </div>
          <div className="app__footer-btn">
            <button className="app__footer-btn" id="all" onClick={handleBtnClick}>All</button>
            <button className="app__footer-btn" id="active" onClick={handleBtnClick}>Active</button>
            <button className="app__footer-btn" id="completed" onClick={handleBtnClick}>Completed</button>
          </div>
          <div className="app__footer-clear">
            {visibleBtnDelete && (
              <button
                className="app__footer-btn"
                id="clear"
                onClick={this.btnClear}
                style={{ textDecorationLine: textDecoration }}
                onMouseOver={this.changeTextDecoration}
                onMouseOut={this.changeTextDecoration}>
                Clear completed
              </button>
            )}
          </div>
        </div>
        <div className="app__footer-one"/>
        <div className="app__footer-two"/>
      </div>
    )
  }
}