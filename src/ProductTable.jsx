import React, { useState, useEffect } from 'react'

function ProductTable() {
    const [products, setProducts] = useState([]);
    const [id, setId] = useState(1);
    const [newLoai, setNewLoai] = useState("");
    const [newTenTinh, setNewTenTinh] = useState("");

    function handlerIdChange(event) {
        setNewId(event.target.value);
    }
    function handlerLoaiChange(event) {
        setNewLoai(event.target.value);
    }
    function handlerTenTinhChange(event) {
        setNewTenTinh(event.target.value);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            }
        };
        fetchData();
    }, []);
    function handlerAddProduct() {
        if (newLoai !== "" && newTenTinh !== "") {
            const newProduct = {
                id: id,
                loai: newLoai,
                tenTinh: newTenTinh
            };
            
            fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(newProduct)
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(data => {
                    console.log(`Success:`, data);
                    setProducts(prevProducts => [...prevProducts, newProduct]);
                    setId(prevId => prevId + 1);
                    setNewLoai("");
                    setNewTenTinh("");
                })
                .catch(error => {
                  console.error('Error:', error);
                });
        }
        }
    function handlerDeleteProduct(id) {
        fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const deletedProduct = (products.filter(product => product.id !== id));
            setProducts(deletedProduct);
        })
        .then(data => {
            console.log(`Success:`, data);
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    
    return (
        <>
            <div className="input-container">
                <p>Loại:</p>
                <select value={newLoai} onChange={handlerLoaiChange}>
                    <option value="">Chọn loại</option>
                    <option value="Tỉnh">Tỉnh</option>
                    <option value="Thành phố">Thành phố</option>
                </select>
                <p>Tên tỉnh:</p>
                <input type="text" value={newTenTinh} onChange={handlerTenTinhChange} /><br />
                <button className="btn-them" onClick={handlerAddProduct}>Thêm</button>
            </div>
            <div>
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>Mã</th>
                            <th>Loại</th>
                            <th>Tên tỉnh</th>
                            <th>📎</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.loai}</td>
                                <td>{product.tenTinh}</td>
                                <td>
                                    <button className="btn-delete" onClick={() => handlerDeleteProduct(product.id)}>🗑</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default ProductTable