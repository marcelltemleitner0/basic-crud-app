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
  database: 'cars_db',
});


app.post('/car', async (req, res) => {
  const { brands_name, models_name } = req.body;

  try {

    const [{ insertId: brand_id }] = await connection.query(
      'INSERT INTO brands (name) VALUES (?)',
      [brands_name]
    );

    await connection.query(
      'INSERT INTO models (brand_id, model_name) VALUES (?, ?)',
      [brand_id, models_name]
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
      'SELECT brands.id, brands.name, models.model_name FROM brands INNER JOIN models ON brands.id = models.brand_id'
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
      'SELECT brands.name AS brand_name, models.model_name, categories.category_name FROM categories INNER JOIN models ON categories.model_id = models.id INNER JOIN brands ON models.brand_id = brands.id;'
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
      'DELETE FROM models WHERE brand_id = ?',
      [id]
    );

     await connection.query(
      'DELETE FROM brands WHERE id = ?',
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
   const { brands_name, models_name } = req.body;

  try {


    await connection.query(
      'UPDATE brands SET name = ? WHERE id = ?',
      [brands_name, id]
    );


    await connection.query(
      'UPDATE models SET model_name = ? WHERE brand_id = ?',
      [models_name, id]
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
