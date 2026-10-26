import xml.dom.minidom

def create_computer_xml():
    # Khởi tạo tài liệu XML
    doc = xml.dom.minidom.Document()
    
    # Tạo thẻ gốc <computers>
    computers = doc.createElement("computers")
    doc.appendChild(computers)
    
    # Dữ liệu mẫu ban đầu theo yêu cầu
    data = [
        ("Dell Inpiron 2020", "Core i5 2.6Ghz", "8GB"),
        ("Lenovo ThinPack 2022", "Core i7 3.6Ghz", "16GB")
    ]
    
    # Tạo các thẻ con <computer>
    for name_val, cpu_val, ram_val in data:
        comp = doc.createElement("computer")
        
        name = doc.createElement("name")
        name.appendChild(doc.createTextNode(name_val))
        comp.appendChild(name)
        
        cpu = doc.createElement("cpu")
        cpu.appendChild(doc.createTextNode(cpu_val))
        comp.appendChild(cpu)
        
        ram = doc.createElement("ram")
        ram.appendChild(doc.createTextNode(ram_val))
        comp.appendChild(ram)
        
        computers.appendChild(comp)
        
    # Ghi nội dung ra file Computer.xml
    xml_str = doc.toprettyxml(indent="  ", encoding="utf-8")
    with open("Computer.xml", "wb") as f:
        f.write(xml_str)
    print("Đã tạo tập tin Computer.xml thành công!")

if __name__ == "__main__":
    create_computer_xml()