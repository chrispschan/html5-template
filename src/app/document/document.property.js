// $(document).ready without jq
document.ready = function (fn) {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading')
        fn();
    else
        document.addEventListener('DOMContentLoaded', fn);
};

// get html tag element
document.getHTML = () => document.getElementsByTagName('HTML').length > 0 ? document.getElementsByTagName('HTML')[0] : null;
