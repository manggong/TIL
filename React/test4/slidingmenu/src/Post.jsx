import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Post extends Component {
  state = {
    posts: []
  };

  postfollow = async userId => {
    const send_param = {
      headers,
      followerId: $.cookie("login_id"),
      followingId: userId
    };
    try {
      const result = await axios.post(
        "http://localhost:8080/follow",
        send_param
      );
      console.log(result.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  uploadPost = async () => {
    const send_param = {
      headers,
      id: $.cookie("login_id"),
      content: this.postE.value,
      img: ""
    };
    try {
      await axios.post("http://localhost:8080/post/upload", send_param);
      const result = await axios.post(
        "http://localhost:8080/post/getAllPosts",
        { headers }
      );
      if (result.data.posts) {
        this.setState({
          posts: result.data.posts
        });
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const postStyle = {
      width: 400,
      height: 100,
      borderStyle: "solid",
      borderColor: "gray",
      margin: 5
    };
    let posts = this.state.posts.map(post => {
      let nick = post.user.nick;
      let follow = (
        <button onClick={() => this.postfollow(post.user.id)}>
          팔로우하기
        </button>
      );
      if ($.cookie("login_name") === post.user.nick) {
        nick = "";
        follow = "";
      }
      return (
        <div key={post.id} style={postStyle}>
          {nick}
          {follow}
          <br />
          {post.content}
        </div>
      );
    });
    return (
      <div>
        <h2>SNS POST</h2>
        <div>
          <textarea
            ref={ref => (this.postE = ref)}
            rows="5"
            cols="50"
          ></textarea>
          <br />
          <button>사진 업로드</button>
          <button onClick={this.uploadPost}>짹짹</button>
        </div>
        <div>{posts}</div>
      </div>
    );
  }
}

export default Post;
