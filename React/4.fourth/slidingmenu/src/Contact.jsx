import React, { Component } from "react";

class Contact extends Component {
    render() {
        return (
            <div>
                <h2>Contact</h2>
                <p>회원가입</p>
                이름<input /><br />
                이메일<input /><br />
                비밀번호<input /><br />
                comments<input /><br />
                <button>회원가입</button>
            </div>
        );
    }
}

export default Contact;