import React from 'react';
import { Link } from 'react-router-dom';
import './style/style_sport.css';
function AthleticsDetail() {
  return (
    <div className='football-detail'>
    <form>
    <h1>Điền kinh</h1>
      
      <section>
          <h2>Số lượng người chơi</h2>
          <p>1 hoặc nhiều người tùy theo sự kiện.</p>
      </section>
      <section>
          <h2>Chiến lược</h2>
          <p>Chiến lược trong điền kinh bao gồm kỹ thuật chạy, ném, nhảy và sức bền để hoàn thành các sự kiện với thành tích tốt nhất.</p>
      </section>
      <section>
          <h2>Trò chơi đội nhóm</h2>
          <p>Điền kinh có các sự kiện cá nhân và đội nhóm (tiếp sức).</p>
      </section>
      <section>
          <h2>Luật chơi</h2>
          <p>Mỗi sự kiện điền kinh có các luật chơi riêng, ví dụ như xuất phát đúng quy định trong chạy, đo khoảng cách chính xác trong nhảy và ném.</p>
      </section>
      <section>
          <h2>Các sự kiện quan trọng</h2>
          <p>Olympic Games, World Athletics Championships và Diamond League là những sự kiện quan trọng trong điền kinh.</p>
      </section>
      <section>
          <h2>Thống kê và kỷ lục</h2>
          <p>Usain Bolt giữ kỷ lục thế giới ở các cự ly chạy ngắn. Allyson Felix là vận động viên điền kinh nữ nổi tiếng với nhiều huy chương Olympic.</p>
      </section>
      <section>
          <h2>Các quốc gia chơi môn này</h2>
          <p>Điền kinh phổ biến ở nhiều quốc gia trên thế giới, đặc biệt là ở Mỹ, Jamaica, và Kenya.</p>
          
      </section>
        <section>
          <h2>Hình ảnh cầu thủ</h2>
          <Link to="/sports/athletics_usain_bolt"><img className='player-image' src="/images/athletics/player1_Usain_Bolt.jpg" alt="Cau thu 1"/></Link>
          <Link to="/sports/athletics_allyson_felix"><img className='player-image' src="/images/athletics/player2_Allyson_Felix.jpg" alt="Cầu thủ 2" /></Link>
       
        </section>
        
      
     
        
        </form>
    </div>
  );
}

export default AthleticsDetail;