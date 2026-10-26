import xml.etree.ElementTree as ET

# Đọc file XML
tree = ET.parse("danhsach.xml")

# Lấy phần tử gốc
root = tree.getroot()

# In danh sách sinh viên
i = 1

for student in root.findall("student"):
    name = student.find("name").text
    date = student.find("date").text
    city = student.find("city").text

    print(i, name, date, city)
    i += 1