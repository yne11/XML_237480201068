import xml.etree.ElementTree as ET

# Đọc file XML
tree = ET.parse("bai2/hoso.xml")

# Lấy phần tử gốc
root = tree.getroot()

# Duyệt danh sách nhân viên
for nhanvien in root.findall("nhanvien"):
    manv = nhanvien.find("manv").text
    hoten = nhanvien.find("hoten").text
    donvi = nhanvien.find("donvi").text
    luong = nhanvien.find("luong").text

    print(manv, hoten, donvi, luong)