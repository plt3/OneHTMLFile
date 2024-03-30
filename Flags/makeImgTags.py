import os

import pycountry

# Ones to do manually:
#
# gb-sct.png
# gb-nir.png
# gb-eng.png
# xk.png
# gb-wls.png


tagList = []

for file in os.listdir("w640"):
    if file.endswith(".png"):
        try:
            countryName = pycountry.countries.get(
                alpha_2=os.path.splitext(file)[0]
            ).name
            tagList.append(f'<img id="{countryName}" src="w640/{file}" />')
        except AttributeError:
            print(file)

with open("htmlFlags.html", "w") as f:
    f.write("\n".join(tagList))
