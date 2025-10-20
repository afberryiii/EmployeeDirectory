import express from "express";
import employees from "#db/employees";

const app = express();

let lastRandomEmployeeId = null;

app.get("/", (req, res) => {
  res.status(200).send("Hello employees!");
});

app.get("/employees/random", (req, res) => {
  const candidates = employees.filter((emp) => emp.od !== lastRandomEmployeeId);
  const arrayToSelectFrom = candidates.length > 0 ? candidates : employees;

  const randomIndex = Math.floor(Math.random() * arrayToSelectFrom.length);
  const randomEmployee = arrayToSelectFrom[randomIndex];

  if (randomEmployee) {
    lastRandomEmployeeId = randomEmployee.id;
    res.status(200).json(randomEmployee);
  } else {
    res.status(500).send("Could not select a random employee.");
  }
});

app.get("/employees", (req, res) => {
  res.status(200).json(employees);
});

app.get("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  const employee = employees.find((emp) => emp.id === id);

  if (employee) {
    res.status(200).json(employee);
  } else {
    res.status(404).send("Employee not found");
  }
});

export default app;
