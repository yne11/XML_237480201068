import xml.dom.minidom

def list_tag_computer():
    try:
        doc = xml.dom.minidom.parse("Computer.xml")
        
        tags = set()
        def get_all_tags(node):
            if node.nodeType == node.ELEMENT_NODE:
                tags.add(node.tagName)
                for child in node.childNodes:
                    get_all_tags(child)
                    
        get_all_tags(doc.documentElement)
        print("Danh sách các thẻ có trong tập tin Computer.xml:")
        for tag in tags:
            print(f"- Thẻ: {tag}")
            
    except FileNotFoundError:
        print("Lỗi: Không tìm thấy tệp 'Computer.xml'. Vui lòng chạy CreateComputer.py trước!")

if __name__ == "__main__":
    list_tag_computer()