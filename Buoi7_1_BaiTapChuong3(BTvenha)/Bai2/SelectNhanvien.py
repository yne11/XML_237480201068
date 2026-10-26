import xml.dom.minidom

def select_nhanvien(target_id="002"):
    try:
        doc = xml.dom.minidom.parse("hoso.xml")
        nhanviens = doc.getElementsByTagName("nhanvien")
        
        found = False
        for nv in nhanviens:
            manv = nv.getElementsByTagName("manv")[0].firstChild.nodeValue.strip()
            if manv == target_id:
                hoten = nv.getElementsByTagName("hoten")[0].firstChild.nodeValue.strip()
                donvi = nv.getElementsByTagName("donvi")[0].firstChild.nodeValue.strip()
                luong = nv.getElementsByTagName("luong")[0].firstChild.nodeValue.strip()
                
                print(f"--- THÔNG TIN NHÂN VIÊN MÃ {target_id} ---")
                print(f"Họ tên : {hoten}")
                print(f"Đơn vị : {donvi}")
                print(f"Lương  : {luong}")
                found = True
                break
                
        if not found:
            print(f"Không tìm thấy nhân viên có mã {target_id}")
            
    except FileNotFoundError:
        print("Lỗi: Không tìm thấy tệp 'hoso.xml'. Vui lòng chạy CreateNhanvien.py trước!")

if __name__ == "__main__":
    select_nhanvien("002")