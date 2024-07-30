import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductService from "../../../services/product.service";
import { toast, ToastContainer } from "react-toastify";
import { Button, Table } from "react-bootstrap";

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'productName', direction: 'ascending' });

    useEffect(() => {
        ProductService.getAllProducts().then(response => {
            setProducts(response.data);
        }).catch(error => {
            toast.error("Lấy danh sách sản phẩm thất bại.");
        });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
            ProductService.deleteProductById(id).then(() => {
                setProducts(products.filter(product => product.id !== id));
                toast.success("Xoá sản phẩm thành công!");
            }).catch(error => {
                toast.error("Xoá sản phẩm thất bại.");
            });
        }
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        sortProducts(key, direction);
    };

    const sortProducts = (key, direction) => {
        const sortedProducts = [...products].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setProducts(sortedProducts);
    };

    return (
        <div className="container">
            <h4 className="card-title text-center my-5 d-flex justify-content-between">
                Danh Sách Sản Phẩm
                <button className="btn btn-success" onClick={() => navigate('/product-add/')}>Thêm Mới Sản Phẩm</button>
            </h4>

            <Table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th className="text-center" style={{ fontWeight: 'bold' }}>#</th>
                    <th
                        className="text-center"
                        style={{ fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => requestSort('productCode')}
                    >
                        Mã Sản Phẩm {sortConfig.key === 'productCode' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </th>
                    <th
                        className="text-center"
                        style={{ fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => requestSort('productName')}
                    >
                        Tên Sản Phẩm {sortConfig.key === 'productName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </th>
                    <th
                        className="text-center"
                        style={{ fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => requestSort('price')}
                    >
                        Giá {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </th>
                    <th className="text-center" style={{ fontWeight: 'bold' }}>Loại Sản Phẩm</th>
                    <th className="text-center" style={{ fontWeight: 'bold' }}>Hành Động</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <tr className="table-row" key={product.id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{product.productCode}</td>
                        <td className="text-center">{product.productName}</td>
                        <td className="text-center">{product.price.toLocaleString()}</td>
                        <td className="text-center">{product.productType}</td>
                        <td className="text-center">
                            <Button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Xoá</Button>
                            <Button className="btn btn-primary" onClick={() => navigate('/product-edit/' + product.id)}>Sửa</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <ToastContainer />
        </div>
    );
}

export default ProductList;
