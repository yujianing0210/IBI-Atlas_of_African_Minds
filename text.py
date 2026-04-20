import cv2
import easyocr

reader = easyocr.Reader(['ch_sim', 'en'])

all_text = ""

for i in range(1, 6):
    img_path = f"11-0{i}.jpg"
    img = cv2.imread(img_path)
    if img is not None:
        result = reader.readtext(img)
        text = ' '.join([item[1] for item in result])
        all_text += f"--- Text from {img_path} ---\n{text}\n\n"
    else:
        all_text += f"--- {img_path} not found ---\n\n"

with open("extracted_text.txt", "w", encoding="utf-8") as f:
    f.write(all_text)

print("Text extraction completed. Check extracted_text.txt")