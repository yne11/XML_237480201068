import xml.dom.minidom

def main():
    try:
        # Phân tích tập tin XML
        doc = xml.dom.minidom.parse("danhsach.xml")
        students = doc.getElementsByTagName("student")
        
        # Duyệt qua từng thẻ student và in ra thông tin
        for i, student in enumerate(students, 1):
            name = student.getElementsByTagName("name")[0].firstChild.nodeValue.strip()
            date = student.getElementsByTagName("date")[0].firstChild.nodeValue.strip()
            city = student.getElementsByTagName("city")[0].firstChild.nodeValue.strip()
            
            print(f"{i}. {name:<15} {date:<12} {city}")
            
    except FileNotFoundError:
        print("Lỗi: Không tìm thấy tệp 'danhsach.xml'. Hãy kiểm tra lại thư mục lưu tệp!")

if __name__ == "__main__":
    main()