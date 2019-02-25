$(function () {

    var editor4 = new Simditor({
        textarea: $("#id_text"),
        placeholder: "在此编辑你的文字",
        toolbar: [
        'title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color',
        '|', 'code', 'link', 'image', 'blockquote',
        '|', 'hr', 'ul', 'ol', 'alignment', 'table',
        '|','markdown'
    ],
        //optional options
    });

});
