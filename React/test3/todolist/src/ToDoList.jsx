import React, { Component } from "react";
import ToDoItems from "./ToDoItems";
import "./css/ToDoList.css"

class ToDoList extends Component {
    state = {
        items: []
    }

    deleteItem = (key) => {
        const filteredItems = this.state.items.filter((item) => {
            return item.key !== key
        });
        this.setState({
            items: filteredItems
        });
    }

    addItem = () => {
        this.state.items.unshift({
            text: this._inputElement.value,
            key: Date.now()
        });
        this.setState({
            items: this.state.items
        })
        this._inputElement.value = "";
        this._inputElement.focus();
    }
    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <input ref={ref => this._inputElement = ref} placeholder="Enter task"></input>
                    <button onClick={this.addItem}>ADD</button>
                </div>
                <ToDoItems entries={this.state.items} superDelete={this.deleteItem} />
            </div>
        );
    }
}

export default ToDoList;