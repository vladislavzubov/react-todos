import React from "react";

export default class Footer extends React.Component {
  btnClear = () => {
    this.props.handleBtnDeleteClick();
  };
  render() {
    let visibleBtnDelete = false;
    if (this.props.getCountItemsLeft() < this.props.numberItems) visibleBtnDelete = true;
    return (
      <div className="app__footer-all">
        <div className="app__footer">
          <div className="app__footer-itemLeft">
            {this.props.getCountItemsLeft()} items left
          </div>
          <div className="app__footer-btn">
            <button className="app__footer-btn" id="all" onClick={this.props.handleBtnClick}>All</button>
            <button className="app__footer-btn" id="active" onClick={this.props.handleBtnClick}>Active</button>
            <button className="app__footer-btn" id="completed" onClick={this.props.handleBtnClick}>Completed</button>
          </div>
          <div className="app__footer-clear">
            { /* если visible, то показывай */
              visibleBtnDelete && <button className="app__footer-btn" id="clear" onClick={this.btnClear}>Clear completed</button>
            }
          </div>
        </div>
        <div className="app__footer-one"/>
        <div className="app__footer-two"/>
      </div>
    )
  }
}