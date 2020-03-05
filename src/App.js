import React, { Component } from "react";
import List from "./List";
import "./App.css";

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      store: props.store
    }
  }
  
  static defaultProps = {
      store: {
        lists: [],
        allCards: {}
    }
  }

  handleDeleteItem() {
    console.log("handle delete item called");
  }
  handleAddItem() {
    console.log("handle add item called");
    const newRandomCard = () => {
      const id =
        Math.random()
          .toString(36)
          .substring(2, 4) +
        Math.random()
          .toString(36)
          .substring(2, 4);
      return {
        id,
        title: `Random Card ${id}`,
        content: "lorem ipsum"
      };
    };
  }

  render() {
    const { store } = this.props;
    return (
      <main className="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              handleDeleteItem={this.handleDeleteItem}
              onAddItem={this.handleAddItem}
            />
          ))}
        </div>
      </main>
    );
  }
}
