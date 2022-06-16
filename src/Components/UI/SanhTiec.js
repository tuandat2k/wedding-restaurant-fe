import React, { useState, useEffect } from "react";
import { Divider, Table } from "antd";
import { get } from "../../httpHelper";
import logo from "../img/logo/logosmall.png";
import mc from "../img/content/mc.jpg";
export default function SanhTiec() {
  const [valueST, setValueST] = useState([]);
  const [dataTableST, setDataTableST] = useState([]);
  const columnsST = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "SẢNH",
      dataIndex: "sanh",
      key: "sanh",
    },
    {
      title: "KÍCH THƯỚC",
      dataIndex: "kichthuoc",
      key: "kichthuoc",
    },
    {
      title: "DIỆN TÍCH",
      dataIndex: "dientich",
      key: "dientich",
    },
    {
      title: "QUẦY TRIỂN LÃM (2.4X3M)",
      dataIndex: "quaytrienlam",
      key: "quaytrienlam",
    },
    {
      title: "KIỂU BÀN TRÒN",
      dataIndex: "kieubantron",
      key: "kieubantron",
    },
    {
      title: "KIỂU BÀN DÀI",
      dataIndex: "kieubandai",
      key: "kieubandai",
    },
    {
      title: "KIỂU LỚP HỌC",
      dataIndex: "kieulophoc",
      key: "kieulophoc",
    },
    {
      title: "KIỂU RẠP HÁT",
      dataIndex: "kieuraphat",
      key: "kieuraphat",
    },
    {
      title: "VỊ TRÍ",
      dataIndex: "vitri",
      key: "vitri",
    },
  ];

  useEffect(() => {
    fetchST();
  }, []);

  const fetchST = () => {
    get(`/sanhtiec/`)
      .then((response) => {
        console.log(response?.data?.data);
        setValueST(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err ST: ", err);
      });
  };

  useEffect(() => {
    const _data = valueST?.map((item, index) => ({
      stt: index + 1,
      sanh: item?.tenSanhTiec,
      kichthuoc: item?.kichThuoc,
      dientich: item?.dienTich,
      quaytrienlam: item?.quayTrienLam,
      kieubantron: item?.kieuBanTron,
      kieubandai: item?.kieuBanDai,
      kieulophoc: item?.kieuLopHoc,
      kieuraphat: item?.kieuRapHat,
      vitri: item?.viTri,
    }));
    setDataTableST(_data);
  }, [valueST]);

  return (
    <div className="pagewrap">
      <div
        className="bannerchucnang"
        style={{
          backgroundImage:
            "url(https://www.theadora.vn/skin/front/adora/images/cac-trung-tam/gioi-thieu-cover-adora-center.jpg)",
        }}
      >
        <h1 className="titlemenu">Sảnh tiệc</h1>
      </div>
      <Divider orientation="center">
        TRUNG TÂM HỘI NGHỊ - TIỆC CƯỚI
        <p style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}>
          THE LUCKY CENTER
        </p>
      </Divider>

      <div class="clr"></div>
      <div class="contentOne">
        <div class="pagewrap">
          <a href="" class="imgTwo">
            <span class="thumb">
              <img
                src={mc}
                alt="nhà hàng tổ chức tiệc cưới trọn gói tại tphcm"
              />
            </span>
          </a>
          <div class="textContent">
            <div class="titBox">
              <img src={logo} alt="SẢNH TIỆC" />
              <a href="" class="tit">
                <h2>
                  SẢNH TIỆC <strong style={{color:"orange"}}>HIỆN ĐẠI</strong> & <strong> HOÀNH TRÁNG</strong>
                </h2>
              </a>
            </div>
            <p class="ell">
              <div>
                Tọa lạc tại vị trí sầm uất, giao thoa nhiều quận huyện và cung
                đường huyết mạch của thành phố, The LUCKY Center là trung tâm
                chính với diện tích lớn nhất, cũng như sở hữu cơ sở vật chất
                hàng đầu được nhiều các doanh nghiệp trong nước và quốc tế uy
                tín lựa chọn là nơi ghi dấu những sự kiện thành công của mình.
                The LUCKY Center có tổng giá trị đầu tư, diện tích và quy mô lớn
                nhất trong thị trường yến tiệc tính đến thời điểm hiện tại.
              </div>
            </p>
            <a href="dich-vu-tiec-cuoi.html" class="btn btn-main">
              Chi Tiết
            </a>
          </div>
        </div>
      </div>
      <Divider orientation="left">SƠ ĐỒ TẦNG</Divider>
      <div
        className="hinhbanner"
        style={{
          backgroundImage:
            "url(https://www.theadora.vn/skin/front/adora/images/cac-trung-tam/so-do-adora-center.jpg)",
        }}
      ></div>
      <Divider orientation="left">CAPACITY/ SET-UP</Divider>
      <Table columns={columnsST} dataSource={dataTableST} />
    </div>
  );
}
