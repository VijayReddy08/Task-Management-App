# Task Management App

A simple Task Management App built with Next.js. This application allows users to add, edit, delete, and mark tasks as completed. Tasks can be sorted by priority (high, medium, low), and completed tasks are displayed at the bottom of the list.

## Features

- Add a new task with title, description, and priority.
- Edit existing tasks.
- Delete tasks.
- Mark tasks as completed.
- Dynamically sort tasks by priority.
- Display completed tasks at the bottom of the list.

## Technologies Used

- Next.js
- React
- CSS

## Setup Instructions

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-management-app.git
   ```
2. Navigate to the project directory:

- cd task-management-app

3. Install the dependencies:

- npm install

4. Start the development server:

- npm run dev

5. Open your browser and go to http://localhost:3000 to view the app.

## Sorting Tasks by Priority

The application sorts tasks based on their priority levels (high, medium, low) before rendering them. The sorting logic works as follows:

- Task Separation: Tasks are divided into two categories: pending tasks and completed tasks.
- Priority Sorting: The pending tasks are sorted by priority using a defined order:
  - High priority tasks are displayed first.
  - Medium priority tasks are next.
  - Low priority tasks are displayed last.
- Completed Tasks: After listing the sorted pending tasks, completed tasks are displayed at the bottom of the list, ensuring that users can focus on tasks needing attention first.
  This approach allows for an organized view of tasks based on urgency while keeping completed tasks accessible but visually distinct.

### Notes

- Make sure to replace `your-username` with your actual GitHub username in the clone command.
- You can customize any sections as per your preferences or add more details if necessary.

Feel free to let me know if you need anything else!

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
