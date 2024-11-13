const Todo = require('../models/todoModel');

// Create Todo
exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = new Todo({
      userId: req.user.id,
      title,
      status: 'pending'
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read Todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, status },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
