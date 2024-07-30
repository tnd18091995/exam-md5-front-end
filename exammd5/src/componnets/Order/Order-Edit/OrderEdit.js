import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import OrderService from "../../../services/order.service";
import ProductService from "../../../services/product.service";

const OrderEdit = () => {
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    // Define validation schema
    const editSchema = Yup.object().shape({
        orderCode: Yup.string().required("Order Code is required"),
        purchaseDate: Yup.date().required("Purchase Date is required"),
        totalAmount: Yup.number().required("Total Amount is required").positive("Total Amount must be a positive number"),
        quantity: Yup.number().required("Quantity is required").positive("Quantity must be a positive number"),
        products: Yup.array().of(Yup.string()).required("Products are required")
    });

    // Initialize formik
    const editForm = useFormik({
        initialValues: {
            orderCode: '',
            purchaseDate: '',
            totalAmount: '',
            quantity: '',
            products: []
        },
        validationSchema: editSchema,
        onSubmit: values => {
            const updatedOrder = {
                ...values,
                totalAmount: Number(values.totalAmount),
                quantity: Number(values.quantity)
            };
            OrderService.updateOrder(id, updatedOrder).then(response => {
                alert("Update succeeded");
                navigate('/order');
            }).catch(error => {
                console.error('Error updating order: ', error);
                alert("Failed to update order");
            });
        }
    });

    useEffect(() => {
        // Fetch all products
        ProductService.getAllProducts()
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products: ', error);
            });

        // Fetch the specific order by ID
        OrderService.getOrderById(id)
            .then(response => {
                const orderData = response.data;
                setOrder(orderData);
                // Update formik values with fetched order data
                editForm.setValues({
                    orderCode: orderData.orderCode,
                    purchaseDate: orderData.purchaseDate,
                    totalAmount: orderData.totalAmount,
                    quantity: orderData.quantity,
                    products: orderData.products || []
                });
            })
            .catch(error => {
                console.error('Error fetching order: ', error);
            });
    }, [id]);

    return (
        <div className='container'>
            <h1 className='text-center'>Edit Order</h1>
            <form className='border p-3 rounded-3' onSubmit={editForm.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="orderCode" className="form-label">Order Code</label>
                    <input
                        type="text"
                        name="orderCode"
                        value={editForm.values.orderCode}
                        onChange={editForm.handleChange}
                        className="form-control"
                        id="orderCode"
                    />
                    {editForm.errors.orderCode && <div className="text-danger">{editForm.errors.orderCode}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="purchaseDate" className="form-label">Purchase Date</label>
                    <input
                        type="date"
                        name="purchaseDate"
                        value={editForm.values.purchaseDate}
                        onChange={editForm.handleChange}
                        className="form-control"
                        id="purchaseDate"
                    />
                    {editForm.errors.purchaseDate && <div className="text-danger">{editForm.errors.purchaseDate}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="totalAmount" className="form-label">Total Amount</label>
                    <input
                        type="number"
                        name="totalAmount"
                        value={editForm.values.totalAmount}
                        onChange={editForm.handleChange}
                        className="form-control"
                        id="totalAmount"
                    />
                    {editForm.errors.totalAmount && <div className="text-danger">{editForm.errors.totalAmount}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={editForm.values.quantity}
                        onChange={editForm.handleChange}
                        className="form-control"
                        id="quantity"
                    />
                    {editForm.errors.quantity && <div className="text-danger">{editForm.errors.quantity}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="products" className="form-label">Products</label>
                    <select
                        name="products"
                        multiple
                        className="form-control"
                        id="products"
                        value={editForm.values.products}
                        onChange={e => editForm.setFieldValue('products', Array.from(e.target.selectedOptions, option => option.value))}
                    >
                        {products.map(product => (
                            <option key={product.productCode} value={product.productName}>
                                {product.productName}
                            </option>
                        ))}
                    </select>
                    {editForm.errors.products && <div className="text-danger">{editForm.errors.products}</div>}
                </div>
                <div className="d-flex justify-content-left">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate('/order')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OrderEdit;
