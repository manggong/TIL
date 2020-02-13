import React, { Component } from "react";
import "./css/HelloWorld.css"
import $ from 'jquery';

class HelloWorld extends Component {
    state = {
        ip_address: "..."
    }

    componentDidMount() {
        $.get("http://localhost:8080", (returnData) => {
            this.setState({
                ip_address: returnData.ip
            });
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.ip_address}</h1>
            </div>
        );
    }
}

export default HelloWorld;