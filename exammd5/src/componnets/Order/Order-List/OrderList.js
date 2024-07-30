import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderService from "../../../services/order.service";
import { toast, ToastContainer } from "react-toastify";
import { Button, Table } from "react-bootstrap";

const OrderList = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        OrderService.getAllOrders().then(response => {
            setOrders(response.data);
        }).catch(error => {
            toast.error("Lấy danh sách đơn hàng thất bại.");
        });
    }, []);

    return (
        <div className="container">
            <h4 className="card-title text-center my-5 d-flex justify-content-between">
                Danh Sách Đơn Hàng
                <button className="btn btn-success" onClick={() => navigate('/order-add/')}>Thêm Đơn Hàng</button>
            </h4>

            <Table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th className="text-center" style={{ fontWeight: 'bold' }}>#</th>
                    <th className="text-center" style={{ fontWeight: 'bold' }}>Mã Đơn Hàng</th>
                    <th className="text-center" style={{ fontWeight: 'bold' }}>Ngày Mua</th>
                    <th className="text-center" style={{ fontWeight: 'bold' }}>Tổng Số Tiền</th>
                    <th className="text-center" style={{ fontWeight: 'bold' }}>Số Lượng</th>
                    <th className="text-center" style={{ fontWeight: 'bold' }}>Sản Phẩm</th>
                    <th className="text-center" style={{ fontWeight: 'bold' }}>Hành Động</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr className="table-row" key={order.orderCode}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{order.orderCode}</td>
                        <td className="text-center">{new Date(order.purchaseDate).toLocaleDateString()}</td>
                        <td className="text-center">{order.totalAmount.toLocaleString()}</td>
                        <td className="text-center">{order.quantity}</td>
                        <td className="text-center">{Array.isArray(order.products) ? order.products.join(", ") : order.product}</td>
                        <td className="text-center">
                            <Button className="btn btn-warning" onClick={() => navigate('/order-edit/' + order.orderCode)}>Sửa</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <ToastContainer />
        </div>
    );
}

export default OrderList;
