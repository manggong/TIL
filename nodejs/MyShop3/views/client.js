$(document).ready(function () {
    $('#board_show').click(function () {
        window.open('board_show', "_red", "width=1000,height=700");
        // $.post('board_show', send_param, (returnData) => {

        //  });
    });
    $('#board_btn').click(function () {
        const title = $('#board_title').val();
        const content = $('#board_content').val();
        const send_param = {
            title,
            content
        };
        $.post('board_upload', send_param, (reuturnData) => {
            alert(reuturnData.message);
        });
    });
    $('#board_write_text').click(function () {
        window.open('board_write', "_black", "width=1000,height=700");
    });

    let city = 0;
    $(document).on('click', '#basket_btn', () => {
        const quantity = $('#quantity').val();
        const user = $('#usrname').val();
        send_param = {
            user,
            city,
            quantity
        };

        $.post('basket', send_param, (reuturnData) => {
            alert(reuturnData.message);
            location.reload();
        });
    });
    $('#paris').click(function () {
        city = 1;
    });
    $('#newyork').click(function () {
        city = 2;
    });
    $('#sanfran').click(function () {
        city = 3;
    });

    $('#contact_btn').click(function () {
        const name = $('#name').val();
        const email = $('#email').val();
        const comments = $('#comments').val();

        const send_param = {
            name,
            email,
            comments
        };
        $.post('contact', send_param, (reuturnData) => {
            alert(reuturnData.message);
        });
    })
    $(document).on('click', '#login_btn', function () {

        const email = $('#login_email').val();
        const send_param = {
            email
        };
        $.post('login', send_param, (reuturnData) => {
            alert(reuturnData.message);
            location.reload();
        });
    });
    $(document).on('click', '#logout_btn', function () {
        $.post('logout', (reuturnData) => {
            alert("로그아웃 되었습니다.");
        });
        location.reload();
    });
});