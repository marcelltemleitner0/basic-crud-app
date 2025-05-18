import React, { useState, useEffect } from 'react';

function Alldata() {
  const [data, setData] = useState([]); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:3000/third')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.error('Error fetching data:', err));
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Brand</th>
          <th scope="col">Model</th>
          <th scope="col">Properties</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}> 
            <td>{item.id}</td>
            <td>{item.nev}</td>
            <td>{item.modell_nev}</td>
            <td>{item.kategoria_nev}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Alldata;
