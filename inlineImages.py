import base64
import fileinput
import os
import re

# Replace all image tags in file passed via stdin with their base64 encoded version
# in order to have everything in one html file
# (inspired by https://www.thesitewizard.com/html-tutorial/embed-images-with-data-urls.shtml)

outputFileLines = []

directoryPrefix = os.environ.get("MAKESINGLEFILE_DIR")
# written first try!!!
imgRegex = re.compile(r'<img src="([^"]+)"')

for line in fileinput.input():
    reSearch = imgRegex.search(line)
    if reSearch is not None:
        filePath = reSearch.group(1)
        encodedImg = base64.b64encode(
            open(os.path.join(directoryPrefix, filePath), "rb").read()
        ).decode()
        outputFileLines.append(
            line.replace(filePath, "data:image/png;base64," + encodedImg)
        )
    else:
        outputFileLines.append(line)

print("".join(outputFileLines))
