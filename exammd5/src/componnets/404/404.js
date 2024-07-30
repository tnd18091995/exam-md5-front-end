import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="container text-center">
            <h1 className="my-5">404 - Không Tìm Thấy Trang</h1>
            <p>Rất tiếc, trang bạn tìm kiếm không tồn tại.</p>
            <button
                className="btn btn-primary"
                onClick={() => navigate('/')}
            >
                Quay Lại Trang Chủ
            </button>
        </div>
    );
}

export default NotFound;
