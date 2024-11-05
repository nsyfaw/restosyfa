import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBukuTamu = () => {
  const [namaTamu, setNamaTamu] = useState('');
  const [noHp, setNoHp] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [unitKerja, setUnitKerja] = useState('');
  const [tujuan, setTujuan] = useState('');
  const [yangDituju, setYangDituju] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    try {
        const response = await fetch('http://localhost:3000/api/bukutamu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                nama_tamu: namaTamu,
                no_hp: noHp,
                jabatan,
                unit_kerja: unitKerja,
                tujuan,
                yang_dituju: yangDituju,
                keterangan,
            }),
        });

        if (response.ok) {
            console.log('Tamu berhasil ditambahkan');
            navigate('bukutamu'); 
        } else {
            const errorText = await response.text();
            console.error('Gagal menambahkan tamu:', errorText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center " style={{ minHeight: '90vh', marginTop: '30px',  background: '#A1D6B2', borderRadius: '0.5rem'}}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '700px', width: '100%' }}>
        <h1 className="mb-3 text-center" style={{ color: '#FFFFFF'}}>Tambah Buku Tamu</h1>
        <div className="row">
          {[
            { label: 'Nama Tamu', value: namaTamu, setter: setNamaTamu },
            { label: 'No Hp', value: noHp, setter: setNoHp},
            { label: 'Jabatan', value: jabatan, setter: setJabatan },
            { label: 'Unit Kerja', value: unitKerja, setter: setUnitKerja },
            { label: 'Tujuan', value: tujuan, setter: setTujuan },
            { label: 'Yang Dituju', value: yangDituju, setter: setYangDituju },
            { label: 'Keterangan', value: keterangan, setter: setKeterangan },
          ].map((field, index) => (
            <div className={`col-md-6 mb-3` }  key={index}>
              <label className="form-label" style={{marginLeft:'25px'}}>{field.label}:</label>
              {field.prefix ? (
                <div className="input-group">
                  <span className="input-group-text">{field.prefix}</span>
                  <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: '300px', padding: '0.5rem', marginBottom: '0.5rem' }} // Adjust as needed
                    placeholder={field.label}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <input
                  type="text"
                  className="form-control"
                  style={{ maxWidth: '300px', width: '300px', padding: '0.5rem', marginBottom: '0.5rem', marginLeft:'25px'  }} 
                  placeholder={field.label}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  required
                />
              )}
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', marginLeft:'25px'  }}>Tambah</button>
      </form>
    </div>
  );
};

export default AddBukuTamu;