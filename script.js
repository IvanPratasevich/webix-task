/*Test task WA 2021
Функционал на уровне JS :
1. Метод для получения списка тегов: todo.getListOfTags
2. Метод для установки нового списка тэгов вместо предыдущего: todo.changeListOfTags = "tags"
Пример: todo.changeListOfTags = "a b c d"
3. Метод для добавления тега:   todo.addTagsFromList([tags])
Пример: todo.addTagsFromList = "boy red apple 125"
4. Метод для создания readonly mode: todo.readonly = mode
Пример:
1 todo.readonly = 'on' - блокируется возможность изменять тэги
2 todo.readonly ='off' - включается возможность изменять тэги*/


let tags = [];
let tagsFromList = [];
let tagsArray2 = [];
let counter = -1;
let tagsArray = [];
let mode = '';
let tagsArrayLocalStorage = [];
let example = 'car man boy video';
const todo = {
  action() {
    let deleteTags = document.querySelectorAll('.delete');
    if (document.querySelector('#create-tag').value.length == 0) {
      alert('Please enter at least one tag');
    }
    this.add();
  },
  add() {
    let tagsArray = document.querySelector('#create-tag').value.split(' ');
    let tagsArray3 = document.querySelector('#create-tag').value.split(' ');
    if (tagsArray2.length !== 0) {
      localStorage.clear();
      tagsArray = tagsArray2;
      tagsArray3.forEach(function(item, i, arr) {
        tagsArray.push(item);
      });
      document.querySelector('#tags').innerHTML = '';
      tags = [];
    } else {
      if (tagsArrayLocalStorage.length !== 0) {
        tagsArray.forEach(function(item, i, arr) {
          tagsArrayLocalStorage.push(item);
        });
        localStorage.setItem('todo', JSON.stringify(tagsArrayLocalStorage));
      }
    }
    document.querySelector('#create-tag').value = '';
    this.create(tagsArray);
  },
  create(tagsArray) {
    tagsArray.forEach(function(item, i, arr) {
      if (item === "") {
        arr.splice(i, 1);
      } else {
        tags.push(item);
        counter += 1;
        document.querySelector('#tags').innerHTML +=
          `
            <div id="tag" data-size="${item}">
                <span id="tag-name">${item}</span>
                <button data-num="${counter}" class="delete-btn" onclick="todo.delete(event)"></button>
            </div>
        `;
      }
    });
    localStorage.setItem('todo', JSON.stringify(tags));
  },
  delete() {
    let target = event.target.parentNode;
    let button = event.target;
    let targetTag = target.dataset.size;
    let deleteItem = target.dataset.size;
    tags.splice(button.dataset.num, 1);
    event.target.parentNode.style.cssText = `animation: tag-animation 1s linear; `;
    setTimeout(function() {
      target.remove();
      let tagsSearch = JSON.parse(localStorage.getItem('todo'));
      tagsSearch.forEach(function(item, i, arr) {
        if (item == `${targetTag}`) {
          arr.splice(i, 1);
          tags.splice(i, 1);
        }
      });
      tagsArrayLocalStorage.forEach(function(item, i, arr) {
        if (item == `${targetTag}`) {
          arr.splice(i, 1);
        }
      });
      tagsArray.forEach(function(item, i, arr) {
        if (item == `${targetTag}`) {
          arr.splice(i, 1);
        }
      });
      localStorage.clear();
      localStorage.setItem('todo', JSON.stringify(tagsSearch))
      tags = tagsSearch;
    }, 980);
  },
  init() {
    tagsArray = []
    if (localStorage.getItem('todo') != undefined) {
      tagsArray = JSON.parse(localStorage.getItem('todo'));
      tagsArrayLocalStorage = JSON.parse(localStorage.getItem('todo'));
    }
    if (tagsArray.length !== 0) {
      this.create(tagsArray)
    }
  },
  set changeListOfTags(values) {
    document.querySelector('#tags').innerHTML = '';
    tagsArray = values.split(' ');
    tagsArray2 = tagsArray;
    localStorage.setItem('todo', JSON.stringify(tagsArray));
    this.createTagsFromList(tagsArray);
  },
  set addTagsFromList(tagsArray) {
    localStorage.clear();
    localStorage.setItem('todo', JSON.stringify(tagsArrayLocalStorage))
    tagsArray = tagsArray.split(' ');
    this.create(tagsArray);
  },
  createTagsFromList(tagsArray) {
    tagsArray.forEach(function(item, i, arr) {
      if (item === "") {
        arr.splice(i, 1);
      } else {
        tagsFromList.push(item);
        counter += 1;
        document.querySelector('#tags').innerHTML +=
          `
            <div id="tag" data-size="${item}">
                <span id="tag-name">${item}</span>
                <button data-num="${counter}" class="delete-btn" onclick="todo.delete(event)"></button>
            </div>
        `;
      }
    });
    localStorage.clear();
    localStorage.setItem('todo', JSON.stringify(tagsFromList));
    tagsFromList = [];
  },
  set readonly(mode){
    let btn = document.getElementById('add-btn');
    let input = document.getElementById('create-tag');
    if(mode === 'on'){
      return btn.disabled = true, input.style.cssText = `background: red; border: 2px solid gray`,input.placeholder="", input.readOnly = true, btn.style.cssText = `background: red; border: 2px solid gray; color:white`,document.querySelector('#tags').innerHTML = "",localStorage.clear()
    } 
    if(mode === 'off'){
      return btn.disabled = false, input.style.cssText = ``, input.placeholder="Add tags",input.readOnly = false, btn.style.cssText = ``,document.querySelector('#tags').innerHTML = "",tags = [] 
    }
  },
  get getListOfTags(){
    let listOfTags = JSON.parse(localStorage.getItem('todo'));
    return console.log(listOfTags) 
  }
};
todo.init()
window.addEventListener('keypress', event => {
  if (event.keyCode == 13) {
    todo.action();
  }
})