let tasks = [];

module.exports = {
    getAll(req, res) {
        console.log(req.body); 
        res.json(tasks);
    },
    create(req, res) {
        const { task } = req.body;  
        if (!task) {
            return res.status(400).json({ error: 'Tarefa não fornecida' }); 
        }
        console.log(req.body);  
        const newTask = { id: tasks.length + 1, task, done: false };  
        tasks.push(newTask);
        res.status(201).json(newTask);
    },
    markAsDone(req, res) {
        const { id } = req.params;
        let updatedTask;
        tasks = tasks.map((task) => {
            if (task.id == id) {
                updatedTask = { ...task, done: true };
                return updatedTask;
            }
            return task;
        });
        res.status(200).json(updatedTask); 
    },
};
