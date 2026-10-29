/**
 * Quản lý danh bạ XML - xuly.js
 * Sử dụng XML DOM để đọc, thêm, sửa, xóa, tìm kiếm, lọc, nhập/xuất dữ liệu
 */

// ===================== BIẾN TOÀN CỤC =====================
let xmlDoc = null;          // Document XML hiện tại
let contacts = [];          // Mảng đối tượng liên hệ đã parse
let editingId = null;       // ID đang chỉnh sửa (null = chế độ thêm mới)
let nextIdNum = 1;          // Số thứ tự để sinh mã liên hệ mới

// ===================== KHỞI TẠO =====================
document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    loadDefaultXML();
});

// ===================== GẮN SỰ KIỆN =====================
function bindEvents() {
    // Form
    document.getElementById("contactForm").addEventListener("submit", handleSubmit);
    document.getElementById("btnCancelEdit").addEventListener("click", cancelEdit);

    // Nút thống kê / XML
    document.getElementById("btnLoadXML").addEventListener("click", loadDefaultXML);
    document.getElementById("btnExportXML").addEventListener("click", exportXML);
    document.getElementById("btnImportXML").addEventListener("click", () => {
        document.getElementById("fileImportXML").click();
    });
    document.getElementById("fileImportXML").addEventListener("change", handleImportXML);

    // Tìm kiếm / lọc / sắp xếp
    document.getElementById("searchInput").addEventListener("input", renderTable);
    document.getElementById("filterGroup").addEventListener("change", renderTable);
    document.getElementById("sortBy").addEventListener("change", renderTable);
}

// ===================== LOAD XML MẶC ĐỊNH =====================
function loadDefaultXML() {
    setStatus("Đang tải file danhba.xml...", "info");

    fetch("danhba.xml")
        .then((res) => {
            if (!res.ok) throw new Error("Không tìm thấy file danhba.xml");
            return res.text();
        })
        .then((text) => {
            parseXMLString(text);
            setStatus("Đã tải thành công file danhba.xml", "success");
        })
        .catch((err) => {
            // Không tải được file → tạo danh bạ trống để kiểm tra Nhập/Xuất XML
            console.warn(err);
            createEmptyXML();
            setStatus(
                "Không tải được danhba.xml (có thể do chạy trực tiếp file). Đã tạo danh bạ trống. Hãy dùng nút Nhập file XML.",
                "error"
            );
        });
}

// ===================== PARSE XML =====================
function parseXMLString(xmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, "application/xml");

    // Kiểm tra lỗi parse
    const parseError = doc.querySelector("parsererror");
    if (parseError) {
        throw new Error("File XML không hợp lệ");
    }

    xmlDoc = doc;
    contacts = [];

    const nodes = xmlDoc.getElementsByTagName("lienhe");
    let maxNum = 0;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const id = node.getAttribute("id") || `LH${String(i + 1).padStart(3, "0")}`;
        const contact = {
            id: id,
            name: getText(node, "hoten"),
            phone: getText(node, "sdt"),
            email: getText(node, "email"),
            group: getText(node, "nhom")
        };
        contacts.push(contact);

        // Tính nextIdNum
        const numMatch = id.match(/(\d+)$/);
        if (numMatch) {
            const n = parseInt(numMatch[1], 10);
            if (n > maxNum) maxNum = n;
        }
    }

    nextIdNum = maxNum + 1;
    renderAll();
}

function getText(parent, tagName) {
    const el = parent.getElementsByTagName(tagName)[0];
    return el ? (el.textContent || "").trim() : "";
}

// ===================== TẠO XML RỖNG =====================
function createEmptyXML() {
    const parser = new DOMParser();
    xmlDoc = parser.parseFromString('<?xml version="1.0" encoding="UTF-8"?><danhba></danhba>', "application/xml");
    contacts = [];
    nextIdNum = 1;
    renderAll();
}

// ===================== RENDER =====================
function renderAll() {
    updateStats();
    renderTable();
    clearDetails();
}

function updateStats() {
    const total = contacts.length;
    const work = contacts.filter((c) => c.group === "Công việc").length;
    const family = contacts.filter((c) => c.group === "Gia đình").length;
    const friend = contacts.filter((c) => c.group === "Bạn bè").length;
    const other = contacts.filter((c) => c.group === "Khác").length;

    document.getElementById("totalCount").textContent = total;
    document.getElementById("workCount").textContent = work;
    document.getElementById("familyCount").textContent = family;
    document.getElementById("friendCount").textContent = friend;
    document.getElementById("otherCount").textContent = other;
}

function getFilteredSortedContacts() {
    const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
    const groupFilter = document.getElementById("filterGroup").value;
    const sortBy = document.getElementById("sortBy").value;

    let list = contacts.slice();

    // Lọc theo nhóm
    if (groupFilter) {
        list = list.filter((c) => c.group === groupFilter);
    }

    // Tìm kiếm
    if (keyword) {
        list = list.filter(
            (c) =>
                c.name.toLowerCase().includes(keyword) ||
                c.phone.toLowerCase().includes(keyword) ||
                c.email.toLowerCase().includes(keyword)
        );
    }

    // Sắp xếp
    list.sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name, "vi");
        }
        if (sortBy === "name-desc") {
            return b.name.localeCompare(a.name, "vi");
        }
        if (sortBy === "group") {
            const g = a.group.localeCompare(b.group, "vi");
            return g !== 0 ? g : a.name.localeCompare(b.name, "vi");
        }
        return 0;
    });

    return list;
}

function renderTable() {
    const tbody = document.getElementById("contactTableBody");
    const list = getFilteredSortedContacts();

    if (list.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="center">Không có liên hệ nào phù hợp</td>
            </tr>`;
    } else {
        tbody.innerHTML = list
            .map((c, index) => {
                return `
                <tr>
                    <td class="center">${index + 1}</td>
                    <td>${escapeHtml(c.id)}</td>
                    <td>${escapeHtml(c.name)}</td>
                    <td>${escapeHtml(c.phone)}</td>
                    <td>${escapeHtml(c.email)}</td>
                    <td>${escapeHtml(c.group)}</td>
                    <td>
                        <div class="row-actions">
                            <button type="button" class="light" onclick="showDetail('${escapeAttr(c.id)}')">Chi tiết</button>
                            <button type="button" onclick="startEdit('${escapeAttr(c.id)}')">Sửa</button>
                            <button type="button" class="danger" onclick="deleteContact('${escapeAttr(c.id)}')">Xóa</button>
                        </div>
                    </td>
                </tr>`;
            })
            .join("");
    }

    document.getElementById("contactCount").textContent =
        `Hiển thị ${list.length} / ${contacts.length} liên hệ`;
}

// ===================== CHI TIẾT =====================
function showDetail(id) {
    const c = contacts.find((x) => x.id === id);
    if (!c) return;

    document.getElementById("detailId").textContent = c.id;
    document.getElementById("detailName").textContent = c.name;
    document.getElementById("detailPhone").textContent = c.phone;
    document.getElementById("detailEmail").textContent = c.email;
    document.getElementById("detailGroup").textContent = c.group;
}

function clearDetails() {
    document.getElementById("detailId").textContent = "Chưa chọn liên hệ";
    document.getElementById("detailName").textContent = "--";
    document.getElementById("detailPhone").textContent = "--";
    document.getElementById("detailEmail").textContent = "--";
    document.getElementById("detailGroup").textContent = "--";
}

// ===================== THÊM / SỬA =====================
function handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const group = document.getElementById("group").value;

    if (!name || !phone || !email || !group) {
        setStatus("Vui lòng điền đầy đủ thông tin bắt buộc.", "error");
        return;
    }

    // Kiểm tra trùng số điện thoại (trừ chính bản ghi đang sửa)
    const phoneExists = contacts.some(
        (c) => c.phone === phone && c.id !== editingId
    );
    if (phoneExists) {
        setStatus("Số điện thoại này đã tồn tại trong danh bạ.", "error");
        return;
    }

    if (editingId) {
        // Cập nhật
        const idx = contacts.findIndex((c) => c.id === editingId);
        if (idx === -1) {
            setStatus("Không tìm thấy liên hệ cần sửa.", "error");
            return;
        }

        contacts[idx] = {
            id: editingId,
            name,
            phone,
            email,
            group
        };

        // Cập nhật node trong XML DOM
        updateXMLNode(editingId, name, phone, email, group);

        setStatus(`Đã cập nhật liên hệ "${name}".`, "success");
        cancelEdit();
    } else {
        // Thêm mới
        const newId = "LH" + String(nextIdNum).padStart(3, "0");
        nextIdNum++;

        const newContact = { id: newId, name, phone, email, group };
        contacts.push(newContact);

        // Thêm node vào XML DOM
        addXMLNode(newId, name, phone, email, group);

        setStatus(`Đã thêm liên hệ mới "${name}" (mã: ${newId}).`, "success");
        document.getElementById("contactForm").reset();
    }

    renderAll();
}

function startEdit(id) {
    const c = contacts.find((x) => x.id === id);
    if (!c) return;

    editingId = id;

    document.getElementById("name").value = c.name;
    document.getElementById("phone").value = c.phone;
    document.getElementById("email").value = c.email;
    document.getElementById("group").value = c.group;

    document.getElementById("formTitle").textContent = "Sửa liên hệ";
    document.getElementById("btnSave").textContent = "Cập nhật";
    document.getElementById("btnCancelEdit").hidden = false;

    // Cuộn lên form
    document.getElementById("contactForm").scrollIntoView({ behavior: "smooth", block: "center" });
    setStatus(`Đang chỉnh sửa liên hệ: ${c.name}`, "info");
}

function cancelEdit() {
    editingId = null;
    document.getElementById("contactForm").reset();
    document.getElementById("formTitle").textContent = "Thêm liên hệ mới";
    document.getElementById("btnSave").textContent = "Thêm liên hệ";
    document.getElementById("btnCancelEdit").hidden = true;
    setStatus("Đã hủy chế độ sửa.", "info");
}

// ===================== XÓA =====================
function deleteContact(id) {
    const c = contacts.find((x) => x.id === id);
    if (!c) return;

    if (!confirm(`Bạn có chắc muốn xóa liên hệ "${c.name}" (${c.id})?`)) {
        return;
    }

    contacts = contacts.filter((x) => x.id !== id);
    removeXMLNode(id);

    if (editingId === id) {
        cancelEdit();
    }

    setStatus(`Đã xóa liên hệ "${c.name}".`, "success");
    renderAll();
}

// ===================== THAO TÁC XML DOM =====================
function addXMLNode(id, name, phone, email, group) {
    if (!xmlDoc) return;

    const root = xmlDoc.documentElement; // <danhba>
    const lienhe = xmlDoc.createElement("lienhe");
    lienhe.setAttribute("id", id);

    appendChildText(lienhe, "hoten", name);
    appendChildText(lienhe, "sdt", phone);
    appendChildText(lienhe, "email", email);
    appendChildText(lienhe, "nhom", group);

    root.appendChild(lienhe);
}

function updateXMLNode(id, name, phone, email, group) {
    if (!xmlDoc) return;

    const nodes = xmlDoc.getElementsByTagName("lienhe");
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].getAttribute("id") === id) {
            setChildText(nodes[i], "hoten", name);
            setChildText(nodes[i], "sdt", phone);
            setChildText(nodes[i], "email", email);
            setChildText(nodes[i], "nhom", group);
            break;
        }
    }
}

function removeXMLNode(id) {
    if (!xmlDoc) return;

    const nodes = xmlDoc.getElementsByTagName("lienhe");
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].getAttribute("id") === id) {
            nodes[i].parentNode.removeChild(nodes[i]);
            break;
        }
    }
}

function appendChildText(parent, tagName, text) {
    const el = xmlDoc.createElement(tagName);
    el.appendChild(xmlDoc.createTextNode(text));
    parent.appendChild(el);
}

function setChildText(parent, tagName, text) {
    let el = parent.getElementsByTagName(tagName)[0];
    if (!el) {
        el = xmlDoc.createElement(tagName);
        parent.appendChild(el);
    }
    el.textContent = text;
}

// ===================== XUẤT XML =====================
function exportXML() {
    if (!xmlDoc) {
        setStatus("Chưa có dữ liệu để xuất.", "error");
        return;
    }

    // Đồng bộ lại XML từ mảng contacts để đảm bảo chính xác
    rebuildXMLFromContacts();

    const serializer = new XMLSerializer();
    let xmlString = serializer.serializeToString(xmlDoc);

    // Thêm declaration nếu thiếu
    if (!xmlString.startsWith("<?xml")) {
        xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlString;
    }

    // Format đẹp hơn một chút
    xmlString = formatXML(xmlString);

    const blob = new Blob([xmlString], { type: "application/xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "danhba.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setStatus("Đã xuất file danhba.xml thành công.", "success");
}

function rebuildXMLFromContacts() {
    const parser = new DOMParser();
    xmlDoc = parser.parseFromString(
        '<?xml version="1.0" encoding="UTF-8"?><danhba></danhba>',
        "application/xml"
    );

    contacts.forEach((c) => {
        addXMLNode(c.id, c.name, c.phone, c.email, c.group);
    });
}

function formatXML(xml) {
    // Đơn giản: thêm xuống dòng sau các thẻ đóng/mở chính
    return xml
        .replace(/(>)(<)(\/*)/g, "$1\n$2$3")
        .replace(/(<\/lienhe>)/g, "$1\n")
        .replace(/(<lienhe[^>]*>)/g, "\n  $1")
        .replace(/(<\/?(hoten|sdt|email|nhom)>)/g, "\n    $1")
        .replace(/\n\s*\n/g, "\n")
        .trim();
}

// ===================== NHẬP XML =====================
function handleImportXML(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        try {
            parseXMLString(event.target.result);
            setStatus(`Đã nhập thành công file "${file.name}" (${contacts.length} liên hệ).`, "success");
            cancelEdit();
        } catch (err) {
            setStatus("Lỗi khi đọc file XML: " + err.message, "error");
        }
    };
    reader.onerror = function () {
        setStatus("Không thể đọc file.", "error");
    };
    reader.readAsText(file, "UTF-8");

    // Reset input để có thể chọn lại cùng file
    e.target.value = "";
}

// ===================== TIỆN ÍCH =====================
function setStatus(msg, type) {
    const el = document.getElementById("statusMessage");
    el.textContent = msg;
    el.className = "status " + (type || "info");
}

function escapeHtml(str) {
    if (str == null) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
}

// Expose các hàm gọi từ onclick trong HTML
window.showDetail = showDetail;
window.startEdit = startEdit;
window.deleteContact = deleteContact;
