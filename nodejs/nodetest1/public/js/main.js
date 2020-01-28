$(document).ready(function () {

    $('#hello_div').click(function () {
        let login_form = `ID<input id="id"><br>`;
        login_form += `PW<input id="pw" type="password"><br>`
        login_form += `<input id="login_button" type="button" value="login">`
        $('#login_div').html(login_form);
    });

    $(document).on('click', '#login_button', function () {
        const id = $('#id').val();
        const pw = $('#pw').val();

        const send_param = {
            id,
            pw
        };
        //alert(id + ":" + pw);
        $.post('login', send_param, function (returnData) {
            alert(returnData.message);
        });
    });
});