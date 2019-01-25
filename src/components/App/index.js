import React from "react";
import Header from '../Header/index.js'
import AddItem from '../AddItem/index.js'
import Body from '../Body/index.js'

export default class App extends React.Component {
  state = {
    items: [],
    checkedFlag: 0
  };
  handleItems = (data) => {
    const nextItems = [data, ...this.state.items];
    this.setState({ items: nextItems });
  };

  deleteItems = (data) => {
    this.setState({ items: data })
  };

  clickOnCheckbox = (id) => {
    let data = this.state.items;
    let checkedFlag = 0;
    data.forEach(i => {
      if (i.id === id) {
        i.checked = !i.checked;
      }
      if (i.checked === true) {
        checkedFlag++;
      }
    });
    this.setState({ items: data, checkedFlag: checkedFlag });
  };

  clickBtnInAdd = () => {
    let { items } = this.state;
    let { checkedFlag } = this.state;
    const len = items.length;
    console.log('------items:', items);
    console.log('------len:', len);
    console.log('------checkedFlag:', checkedFlag);
    if (checkedFlag === len) {
      items.forEach(i => {
        i.checked = false;
      });
      checkedFlag = 0;
    } else {
      items.forEach(i => {
        i.checked = true;
      });
      checkedFlag = len;
    }


    this.setState({ items: items, checkedFlag: checkedFlag });
  };

  getCountItemsLeft = () => {
    let count = 0;
    const { items } = this.state;
    items.forEach(item => {
      if (!item.checked) {
        count++;
      }
    });
    return count;
  };

  render() {
    const { items } = this.state;
    return (
      <div className="wrapper">
        <div className="app">
          <Header/>
          <AddItem handleItems={this.handleItems}
                   clickBtnInAdd={this.clickBtnInAdd}
                   countAllItems={items.length}
          />
          <Body
            data={items}
            getCountItemsLeft={this.getCountItemsLeft}
            clickOnCheckbox={this.clickOnCheckbox}
            deleteItems={this.deleteItems}
          />
        </div>
      </div>
    )
  }
}
