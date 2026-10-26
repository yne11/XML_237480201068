import xml.etree.ElementTree as ET

# Đọc file XML
tree = ET.parse("bai3/Computer.xml")
root = tree.getroot()

# Tạo máy tính mới
computer = ET.Element("computer")

name = ET.SubElement(computer, "name")
name.text = "Asus 2021"

cpu = ET.SubElement(computer, "cpu")
cpu.text = "Core i5 3.0Ghz"

ram = ET.SubElement(computer, "ram")
ram.text = "16GB"

# Thêm vào cuối danh sách
root.append(computer)
# Định dạng XML cho đẹp 
# nếu đã định dạng đẹp thì 
# #phải lặp lại dòng định dạng đó thêm 1 lần nữa 
# để nó lấy giá trị
ET.indent(tree, space="    ")


# Lưu lại file XML
tree.write("bai3/Computer.xml", encoding="utf-8", xml_declaration=True)

print("Đã thêm máy tính!")