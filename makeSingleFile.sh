#!/usr/bin/env bash

# Convert multi-file project into a single file to be opened as local file in iOS.
#
# Requires minify to be installed via npm (npm install minify)
#
# Specify name of project directory as command-line argument
# (i.e. ./makeSingleFile.sh ProjectDir/)
#
# NOTE: assumes that project directory contains index.html, styles.css, and scripts.js

# Name of directory to put resulting file in
OUTPUT_DIR="results"

inputDir="${1%/}"
outputFile="$OUTPUT_DIR/$inputDir.html"

export MAKESINGLEFILE_DIR="$inputDir"

mkdir -p $OUTPUT_DIR

sed 's/<link href="styles.css" rel="stylesheet" \/>/<style>\n<\/style>/' "$inputDir/index.html" |
	sed "/<style>/r $inputDir/styles.css" |
	sed 's/<script src="scripts.js"><\/script>/<script>\n<\/script>/' |
	sed "/<script>/r $inputDir/scripts.js" |
	python3 inlineImages.py |
	npx minify --html >"$outputFile"

unset MAKESINGLEFILE_DIR
