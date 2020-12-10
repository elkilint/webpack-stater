
    //Referencias HTML

import { Todo } from "../classes";
import {todoList } from "../index";
const divTodoList = document.querySelector('.todo-list');
const textInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {

const htmlTodo =

`
<li class="${ (todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
	<div class="view">
		<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
		<label>${todo.tarea} </label>
		<button class="destroy"></button>
	</div>
    <input class="edit" value="Create a TodoMVC template">
</li>`	

const div = document.createElement('div');

div.innerHTML = htmlTodo;
divTodoList.append (div.firstElementChild);
return div.firstElementChild;

} 

//Eventos

textInput.addEventListener('keyup', (event) => {

  if(event.keyCode === 13 && textInput.value.length > 0 ){

        console.log(textInput.value);
        const nuevoTodo  = new Todo(textInput.value);
        todoList.nuevoTodo (nuevoTodo);
        console.log(todoList); 
        crearTodoHtml(nuevoTodo);
        textInput.value = '';
    }
});

// evento de marcar complatada una tarea

divTodoList.addEventListener('click', (event) => {


const nombreElemento = event.target.localName; //label, boton, input
const todoElemento   = event.target.parentElement.parentElement
const todoId         = todoElemento.getAttribute('data-id');



if (nombreElemento.includes('input')) { // se hizo click en el check?

todoList.marcarCompletado (todoId);
todoElemento.classList.toggle('completed');
}
else if (nombreElemento.includes('button')) { //borrar todo

    todoList.eliminarCompletado (todoId);
    divTodoList.removeChild (todoElemento);

}

});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletado ();

    for (let i = divTodoList.children.length-1; i>=0; i-- ) {

        const elemento = divTodoList.children [i];
        console.log (elemento);

        if (elemento.classList.contains('completed')){

          divTodoList.removeChild (elemento);  
        }
                
    }
})

ulFilters.addEventListener('click', (event) => {

    const filtro =  (event.target.text);
    if (!filtro){
        return; }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');


    for(const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {

            case 'Pendientes' :
                if(completado) {
                    elemento.classList.add('hidden');

                }
                break;

            case 'Completados' :

            if(!completado) {
                elemento.classList.add('hidden');

            }
            break;

        }


    }


        
    });
