import React, { Component, Fragment } from "react";
import Item from '../Item/index.js'
import Footer from '../Footer/index.js'
import deleteItemsFromServerById from '../../requests/delete.js'

export default class Body extends Component {
  state = {
    all: true,
    active: false,
    completed: false
  };

  handleBtnClick = (e) => {
    const { id } = e.currentTarget;
    let visibleFlags = this.state;
    const flag = visibleFlags[id];
    if (!flag) {
      for (let i in visibleFlags) {
        visibleFlags[i] = i === id;
      }
      this.setState(visibleFlags);
    }
  };

  handleBtnDeleteClick = () => {
    let { data, deleteItems } = this.props;
    const deletedItems = data.filter(item => item.checked);
    const savedItems = data.filter(item => !item.checked);
    const idOfDeletedItems = deletedItems.map(item => {
      return item.id
    });
    deleteItemsFromServerById(idOfDeletedItems);
    deleteItems(savedItems);
  };

  deleteItemById = (id) => {
    let { data, deleteItems } = this.props;
    data.forEach((item, index, object) => {
      if (+item.id === +id) {
        deleteItemsFromServerById(id);
        object.splice(index, 1);
      }
    });
    deleteItems(data);
  };

  renderItem = () => {
    const { data } = this.props;
    const visibleFlags = this.state;
    let itemsTemplate;
    if (data.length) {
      const clickOnCheckbox = this.props.clickOnCheckbox;
      const deleteItemById = this.deleteItemById;
      itemsTemplate = data.map((item) => (
          <Item key={item.id}
                data={item}
                visibleFlags={visibleFlags}
                clickOnCheckbox={clickOnCheckbox}
                deleteItemById={deleteItemById}
          />
        )
      )
    } else {
      itemsTemplate = null;
    }
    return itemsTemplate;
  };

  render() {
    const { data } = this.props;
    const visible = data.length > 0;
    return (
      <Fragment>
        <div className="app__body">
          {this.renderItem()}
        </div>
        {visible && (
          <Footer
            handleBtnClick={this.handleBtnClick}
            getCountItemsLeft={this.props.getCountItemsLeft}
            numberItems={this.props.data.length}
            handleBtnDeleteClick={this.handleBtnDeleteClick}
          />
        )}
      </Fragment>
    )
  }
}






