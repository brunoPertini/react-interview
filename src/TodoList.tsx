import { useMemo, useState } from "react";
import { AppMode, TodoListProps } from "./types/shared"
import EditableToDoList from "./EditableTodoList";
import { Separator } from "./Separator";

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
              <Separator />
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

  return <EditableToDoList items={items}
    handleItemUpdate={handleItemUpdate}
    handleItemDelete={handleItemDelete}
    setAppMode={setAppMode} />
}