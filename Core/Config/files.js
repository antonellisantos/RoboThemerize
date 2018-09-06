'use strict';

module.exports = {
  scripts: {
    top: {
      use: [], // empty to all
      dont: [
        '**/!(_*.js)' // concat files
      ],
    },
    bottom: {
      use: [], // empty to all
      dont: [
        '**/!(_*.js)' // concat files
      ],
    },
    prefixes: {
      top: 't',
      bottom: 'b',
      separator: '.',
    },
    build: '**/*.js',
  },
  
  styles: {
    use: [
      '**/*.scss',
    ],
    dont: [
      '!**/style.scss', // style.scss willn't be processed
      '!**/_*.scss', // files like _*.scss willn't be processed
    ],
    build: '**/*.css',
  },

  images: [
    '**/*.{jpg,jpeg,png,gif,svg,svgo}',
  ],

  fonts: [
    '**/*.{ttf,woff,woff2,eot,otf,svg}',
  ],

  plugins: [
    '**/*.php',
  ],
  
  theme: [
    '**/*.php',
  ],

  versionize: [ // only the extensions
    '.php',
    '.js',
    '.css',
    '.html',
  ],
};