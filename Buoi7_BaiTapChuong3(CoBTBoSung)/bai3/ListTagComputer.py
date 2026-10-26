import xml.etree.ElementTree as ET

# Đọc file XML
tree = ET.parse("bai3/Computer.xml")

# Lấy phần tử gốc
root = tree.getroot()

# In tên các thẻ
for element in root.iter():
    if element.text and element.text.strip():
            print(element.text.strip())