'use client';

import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { SessionProvider } from "next-auth/react"


export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">VBS Task Manager</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <SessionProvider>
            <TaskList />
          </SessionProvider>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
          <TaskForm />
        </div>
      </div>
    </main>
  );
}