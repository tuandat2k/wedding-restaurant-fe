import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Table,
  Modal,
  Divider,
  DatePicker,
  Space,
  Select,
  notification,
  Radio,
} from "antd";
import { post, get, del, put } from "../../httpHelper";
import {
  SearchOutlined,
  SmileOutlined,
  UserOutlined,
  MailOutlined,RedoOutlined
} from "@ant-design/icons";
import firebase from "../../firebase";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const { Option } = Select;

export default function AdminKhachHang() {
  const [formOne] = Form.useForm();
  const [formInsert] = Form.useForm();
  const [formOTP] = Form.useForm();
  const [formSDT] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [form] = Form.useForm();
  const [dulieuNV, setDulieuNV] = useState([]);
  const [dataTableNV, setDataTableNV] = useState([]);
  const [modalAddNVAdmin, setModalAddNVAdmin] = useState(false);
  const [modalAddUserAdmin, setModalAddUserAdmin] = useState(false);
  const [modalEditNVAdmin, setModalEditNVAdmin] = useState(false);
  const [modalDetailNVAdmin, setModalDetailNVAdmin] = useState(false);
  const [modalDeleteNVAdmin, setModalDeleteNVAdmin] = useState(false);
  const [isNVDetail, setIsNVDetail] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSendOTP, setSendOTP] = useState(true);
  const [isConfirmOTP, setConfirmOTP] = useState(true);
  const [value, setValue] = useState();
  
  // tao tai khoan nhan vien
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const configureCapchar = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log("Verify");
        },
        defaultCountry: "VN",
      }
    );
  };

  const onSignInSubmit = (e) => {
    configureCapchar();

    const phoneNumber = e;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP have been sent");
        showModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openNotificationFail = () => {
    notification.open({
      message: "Th??ng b??o",
      description: "S??T ???? t???n t???i, H??y th??? l???i !",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  const openNotificationTaoThanhCong = () => {
    notification.open({
      message: "Th??ng b??o",
      description: "T???o th??nh c??ng !",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  const openNotificationOTPFail = () => {
    notification.open({
      message: "Th??ng b??o",
      description: "OTP sai H??y th??? l???i !",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  const openNotificationOTPSuccess = () => {
    notification.open({
      message: "Th??ng b??o",
      description: "OTP th??nh c??ng!",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  const handleCallAPICheckPhone = async (e) => {
    const userDetails = e;
    let res;
    const phoneNumber = "" + e?.sdt.trim();
    const numberSdt= phoneNumber.slice(1);
    
    await get(`/khachhang/sdt/${numberSdt}`)
        .then((response) => {
            if (response?.data?.data===false) {
              setSendOTP(false);
                onSignInSubmit("" + e?.sdt.trim());
                localStorage.setItem("phone", numberSdt);
            } else if (response?.data?.data === true) {
                openNotificationFail();
                console.log('SOMETHING WENT WRONG');
            }
            
        })
        .catch((err) => {
            openNotificationFail();
            console.log('Err: ',err);
        });
  };
  const sendPhoneNumber = async (e) => {
    const detailInput = {
      sdt: e?.sdt,
    };
    console.log(detailInput);
    const userDetail = handleCallAPICheckPhone(detailInput);
  };
  const onSubmitOTP = (e) => {
    const code = "" + e?.otp.trim();
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        console.log("In SubmitOTP");
        openNotificationOTPSuccess();
        setConfirmOTP(false);
        localStorage.setItem("firebaseUID", result.user.uid);
      })
      .catch((error) => {
        console.log(error);
        openNotificationOTPFail();
      });
  };

  // tao nhan vien otp

  // tao moi nhvien modal
  const showAddUserAdmin = () => {
    setModalAddUserAdmin(true);
  };

  const handleCallAPIAdd =(e) => {
    let phonesdt2 = formSDT.getFieldValue('sdt');
    const phonesdt = phonesdt2.slice(1);
    const detailInput = {
      username: phonesdt,
      password: e?.password,
      role: ["user"],
      mafirebase: localStorage.getItem("firebaseUID")+"",
    };
    console.log(detailInput)
    post(`/api/auth/signup/`, detailInput)
            .then((response) => {
                console.log(response);
                handleCallAPIAddUserDetail(e,response?.data?.data.id);
            })
            .catch((err) => {
                console.log(err);
            });
  };

  const handleCallAPIAddUserDetail =(e,a) => {
    let phonesdt2 = formSDT.getFieldValue('sdt');
    const phonesdt = phonesdt2.slice(1);
    let ngaysinh1= e?.ngaySinh+"T00:00:00.000Z";
    const detailInput = {
        sdt: phonesdt,
        tenKhachHang: e?.tenNguoiDung,
        email: e?.email,
        gioiTinh: e?.gioiTinh=="true"?true:false,
        ngaySinh: ngaysinh1,
        diemTichLuy: 0,
        vangLai: false,
        maHinhAnh: null,
        maTaiKhoan: a,
      };

      post(`/khachhang/`, detailInput)
      .then((response) => {
          console.log("KhacHang",response);
      })
      .catch((err) => {
          console.log(err);
      });

  };

  //

  const columnsNV = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "T??n kh??ch h??ng",
      dataIndex: "tenkhachhang",
      key: "tenkhachhang",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Nh???p t??n kh??ch h??ng c???n t??m"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.tenkhachhang.toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.tenkhachhang.localeCompare(b.tenkhachhang),
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "sdt",
      key: "sdt",
      sorter: (a, b) => a.sdt - b.sdt,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Chi ti???t",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "H??nh ?????ng",
      dataIndex: "action",
      key: "action",
    },
  ];

  useEffect(() => {
    const _data = dulieuNV?.map((item, index) => ({
      stt: index + 1,
      tenkhachhang: item?.tenKhachHang,
      email: item?.email,
      sdt: item?.sdt,
      detail: (
        <Button
          type="dashed"
          primary
          onClick={(e) => showDetailKhachHangAdmin(item?.maKhachHang)}
        >
          Chi ti???t
        </Button>
      ),
      action: [
        <Button
          type="danger"
          onClick={(e) => showDeleteKhachHangAdmin(item?.maKhachHang)}
        >
          X??a
        </Button>,
        <Button
          type="primary"
          onClick={(e) => showEditKhachHangAdmin(item)}
        >
          C???p nh???t
        </Button>,
      ],
    }));
    setDataTableNV(_data);
  }, [dulieuNV]);

  useEffect(() => {
    fetchNV();
    
  }, []);

  const fetchNV = async (e) => {
    await get(`/khachhang/`)
      .then((response) => {
        setDulieuNV(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err nH: ", err);
      });
  };

  const handleDetailNVAdmin = async (e) => {
    await get(`/khachhang/${e}`)
    .then((response) => {
      setIsNVDetail(response?.data?.data);
     
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };


  const showDetailKhachHangAdmin = async (e) => {
    handleDetailNVAdmin(e);
    setModalDetailNVAdmin(true);
  };

  const handleDeleteNVAdmin = async (e) => {
    const nldel=localStorage.getItem("idnldel");
    await del(`/khachhang/${nldel}`)
    .then((response) => {
      localStorage.removeItem("idnldel");
      setModalDeleteNVAdmin(false);
      window.location.reload(false);
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  


  const handleUpdateNVAdmin = async (e) => {
    
    const nvput=localStorage.getItem("idnvput");
    const matkput=localStorage.getItem("idmataikhoan");
    const malnvput=localStorage.getItem("idmaloaikhachhang");
    const detailInput = {
       maKhachHang: nvput,
       tenKhachHang: e?.tenkhachhang,
       email: e?.email,
       sdt: e?.sdt,
       cmnd: e?.cmnd,
       diaChi: e?.diachi,
       gioiTinh: e?.gioitinh=="true"?true:false,
       ngayHetHan: e['ngaysinh'].format('YYYY-MM-DD') + 'T00:00:00.000Z',
       ngayNhap: e['ngaythue'].format('YYYY-MM-DD') + 'T00:00:00.000Z',
       ngayLam: parseInt(e?.ngaylam),
       ngayNghi: parseInt(e?.ngaynghi),
       luongCoBan: parseInt(e?.luongcoban),
       maHinhAnh: 5,
       maLoaiKhachHang: parseInt(malnvput),  
       maTaiKhoan: parseInt(matkput),

       ghiChu: e?.ghichu,
      };
    localStorage.removeItem("idnvput");
    await put(`/khachhang/`,detailInput)
    .then((response) => {
       
       console.log("updatesuccess",response?.data?.data);
     localStorage.removeItem("idnvput");
      setModalEditNVAdmin(false);
      window.location.reload(false);
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  const showDeleteKhachHangAdmin = async (e) => {
    localStorage.setItem("idnldel", e);
    setModalDeleteNVAdmin(true);

    
  };
  
  const showEditKhachHangAdmin = async (e) => {
    formUpdate.resetFields();
    handleDetailNVAdmin(e?.maKhachHang);
    localStorage.setItem("tennv",e?.tenKhachHang);
    localStorage.setItem("idmataikhoan", e?.maTaiKhoan);
    localStorage.setItem("idmaloaikhachhang", e?.maLoaiKhachHang);
    localStorage.setItem("idnvput", e?.maKhachHang);

    setModalEditNVAdmin(true);
  };

  return (
    <div >
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Kh??ch h??ng
      </Divider>
      <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => fetchNV()}></Button>
      <Button type="primary" onClick={showAddUserAdmin}>
      T???o m???i kh??ch h??ng
          </Button>
      <Modal
          title="Th??m kh??ch h??ng"
          visible={modalAddUserAdmin}
          // okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          // onOk={formInsert.submit}
          // okText="Th??m"
          // cancelText="H???y"
          onCancel={() => setModalAddUserAdmin(false)}
          footer={null}
          width={550}
          
        >
         <Form 
          form={formSDT}
          name="formsdt"
          align="center"
          onFinish={sendPhoneNumber}>
            <Form.Item name="sign-in-button">
              <div id="sign-in-button"></div>
            </Form.Item>
            <Form.Item
              name="sdt"
              rules={[{ required: true, message: "Nh???p sdt c???a b???n" }]}
            >
              <PhoneInput
                defaultCountry="VN"
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
              />
            </Form.Item>
            <Form.Item>
                                <Button onClick={sendPhoneNumber} type="primary" htmlType="submit" id="sign-in-button">
                                    Nh???n m?? k??ch ho???t
                                </Button>
                            </Form.Item>
            </Form>
            <Form 
            hidden={isSendOTP}
          form={formOTP}
          name="basic"
           onFinish={onSubmitOTP} 
           autoComplete="off">
                                <Form.Item name="otp" label="Nh???p m?? OTP">
                                    <Input
                                        type="number"
                                        placeholder="M?? OTP t??? ??i???n tho???i c???a b???n"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button  onClick={onSubmitOTP} type="primary" htmlType="submit">
                                        X??c nh???n
                                    </Button>
                                </Form.Item>
                            </Form>

          <Form
          id='insertuser'
          hidden={isConfirmOTP}
          form={formInsert}
          name="insert"
          align="center" 
          onFinish={handleCallAPIAdd}>
            <Form.Item
              name="tenNguoiDung"
              rules={[
                {
                  pattern:
                  /^[a-zA-z _????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????]+$/g,
                  message: "Kh??ng nh???p k?? t??? ?????t bi???t ho???c s???",
                },
                { required: true, message: "Nh???p t??n kh??ch h??ng" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Nh???p t??n b???n mu???n hi???n th???"
              />
            </Form.Item>
            <Form.Item name="email" rules={[{ type: "email" }]}>
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Nh???p email"/>
              </Form.Item>
              <Form.Item name="cmnd" >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="S??? cmnd"/>
              </Form.Item>
              <Form.Item name="diachi">
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="?????a ch???"/>
              </Form.Item>
            <Form.Item name="gioitinh" label="Gi???i t??nh">
              <Radio.Group defaultValue="Male">
                <Radio value="Nam">Nam</Radio>
                <Radio value="N???">N???</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="ngaySinh"
              label="Ng??y sinh c???a b???n"
              rules={[
                {
                  required: true,
                  message: "H??y ch???n sinh nh???t",
                },
              ]}
            >
              <input type="date"></input>
            </Form.Item>
            <Form.Item
              name="ngaythue"
              label="Ng??y thu?? c???a b???n"
              rules={[
                {
                  required: true,
                  message: "H??y ch???n ng??y thu??",
                },
              ]}
            >
              <input type="date"></input>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Nh???p m???t kh???u c???a b???n",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Nh???p m???t kh???u" />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Nh???p l???i m???t kh???u c???a b???n!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Hai m???t kh???u kh??ng kh???p nhau!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nh???p l???i m???t kh???u" />
            </Form.Item>
            <Form.Item>
                                <Button type="primary" htmlType="submit" id="sign-in-button">
                                    X??c nh???n t???o kh??ch h??ng
                                </Button>
                            </Form.Item>
          </Form>

        </Modal>
      <Table locale={{ 
          triggerDesc: 'S???p x???p gi???m d???n',
          triggerAsc: 'S???p x???p t??ng d???n', 
          cancelSort: 'H???y s???p x???p'
      }} scroll={{ y: 350 }} size={"small"} columns={columnsNV} dataSource={dataTableNV} />

      <Modal
          title="X??a kh??ch h??ng"
          visible={modalDeleteNVAdmin}
          onCancel={() => setModalDeleteNVAdmin(false)}
          width={600}
          onOk={handleDeleteNVAdmin}
          okText="X??a"
          cancelText="H???y"
        >
          <h1>B???n c?? ch???c ch???n mu???n x??a kh??ch h??ng ?</h1>
      </Modal>

      <Modal
        title="Chi ti???t kh??ch h??ng"
        visible={modalDetailNVAdmin}
        onCancel={() => setModalDetailNVAdmin(false)}
        width={600}
        footer={false}
      >
        <div>
          <h3>M?? kh??ch h??ng: {isNVDetail?.maKhachHang}</h3>

          <h3>T??n kh??ch h??ng: {isNVDetail?.tenKhachHang}</h3>

          <h3>Email: {isNVDetail?.email}</h3>

          <h3>S??? ??i???n tho???i: {isNVDetail?.sdt}</h3>

          <h3>CMND: {isNVDetail?.cmnd}</h3>

          <h3>Gi???i t??nh: {isNVDetail?.gioiTinh == true ? "nam" : "n???"}</h3>
         
          <h3>Ng??y sinh: {isNVDetail?.ngaySinh}</h3>

          <h3>Ng??y l??m: {isNVDetail?.ngayLam}</h3>

          <h3>Ng??y thu??: {isNVDetail?.ngayThue}</h3>

          <h3>Ng??y ngh???: {isNVDetail?.ngayNghi}</h3>

          <h3>
            L????ng c?? b???n:
            {isNVDetail?.luongCoBan == null ? " " : isNVDetail?.luongCoBan + " VN??"}
          </h3>

        </div>
      </Modal>
      <Modal
          title="C???p nh???t kh??ch h??ng"
          visible={modalEditNVAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formUpdate.submit}
          okText="C???p nh???t"
          cancelText="H???y"
          onCancel={() => setModalEditNVAdmin(false)}
          width={600}
          
        >
          
         <Form 
          form={formUpdate}
          name="formUpdate"
          align="center"
          onFinish={handleUpdateNVAdmin}>
             <Form.Item
                name="tenkhachhang"
                label="T??n kh??ch h??ng"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????]+$/g,
                    message: "Kh??ng nh???p k?? t??? ?????t bi???t ho???c s???",
                  },
                  { required: true, message: "Nh???p t??n kh??ch h??ng" }]}
              >
                <Input
                  placeholder={isNVDetail?.tenKhachHang}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Nh???p email kh??ch h??ng" }]}
              >
                <Input
                  placeholder={isNVDetail?.email}
                />
              </Form.Item>
              <Form.Item
                name="sdt"
                label="S??? ??i???n tho???i"
                rules={[{ required: true, message: "Nh???p s??? ??i???n tho???i kh??ch h??ng" }]}
              >
                <Input
                  placeholder={isNVDetail?.sdt}
                />
              </Form.Item>
              <Form.Item
                name="cmnd"
                label="S??? ch???ng minh"
                rules={[{ required: true, message: "Nh???p s??? ch???ng minh kh??ch h??ng" }]}
              >
                <Input
                  placeholder={isNVDetail?.cmnd}
                />
              </Form.Item>
              <Form.Item
                name="diachi"
                label="?????a ch???"
                rules={[{ required: true, message: "Nh???p ?????a ch??? kh??ch h??ng" }]}
              >
                <Input
                  placeholder={isNVDetail?.diaChi}
                />
              </Form.Item>
              <Form.Item name="gioitinh" label="Gi???i t??nh">
              <Radio.Group defaultValue="Male">
                <Radio value="true">Nam</Radio>
                <Radio value="false">N???</Radio>
              </Radio.Group>
              </Form.Item>
              <Form.Item
              name="ngaysinh"
              label="Ng??y sinh"
              rules={[
                  {
                    required: true,
                    message: "Nh???p ng??y sinh c???a kh??ch h??ng",
                  },
                ]}
                
              >
              <DatePicker style={{float: 'left'}}  showTime format="YYYY-MM-DD"/>
              </Form.Item>
              <Form.Item
              name="ngaythue"
              label="Ng??y thu??"
              rules={[
                  {
                    required: true,
                    message: "Nh???p ng??y thu?? c???a kh??ch h??ng",
                  },
                ]}
                
              >
              <DatePicker style={{float: 'left'}}  showTime format="YYYY-MM-DD"/>
              </Form.Item>
              <Form.Item
              name="ngaylam"
              label="Ng??y l??m"
              rules={[
                  {
                    required: true,
                    message: "Nh???p ng??y l??m c???a kh??ch h??ng",
                  },
                ]}
                
              >
                  <Input type="number" 
                    placeholder="Nh???p ng??y l??m"
                  />
              </Form.Item>
              <Form.Item
              name="ngaynghi"
              label="Ng??y ngh???"
              rules={[
                  {
                    required: true,
                    message: "Nh???p ng??y ngh??? c???a kh??ch h??ng",
                  },
                ]}
                
              >
                  <Input type="number" 
                    placeholder="Nh???p ng??y ngh???"
                  />
              </Form.Item>
              <Form.Item
              name="luongcoban"
              label="L????ng c?? b???n"
              rules={[
                  {
                    required: true,
                    message: "Nh???p l????ng c?? b???n c???a kh??ch h??ng",
                  },
                ]}
                
              >
                  <Input type="number" 
                    placeholder="Nh???p l????ng c?? b???n"
                  />
              </Form.Item>
          </Form>

        </Modal>
    </div>
  );
}
