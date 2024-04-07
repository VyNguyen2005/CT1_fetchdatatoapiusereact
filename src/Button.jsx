import React, { useState } from 'react';

function Button() {
    const [loai, setLoai] = useState("");
    const [newId, setNewId] = useState("");
    const [newLoai, setNewLoai] = useState("");
    const [newTenTinh, setNewTenTinh] = useState("");
    
    function handlerIdChange(event){
        setNewId(event.target.value);
    }
    function handlerLoaiChange(event) {
        setLoai(event.target.value);
    }
    function handlerTenTinhChange(event) {
        setNewTenTinh(event.target.value);
    }
    return (
        <>
            <div className="input-container">
                <p>Mã:</p>
                <input type="number" id="inputValue" value={newId} onChange={handlerIdChange}/>
                <p>Loại:</p>
                <input type="text" value={newLoai} id="inputValue" onChange={handlerLoaiChange}/>
                <select>
                    <option value="">Chọn loại</option>
                    <option value="Tỉnh">Tỉnh</option>
                    <option value="Thành phố">Thành phố</option>
                </select>
                <p>Tên tỉnh:</p>
                <input type="text" value={newTenTinh} id="inputValue" onChange={handlerTenTinhChange}/>
            </div>
        </>
    );
}

export default Button
