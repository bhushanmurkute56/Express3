import express from "express";
const app = express();

app.use(express.json());

const TODOs = [
    {
      id: 1,
      todoItem: "Learn Express",
      priority: "High",
      emoji: "🚀",
      isDone: false,
      createdAt: "2023-10-01T10:00:00Z"
    },
    {
      id: 2,
      todoItem: "Build a REST API",
      priority: "Medium",
      emoji: "🛠️",
      isDone: false,
      createdAt: "2023-10-02T12:00:00Z"
    }
];

app.get("/todos", (req, res) => {
    res.json({
            success: true,
            data : TODOs,
            message: "Server is up and running"
        })
});

app.post("/todos", (req, res) => {
  const { todoItem, priority, emoji, isDone } = req.body;

  const todoObj = {
    id : Math.floor(Math.random() * 10000),
    todoItem : todoItem,
    priority : priority,
    emoji : emoji,
    isDone : isDone,
    createdAt : new Date().toISOString()
  };

  TODOs.push(todoObj);

    res.json({
        success: true,
        data : TODOs,
        message: "New TODO added"
    })
});

app.get("/todos/search", (req, res) => {res.json({success : true})});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todoItem = TODOs.find((item) => {if(item.id == id) return item});

  if(todoItem) {
    res.json({
        success: true,
        data : todoItem,
        message: "TODO item found"
    });
  }
  else {
    res.json({
        success: false,
        message: "TODO item not found"
    });
  }});

  app.delete("/todos/:id", (req, res) => {
    const { id} = req.params;
    const index = TODOs.findIndex((item) => item.id == id);

    if(index == -1) {
      res.json({
        success: false,
        message: "TODO item not found"
      });
    }
    else {
      TODOs.splice(index, 1);
      res.json({
        success: true,
        data: TODOs,
        message: "TODO item deleted"
      });
    }
  });

  app.patch("/todos/:id/status", (req, res) => {
    const { id } = req.params;

    const index = TODOs.findIndex((item) => item.id == id);

    const {isDone} = req.body;

    if(index == -1) {
      return res.json({
        success: false,
        message: "TODO item not found"
      });
    }
      TODOs[index].isDone = isDone;

      res.json({
        success: true,
        data: TODOs[index],
        message: "TODO item marked as done"
      });
    }
  );

  app.put("/todos/:id", (req, res) => {
    const { id } = req.params;

    const index = TODOs.findIndex((item) => item.id == id);

    if(index == -1) {
      return res.json({
        success: false,
        message: "TODO item not found"
      })
    }
      const { todoItem, priority, emoji, isDone } = req.body;

      const newObj = {
        id : TODOs[index].id,
        todoItem,
        priority,
        emoji,
        isDone,
        createdAt : TODOs[index].createdAt
      }

      TODOs[index] = newObj;

      res.json({
        success: true,
        data: TODOs[index],
        message: "TODO item updated successfully"
      });
    });
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});