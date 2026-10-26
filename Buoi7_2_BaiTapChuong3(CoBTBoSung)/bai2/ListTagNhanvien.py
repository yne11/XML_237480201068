# import xml.etree.ElementTree as ET

# # Đọc file XML
# tree = ET.parse("bai2/hoso.xml")

# # Lấy phần tử gốc
# root = tree.getroot()

# # In tên các thẻ
# for element in root.iter():
#     print(element.tag)

import xml.etree.ElementTree as ET

tree = ET.parse("bai2/hoso.xml")
root = tree.getroot()

for element in root.iter():
    # dòng dưới là dòng để lấy thuộc tính bên trong thẻ
    if element.text and element.text.strip():
        print(element.text.strip())