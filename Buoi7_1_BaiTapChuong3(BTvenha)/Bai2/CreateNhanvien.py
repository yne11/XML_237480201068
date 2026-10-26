import xml.dom.minidom

def create_nhanvien_xml():
    # Khởi tạo tài liệu XML
    doc = xml.dom.minidom.Document()
    
    # Tạo thẻ gốc <danhsach>
    danhsach = doc.createElement("danhsach")
    doc.appendChild(danhsach)
    
    # Dữ liệu nhân viên mẫu
    data = [
        ("001", "Nguyễn Thế Anh", "Hành chính", "5.000.000"),
        ("002", "Nguyễn Thanh Bình", "Kỹ thuật", "7.000.000"),
        ("003", "Vương Thúy Phượng", "Tổ chức", "8.000.000")
    ]
    
    # Tạo các thẻ con <nhanvien>
    for manv_val, hoten_val, donvi_val, luong_val in data:
        nhanvien = doc.createElement("nhanvien")
        
        manv = doc.createElement("manv")
        manv.appendChild(doc.createTextNode(manv_val))
        nhanvien.appendChild(manv)
        
        hoten = doc.createElement("hoten")
        hoten.appendChild(doc.createTextNode(hoten_val))
        nhanvien.appendChild(hoten)
        
        donvi = doc.createElement("donvi")
        donvi.appendChild(doc.createTextNode(donvi_val))
        nhanvien.appendChild(donvi)
        
        luong = doc.createElement("luong")
        luong.appendChild(doc.createTextNode(luong_val))
        nhanvien.appendChild(luong)
        
        danhsach.appendChild(nhanvien)
        
    # Ghi nội dung ra file hoso.xml
    xml_str = doc.toprettyxml(indent="  ", encoding="utf-8")
    with open("hoso.xml", "wb") as f:
        f.write(xml_str)
    print("Đã tạo tập tin hoso.xml thành công!")

if __name__ == "__main__":
    create_nhanvien_xml()