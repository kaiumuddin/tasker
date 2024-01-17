import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

export default function TaskBoard() {
    const defaultTasks = [
        {
            id: crypto.randomUUID(),
            title: "Learn React",
            description:
                "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
            tags: ["web", "react", "js"],
            priority: "Medium",
            isFavourite: true,
        },
        {
            id: crypto.randomUUID(),
            title: "Learn Next",
            description:
                "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
            tags: ["web", "react", "js"],
            priority: "Medium",
            isFavourite: true,
        },
    ];

    const [tasks, setTasks] = useState(defaultTasks);
    const [showAddModal, setShowAddModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    function handleAddEditTask(newTask, isAdd) {
        if (isAdd) {
            setTasks([...tasks, newTask]);
        } else {
            setTasks(
                tasks.map((task) => {
                    if (task.id === newTask.id) {
                        return newTask;
                    }
                    return task;
                })
            );

            setTaskToUpdate(null);
        }
        setShowAddModal(false);
    }

    function handleEditTask(task) {
        setTaskToUpdate(task);
        setShowAddModal(true);
    }

    function handleDeleteTask(taskToDelete) {
        const tasksAfterDelete = tasks.filter(
            (task) => task.id !== taskToDelete.id
        );
        setTasks(tasksAfterDelete);
    }
    function handleDeleteAll() {
        setTasks([]);
    }

    function handleCloseClick() {
        setTaskToUpdate(null);
        setShowAddModal(false);
    }

    function handleFavourite(favTask) {
        const newTasks = [...tasks];
        const favTaskIndex = newTasks.findIndex(
            (task) => task.id === favTask.id
        );
        newTasks[favTaskIndex].isFavourite =
            !newTasks[favTaskIndex].isFavourite;
        setTasks(newTasks);
    }

    function handleSearch(searchTerm) {
        console.log(searchTerm);

        const filtered = tasks.filter((task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setTasks(filtered);
    }

    return (
        <section className="mb-20" id="tasks">
            {showAddModal && (
                <AddTaskModal
                    onSave={handleAddEditTask}
                    taskToUpdate={taskToUpdate}
                    onCloseClick={handleCloseClick}
                />
            )}
            <div className="container">
                <div className="p-2 flex justify-end">
                    <SearchTask onSearch={handleSearch} />
                </div>
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskActions
                        onAddClick={() => setShowAddModal(true)}
                        onDeleteAllClick={handleDeleteAll}
                    />
                    {tasks.length > 0 ? (
                        <TaskList
                            tasks={tasks}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                            onFav={handleFavourite}
                        />
                    ) : (
                        <NoTaskFound />
                    )}
                </div>
            </div>
        </section>
    );
}
