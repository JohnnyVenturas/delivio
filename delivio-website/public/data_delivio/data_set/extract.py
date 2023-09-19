from PIL import Image
import io
import pandas as pd
from pandas._config import display
import pdfplumber
import numpy as np
import re

def image_saver(pdf_name ="./pdf_data/katalog-KUTE-POSTAL-2022-low3.pdf",page_number=0):
     #counter = 0
     #with pdfplumber.open(pdf_name, dpi=300) as pdf:
         #page =pdf.pages[page_number] 
         #for image in page.images:
             #image_data = image["stream"].get_data()
             #open_image = Image.open(io.BytesIO(image_data))
             #open_image.save(str(counter) + ".png")
             #open_image.close()
             #counter +=1

    from PyPDF2 import PdfReader

    reader = PdfReader("./pdf_data/katalog-KUTE-POSTAL-2022-low3.pdf")

    page = reader.pages[page_number]
    count = 0

    for image_file_object in page.images:
        with open(str(count) + image_file_object.name, "wb") as fp:
            fp.write(image_file_object.data)
            count += 1           

            

def print_image(pdf_name ="./pdf_data/katalog-KUTE-POSTAL-2022-low3.pdf", page_number=0 ): 
    with pdfplumber.open(pdf_name) as pdf:
        page = pdf.pages[page_number]
        text = page.extract_text().split("\n")
        
        
        split_res = []        
        current_block = []


        for line in text:
            current_block.append(line + '\n')
            if "N" in line:
                split_res.append("\n".join(current_block))
                current_block = []


        with open("entry.out", "w+") as out:
            for line in split_res : 
                out.writelines(line)
                out.write("\n")
        return "   ".join(split_res)

def table_saver(pdf_name ="./pdf_data/katalog-KUTE-POSTAL-2022-low3.pdf", page_number=0) : 
    with pdfplumber.open(pdf_name) as pdf:
        page = pdf.pages[page_number]

        settings =   {
            "vertical_strategy": "text", 
            "horizontal_strategy": "lines",
            "explicit_vertical_lines": [],
            "explicit_horizontal_lines": [],
            "snap_tolerance": 3,
            "snap_x_tolerance": 3,
            "snap_y_tolerance": 3,
            "join_tolerance": 3,
            "join_x_tolerance": 3,
            "join_y_tolerance": 3,
            "edge_min_length": 3,
            "min_words_vertical": 3,
            "min_words_horizontal": 1,
            "text_tolerance": 3,
            "text_y_tolerance": 3,
            "text_x_tolerance": 3,
            "intersection_tolerance": 3,
            "intersection_x_tolerance": 3,
            "intersection_y_tolerance": 3,
		}

        table = page.extract_table(settings)
        res = []

        split_res = []        
        current_block = []


        if table is None: return

        for line in table:
            current_block.append(line)
            if "N°" in line:
                split_res.append(current_block)
                current_block = []
      
        split_res = list(map(lambda x : list(reversed(x)), split_res))
        return split_res


def total(pdf_name ="./pdf_data/katalog-KUTE-POSTAL-2022-low3.pdf", page_number=0):
    sz = 0
    res = []
    with pdfplumber.open(pdf_name) as pdf:
        sz = 140
        for page in range(sz):
            print(page)
            printed_page = print_image(page_number = page)
            if printed_page is None:continue 

            res.append(printed_page)

    with open("out.txt", "w") as out:
        out.writelines(res)



def store_all_pages(pdf_name ="./pdf_data/katalog-KUTE-POSTAL-2022-low3.pdf", page_number=0):

    res : list = []
    for i in range(0, 130):
        table = table_saver(page_number = i)
        print(i)
        if table is not None:
            res = res + table 
    return res

image_saver(page_number=13)


def create_csv(filename= "out.txt"):
    
    with open(filename, "r+") as infile:
        res = infile.readlines()
    print(res)



