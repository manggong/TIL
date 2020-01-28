$(document).ready(function() {
  let original_form = $("#login_form").html();
  $(document).on("click", "#logout_btn", function() {
    $.get("logout", function(returnData) {
      alert(returnData.message);
      $("#login_form").html(original_form);
    });
  });
  $("#login_btn").click(function() {
    const email = $("#login_email").val();
    //alert(email);
    const send_param = {
      email
    };
    $.post("login", send_param, function(returnData) {
      alert(returnData.message);
      if (returnData.message == "login ok!!!") {
        $("#login_form").html(
          "<input type='button' id='logout_btn' class='btn btn-danger' value='logout'>"
        );
      }
    });
  });

  $("#contact_btn").click(function() {
    const name = $("#name").val();
    const email = $("#email").val();
    const comments = $("#comments").val();
    //alert(name + ":" + email + ":" + comments);
    const send_param = {
      name,
      email,
      comments
    };
    $.post("contact", send_param, function(returnData) {
      alert(returnData.message);
      $("#name").val("");
      $("#email").val("");
      $("#comments").val("");
    });
  });
});
