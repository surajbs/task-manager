import "./TaskFilters.css";

const TaskFilters = ({
  filter,
  setFilter,
  sort,
  setSort,
}) => {
  return (
    <div className="task-filters">

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">
          All Tasks
        </option>

        <option value="active">
          Active
        </option>

        <option value="completed">
          Completed
        </option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="newest">
          Newest
        </option>

        <option value="oldest">
          Oldest
        </option>

        <option value="az">
          A - Z
        </option>

        <option value="za">
          Z - A
        </option>
      </select>

    </div>
  );
};

export default TaskFilters;