import React from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../../logo.svg'; // Adjusted path

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1 className="text-center my-5">Trang Chủ</h1>
            <div className="text-center mb-4">
                <img src={logo} alt="Logo" className="logo-spin" />
            </div>
            <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-primary mx-2" onClick={() => navigate('/product')}>Xem Sản Phẩm</button>
                <button className="btn btn-primary mx-2" onClick={() => navigate('/order')}>Xem Đơn Hàng</button>
            </div>
        </div>
    );
}

export default Home;
