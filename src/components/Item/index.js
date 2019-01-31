import React from "react";
import Edit from '../Edit/index.js'
import updateItemFromServerById from '../../requests/put.js'

export default class Item extends React.Component {
  state = {
    visibleEdit: true,
    visibleDelete: false,
    text: this.props.data.text
  };

  handleCheckBoxClick = () => {
    this.props.clickOnCheckbox(this.props.data.id);
  };

  doubleClickForEdit = () => {
    if (this.state.visibleEdit) this.setState({ visibleEdit: !this.state.visibleEdit })
  };

  deleteItemOnClick = (e) => {
    const id = e.currentTarget.id;
    this.props.deleteItemById(id);
  };

  showDeleteBtn = () => {
    if (!this.state.visibleDelete) this.setState({ visibleDelete: !this.state.visibleDelete });
  };

  hideDeleteBtn = () => {
    if (this.state.visibleDelete) this.setState({ visibleDelete: !this.state.visibleDelete });
  };

  editTextFromInput = (text) => {
    const { checked, id } = this.props.data;
    updateItemFromServerById(checked, text, id);
    this.setState({ text: text, visibleEdit: !this.state.visibleEdit });
  };

  renderItem = (text) => {
    const checkBox = this.props.data.checked;
    const editTextFromInput = this.editTextFromInput;
    return (
      <div className="app__body-item"
           id={this.props.data.id}
           onDoubleClick={this.doubleClickForEdit}
           onMouseOver={this.showDeleteBtn}
           onMouseEnter={this.showDeleteBtn}
           onMouseLeave={this.hideDeleteBtn}>
        <input
          className="app__item-checkbox"
          type="checkbox"
          checked={checkBox}
          onChange={this.handleCheckBoxClick}
        />
        <div className="app__body-text">
          {this.state.visibleEdit && (
            checkBox ? (<span style={{ textDecoration: "line-through" }}>{text}</span>) : (<span>{text}</span>)
          )}
          {!this.state.visibleEdit && (
            <Edit text={text} editTextFromInput={editTextFromInput}/>
          )}
        </div>
        <div className="app__body-deleteItem">
          {this.state.visibleDelete &&
          <button className="app__btn-delete" id={this.props.data.id} onClick={this.deleteItemOnClick}>x</button>}
        </div>
      </div>
    )
  };

  render() {
    const { text } = this.state;
    const { visibleFlags } = this.props;
    const flagItem = this.props.data.checked;
    if (visibleFlags.all) {
      return this.renderItem(text);
    } else if (visibleFlags.active) {
      if (!flagItem) {
        return this.renderItem(text);
      } else {
        return null;
      }
    } else if (visibleFlags.completed) {
      if (flagItem) {
        return this.renderItem(text);
      } else {
        return null;
      }
    }
  }
}
