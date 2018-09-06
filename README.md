# RoboThemerize

Develop WordPress themes in an automated way, using great front-end features.

## Getting Started

Fork this repository.

Change the package.json information to your theme data.
> The name of your theme folder will be the name and the verison defined in package.json.

```
"name": "RoboThemerize",
"version": "1.0.0",

...

wordpress-themes-directory/NAME_version/
```

Download the latest version of WordPress [here](http://wordpress.org/latest.zip) and unzip to root of this repository, then rename the 'wordpress' folder to 'Build'.

```
Build/
Build/index.php
Build/wp-admin/
Build/wp-admin/index.php
Build/wp-content/
Build/wp-content/index.php
Build/wp-content/
Build/wp-includes/index.php

...
```

Change files of 'Config/files.js' to your own preferences.
Change paths of 'Config/paths.js' to your own preferences.

Finally...

Development state with browser refresh.

```
> npm run dev
```

Or production state with versioning files.

```
> npm run build
```

## Built With

* [Gulp@4.0.0](https://github.com/gulpjs/gulp/tree/4.0/docs/) - A toolkit that helps you automate painful or time-consuming tasks 
* [BrowserSync](https://browsersync.io/) - Used to synchronise browser tests.
* [Ramda](https://ramdajs.com/docs/) - A practical functional library
* [PostCSS](https://github.com/postcss/postcss/) - Used to transforme styles with JS plugins
* [SASS](https://sass-lang.com/documentation/) - An extension of CSS, adding nested rules, variables, mixins, selector inheritance, and more

## Authors

* **Antonelli Santos** - *Initial work* - [AntonelliSantos](https://github.com/antonellisantos)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
