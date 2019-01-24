import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Header extends React.Component {
  render() {
    return (
      <div className="app__head">
        <span className="app__head-logo">todos</span>
      </div>
    )
  }
}

class Body extends React.Component {
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
        if (i === id) {
          visibleFlags[i] = true;
        } else {
          visibleFlags[i] = false;
        }
      }
      this.setState(visibleFlags);
    }
  };

  renderItem = () => {
    const { data } = this.props;
    const visibleFlags = this.state;
    let itemsTemplate;
    if (data.length) {
      const clickOnCheckbox = this.props.clickOnCheckbox;
      itemsTemplate = data.map(function (item) {
        return (
          <Item key={item.id} data={item} visibleFlags={visibleFlags} clickOnCheckbox={clickOnCheckbox} />
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
          visible && <Footer handleBtnClick={this.handleBtnClick} getCountItemsLeft={this.props.getCountItemsLeft}/>
        }
      </React.Fragment>
    )
  }
}

class Footer extends React.Component {
  render() {
    console.log('---render footer');
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
            <button className="app__footer-btn" id="clear">Clear completed</button>
          </div>
        </div>
        <div className="app__footer-one"/>
        <div className="app__footer-two"/>
      </div>
    )
  }
}

class Item extends React.Component {
  state = {
    checked: false
  };
  handleCheckBoxClick = () => {
    this.props.clickOnCheckbox(this.props.data.id);
    let flag = this.state.checked;
    this.setState({ checked: !flag })
  };
  getItem = (text) => {
    return (
      <div className="app__body-item" id={this.props.data.id}>
        <input
          type="checkbox"
          checked={this.state.checked}
          onChange={this.handleCheckBoxClick}
        />
        <span>{text}</span>
      </div>
    )
  };

  render() {
    const { text } = this.props.data;
    const { visibleFlags } = this.props;
    const flagItem = this.state.checked;

    if (visibleFlags.all) {
      return this.getItem(text);
    } else if (visibleFlags.active) {
      if (!flagItem) {
        return this.getItem(text);
      } else {
        return null;
      }
    } else if (visibleFlags.completed) {
      if (flagItem) {
        return this.getItem(text);
      } else {
        return null;
      }
    }
  }
}


class AddItem extends React.Component {
  state = {
    text: ""
  };
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { text } = this.state;
      this.props.handleItems({
        id: +new Date(),
        checked: false,
        text,
      });
      this.setState({ text: "" });
    }
  };
  handleChange = (e) => {
    this.setState({ text: e.currentTarget.value })
  };

  render() {
    const { text } = this.state;
    return (
      <div className="app__add">
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


class App extends React.Component {
  state = {
    items: []
  };
  handleItems = (data) => {
    const nextItems = [data, ...this.state.items];
    this.setState({ items: nextItems });
  };

  clickOnCheckbox = (id) => {
    let { items } = this.state;
    items.forEach(i => {
      if (i.id === id) {
        i.checked = !i.checked;
      }
    });
  };

  getCountItemsLeft = () => {
    let count = 0;
    const { items } = this.state;
    items.forEach(item => {
      console.log('------state:', this.state);
      if (!item.checked) {
        count++;
      }
    });
    return count;
  }

  render() {
    const { items } = this.state;
    return (
      <div className="wrapper">
        <div className="app">
          <Header/>
          <AddItem handleItems={this.handleItems}/>
          <Body
            data={items}
            getCountItemsLeft={this.getCountItemsLeft}
            clickOnCheckbox={this.clickOnCheckbox}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
