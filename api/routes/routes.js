module.exports = (app) => {
    const tasksController = app.controllers.tasks;

    app.get('/tasks', tasksController.getAll);
    app.post('/tasks', tasksController.create);
    app.patch('tasks/:id', tasksController.markAsDone);
    }