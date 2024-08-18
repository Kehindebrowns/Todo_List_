import inquirer from "inquirer";

interface ansType {
    menuOpt: string,
    todo: string,
}
 
let todos: string[] = [];
let loop: boolean = true;

async function startLoop() {
  while (loop) {
    await displayMenuItem();
  }
}

startLoop();

async function displayMenuItem() {
  const answers1 = await inquirer.prompt([
    {
      type: 'list',
      name: 'menuOpt',
      choices: ['Add Todo item', 'Delete Todo item', 'Exit'],
      message: 'Please select a menu item:'
    }
  ]);

  switch (answers1.menuOpt) {
    case 'Add Todo item': {
      await addTodo();
      break;
    }
    case 'Delete Todo item': {
      await deleteTodo();
      break;
    }
    default: {
      loop = false;
      console.log('Exit Program.');
      break;
    }
  }
}

async function addTodo() {
  const answers2 = await inquirer.prompt([
    {
      type: "input",
      name: "todo",
      message: 'Enter what to do:'
    }
  ]);
  todos.push(answers2.todo);
  console.log(todos);
}

async function deleteTodo() {
  if (todos.length > 0) {
    const answers3 = await inquirer.prompt([
      {
        type: 'list',
        name: 'menuOpt',
        choices: todos,
        message: "Please select a todo to delete"
      }
    ]);

    let i = 0;
    do {
      if (todos[i] === answers3.menuOpt) {
        todos.splice(i, 1);
        break;
      }
      i++;
    } while (i < todos.length);
    
    console.log(todos);
  } else {
    console.log("No todo items to delete");
  }
}
