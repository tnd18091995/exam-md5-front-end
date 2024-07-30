import React from 'react';
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import ProductService from "../../../services/product.service";

const ProductAdd = () => {
    const navigate = useNavigate();

    const validateSchema = Yup.object().shape({
        productCode: Yup.string().required("Mã sản phẩm là bắt buộc"),
        productName: Yup.string().required("Tên sản phẩm là bắt buộc"),
        price: Yup.number()
            .required("Giá là bắt buộc")
            .positive("Giá phải là số dương"),
        productType: Yup.string().required("Loại sản phẩm là bắt buộc")
    });

    const formik = useFormik({
        initialValues: {
            productCode: '',
            productName: '',
            price: '',
            productType: ''
        },
        validationSchema: validateSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            const productData = { ...values, price: Number(values.price) };

            ProductService.addProduct(productData).then(response => {
                alert("Thêm sản phẩm thành công");
                navigate('/product');
            }).catch(error => {
                alert("Thêm sản phẩm thất bại");
            }).finally(() => {
                setSubmitting(false);
                resetForm();
            });
        }
    });

    return (
        <div className='container'>
            <h4 className="card-title text-center my-5">Thêm Sản Phẩm Mới</h4>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="productCode" className="form-label">Mã Sản Phẩm</label>
                    <input
                        type="text"
                        name="productCode"
                        value={formik.values.productCode}
                        onChange={formik.handleChange}
                        className="form-control"
                        id="productCode"
                    />
                    {formik.errors.productCode && <div className="text-danger">{formik.errors.productCode}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Tên Sản Phẩm</label>
                    <input
                        type="text"
                        name="productName"
                        value={formik.values.productName}
                        onChange={formik.handleChange}
                        className="form-control"
                        id="productName"
                    />
                    {formik.errors.productName && <div className="text-danger">{formik.errors.productName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Giá</label>
                    <input
                        type="number"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        className="form-control"
                        id="price"
                    />
                    {formik.errors.price && <div className="text-danger">{formik.errors.price}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="productType" className="form-label">Loại Sản Phẩm</label>
                    <select
                        name="productType"
                        value={formik.values.productType}
                        onChange={formik.handleChange}
                        className="form-control"
                        id="productType"
                    >
                        <option value="">Chọn loại sản phẩm</option>
                        <option value="Điện Thoại">Điện Thoại</option>
                        <option value="Máy Tính Bảng">Máy Tính Bảng</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Đồng Hồ">Đồng Hồ</option>
                        <option value="Phụ Kiện">Phụ Kiện</option>
                    </select>
                    {formik.errors.productType && <div className="text-danger">{formik.errors.productType}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={formik.isSubmitting}>
                    Thêm Sản Phẩm
                </button>
            </form>
        </div>
    );
};

export default ProductAdd;
