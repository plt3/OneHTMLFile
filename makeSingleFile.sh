#!/usr/bin/env bash

# Convert multi-file project into a single file to be opened as local file in iOS.
# Specify name of project directory as command-line argument
# (i.e. ./makeSingleFile.sh ProjectDir/)
#
# NOTE: assumes that project directory contains index.html, styles.css, and scripts.js

# Specify path to Prettier to format resulting file
PRETTIER_PATH="$HOME/.local/share/nvim/mason/bin/prettier"
# Name of directory to put resulting file in
OUTPUT_DIR="results"

inputDir="${1%/}"
outputFile="$OUTPUT_DIR/$inputDir.html"

mkdir -p $OUTPUT_DIR

sed 's/<link href="style.css" rel="stylesheet" \/>/<style>\n<\/style>/' "$inputDir/index.html" |
	sed "/<style>/r $inputDir/styles.css" |
	sed 's/<script src="scripts.js"><\/script>/<script>\n<\/script>/' |
	sed "/<script>/r $inputDir/scripts.js" >"$outputFile"

"$PRETTIER_PATH" --write "$outputFile"
