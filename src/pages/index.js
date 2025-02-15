// import Head from "next/head";
// import Image from "next/image";
// import localFont from "next/font/local";
// import styles from "@/styles/Home.module.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <div
//         className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
//       >
//         <main className={styles.main}>
//           <Image
//             className={styles.logo}
//             src="https://nextjs.org/icons/next.svg"
//             alt="Next.js logo"
//             width={180}
//             height={38}
//             priority
//           />
//           <ol>
//             <li>
//               Get started by editing <code>src/pages/index.js</code>.
//             </li>
//             <li>Save and see your changes instantly.</li>
//           </ol>

//           <div className={styles.ctas}>
//             <a
//               className={styles.primary}
//               href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Image
//                 className={styles.logo}
//                 src="https://nextjs.org/icons/vercel.svg"
//                 alt="Vercel logomark"
//                 width={20}
//                 height={20}
//               />
//               Deploy now
//             </a>
//             <a
//               href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//               className={styles.secondary}
//             >
//               Read our docs
//             </a>
//           </div>
//         </main>
//         <footer className={styles.footer}>
//           <a
//             href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               aria-hidden
//               src="https://nextjs.org/icons/file.svg"
//               alt="File icon"
//               width={16}
//               height={16}
//             />
//             Learn
//           </a>
//           <a
//             href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               aria-hidden
//               src="https://nextjs.org/icons/window.svg"
//               alt="Window icon"
//               width={16}
//               height={16}
//             />
//             Examples
//           </a>
//           <a
//             href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               aria-hidden
//               src="https://nextjs.org/icons/globe.svg"
//               alt="Globe icon"
//               width={16}
//               height={16}
//             />
//             Go to nextjs.org →
//           </a>
//         </footer>
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from "react";

// Define the initial list of tasks using an array
const initialTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Complete the project",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Buy groceries",
    priority: "medium",
    completed: false,
  },
  {
    id: 3,
    title: "Task 3",
    description: "Clean the house",
    priority: "low",
    completed: true,
  },
];

// Server-side rendering function
export async function getServerSideProps() {
  return {
    props: {
      initialTasks,
    },
  };
}

export default function Home({ initialTasks }) {
  const [taskList, setTaskList] = useState(initialTasks);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "low",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    priority: "low",
  });

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTaskList(savedTasks);
    }
  }, []);

  // Save tasks to local storage whenever taskList changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  // Function to add a new task
  const addTask = () => {
    if (!newTask.title || !newTask.description)
      return alert("Title or Description field can't be empty!"); // Basic validation
    const newTaskData = { ...newTask, id: Date.now(), completed: false };
    setTaskList([...taskList, newTaskData]);
    setNewTask({ title: "", description: "", priority: "low" });
  };

  // Function to toggle task completion
  const toggleCompletion = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  // Start editing a task
  const startEditing = (task) => {
    setIsEditing(task.id);
    setEditForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });
  };

  // Save the edited task
  const saveEdit = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...editForm, id, completed: task.completed } : task
      )
    );
    setIsEditing(null);
  };

  // Sort tasks by priority and filter by search term
  const filteredTasks = taskList
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  // Separate tasks into completed and pending
  const pendingTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  // Combine them with pending tasks first
  const sortedTasks = [...pendingTasks, ...completedTasks];

  // Sort tasks by priority for pending tasks
  const sortedPendingTasks = pendingTasks.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div>
      <h1>Task Manager</h1>
      <div>
        <label htmlFor="search-tasks">Search: </label>
        <input
          type="text"
          id="search-tasks"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <div className="title">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
        </div>
        <div className="description">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
        </div>
        <div className="priority">
          <label htmlFor="priority">Priority: </label>
          <select
            id="priority"
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {sortedPendingTasks.map((task) => (
          <li key={task.id} className={`priority-${task.priority}`}>
            {isEditing === task.id ? (
              <div>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
                <select
                  value={editForm.priority}
                  onChange={(e) =>
                    setEditForm({ ...editForm, priority: e.target.value })
                  }
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button onClick={() => saveEdit(task.id)}>Save</button>
                <button onClick={() => setIsEditing(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <button onClick={() => toggleCompletion(task.id)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <button onClick={() => startEditing(task)}>Edit</button>
              </div>
            )}
          </li>
        ))}
        {/* Render completed tasks at the bottom */}
        {completedTasks.map((task) => (
          <li key={task.id} className={`priority-${task.priority}`}>
            <h3>{task.title} (Completed)</h3>
            <p>{task.description}</p>
            <button onClick={() => toggleCompletion(task.id)}>Undo</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => startEditing(task)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
