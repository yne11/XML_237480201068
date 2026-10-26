import xml.dom.minidom

def list_computer():
    try:
        # Mở tập tin Computer.xml
        doc = xml.dom.minidom.parse("Computer.xml")
        computers = doc.getElementsByTagName("computer")
        
        print("--- DANH SÁCH MÁY TÍNH ---")
        for i, comp in enumerate(computers, 1):
            name = comp.getElementsByTagName("name")[0].firstChild.nodeValue.strip()
            cpu = comp.getElementsByTagName("cpu")[0].firstChild.nodeValue.strip()
            ram = comp.getElementsByTagName("ram")[0].firstChild.nodeValue.strip()
            
            print(f"{i}. name: {name}")
            print(f"   cpu: {cpu}")
            print(f"   Ram: {ram}")
            
    except FileNotFoundError:
        print("Lỗi: Không tìm thấy tệp 'Computer.xml'. Vui lòng chạy CreateComputer.py trước!")

if __name__ == "__main__":
    list_computer()