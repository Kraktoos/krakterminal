let currentPath = '/home/kraktoos/';

const paths = {
  '/': {
    'children': {
      'home/': {
        'children': {
          'kraktoos/': {
            'children': {
              'about.txt': {
                'content': 'I am hacker'
              },
              'contact.txt': {
                'content': 'email: NAH LOL'
              },
              'projects/': {
                'children': {
                  'project1.txt': {
                    'content': 'Project 1',
                  },
                  'project2.txt': {
                    'content': 'Project 2',
                  },
                  'project3.txt': {
                    'content': 'Project 3',
                  },
                  'test/': {
                    'children': {
                      'test1.txt': {
                        'content': 'Test 1',
                      },
                      'test2.txt': {
                        'content': 'Test 2',
                      },
                    }
                  }
                }
              },
            },
          },
        }
      },
      'passwords.txt': {
        'content': '1234567890\nqwerty\nasdfghjkl\nzxcvbnm\nadmin'
      },
    }
  }
}

const getCurrentPathData = () => {
  let path = currentPath.split('/').filter(String);
  if (currentPath !== '/') {
    console.log(path);
    path.forEach((item, index) => {
      path[index] += '/';
    });
  }
  path.unshift('/');
  let pathData = paths[path[0]];
  console.log(pathData)
  for (let i = 0; i < path.length - 1; i++) {
    if (path[i] !== '') {
      pathData = pathData['children'][path[i + 1]];
    }
  }
  return pathData;
}

checkType = (path) => {
  if (path.endsWith('/')) {
    return 'directory';
  }
  else if (path.split('.').pop() === 'txt') {
    return 'file';
  }
  return;
}

const commands = {
  'cd': function (directory) {
    const type = checkType(directory);
    if (directory === '..') {
      if (currentPath === '/') {
        console.log('You can\'t fall down the floor into hell! You\'re already in the root directory');
      } else {
        currentPath === '/home/' ? currentPath = '/' : currentPath = '/' + currentPath.split('/').filter(String).slice(0, -1).join('/') + '/';
      }
    } else {
      if (type === 'directory' && getCurrentPathData()['children'][directory]) {
        currentPath += directory;
      }
      else if (type !== 'file') {
        if (getCurrentPathData()['children'][directory + '/']) {
          currentPath += directory + "/";
        } else {
          console.log('No such directory. If you want to enter a file, use `cat` command');
        }
      }
      else {
        console.log('No such directory. If you want to enter a file, use `cat` command');
      }
    }
    this.pwd();
  },
  'ls': function () {
    let keys = Object.keys(getCurrentPathData()['children']);
    for (let i = 0; i < keys.length; i++) {
      let message = keys[i]
      console.log(message);
    }
  },
  'pwd': function () {
    console.log(currentPath);
  },
  'help': function () {
    console.log('cd, ls, cat, pwd, help');
  },
  'cat': function (file) {
    if (getCurrentPathData()['children'][file] && checkType(file) === 'file') {
      console.log(getCurrentPathData()['children'][file]['content']);
    } else {
      console.log('No such file');
    }
  },
  'clear': function () {
    console.clear();
  },
  'tree': function () {
    printTree(getCurrentPathData());
  },
  'echo': function (message) {
    console.log(message);
  },
  'tictactoe': function () {
    console.log('Tic Tac Toe');
  },
}

function printTree(data, depth = 0) {
  let isLastChild = false;
  const keys = Object.keys(data.children);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (i === keys.length - 1) {
      isLastChild = true;
    }
    const value = data.children[key];
    console.log(' '.repeat(depth * 4) + (depth > 0 ? (isLastChild ? '└───' : '├───') : '') + key);
    if (value.children) {
      printTree(value, depth + 1);
    }
  }
}


const terminal_input = document.getElementsByClassName('terminal-input')[0];

terminal_input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const command = terminal_input.value.split(' ');
    if (command[0] in commands) {
      commands[command[0]](command[1]);
    } else {
      console.log('No such command');
    }
    terminal_input.value = '';
  }
});

// check for the terminal_input text value change
terminal_input.addEventListener('input', function (event) {
  terminal_input.setAttribute('size', terminal_input.value.length);
});