import React, { Component } from "react";
import "./css/Menu.css";
import $ from "jquery";
import { Route, NavLink, HashRouter } from "react-router-dom";

class Menu extends Component {
  state = {
    login_email: "",
    loginStyle: "inline-block",
    logoutStyle: "none"
  };

  logout = () => {
    $.get("http://localhost:8080/member/logout", returnData => {
      $.removeCookie("login_name");
      if (returnData.message) {
        this.setState({
          loginStyle: "inline-block",
          logoutStyle: "none"
        });
      }
    });
  };

  login = () => {
    //alert(this.emailE.value + this.pwE.value);
    const send_param = {
      email: this.emailE.value,
      pw: this.pwE.value
    };
    $.post("http://localhost:8080/member/login", send_param, returnData => {
      if (returnData.message) {
        $.cookie("login_name", returnData.message);
        this.setState({
          login_email: returnData.message,
          loginStyle: "none",
          logoutStyle: "inline-block"
        });
      } else {
        alert("login failed");
      }
      this.emailE.value = "";
      this.pwE.value = "";
      this.emailE.focus();
    });
  };

  render() {
    const loginStyle = {
      display: this.state.loginStyle
    };

    const logoutStyle = {
      display: this.state.logoutStyle
    };
    let login_name;

    if ($.cookie("login_name")) {
      login_name = $.cookie("login_name");
      loginStyle.display = "none";
      logoutStyle.display = "inline-block";
    }

    let visibility = "hide";

    if (this.props.menuVisibility) {
      visibility = "show";
    }
    return (
      <div
        id="flyoutMenu"
        onDrag={this.props.handleMouseDown}
        className={visibility}
      >
        <HashRouter>
          <div style={loginStyle}>
            이메일&nbsp;&nbsp;&nbsp;
            <input ref={ref => (this.emailE = ref)} />
            <br />
            비밀번호
            <input type="password" ref={ref => (this.pwE = ref)} />
            <br />
            <button onClick={this.login}>로그인</button>
            <NavLink to="/contact">
              <button onClick={this.props.handleMouseDown}>회원가입</button>
            </NavLink>
          </div>
          <div style={logoutStyle}>
            {login_email}님 환영합니다.
            <button onClick={this.logout}>로그아웃</button>
          </div>
          <h2>
            <a href="/">HOME</a>
          </h2>
          <h2>
            <a href="/">ABOUT</a>
          </h2>
          <h2>
            <a href="/">CONTACT</a>
          </h2>
          <h2>
            <a href="/">SEARCH</a>
          </h2>
        </HashRouter>
      </div>
    );
  }
}

export default Menu;
