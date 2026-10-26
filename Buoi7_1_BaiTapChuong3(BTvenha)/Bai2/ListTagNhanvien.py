import xml.dom.minidom

def list_tag_nhanvien():
    try:
        doc = xml.dom.minidom.parse("hoso.xml")
        print("Danh sách các thẻ trong tập tin hoso.xml:")
        
        def print_tags(node):
            if node.nodeType == node.ELEMENT_NODE:
                print(f"- Thẻ: {node.tagName}")
                for child in node.childNodes:
                    print_tags(child)
                    
        print_tags(doc.documentElement)
        
    except FileNotFoundError:
        print("Lỗi: Không tìm thấy tệp 'hoso.xml'. Vui lòng chạy CreateNhanvien.py trước!")

if __name__ == "__main__":
    list_tag_nhanvien()