import React, { Component } from "react";
import List from "./List";
import "./App.css";
import STORE from "./STORE";
// import Card from "./Card";

export default class App extends Component {
  state = {
    store: STORE
  };

  /*
  addCard = listId => {
    const myCardId = 12345;
    this.setState({
      lists: this.state.lists.map(list => {
        if (listId === list.id) {
          return anUpdatedObject;
        } else {
          return list;
        }
      })
    });
  };
*/
  // render() {
  //   const list = this.state.list.map(item => (
  //     <Card
  //       key={item.id}
  //       text={item.text}
  //       handleClick={() => this.printId(item.id)}
  //     />
  //   ));
  //   return <ul>{list}</ul>;
  // }

  handleDeleteItem() {
    
  }

  newRandomCard = () => {
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

  handleAddItem = listId => {
    console.log("handle add item called");
    const newCard = this.newRandomCard();
    console.log(listId);

    const newList = this.state.store.lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
      }
      return list;
    });

    this.setState({
      store: {
        lists: newList,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard
        }
      }
    });
  };

  handleDeleteItem = cardId => {
    console.log("handle delete item called");
    const { lists, allCards } = this.state.store;
    function omit(obj, keyToOmit) {
      return Object.entries(obj).reduce(
        (newObj, [key, value]) =>
          key === keyToOmit ? newObj : { ...newObj, [key]: value },
        {}
      );
      
    }

    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));
    

    const newCards = omit(allCards, cardId);

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    });
  };

  render() {
    const { store } = this.state;
    return (
      <main className="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {store.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
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
