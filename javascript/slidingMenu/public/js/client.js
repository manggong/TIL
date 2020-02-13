function change() {
    let content = "<div id='flyoutMenu' class='show'>"
    content += "<ul><li>home</li></ul>"
    content += "<button onclick='location.reload()'>button</button><br/>"
    content += "<button id='join_btn' onclick='join()'>join</button>"
    content += "</div>"
    document.getElementById("area").innerHTML = content;
}

function join() {
    let join_form = "<div id='join_form'>"
    join_form += "이름 <input/>"
    join_form += "ID <input/>"
    join_form += "PW <input/>"
    join_form += "</div>"

    /*   const newTag = document.createElement('div');
         const oldTag = document.getElementById("flyoutMenu")

         newTag.setAttribute('class', 'hide');

         const parent = oldTag.parentNode;
         parent.replaceChild(newTag, oldTag); */

    document.getElementById("flyoutMenu").setAttribute('class', 'hide');
    document.getElementById("container").innerHTML = join_form;
}