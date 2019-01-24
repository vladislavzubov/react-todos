import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let allItems = [

];

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
  renderItem = () => {
    const {data} = this.props;
    let itemsTemplate;
    if (data.length) {
      itemsTemplate = data.map(function (item) {
        return (
          <Item key={item.id} data={item}/>
        )
      })
    } else {
      itemsTemplate = <div></div>
    }
    return itemsTemplate;
  };

  render() {
    return (
      <div className="app__body">
        {this.renderItem()}
      </div>
    )
  }
}

class Item extends React.Component {
  render() {
    const {text} = this.props.data;
    return (
      <div className="app__body-item">
        <input type="checkbox"/>
        <span>{text}</span>
      </div>
    )
  }
}


class AddItem extends React.Component {
  state = {
    text: ""
  };
  handleKeyPress = (e) => {
    if (e.key === "Enter"){
      e.preventDefault();
      const {text} = this.state;
      this.props.handleItems({
        id: +new Date(),
        text,
      });
      this.setState({text:""});
    }
  };
  handleChange = (e) => {
    this.setState({text: e.currentTarget.value})
  };
  render() {
    const {text} = this.state;
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

class Footer extends React.Component {
  renderBtn = (name) => {
    let btn;
    btn = <button className="app__footer-btn">{name}</button>
    return btn;
  };

  render() {
    return (
      <div className="app__footer-all">
        <div className="app__footer">
          <div className="app__footer-itemLeft">
          </div>
          <div className="app__footer-btn">
            {this.renderBtn("All")}
            {this.renderBtn("Active")}
            {this.renderBtn("Completed")}
          </div>
          <div className="app__footer-clear">
          </div>
        </div>
        <div className="app__footer-one"></div>
        <div className="app__footer-two"></div>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    items: allItems
  };
  handleItems = (data) => {
    const nextItems = [data, ...this.state.items];
    this.setState({items: nextItems});
  };

  render() {
    const {items} = this.state;
    const visible = items.length > 0;
    return (
      <div className="wrapper">
        <div className="app">
          <Header/>
          <AddItem handleItems={this.handleItems}/>
          <Body data={items}/>
          { visible && <Footer/>}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
