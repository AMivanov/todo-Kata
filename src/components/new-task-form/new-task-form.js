import './new-task-form.css'

const NewTaskForm = () => {
    return (
          <form className='header'>
              <h1>todos</h1>
              <input type="text"
                     className='new-todo'
                     placeholder='What needs to be done?'
                     autoFocus/>
          </form>
    );
};

export default NewTaskForm;