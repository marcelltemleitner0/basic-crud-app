import express from "express"
import mysql from 'mysql2/promise';
import cors from 'cors';
const app = express()
const port = 3000
app.use(express.json());
app.use(cors())

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'kocsik_db',
});


app.post('/car', async (req, res) => {
  const { markaNev, modellNev } = req.body;

  try {

    const [{ insertId: markaId }] = await connection.query(
      'INSERT INTO markak (nev) VALUES (?)',
      [markaNev]
    );

    await connection.query(
      'INSERT INTO modellek (marka_id, modell_nev) VALUES (?, ?)',
      [markaId, modellNev]
    );

    await connection.commit();
    res.status(201).json({ message: 'Car brand and model inserted successfully' });

  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'Database insertion failed' });
  }
});


app.get('/data', async (req, res) => {
  try {
    const [results] = await connection.query(
      'SELECT markak.id, markak.nev, modellek.modell_nev FROM markak INNER JOIN modellek ON markak.id = modellek.marka_id'
    );
    
    res.json(results); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});


app.get('/third', async (req, res) => {
  try {
    const [results] = await connection.query(
      'SELECT markak.id, markak.nev, modellek.modell_nev, kategoriak.kategoria_nev FROM markak INNER JOIN modellek ON markak.id = modellek.marka_id INNER JOIN kategoriak ON modellek.id = kategoriak.kategoria_id'
    );
    
    res.json(results); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});



app.delete('/car/:id', async (req, res) => {
  const { id } = req.params;

  try {


    await connection.query(
      'DELETE FROM modellek WHERE marka_id = ?',
      [id]
    );

    await connection.query(
      'DELETE FROM markak WHERE id = ?',
      [id]
    );

    await connection.commit();



    res.json({ message: 'Brand and models deleted successfully' });

  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'Deletion failed' });
  }
});



app.put('/car/:id', async (req, res) => {
  const { id } = req.params;
  const { markaNev, modellNev } = req.body;

  try {


    await connection.query(
      'UPDATE markak SET nev = ? WHERE id = ?',
      [markaNev, id]
    );


    await connection.query(
      'UPDATE modellek SET modell_nev = ? WHERE marka_id = ?',
      [modellNev, id]
    );

    await connection.commit();
    res.json({ message: 'Brand and model updated successfully' });

  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
