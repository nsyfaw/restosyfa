import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Bukutamu = () => {

    const [dataTamu, setTamu] = useState([]);
    const token = localStorage.getItem('token');

    const tampilData = async () => {
        const response = await fetch('http://localhost:3000/api/bukutamu', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setTamu(data);
    }
    useEffect(() => {
        tampilData();
    }, []);
    const handleDelete = (id) => {
        Swal.fire({
            icon: "warning",
            title: "yakin menghapus data?",
            showCancelButton: true,
            confirmButtonText: "yakin",
            cancelButtonText: "batal"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:3000/api/bukutamu/' + id, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                    .then(response => response.json())
                    .then(res => {
                        window.location.reload();
                    });
            }
        });
    }
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col">
                            <h1 className='m-0'>Data User</h1>
                        </div>
                        <div className="col">
                            <ol className='breadcrumb float-sm-right'>
                                <li className='breadcrumb-item'>Home</li>
                                <li className='breadcrumb-item active'>Input Tamu</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className='content'>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <table className='table table-striped table-bordered mt-2'>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Tamu</th>
                                        <th>No. HP</th>
                                        <th>Jabatan</th>
                                        <th>Unit Kerja</th>
                                        <th>Tujuan</th>
                                        <th>Yang Dituju</th>
                                        <th>Keterangan</th>
                                        <th>Hapus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataTamu.length > 0 ? (
                                        dataTamu.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.nama_tamu}</td>
                                                <td>{item.no_hp}</td>
                                                <td>{item.jabatan}</td>
                                                <td>{item.unit_kerja}</td>
                                                <td>{item.tujuan}</td>
                                                <td>{item.yang_dituju}</td>
                                                <td>{item.keterangan}</td>
                                                <td>
                                                    <button onClick={() => handleDelete(item.id)} className=" btn btn-danger">Hapus</button>
                                                </td>
                                            </tr>
                                        ))

                                    ) : (
                                        <tr>
                                            <td colSpan="5">Data Kosong</td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Bukutamu
