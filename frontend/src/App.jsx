import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState([]);
  const [markaNev, setMarkaNev] = useState('');
  const [modellNev, setModellNev] = useState('');
  const [editingRowId, setEditingRowId] = useState(null);
  const [editMarkaNev, setEditMarkaNev] = useState('');
  const [editModellNev, setEditModellNev] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.error('Error fetching data:', err));
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/car/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Deleted successfully');
        fetchData();
      } else {
        alert('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = { markaNev, modellNev };

    try {
      const response = await fetch('http://localhost:3000/car', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        alert('Car brand and model added successfully!');
        setMarkaNev('');
        setModellNev('');
        fetchData();
      } else {
        alert('Failed to add car brand and model');
      }
    } catch (error) {
      console.error('Error posting data:', error);
      alert('Error posting data');
    }
  };

  const handleEdit = (item) => {
    setEditingRowId(item.id);
    setEditMarkaNev(item.nev);
    setEditModellNev(item.modell_nev);
  };

  const handleUpdate = async (id) => {
    const updatedData = {
      markaNev: editMarkaNev,
      modellNev: editModellNev,
    };

    try {
      const response = await fetch(`http://localhost:3000/car/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert('Updated successfully!');
        setEditingRowId(null);
        fetchData();
      } else {
        alert('Failed to update');
      }
    } catch (error) {
      console.error('Error updating:', error);
      alert('Error updating');
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">Car Manager</span>
        </div>
      </nav>


      <div className="bg-light p-5 text-center mb-4">
        <h1 className="display-4">Welcome to the Car Database</h1>
        <p className="lead">Add, edit, or delete car brands and models using the form below.</p>
      </div>


      <div className="container">
        <h2 className="mb-4">Add a New Car</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="markaNev" className="form-label">Brand Name</label>
            <input
              type="text"
              className="form-control"
              id="markaNev"
              value={markaNev}
              onChange={(e) => setMarkaNev(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="modellNev" className="form-label">Model</label>
            <input
              type="text"
              className="form-control"
              id="modellNev"
              value={modellNev}
              onChange={(e) => setModellNev(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger">Submit</button>
        </form>

        <hr className="my-5" />


        <h2 className="mb-4">Car List</h2>
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Brand</th>
              <th scope="col">Model</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  {editingRowId === item.id ? (
                    <input
                      className="form-control"
                      value={editMarkaNev}
                      onChange={(e) => setEditMarkaNev(e.target.value)}
                    />
                  ) : (
                    item.nev
                  )}
                </td>

                <td>
                  {editingRowId === item.id ? (
                    <input
                      className="form-control"
                      value={editModellNev}
                      onChange={(e) => setEditModellNev(e.target.value)}
                    />
                  ) : (
                    item.modell_nev
                  )}
                </td>

                <td>
                  {editingRowId === item.id ? (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleUpdate(item.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <footer className="bg-dark text-white text-center py-3 mt-5">
        <div className="container">
          <small>© {new Date().getFullYear()} Car Manager. All rights reserved.</small>
        </div>
      </footer>
    </>
  );
}

export default App;
