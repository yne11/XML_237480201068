import xml.dom.minidom

def insert_computer():
    try:
        doc = xml.dom.minidom.parse("Computer.xml")
        root = doc.documentElement
        
        # Tạo thẻ <computer> mới
        new_comp = doc.createElement("computer")
        
        name = doc.createElement("name")
        name.appendChild(doc.createTextNode("Asus 2021"))
        new_comp.appendChild(name)
        
        cpu = doc.createElement("cpu")
        cpu.appendChild(doc.createTextNode("Core i5 3.0Ghz"))
        new_comp.appendChild(cpu)
        
        ram = doc.createElement("ram")
        ram.appendChild(doc.createTextNode("16GB"))
        new_comp.appendChild(ram)
        
        # Chèn vào cuối thẻ root <computers>
        root.appendChild(new_comp)
        
        # Ghi lại tập tin Computer.xml
        xml_str = doc.toprettyxml(indent="  ", encoding="utf-8")
        # Lọc bỏ các dòng trống thừa do toprettyxml tạo ra khi định dạng lại
        lines = [line for line in xml_str.decode("utf-8").split("\n") if line.strip()]
        
        with open("Computer.xml", "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
            
        print("Đã thêm máy tính 'Asus 2021' vào cuối tập tin Computer.xml!")
        
    except FileNotFoundError:
        print("Lỗi: Không tìm thấy tệp 'Computer.xml'. Vui lòng chạy CreateComputer.py trước!")

if __name__ == "__main__":
    insert_computer()