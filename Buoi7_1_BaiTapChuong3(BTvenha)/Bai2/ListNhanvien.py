import xml.dom.minidom

def list_nhanvien():
    try:
        # Mở tập tin hoso.xml
        doc = xml.dom.minidom.parse("hoso.xml")
        nhanviens = doc.getElementsByTagName("nhanvien")
        
        print("--- DANH SÁCH NHÂN VIÊN ---")
        for nv in nhanviens:
            manv = nv.getElementsByTagName("manv")[0].firstChild.nodeValue
            hoten = nv.getElementsByTagName("hoten")[0].firstChild.nodeValue
            donvi = nv.getElementsByTagName("donvi")[0].firstChild.nodeValue
            luong = nv.getElementsByTagName("luong")[0].firstChild.nodeValue
            
            print(f"Mã NV: {manv} | Họ tên: {hoten} | Đơn vị: {donvi} | Lương: {luong}")
            
    except FileNotFoundError:
        print("Lỗi: Không tìm thấy tệp 'hoso.xml'. Vui lòng chạy CreateNhanvien.py trước!")

if __name__ == "__main__":
    list_nhanvien()