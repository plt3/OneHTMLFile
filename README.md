# OneHTMLFile

> Collection of single-HTML file web apps

## Motivation:

I've often found myself with a problem that could be solved by a small iOS app I could write, but I don't want to pay $100/year for an Apple developer account just to have my app on my iPhone. Thanks to [this Stack Overflow answer](https://stackoverflow.com/a/73903200/14146321), I found out that the Microsoft Edge iOS app supports opening local HTML files and running JavaScript from them. However, everything must be contained in a single HTML file, meaning that you cannot link to other files for CSS, JavaScript, or images. So, I began writing these webapps and wrote a script to compile separate HTML, CSS, JavaScript, and image files into one HTML file that I can then run on my phone.

## Web apps available for use:

NOTE: check per-directory README for more information and screenshots of each web app

- `WeekDate`: quiz to practice calculating the day of the week from any given date
- `Flags`: quiz to learn flags of all the countries of the world

## Usage:

### Trying out one of the apps in the results directory:

- install [Edge on iOS](https://apps.apple.com/app/id1288723196)
- on iPhone, download one of the HTML files in the `results` directory and put it somewhere in your Files app
  - you can do this by opening the page in Safari, clicking the three dots at the top right, and clicking "Download"
- once the HTML file is in the Files app, long press it and click Share, then select Edge (you may have to click "More" first if Edge is not listed as one of the options)
- then, select "Open in Microsoft Edge" and the local file will be opened

### Using this repository to compile your own web app into a single HTML file:

- make sure that your project directory follows the same structure as those in this repository
  - this means you must have an `index.html`, `styles.css`, `scripts.js` in the directory
  - images can either be put in a subdirectory or directly in the project directory, but cannot be elsewhere
- run `./makeSingleFile.sh name_of_project_directory/` to compile and minify your project in one HTML file
  - note that `makeSingleFile.sh` uses the `minify` NPM library, so you should first install it with `npm install minify`
  - this will put the resulting file in the `results` directory, with the same filename as the project directory you specified
