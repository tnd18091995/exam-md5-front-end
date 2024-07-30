import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import OrderService from "../../../services/order.service";
import ProductService from "../../../services/product.service";

const OrderAdd = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const addSchema = Yup.object().shape({
        orderCode: Yup.string().required("Order Code is required"),
        purchaseDate: Yup.date().required("Purchase Date is required"),
        totalAmount: Yup.number().required("Total Amount is required").positive("Total Amount must be a positive number"),
        quantity: Yup.number().required("Quantity is required").positive("Quantity must be a positive number"),
        products: Yup.string().required("Products are required")
    });

    const addForm = useFormik({
        initialValues: {
            orderCode: '', purchaseDate: '', totalAmount: '', quantity: '', products: ''
        },
        validationSchema: addSchema,
        onSubmit: values => {
            const newOrder = {
                ...values,
                totalAmount: Number(values.totalAmount),
                quantity: Number(values.quantity),
                products: values.products.split(',').map(product => product.trim()) // Chuyển đổi chuỗi thành mảng
            };
            OrderService.addOrder(newOrder).then(response => {
                alert("Order added successfully");
                navigate('/order');
            }).catch(error => {
                console.error('Error adding order: ', error);
                alert("Failed to add order");
            });
        }
    });

    useEffect(() => {
        ProductService.getAllProducts()
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products: ', error);
            });
    }, []);

    return (
        <div className='container'>
            <h1 className='text-center'>Add Order</h1>
            <form className='border p-3 rounded-3' onSubmit={addForm.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="orderCode" className="form-label">Order Code</label>
                    <input
                        type="text"
                        name="orderCode"
                        value={addForm.values.orderCode}
                        onChange={addForm.handleChange}
                        className="form-control"
                        id="orderCode"
                    />
                    {addForm.errors.orderCode && <div className="text-danger">{addForm.errors.orderCode}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="purchaseDate" className="form-label">Purchase Date</label>
                    <input
                        type="date"
                        name="purchaseDate"
                        value={addForm.values.purchaseDate}
                        onChange={addForm.handleChange}
                        className="form-control"
                        id="purchaseDate"
                    />
                    {addForm.errors.purchaseDate && <div className="text-danger">{addForm.errors.purchaseDate}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="totalAmount" className="form-label">Total Amount</label>
                    <input
                        type="number"
                        name="totalAmount"
                        value={addForm.values.totalAmount}
                        onChange={addForm.handleChange}
                        className="form-control"
                        id="totalAmount"
                    />
                    {addForm.errors.totalAmount && <div className="text-danger">{addForm.errors.totalAmount}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={addForm.values.quantity}
                        onChange={addForm.handleChange}
                        className="form-control"
                        id="quantity"
                    />
                    {addForm.errors.quantity && <div className="text-danger">{addForm.errors.quantity}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="products" className="form-label">Products (comma separated)</label>
                    <input
                        type="text"
                        name="products"
                        value={addForm.values.products}
                        onChange={addForm.handleChange}
                        className="form-control"
                        id="products"
                    />
                    {addForm.errors.products && <div className="text-danger">{addForm.errors.products}</div>}
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/order')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OrderAdd;
