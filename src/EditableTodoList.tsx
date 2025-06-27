import { AppMode, CompletableTodoListProps } from "./types/shared";

export default function EditableToDoList({ items, setAppMode, handleItemUpdate, handleItemDelete}: CompletableTodoListProps) {

    const handleOnEditItem = (id: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          const newValue = (event.target as HTMLInputElement).value;
          handleItemUpdate(id, newValue).finally(() => setAppMode(AppMode.APP_MODE_READ));
        }
      }
    
      const handleOnDeleteItem = (id: number) => {
        handleItemDelete(id).finally(() => setAppMode(AppMode.APP_MODE_READ));
      }

    return (
        <div className="row">
          <div className="column">
            <h2>To complete item edition, press enter after editing some. To delete, click on delete</h2>
            {items.map((item) => (
              <div className="row row-centered">
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