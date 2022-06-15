const express = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/task');
const { authenticated } = require('../middleware/auth');
const router = express.Router();

router.get('/tasks', getTasks);
router.post('/task', authenticated, addTask);
router.post('/task/:id', authenticated, updateTask);
router.delete('/task/:id', authenticated, deleteTask);

module.exports = router;