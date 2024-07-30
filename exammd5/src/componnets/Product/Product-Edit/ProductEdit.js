import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import ProductService from "../../../services/product.service";

const ProductEdit = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const editSchema = Yup.object().shape({
        productCode: Yup.string().required("Mã sản phẩm là bắt buộc"),
        productName: Yup.string().required("Tên sản phẩm là bắt buộc"),
        price: Yup.number().required("Giá là bắt buộc").positive("Giá phải là số dương"),
        productType: Yup.string().required("Loại sản phẩm là bắt buộc")
    });

    const editForm = useFormik({
        initialValues: {
            productCode: '',
            productName: '',
            price: '',
            productType: ''
        },
        validationSchema: editSchema,
        onSubmit: values => {
            const updatedProduct = { ...values, price: Number(values.price) };
            ProductService.updateProduct(id, updatedProduct).then(response => {
                alert("Cập nhật thành công");
                navigate('/product');
            }).catch(error => {
                console.error('Lỗi khi cập nhật sản phẩm: ', error);
                alert("Cập nhật sản phẩm thất bại");
            });
        }
    });

    useEffect(() => {
        ProductService.getProductById(id)
            .then(response => {
                setProduct(response.data);
                editForm.setValues({
                    productCode: response.data.productCode,
                    productName: response.data.productName,
                    price: response.data.price,
                    productType: response.data.productType
                });
            })
            .catch(error => {
                console.error('Lỗi khi lấy thông tin sản phẩm: ', error);
            });
    }, [id]);

    return (
        <div className='container'>
            <h1 className='text-center'>Chỉnh Sửa Sản Phẩm</h1>
            <form className='border p-3 rounded-3' onSubmit={editForm.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="productCode" className="form-label">Mã Sản Phẩm</label>
                    <input
                        type="text"
                        name="productCode"
                        value={editForm.values.productCode}
                        onChange={editForm.handleChange}
                        className="form-control"
                        id="productCode"
                    />
                    {editForm.errors.productCode && <div className="text-danger">{editForm.errors.productCode}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Tên Sản Phẩm</label>
                    <input
                        type="text"
                        name="productName"
                        value={editForm.values.productName}
                        onChange={editForm.handleChange}
                        className="form-control"
                        id="productName"
                    />
                    {editForm.errors.productName && <div className="text-danger">{editForm.errors.productName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Giá</label>
                    <input
                        type="number"
                        name="price"
                        value={editForm.values.price}
                        onChange={editForm.handleChange}
                        className="form-control"
                        id="price"
                    />
                    {editForm.errors.price && <div className="text-danger">{editForm.errors.price}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="productType" className="form-label">Loại Sản Phẩm</label>
                    <input
                        type="text"
                        name="productType"
                        value={editForm.values.productType}
                        onChange={editForm.handleChange}
                        className="form-control"
                        id="productType"
                    />
                    {editForm.errors.productType && <div className="text-danger">{editForm.errors.productType}</div>}
                </div>
                <div className="d-flex justify-content-left">
                    <button type="submit" className="btn btn-primary">Lưu Thay Đổi</button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate('/product')}
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductEdit;
