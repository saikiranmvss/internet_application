const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'internet_plans'
});

app.use(express.json());
app.use(cors());

app.get('/getplans', async (req, res) => {
  try {
    const querySql = 'SELECT * FROM internet_plans';
    db.query(querySql, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Failed to fetch plans' });
      } else {
        res.json(result); 
      }
    });
  } catch (error) {
    console.error('Error in /getplans endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/activatePlan', async (req, res) => {
  const { planId } = req.body;
  try {
    const insertSql = 'INSERT INTO plan_activations (plan_id, start_time) VALUES (?, NOW())';
    db.query(insertSql, [planId], (err, result) => {
      if (err) {
        console.error('Error activating plan:', err);
        res.status(500).json({ error: 'Failed to activate plan' });
      } else {
        const activationId = result.insertId;
        const startTime = new Date().toISOString(); 
        res.status(200).json({ message: 'Plan activated successfully', activationId, startTime });
      }
    });
  } catch (error) {
    console.error('Error in /activatePlan endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/deactivatePlan', async (req, res) => {
  const { activationId } = req.body;
  try {
    const updateSql = 'UPDATE plan_activations SET end_time = NOW() WHERE id = ?';
    db.query(updateSql, [activationId], (err, result) => {
      if (err) {
        console.error('Error deactivating plan:', err);
        res.status(500).json({ error: 'Failed to deactivate plan' });
      } else {
        const endTime = new Date().toISOString(); 
        res.status(200).json({ message: 'Plan deactivated successfully', endTime });
      }
    });
  } catch (error) {
    console.error('Error in /deactivatePlan endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
