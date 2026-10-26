import xml.etree.ElementTree as ET

# Tạo phần tử gốc
root = ET.Element("computers")

# Máy tính 1
computer1 = ET.SubElement(root, "computer")

name1 = ET.SubElement(computer1, "name")
name1.text = "Dell Inspiron 2020"

cpu1 = ET.SubElement(computer1, "cpu")
cpu1.text = "Core i5 2.6Ghz"

ram1 = ET.SubElement(computer1, "ram")
ram1.text = "8GB"

# Máy tính 2
computer2 = ET.SubElement(root, "computer")

name2 = ET.SubElement(computer2, "name")
name2.text = "Lenovo ThinkPack 2022"

cpu2 = ET.SubElement(computer2, "cpu")
cpu2.text = "Core i7 3.6Ghz"

ram2 = ET.SubElement(computer2, "ram")
ram2.text = "16GB"

# Tạo file XML
tree = ET.ElementTree(root)

# Định dạng XML cho đẹp
ET.indent(tree, space="    ")

tree.write("Computer.xml", encoding="utf-8", xml_declaration=True)

print("Tạo file Computer.xml thành công!")