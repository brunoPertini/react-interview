import { useMemo, useState } from "react";
import { AppMode, TodoListProps } from "./types/shared"

export default function TodoList({ items,
  onItemAdd,
  handleItemUpdate,
  handleItemDelete, handleSetCompleted }: TodoListProps) {
  const [newItemValue, setNewItemValue] = useState<string>("");
  const [appMode, setAppMode] = useState<AppMode>(AppMode.APP_MODE_READ);

  const handleSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemValue(event.target.value);
  }

  const onItemAdded = (item: string) => {
    onItemAdd(item);
    setNewItemValue("");
  }

  const handleOnEditItem = (id: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const newValue = (event.target as HTMLInputElement).value;
      handleItemUpdate(id, newValue).finally(() => setAppMode(AppMode.APP_MODE_READ));
    }
  }

  const handleOnDeleteItem = (id: number) => {
    handleItemDelete(id).finally(() => setAppMode(AppMode.APP_MODE_READ));
  }

  const handleOnCheckboxChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const isCompleted = event.target.checked;
    handleSetCompleted(id, isCompleted);
  }

  const renderAsReadMode = useMemo(() => appMode === AppMode.APP_MODE_READ, [appMode]);

  if (renderAsReadMode) {
    return <div className="row">
      <div className="column">
        <h2>Todo List</h2>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <label>
                Is completed:
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={(event) => handleOnCheckboxChange(item.id, event)}
                />
              </label>
            </div>
          )
        })
        }
      </div>
      <div className="column">
        <div className="column">
          <h2>Add a new one</h2>
          <input type="text" placeholder="New todo item" onChange={handleSetValue} value={newItemValue} />
          <button onClick={() => onItemAdded(newItemValue)} disabled={!newItemValue}>Add</button>
        </div>
        <div className="column">
          <h2>Enable edit/delete mode</h2>
          <button onClick={() => setAppMode(AppMode.APP_MODE_EDIT_DELETE)}>Enable</button>
        </div>
      </div>
    </div>
  }

  return (
    <div className="row">
      <div className="column">
        <h2>To complete item edition, press enter after editing some. To delete, click on delete</h2>
        {items.map((item) => (
          <div className="row">
            <input
              className="input"
              defaultValue={item.name}
              key={item.id}
              onKeyDown={(event) => handleOnEditItem(item.id, event)} />
            <span className="link" onClick={() => handleOnDeleteItem(item.id)}>Delete</span>
          </div>
        ))}
      </div>
      <div className="column">
        <button onClick={() => setAppMode(AppMode.APP_MODE_READ)}>Go back to Read Mode</button>
      </div>
    </div>
  );
}