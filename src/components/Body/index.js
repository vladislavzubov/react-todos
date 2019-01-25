import React from "react";
import Item from '../Item/index.js'
import Footer from '../Footer/index.js'

export default class Body extends React.Component {
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
    let { data } = this.props;
    data = data.filter(item => !item.checked);
    this.props.deleteItems(data);
  };

  deleteItemById = (id) => {
    let { data } = this.props;

    data.forEach((item, index, object) => {
      if (item.id == id) {
        object.splice(index, 1);
      }
    });

    this.props.deleteItems(data);
  };

  renderItem = () => {
    const { data } = this.props;
    const visibleFlags = this.state;
    let itemsTemplate;
    if (data.length) {
      const clickOnCheckbox = this.props.clickOnCheckbox;
      const deleteItemById = this.deleteItemById;
      itemsTemplate = data.map(function (item) {
        return (
          <Item key={item.id}
                data={item}
                visibleFlags={visibleFlags}
                clickOnCheckbox={clickOnCheckbox}
                deleteItemById={deleteItemById}
          />
        )
      })
    } else {
      itemsTemplate = null;
    }
    return itemsTemplate;
  };

  render() {
    const { data } = this.props;
    const visible = data.length > 0;
    return (
      <React.Fragment>
        <div className="app__body">
          {this.renderItem()}
        </div>
        {
          visible && <Footer
            handleBtnClick={this.handleBtnClick}
            getCountItemsLeft={this.props.getCountItemsLeft}
            numberItems={this.props.data.length}
            handleBtnDeleteClick={this.handleBtnDeleteClick}
          />
        }
      </React.Fragment>
    )
  }
}






