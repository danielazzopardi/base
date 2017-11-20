# Front-end development boilerplate

## Install

* download or `git clone` this repository to an install location
* then install the node modules:
  ``` sh
    cd install/location
    npm install
  ```

Running `npm install` from the directory containing a `package.json` file will download all dependencies defined within.

## Usage

* first build the the app:
  ``` sh
    gulp
  ```
* then serve the app:
  ``` sh
    gulp serve
  ```

## Tasks

* clean the dist folder:
  ``` sh
    gulp clean
  ```

* copy markup:
  ``` sh
    gulp markup
  ```

* copy media:
  ``` sh
    gulp media
  ```

* process and write sourcemaps for styles:
  ``` sh
    gulp styles
  ```

* process and write sourcemaps for scripts:
  ``` sh
    gulp scripts
  ```
