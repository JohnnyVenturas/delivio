from PIL import Image
import io
import pandas as pd
from pandas._config import display
import pdfplumber
import numpy as np
import re
def load_image_from_page(page_number, pdf_name = "./pdf_data/katalog-KUTE-POSTAL-2022-low3.pdf" ):
    import PIL
    with pdfplumber.open(pdf_name) as pdf:
        pages = pdf.pages[page_number]
        #display(pages.objects)
        #display(type(pages.objects))
        images = []
        for objects in pages.objects:
            #display(objects)
            if objects == "image":
                for image in pages.objects[objects]:
                    (x,y) , (z,w) = (image["x0"],image["bottom"]),(image["x1"],image["top"])
                    mx,my = ((x + z)/ 2, (y + w)/ 2 )
                    images.append((image, (mx,my)))

    euclid = lambda x0,y0, x1,y1 : ((x0-x1)**2 + (y0-y1)**2) ** (1/2) 
    middle = lambda x,y,z,w : ((x + z)/ 2, (y + w)/ 2 )
    cod_re = re.compile(r"\d{2,}\.+")
    #print(cod_re.match("12.523.123123"))
    
    with pdfplumber.open(pdf_name) as pdf:
        pages = pdf.pages[page_number]
        res = []
        #display(pages.extract_words())
        text = []
        for word in pages.extract_words():
            word_text = word["text"]
            #display(word)
            if cod_re.match(word_text) is None: continue

            coord = ((word["x0"] + word["x1"] )/ 2, (word["bottom"] + word["top"] )/ 2)
            text.append((word_text, coord))
            
    #print(text)
    #display(images)
    match = []
    for img in images:
        minim = float("inf")
        minim_text = None

        for val in text:
            dist = euclid(*val[1], *img[1])
            #print(val , dist, minim)
            if dist < minim and val[1][1] > img[1][1]: 
                minim = dist
                minim_text = val[0]
        match.append((img[0], minim_text))
    #display(match, len(match))

    count=0
    for entry in match: 
        image, code = entry
        #print(image)
        image["name"] = code

    appereances = []
    for entry in match:
        image, code = entry
        if image["name"] in appereances:
            appereances.append(image["name"])
            #print(appereances)
            image["name"] = image["name"] +"_" +str(appereances.count(image["name"])) 
            continue
        appereances.append(image["name"])


    for entry in match:
        image, code = entry
        with Image.open(io.BytesIO(image["stream"].get_data())) as im:
            im = im.convert("RGB")
            im.save("./good_photos/" + image["name"] +".png", dpi=(200,200),subsampling=0,compress_level=0)


for i in range(13,14):
    print(i)
    try:
        load_image_from_page(i)
    except:print("")
