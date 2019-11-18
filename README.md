# Gulp4 boileplate
Front-end development boilerplate using Gulp 4

## How to use
Clone the repo and run
```
$ git clone https://github.com/yutaroishiwata/gulp4-boilerplate
$ npm install
$ gulp watch
```

## File Structure
```
dist
├── base
│   └── _config.html
├── css
│   └── style.css
├── img
├── index.html
└── js
    ├── lib.min.js
    └── maps
        └── lib.min.js.map
_src
├── img
├── js
│   ├── core
│   │   └── jquery-3.3.1.js
│   └── module
│       └── function_scroll.js
├── pug
│   ├── base
│   │   └── _config.pug
│   ├── index.pug
│   └── module
│       ├── common
│       │   ├── _footer.pug
│       │   ├── _head.pug
│       │   └── _header.pug
│       ├── page
│       │   └── _top.pug
│       └── parts
└── sass
    ├── foundation
    │   ├── _config.scss
    │   ├── _mixin.scss
    │   └── _reset.scss
    ├── layout
    │   ├── _common.scss
    │   ├── _footer.scss
    │   ├── _header.scss
    │   └── _sidebar.scss
    ├── object
    │   ├── component
    │   │   ├── _breadcrumb.scss
    │   │   ├── _button.scss
    │   │   ├── _form.scss
    │   │   └── _nav.scss
    │   └── utility
    │       ├── _clearfix.scss
    │       └── _utility.scss
    └── style.scss
```

## List of using Gulp plugin

|Plugin name        | Description                         
|:------------------|:----------------------------------
| [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) | Prevent pipe breaking caused by errors from gulp plugins |
| [gulp-pug](https://www.npmjs.com/package/gulp-pug)        | Gulp plugin for compiling Pug templates              |
| [gulp-sass](https://www.npmjs.com/package/gulp-sass)       | compile your Sass files      |
| [autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) | Prefix CSS with Autoprefixer              |
| [csscomb](https://www.npmjs.com/package/csscomb)           | coding style formatter for CSS              |
| [gulp-order](https://www.npmjs.com/package/gulp-order)     | reorder a stream of files                            |
| [gulp-babel](https://www.npmjs.com/package/gulp-babel)     | JS transpiler                            |
| [gulp-concat](https://www.npmjs.com/package/gulp-concat)   | combine multiple files into one                      |
| [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)    | JS Minifier                       |
| [gulp-rename](https://www.npmjs.com/package/gulp-rename)    | simple file renaming                    |
| [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)     | Minify PNG, JPEG, GIF and SVG images      |
| imagemin-mozjpeg  |                                           |
| imagemin-pngquant |                                           |
| HTML Lint         |                                           |
| gulp-htmlint      |                            |
| SASS Lint         |                                           |
| gulp-scsslint     |                                           |
| JS Lint           |                                           |
| ES lint           |                                           |
| browser-sync      |                                           |

## CSS Naming conventions and Architecture
BEM & Atomic design.  
[BEM](http://getbem.com/naming/) (Block Element Modifier)  
The standard syntax for BEM:
```
block-name__element-name--modifier-name
```
[Atomic design](https://bradfrost.com/blog/post/atomic-web-design/) (Atoms, Molecules, Organisms, templates, Pages)

