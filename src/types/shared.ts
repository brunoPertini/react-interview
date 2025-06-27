export type TodoItem = {
    id: number,
    name: string,
    isCompleted: boolean,
}

export type TodoListProps = {
    items: TodoItem[],
    onItemAdd: (item: string) => void,
    handleSetCompleted: (id: number, isCompleted: boolean) => void,
    handleItemUpdate: (id: number, newValue: string) => Promise<void>,
    handleItemDelete: (id: number) => Promise<void>,
}

export enum AppMode {
    APP_MODE_READ = "APP_MODE_READ",
    APP_MODE_EDIT_DELETE = "APP_MODE_EDIT_DELETE",
}