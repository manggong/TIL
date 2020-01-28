$(document).ready(function () {
    $(document).on('click', '#logout_btn', function () {
        $.get('logout', function (returnData) {
            alert(returnData.message);
            $('#login_div').show();
            $('#logout_div').hide();
        });
    });

    $('#login_btn').click(function () {
        const email = $('#login_email').val();
        //alert(email);
        const send_param = {
            email
        };
        $.post('login', send_param, function (returnData) {
            alert(returnData.message);
            $('#logout_div').show();
            $('#login_div').hide();
        });
    });

    $('#contact_btn').click(function () {
        const name = $('#name').val();
        const email = $('#email').val();
        const comments = $('#comments').val();
        //alert(name+":"+email+":"+comments);
        const send_param = {
            name,
            email,
            comments
        };
        $.post('contact', send_param, (returnData) => {
            alert(returnData.message);
            $('#name').val('');
            $('#email').val('');
            $('#comments').val('');
        });
    });
    $('#apple_btn').click(function () {
        //alert();

        const send_param = {
            fruits: "apple"
        };
        $.post('basket', send_param, function (returnData) {
            alert(returnData.message);
        });
    });

    $('#orange_btn').click(function () {
        //alert();

        const send_param = {
            fruits: "orange"
        };
        $.post('basket', send_param, function (returnData) {
            alert(returnData.message);
        });
    });

    $('#banana_btn').click(function () {
        //alert();

        const send_param = {
            fruits: "banana"
        };
        $.post('basket', send_param, function (returnData) {
            alert(returnData.message);
        });
    });
    $('#basket_view').click(function () {
        $.get("view", function (returnData) {
            alert(returnData.message);
        });
    });


});