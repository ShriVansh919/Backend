const fs = require("fs");
const path = require("path");

const TODO_FILE = path.join(__dirname, "todos.json");

function readTodos() {
  const data = fs.readFileSync(TODO_FILE, "utf-8");
  return JSON.parse(data);
}

function writeTodos(todos) {
  fs.writeFileSync(
    TODO_FILE,
    JSON.stringify(todos, null, 2)
  );
}

function addTodo(task) {
  const todos = readTodos();

  const newTodo = {
    id: Date.now(),
    task: task,
    done: false
  };

  todos.push(newTodo);
  writeTodos(todos);

  console.log("✅ Todo added:", task);
}

function listTodos() {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log("📭 No todos found");
    return;
  }

  todos.forEach((todo, index) => {
    const status = todo.done ? "✅" : "❌";
    console.log(`${index + 1}. ${status} ${todo.task} (id:${todo.id})`);
  });
}

function markDone(id) {
  const todos = readTodos();

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    console.log("❌ Todo not found");
    return;
  }

  todo.done = true;
  writeTodos(todos);

  console.log("🎉 Todo marked as done");
}

function deleteTodo(id) {
  const todos = readTodos();

  const filteredTodos = todos.filter(t => t.id !== id);

  if (filteredTodos.length === todos.length) {
    console.log("❌ Todo not found");
    return;
  }

  writeTodos(filteredTodos);

  console.log("🗑️ Todo deleted");
}

addTodo("Learn fs module");
addTodo("Build todo app");
listTodos();







































// // import sum from './index.js';

// // console.log(sum(1,2))

// import chalk from 'chalk';

// const log = console.log;

// // Combine styled and normal strings
// log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// // Compose multiple styles using the chainable API
// log(chalk.blue.bgRed.bold('Hello world!'));

// // Pass in multiple arguments
// log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// // Nest styles
// log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

// // Nest styles of the same type even (color, underline, background)
// log(chalk.green(
// 	'I am a green line ' +
// 	chalk.blue.underline.bold('with a blue substring') +
// 	' that becomes green again!'
// ));

// // ES2015 template literal
// log(`
// CPU: ${chalk.red('90%')}
// RAM: ${chalk.green('40%')}
// DISK: ${chalk.yellow('70%')}
// `);

// // Use RGB colors in terminal emulators that support it.
// log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
// log(chalk.hex('#DEADED').bold('Bold gray!'));