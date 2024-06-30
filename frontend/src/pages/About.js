import React from 'react';
import './style/About.css';

function About() {
  return (
    <div className="container">
 <h2>About Us</h2>
      <section className="about_item">
       
            <h2 className="content_header">Giới thiệu</h2>
            <p>Thông tin Thể thao là trang web hàng đầu cung cấp thông tin chi tiết về các môn thể thao phổ biến trên toàn thế giới. Chúng tôi cam kết mang đến cho người dùng những thông tin chính xác, cập nhật và đầy đủ về các môn thể thao mà bạn quan tâm.</p>
        </section>
        <section className="about_item">
            <h2 className="content_header">Sứ mệnh</h2>
            <p>Sứ mệnh của chúng tôi là tạo ra một nền tảng trực tuyến nơi người yêu thể thao có thể tìm thấy tất cả thông tin họ cần về các môn thể thao, từ lịch sử, luật lệ, chiến thuật đến các sự kiện và thành tích nổi bật.</p>
        </section>
        <section className="about_item">
            <h2 className="content_header">Lịch sử</h2>
            <p>Thông tin Thể thao được thành lập vào năm 2024 bởi một nhóm những người đam mê thể thao với mục tiêu mang lại kiến thức thể thao phong phú cho cộng đồng. Từ đó, chúng tôi đã phát triển và trở thành nguồn thông tin đáng tin cậy cho hàng triệu người trên toàn thế giới.</p>
        </section>
        <section className="about_item">
            <h2 className="content_header">Đội ngũ của chúng tôi</h2>
            <p>Đội ngũ của chúng tôi bao gồm các chuyên gia trong nhiều lĩnh vực thể thao khác nhau. Tất cả đều có kinh nghiệm sâu rộng và niềm đam mê với thể thao, đảm bảo cung cấp những bài viết và thông tin chất lượng nhất.</p>
            <ul>
                <li><strong>Lê Đức Hiếu </strong> - Chuyên gia bóng đá</li>
                <li><strong>Trần Nhật Minh </strong> - Chuyên gia quần vợt</li>
                <li><strong>Nguyễn Hải Hưng</strong> - Chuyên gia đua xe máy</li>
              
            </ul>
        </section>
    </div>
  );
}

export default About;
