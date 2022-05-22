import React from "react";
import './footer.css'

export default function Footer(props) {
    return (
        <div className="footer">
            <div className="khungtrai_footer">
                <div>
                    Văn phòng Ban Chỉ đạo Tổng điều tra dân số và nhà ở trung ương
                </div>
                <div>Địa chỉ: 54 Nguyễn Chí Thanh – Đống Đa – Hà Nội</div>
                <div>Email: TKDSLD@gso.gov.vn.</div>
            </div>
            <div className="khungphai_footer">
                <div>Nhóm phát triển: Huy Huynh Long</div>
                <div>ĐH Công Nghệ - Đại Học Quốc Gia Hà Nội</div>
            </div>
        </div>
    )
}