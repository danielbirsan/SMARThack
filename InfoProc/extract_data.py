from PIL import Image 
from pytesseract import pytesseract
import json
import re
import sys
  
def imagetoText(image_path):
    path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    
    # Opening the image & storing it in an image object 
    img = Image.open(image_path) 
    pytesseract.tesseract_cmd = path_to_tesseract 
    
    # Get text from image using Tesseract
    text = pytesseract.image_to_string(img) 

    text = text[:-1].split('\n')
    text = [i for i in text if i]
    res = []
    ok = 0

    # Process text to extract relevant information
    for i in text:
        if re.search("PUNCTE", i) or re.search("SUBTOTAL", i):
            break
        if ok:
            res.append(i)
        if re.search("COD.*", i):
            ok = 1
    return res

def solve(image_path="./image/example.jpg"):
    text = imagetoText(image_path)
        
    D = {}
    aux = []
    product = ""

    for i in text:
        if re.search("buc x", i):
            aux = [float(j) for j in i.split("buc x")]
        else:
            # product = "".join([j for j in i if not j.isdigit()])
            product = i
        
            if D.get(product):
                D[product] = [D[product][0] + aux[0], D[product][1]]
            else:
                D[product] = aux

    return D

if __name__ == "__main__":
    
    with open("output.json", "w") as f:
        f.write(json.dumps(solve(sys.argv[-1]), indent=1))