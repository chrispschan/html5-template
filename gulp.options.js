const gulpOptions = {
    server: {
        root: './app/',
        port: '30000'
    },
    cmsServer: {
        port: '30001'
    },
    outputFiles: {
        fonts: 'fonts',
        img: 'images',
        js: 'js',
        babel: 'babel.js',
        scss: 'styles',
        html: ''
    },
    favicon: {
        icons: {
            android: false,
            appleIcon: false,
            appleStartup: false,
            favicons: true,
            firefox: false,
            windows: true,
            yandex: false
        },
        pipeHTML: false
    },
    htmlTemplate: 'nunjucks', // 'hb' | 'nunjucks'
    htmlbeautify: {
            'indent_size': 4,
            'indent_char': ' ',
            'eol': '\n',
            'indent_level': 0,
            'indent_with_tabs': false,
            'preserve_newlines': true,
            'max_preserve_newlines': 1,
            'jslint_happy': false,
            'space_after_anon_function': false,
            'brace_style': 'collapse',
            'keep_array_indentation': false,
            'keep_function_indentation': false,
            'space_before_conditional': true,
            'break_chained_methods': false,
            'eval_code': false,
            'unescape_strings': false,
            'wrap_line_length': 0,
            'wrap_attributes': 'auto',
            'wrap_attributes_indent_size': 4,
            'end_with_newline': false
    },
    accessibility: {
        accessibilityLevel: 'WCAG2AA',
        force: true,
        reportLevels: {
            notice: false,
            warning: true,
            error: true
        }
    },
    defaultTasks: [
        'fonts:copy',
        'img:copy',
        'favicon:build',
        'js:build',
        'scss:build',
        'content:get',
        'js:watch',
        'scss:watch',
        'content:watch'
    ]
};

module.exports = gulpOptions;
