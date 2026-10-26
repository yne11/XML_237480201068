import xml.etree.ElementTree as ET

# Đọc file XML
tree = ET.parse("bai2/hoso.xml")

# Lấy phần tử gốc
root = tree.getroot()

# Tìm nhân viên có mã 002
for nhanvien in root.findall("nhanvien"):
    manv = nhanvien.find("manv").text

    if manv == "002":
        hoten = nhanvien.find("hoten").text
        donvi = nhanvien.find("donvi").text
        luong = nhanvien.find("luong").text

        print("Mã nhân viên:", manv)
        print("Họ tên:", hoten)
        print("Đơn vị:", donvi)
        print("Lương:", luong)