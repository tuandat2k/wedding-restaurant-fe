import React from 'react'

import { Carousel } from 'antd';
import Carousel2 from 'react-elastic-carousel';
import xehoa from "../img/content/xehoa.jpg"
import logo from "../img/logo/logosmall.png"
import quaycuoi from "../img/content/quaycuoi.jpg"
import mc from "../img/content/mc.jpg"
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Item from "./itemcrs"
import ncc1 from "../img/nhacungcap/ncc1.jpg"
import ncc2 from "../img/nhacungcap/ncc2.png"
import ncc3 from "../img/nhacungcap/ncc3.jpg"
import ncc4 from "../img/nhacungcap/ncc4.jpg"
import ncc5 from "../img/nhacungcap/ncc5.jpg"
import ncc6 from "../img/nhacungcap/ncc6.png"
import ncc7 from "../img/nhacungcap/ncc7.jpg"
import ncc8 from "../img/nhacungcap/ncc8.png"
import ncc9 from "../img/nhacungcap/ncc9.png"

import '../css/styles.css'

const contentStyle = {
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
};

const breakPoints = [
  {width:1, itemsToShow:1},
  {width:550, itemsToShow:2},
  {width:768, itemsToShow:3},
  {width:1200, itemsToShow:4},
]


export default function LandingPage() {
  return (
    <div class="wrap">
    <div class="carousel">
        <Carousel effect="fade"  autoplay>
    <div>
      <h3 id="toanha1"></h3>
    </div>
    <div>
      <h3 id="toanha2" ></h3>
    </div>
    <div>
      <h3 id="toanha3"></h3>
    </div>
  </Carousel>
  </div>
        <div class="slogan" style={{marginTop: "40px", paddingBottom: "50px"}}>
          <span>SỰ KIỆN ĐẲNG CẤP TẠI LUCKY CENTER</span>
        </div>
      
      <div class="contentMain">


        <div class="contentOne">
          <div class="pagewrap">
          <a href="" class="img"><span class="thumb">
            <img src={xehoa}
           alt="nhà hàng tổ chức tiệc cưới trọn gói tại tphcm"/></span></a>
           <div class="textContent">
              <div  class="titBox">
              <img src={logo} alt="TIỆC CƯỚI"/>
              <a href="" class="tit"><h2>XE HOA <strong>LỘNG LẪY</strong></h2></a>
              </div>
              <p class="ell"><div>Những chiếc xe hoa tuyệt đẹp cao cấp, quý tốc sẽ đưa cặp đôi tới bến bờ hạnh phúc và cặp đôi sẽ được dạo một vòng trung tâm tiệc cưới để chụp những bức hình thật đẹp trước khi tiến vào nhà hàng</div></p>
              <a href="dich-vu-tiec-cuoi.html" class="btn btn-main">Chi Tiết</a>
            </div>
          </div>

          


        </div>

        <div class="clr"></div>
        <div class="contentOne">
          <div class="pagewrap">
          <a href="" class="imgTwo"><span class="thumb">
            <img src={mc}
           alt="nhà hàng tổ chức tiệc cưới trọn gói tại tphcm"/></span></a>
           <div class="textContent">
              <div  class="titBox">
              <img src={logo} alt="TIỆC CƯỚI"/>
              <a href="" class="tit"><h2>MC & Vũ Đoàn <strong>Chuyên nghiệp</strong></h2></a>
              </div>
              <p class="ell"><div>MC và vũ đoàn sẽ dẫn dắt bầu không khí của cô dâu và chú rẽ thêm trang trọng và hạnh phúc. Đặc biệt hơn cả mc và vũ đoạn đều được tuyẻn chọn từ những người nhiệt huyết và dày dặn kinh nghiệm</div></p>
              <a href="dich-vu-tiec-cuoi.html" class="btn btn-main">Chi Tiết</a>
            </div>
          </div>

          


        </div>

        <div class="clr"></div>

        <div class="contentOne">
          <div class="pagewrap">
          <a href="" class="img"><span class="thumb">
            <img src={quaycuoi}
           alt="nhà hàng tổ chức tiệc cưới trọn gói tại tphcm"/></span></a>
           <div class="textContent">
              <div  class="titBox">
              <img src={logo} alt="TIỆC CƯỚI"/>
              <a href="" class="tit"><h2>quầy kỉ niệm <strong>đáng nhớ</strong></h2></a>
              </div>
              <p class="ell"><div>Lưu giữ lại những kỉ niệm mà cặp đôi đã trải qua trong suốt quá trình yêu nhau. Những kỉ niệm đó sẽ được lưu giữ lại tại quầy kỉ niệm</div></p>
              <a href="dich-vu-tiec-cuoi.html" class="btn btn-main">Chi Tiết</a>
            </div>
          </div>
        </div>

        

        <div class="eventRCM">
              <div  class="titBox">
              <img src={logo} alt="TIỆC CƯỚI"/>
              <a href="" class="tit"><h2><strong>sự kiện nổi bật</strong></h2></a>
              </div>
              
              <Carousel effect="fade" autoplay >
                <div class="contentOne">
                  <div class="pagewrap">
                  <a href="" class="img"><span class="thumb">
                    <img src={quaycuoi}
                  alt="nhà hàng tổ chức tiệc cưới trọn gói tại tphcm"/></span></a>
                  <div class="textContent">
                      <div  class="titBox">
                      <span class="date">01/03</span>
                      <a href="" class="tit"><h4>lưu ý tổ chức đảm cưới vào thời điểm dịch bệnh căng thẳng</h4></a>
                      </div>
                      <p class="ell"><div>Lưu giữ lại những kỉ niệm mà cặp đôi đã trải qua trong suốt quá trình yêu nhau. Những kỉ niệm đó sẽ được lưu giữ lại tại quầy kỉ niệm</div></p>
                      <a href="dich-vu-tiec-cuoi.html" class="btn btn-main">Chi Tiết</a>
                    </div>
                  </div>
                </div>
                <div class="contentOne">
                  <div class="pagewrap">
                  <a href="" class="img"><span class="thumb">
                    <img src={quaycuoi}
                  alt="nhà hàng tổ chức tiệc cưới trọn gói tại tphcm"/></span></a>
                  <div class="textContent">
                      <div  class="titBox">
                      <span class="date">02/03</span>
                      <a href="" class="tit"><h4>lưu ý tổ chức đảm cưới vào thời điểm dịch bệnh căng thẳng</h4></a>
                      </div>
                      <p class="ell"><div>Lưu giữ lại những kỉ niệm mà cặp đôi đã trải qua trong suốt quá trình yêu nhau. Những kỉ niệm đó sẽ được lưu giữ lại tại quầy kỉ niệm</div></p>
                      <a href="dich-vu-tiec-cuoi.html" class="btn btn-main">Chi Tiết</a>
                    </div>
                  </div>
                </div>
                <div class="contentOne">
                  <div class="pagewrap">
                  <a href="" class="img"><span class="thumb">
                    <img src={quaycuoi}
                  alt="nhà hàng tổ chức tiệc cưới trọn gói tại tphcm"/></span></a>
                  <div class="textContent">
                      <div  class="titBox">
                      <span class="date">03/03</span>
                      <a href="" class="tit"><h4>lưu ý tổ chức đảm cưới vào thời điểm dịch bệnh căng thẳng</h4></a>
                      </div>
                      <p class="ell"><div>Lưu giữ lại những kỉ niệm mà cặp đôi đã trải qua trong suốt quá trình yêu nhau. Những kỉ niệm đó sẽ được lưu giữ lại tại quầy kỉ niệm</div></p>
                      <a href="dich-vu-tiec-cuoi.html" class="btn btn-main">Chi Tiết</a>
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>

            <div class="clr"></div>
            <div class="carousel2">
              <div class="pagewrap">
                <Carousel2 breakPoints={breakPoints}>
                  <Item><img class="imgcrs"src={ncc1}/></Item>
                  <Item><img class="imgcrs" src={ncc2}/></Item>
                  <Item><img class="imgcrs" src={ncc3}/></Item>
                  <Item><img class="imgcrs" src={ncc4}/></Item>
                  <Item><img class="imgcrs" src={ncc5}/></Item>
                  <Item><img class="imgcrs" src={ncc6}/></Item>
                  <Item><img class="imgcrs" src={ncc7}/></Item>
                  <Item><img class="imgcrs" src={ncc8}/></Item>
                  <Item><img class="imgcrs" src={ncc9}/></Item>
                  <Item><img class="imgcrs"   src={ncc1}/></Item>
                  
                </Carousel2>
              </div>
            </div>


      </div>
    </div>
  )
}
