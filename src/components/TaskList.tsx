'use client';

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
import { Task } from '@prisma/client';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data: session } = useSession()

  useEffect(() => {
    const fetchTasks = async () => {
      if (session) {
        const response = await fetch('/api/tasks');
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        }
      }
    };

    fetchTasks();
  }, [session]);

  if (!session) {
    return <div>Please sign in to view tasks</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2 p-2 border rounded">
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}