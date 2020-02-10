import React, { Component } from "react";

class Calc extends Component {
    state = {
        number: 0
    }

    plus = () => {
        this.setState({
            number: this.state.number + 1
        });
    }

    minus = () => {
        this.setState({
            number: this.state.number - 1
        });
    }

    render() {
        return (
            <div>
                {this.state.number} <br />
                <button onClick={this.plus}>+</button>
                <button onClick={this.minus}>-</button>
            </div>

        );
    }
}

export default Calc;