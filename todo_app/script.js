const createTodoElementTemplate = (content) => {
    return `
    <div class="todo-element">
        <input class="todo-content" value="${content}" disabled>
        <div class="flex-nowrap">
            <i class="far fa-check-circle color-green done icon"></i>
            <i class="fas fa-edit color-blue edit icon"></i>
            <i class="fas fa-trash-alt color-red delete icon"></i>
        </div>
    </div>
    `;
}

const addBtn = document.querySelector('.add');
const timeBtn = document.querySelector('.time');
const removeAllBtn = document.querySelector('.remove-all');
const checkAllBtn = document.querySelector('.check-all');
const dropdownContent = document.querySelector('.dropdown-content');

addBtn.addEventListener('click', () => {
    const listParent = document.querySelector('ol');
    const addInput = document.querySelector('.add-todo-input');
    const newTodo = document.createElement('li');
    const content = addInput.value + " - Time: " + addInput.getAttribute('data-time');
    newTodo.innerHTML = createTodoElementTemplate(content);

    const doneBtn = newTodo.querySelector('.done');
    const deleteBtn = newTodo.querySelector('.delete');
    const editBtn = newTodo.querySelector('.edit');

    deleteBtn.addEventListener('click', () => {
        listParent.removeChild(newTodo);
    });
    doneBtn.addEventListener('click', () => {
        if(doneBtn.classList.contains('fas')){
            doneBtn.classList.remove('fas');
            doneBtn.classList.add('far');
        }
        else {
            doneBtn.classList.remove('far');
            doneBtn.classList.add('fas');
        }
    });
    editBtn.addEventListener('click', () => {
        const input = newTodo.querySelector('.todo-content');
        input.disabled = false;
        input.addEventListener('blur', () => {
            input.disabled = true;
            if(input.value === ""){
                listParent.removeChild(newTodo);
            }
        });
        input.select();
    });

    listParent.appendChild(newTodo);
})

removeAllBtn.addEventListener('click', () => {
    document.querySelector('ol').innerHTML = "";
});

checkAllBtn.addEventListener('click', () => {
    const allTodos = document.querySelector('ol').querySelectorAll('.done');
    
    for(let todo of allTodos) {
        todo.classList.remove('far');
        todo.classList.add('fas');
    }
});

for(let i = 0; i < 13; i++){
    const btnEvent = (button, time) => {
        return (...args) => {
            document.querySelector('.add-todo-input')
            .setAttribute('data-time',`${time}:00 ${button.innerText}`);
            document.querySelector('.time').innerText = `${time}:00 ${button.innerText}`;
        };
    };

    const childDropdownParent = document.createElement('div');
    const childDropdownContent = document.createElement('div');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');

    btn1.classList.add('sub-element');
    btn2.classList.add('sub-element');
    btn1.innerText = 'AM';
    btn2.innerText = 'PM';
    childDropdownContent.append(btn1, btn2);
    childDropdownParent.classList.add('dropdown-sub-parent');
    childDropdownContent.classList.add('dropdown-sub-content');
    childDropdownContent.classList.add('sub-dropdown');
    childDropdownParent.innerHTML = `${i}`;
    childDropdownParent.appendChild(childDropdownContent);
    dropdownContent.appendChild(childDropdownParent);
    btn1.addEventListener('click', btnEvent(btn1,i));
    btn2.addEventListener('click', btnEvent(btn2,i));
}
