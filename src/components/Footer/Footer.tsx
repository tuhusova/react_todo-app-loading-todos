import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';
import cs from 'classnames';
import { ErrorType } from '../../types/Error';




interface Props {
  todos: Todo[];
  filterBy: FilterType;
  setFilterBy: (filter: FilterType) => void;
  error: ErrorType | null;
  setError: (error: ErrorType | null) => void;
  clearCompleted: () => void;
}


export const Footer: React.FC<Props> = ({ todos, filterBy, setFilterBy, error, setError, clearCompleted }) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const handleFilterClick = (filter: FilterType) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setFilterBy(filter);
  }

  const handleHideError = () => {
    setError(null);
  };




  return (
    <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
    </span>

    {/* Active link should have the 'selected' class */}
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
          className={cs("filter__link", { selected: filterBy === 'all' } )}
          data-cy="FilterLinkAll"
          onClick={handleFilterClick(FilterType.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cs("filter__link", { selected: filterBy === 'active' } )}
          data-cy="FilterLinkActive"
          onClick={handleFilterClick(FilterType.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cs("filter__link", { selected: filterBy === 'completed' } )}
          data-cy="FilterLinkCompleted"
          onClick={handleFilterClick(FilterType.Completed)}
      >
        Completed
      </a>
      </nav>

      {/* Кнопка очищения завершенных задач должна быть отключена, если нет завершенных */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
        onClick={clearCompleted}
      >
        Clear completed
      </button>

    {/* this button should be disabled if there are no completed todos */}
    {error && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={handleHideError}
          />
          {error}
        </div>
      )}
  </footer>
  )
}
