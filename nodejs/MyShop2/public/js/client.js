$(document).ready(function () {
    $("#logout_btn").click(function () {
        $.post("logout", {}, function (returnData) {
            alert(returnData.message);
            location.reload();
        });

    });

    $("#login_btn").click(function () {
        const email = $("#login_email").val();
        const send_param = {
            email
        };
        $.post("login", send_param, function (returnData) {
            alert(returnData.message);
            location.reload();
        });
    });

    $("#contact_btn").click(function () {
        const name = $("#name").val();
        const email = $("#email").val();
        const comments = $("#comments").val();
        //alert(name + email + comments);
        const send_param = {
            name,
            email,
            comments
        };
        $.post("contact", send_param, function (returnData) {
            alert(returnData.message);
        });
    });
});