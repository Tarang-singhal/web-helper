const defaultHtml =
`<html>
<head>
    <title>Welcome</title>
    <style>
        *{
            box-sizing: border-box;
        }
        html{
            height: 100%;
        }
        body{
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 10px;
        }
        p{
            color: red;
        }
    </style>
</head>
<body>
    <h1>Heading</h1>
    <p>
        Lorem ipsum dolor sit amet, 
        consectetur adipiscing elit. Integer nec odio. 
        Praesent libero. Sed cursus ante dapibus diam. 
        Sed nisi. Nulla quis sem at nibh elementum imperdiet. 
        Duis sagittis ipsum. Praesent mauris. 
        Fusce nec tellus sed augue semper porta. 
        <b>Lorem ipsum dolor sit amet, 
        consectetur adipiscing elit</b>. 
        Mauris massa. Vestibulum lacinia arcu eget nulla. 
    </p>

</body>
</html>
`;

window.onload = () => {
    let editor = ace.edit("code_editor");
    let tabs = document.querySelectorAll('.tabs li');
    let theme = document.querySelector('#theme');
    let run = document.querySelector('#run');
    let curr_mode = 'html';
    
    editor.session.setMode("ace/mode/html");
    editor.setValue(localStorage.getItem('html') || '', -1);
    editor.setFontSize(20);
    editor.setShowPrintMargin(false);
    editor.setTheme("ace/theme/monokai");

    let run_code = () => {
        let output = localStorage.getItem('html') + `<style>${localStorage.getItem('css')}</style>` + `<script>${localStorage.getItem('javascript')}</script>`;
        document.querySelector('#output').srcdoc = output;
    }
    
    if (!editor.getValue() && !localStorage.getItem('html')) {
        localStorage.setItem('html',defaultHtml);
        editor.setValue(defaultHtml, -1);
    }
    run_code();

    theme.addEventListener('change', (e) => {
        editor.setTheme(`ace/theme/${e.target.value}`);
    })

    editor.on('change', (e) => {
        localStorage.setItem(curr_mode, editor.getValue());
    })

    run.addEventListener('click',run_code);

    for (let i = 0; i < 3; i++) {
        tabs[i].addEventListener('click', (e) => {
            tabs.forEach(tab => tab.classList.remove('active'));
            let tab = document.querySelector(`#${e.target.id}`);
            tab.classList.add('active');
            let mode = e.target.id.slice(4);
            editor.session.setMode(`ace/mode/${mode}`);
            curr_mode = mode;
            editor.setValue(localStorage.getItem(mode), -1);
            editor.getSession().setUndoManager(new ace.UndoManager());
        })
    }

    if(window.screen.width < 420){
        editor.setFontSize(15);
    }

}
