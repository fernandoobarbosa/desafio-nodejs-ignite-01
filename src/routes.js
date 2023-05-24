import { Database } from "./infra/database.js";

const database = new Database();

export const routes = (app) => {
  app.get("/tasks", (req, res) => {
    const tasks = database.select("tasks");
    res.status(200).send(tasks);
  });

  app.post("/tasks", (req, res) => {
    const { title, description } = req.body;
    if (!(title && description))
      res.status(400).send("Title or description missing");
    database.insert("tasks", { title, description, completed_at: null });
    res.status(201).send("Task created");
  });

  app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!database.findById("tasks", id)) res.status(404).send();
    if (!(title && description)) res.status(400).send("Properties Missing");
    database.update("tasks", id, { title, description });
    res.status(204).send("Task updated");
  });

  app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    if (!database.findById("tasks", id)) res.status(404).send();
    database.delete("tasks", id);
    res.status(204).send("Task deleted");
  });

  app.patch("/tasks/:id/complete", (req, res) => {
    const { id } = req.params;
    if (!database.findById("tasks", id)) res.status(404).send();
    database.update("tasks", id, { completed_at: new Date() });
    res.status(204).send("Task completed");
  });
};
