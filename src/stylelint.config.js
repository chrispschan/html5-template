const stylelintConfig = {
    'plugins': [
        'stylelint-order'
    ],
    'rules': {
        'at-rule-empty-line-before': [ 'always', {
            'except': [ 'blockless-after-blockless', 'first-nested' ],
            'ignore': [ 'after-comment' ],
            'ignoreAtRules': [ 'if', 'else', 'array', 'of', 'at-rules', 'include']
        } ],
        'at-rule-name-case': 'lower',
        'at-rule-semicolon-newline-after': 'always',
        'block-closing-brace-newline-after': [ 'always-multi-line', {
            'ignoreAtRules': ['if', 'else']
        }],
        'block-closing-brace-newline-before': [
            'always-multi-line',
            {'ignore': ['if', 'else', 'include']}
        ],
        'block-closing-brace-space-before': 'always-single-line',
        'block-no-empty': true,
        'block-opening-brace-newline-after': [
            'always-multi-line',
            {'ignore': ['if', 'else', 'include']}
        ],
        'block-opening-brace-space-after': 'always-single-line',
        'block-opening-brace-space-before': 'always',
        'color-hex-case': 'lower',
        'color-hex-length': 'long',
        'color-no-invalid-hex': true,
        'comment-empty-line-before': [ 'always', {
            'except': ['first-nested'],
            'ignore': ['stylelint-commands']
        } ],
        'comment-whitespace-inside': 'always',
        'declaration-bang-space-after': 'never',
        'declaration-bang-space-before': 'always',
        'declaration-block-no-shorthand-property-overrides': true,
        'declaration-block-no-duplicate-properties': [ true, {
            'ignore': ['consecutive-duplicates']
        }],
        'declaration-block-semicolon-newline-after': 'always-multi-line',
        'declaration-block-semicolon-space-after': 'always-single-line',
        'declaration-block-semicolon-space-before': 'never',
        'declaration-block-single-line-max-declarations': 1,
        'declaration-block-trailing-semicolon': 'always',
        'declaration-colon-newline-after': 'always-multi-line',
        'declaration-colon-space-after': 'always-single-line',
        'declaration-colon-space-before': 'never',
        'declaration-no-important': true,
        'function-calc-no-unspaced-operator': true,
        'function-comma-newline-after': 'always-multi-line',
        'function-comma-space-after': 'always-single-line',
        'function-comma-space-before': 'never',
        'function-linear-gradient-no-nonstandard-direction': true,
        'function-name-case': 'lower',
        'function-parentheses-newline-inside': 'always-multi-line',
        'function-parentheses-space-inside': 'never-single-line',
        'function-whitespace-after': 'always',
        'indentation': 4,
        'max-empty-lines': 1,
        'media-feature-colon-space-after': 'always',
        'media-feature-colon-space-before': 'never',
        'media-feature-range-operator-space-after': 'always',
        'media-feature-range-operator-space-before': 'always',
        'media-query-list-comma-newline-after': 'always-multi-line',
        'media-query-list-comma-space-after': 'always-single-line',
        'media-query-list-comma-space-before': 'never',
        'no-eol-whitespace': true,
        'no-invalid-double-slash-comments': true,
        'number-leading-zero': 'always',
        'number-no-trailing-zeros': true,
        'order/properties-order': [
            [
                //Positioning
                'position',
                'z-index',
                'top',
                'right',
                'bottom',
                'left',

                //display
                'display',
                'clear',
                'float',
                'visibility',
                'backface-visibility',    //-webkit- | -moz-; ie10
                'order',    //-webkit- | -moz-; ie11

                //table
                'border-collapse',
                'table-layout',
                'border-spacing',   //ie8
                'caption-side', //ie8
                'empty-cells',  //ie8

                //flex
                'flex',    //-webkit- | -moz- | -ms-; ie10
                'flex-basis',    //-webkit- | -moz-; ie11
                'flex-direction',    //-webkit- | -moz-; ie11
                'flex-flow',    //-webkit- | -moz-; ie11
                'flex-grow',    //-webkit- | -moz-; ie11
                'flex-shrink',    //-webkit- | -moz-; ie11
                'flex-wrap',    //-webkit- | -moz-; ie11

                //grid
                'grid', //ie16
                'grid-area', //ie16
                'grid-auto-columns', //ie16
                'grid-auto-flow', //ie16
                'grid-auto-rows', //ie16
                'grid-column', //ie16
                'grid-column-end', //ie16
                'grid-column-gap', //ie16
                'grid-column-start', //ie16
                'grid-gap', //ie16
                'grid-row', //ie16
                'grid-row-end', //ie16
                'grid-row-gap', //ie16
                'grid-row-start', //ie16
                'grid-template', //ie16
                'grid-template-areas', //ie16
                'grid-template-columns', //ie16
                'grid-template-rows', //ie16

                //box-sizing
                'box-sizing',

                //sizing
                'height',
                'width',
                'max-height',
                'max-width',
                'min-height',
                'min-width',

                //overflow
                'overflow',
                'overflow-x',    //-ms-; ie8
                'overflow-y',    //-ms-; ie8

                //content align
                'align-content', //-webkit-; ie11
                'align-items',  //-webkit-; ie11
                'align-self',   //-webkit-; ie11
                'justify-content',    //-webkit- | -moz-; ie11

                //padding
                'padding',
                'padding-bottom',
                'padding-left',
                'padding-right',
                'padding-top',

                //margin
                'margin',
                'margin-bottom',
                'margin-left',
                'margin-right',
                'margin-top',

                //border
                'border',
                'border-color',
                'border-style',
                'border-width',
                'border-bottom',
                'border-bottom-color',
                'border-bottom-style',
                'border-bottom-width',
                'border-left',
                'border-left-color',
                'border-left-style',
                'border-left-width',
                'border-right',
                'border-right-color',
                'border-right-style',
                'border-right-width',
                'border-top',
                'border-top-color',
                'border-top-style',
                'border-top-width',
                'border-image-outset',    //ie11
                'border-image-repeat',    //ie11
                'border-image-slice',    //ie11
                'border-image-source',    //ie11
                'border-image-width',    //ie11
                'border-radius',    //-webkit- | -moz-; ie9
                'border-bottom-left-radius',    //-webkit- | -moz-; ie9
                'border-bottom-right-radius',    //-webkit- | -moz-; ie9
                'border-top-left-radius',    //-webkit- | -moz-; ie9
                'border-top-right-radius',    //-webkit- | -moz-; ie9
                'border-image',    //-webkit- | -moz- | -o-; ie11

                //outline
                'outline',  //ie8
                'outline-color',  //ie8
                'outline-style',  //ie8
                'outline-width',  //ie8
                'outline-offset',  //ie15

                //box typography
                'box-decoration-break',
                'box-shadow',

                //font style
                'color',
                'font',
                'font-family',
                'font-size',
                'font-style',
                'font-variant',
                'font-weight',
                'text-decoration',

                //font sizing
                'line-height',
                'letter-spacing',

                //font overflow
                'text-overflow',

                //font align
                'direction',
                'text-align',
                'vertical-align',
                'text-indent',
                'word-break',
                'word-spacing',
                'word-wrap',
                'white-space',  //ie8

                //font typography
                'text-transform',
                'text-shadow',  //ie10

                //list
                'list-style',
                'list-style-image',
                'list-style-position',
                'list-style-type',
                
                //column
                'column-count', //-webkit- | -moz-; ie10
                'column-fill', //-webkit- | -moz-; ie10
                'column-gap', //-webkit- | -moz-; ie10
                'column-rule', //-webkit- | -moz-; ie10
                'column-rule-color', //-webkit- | -moz-; ie10
                'column-rule-style', //-webkit- | -moz-; ie10
                'column-rule-width', //-webkit- | -moz-; ie10
                'column-width', //-webkit- | -moz-; ie10
                'columns', //-webkit- | -moz-; ie10

                //content
                'content',  //ie8
                'quotes',   //ie8
                'counter-increment',  //ie8
                'counter-reset',  //ie8

                //background
                'background',
                'background-attachment',
                'background-color',
                'background-image',
                'background-position',
                'background-repeat',
                'background-clip',  //ie9
                'background-origin',    //ie9
                'background-size',    //-webkit- | -moz- | -o-; ie9

                //cursor
                'cursor',
                'pointer-events',   //ie11
                'user-select',    //-webkit- | -moz- | -ms-; ie10

                //other
                'unicode-bidi',
                'clip', //ie8
                'opacity',  //ie9
                'object-fit',   //ie16
                'perspective',    //-webkit- | -moz-; ie10
                'perspective-origin',    //-webkit- | -moz-; ie10
                'filter',    //-webkit-; ie13

                //print
                'page-break-after',
                'page-break-before',
                'page-break-inside',

                //css3
                'animation',    //-webkit- | -moz- | -o-; ie10
                'animation-delay',    //-webkit- | -moz- | -o-; ie10
                'animation-direction',    //-webkit- | -moz- | -o-; ie10
                'animation-duration',    //-webkit- | -moz- | -o-; ie10
                'animation-fill-mode',    //-webkit- | -moz- | -o-; ie10
                'animation-iteration-count',    //-webkit- | -moz- | -o-; ie10
                'animation-name',    //-webkit- | -moz- | -o-; ie10
                'animation-play-state',    //-webkit- | -moz- | -o-; ie10
                'animation-timing-function',    //-webkit- | -moz- | -o-; ie10
                'transition',    //-webkit- | -moz- | -o-; ie10
                'transition-delay',    //-webkit- | -moz- | -o-; ie10
                'transition-duration',    //-webkit- | -moz- | -o-; ie10
                'transition-property',    //-webkit- | -moz- | -o-; ie10
                'transition-timing-function',    //-webkit- | -moz- | -o-; ie10
                'transform',    //2D:-webkit- | -moz- | -o- | -ms-; ie9 / 3D:-webkit-; ie12
                'transform-origin',    //2D:-webkit- | -moz- | -o- | -ms-; ie9 / 3D:-webkit-; ie12
                'transform-style'    //-webkit- | -moz-; ie11
            ], { 'unspecified': 'ignore' }
        ],
        'property-case': 'lower',
        'selector-combinator-space-after': 'always',
        'selector-combinator-space-before': 'always',
        'selector-list-comma-newline-after': 'always',
        'selector-list-comma-space-before': 'never',
        'selector-pseudo-element-case': 'lower',
        'selector-pseudo-class-case': 'lower',
        'selector-pseudo-element-colon-notation': 'double',
        'selector-type-case': 'lower',
        'string-no-newline': true,
        'unit-no-unknown': true,
        'unit-case': 'lower',
        'value-list-comma-newline-after': 'always-multi-line',
        'value-list-comma-space-after': 'always-single-line',
        'value-list-comma-space-before': 'never'
    }
};

module.exports = stylelintConfig;