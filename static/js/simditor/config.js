$(function () {

    var editor1 = new Simditor({
        textarea: $("#id_body_text"),
        placeholder: "在此编辑你的文字",
        pasteImage: true,
        toolbar: [
            'title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color',
            '|', 'code', 'link', 'image', 'blockquote',
            '|', 'hr', 'ul', 'ol', 'alignment', 'table',
            '|', 'markdown',
        ],

    });
});


