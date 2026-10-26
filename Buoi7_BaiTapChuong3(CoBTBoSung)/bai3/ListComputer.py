import xml.etree.ElementTree as ET

# Đọc file XML
tree = ET.parse("bai3/Computer.xml")

# Lấy phần tử gốc
root = tree.getroot()

# Duyệt từng máy tính
i = 1

for computer in root.findall("computer"):
    name = computer.find("name").text
    cpu = computer.find("cpu").text
    ram = computer.find("ram").text

    print(i, ".")
    print("name:", name)
    print("cpu:", cpu)
    print("Ram:", ram)
    print()

    i += 1