"use client";

import { useState, useEffect, useCallback } from 'react';
import TaskList from '@/components/TaskList';
import RewardDisplay from '@/components/RewardDisplay';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const initialTasksData: Omit<Task, 'completed'>[] = [
  { id: 1, name: "8 hr Sleep" },
  { id: 2, name: "Morning Walk" },
  { id: 3, name: "10 min Meditation" },
  { id: 4, name: "10 min Deep Breathing" },
  { id: 5, name: "20-30 min Yoga/Exercise" },
  { id: 6, name: "Plate of Fruit" },
  { id: 7, name: "2-3 ltr Hydration" },
  { id: 8, name: "Reading Books" },
  { id: 9, name: "Limit Screen Time" },
  { id: 10, name: "Journaling" },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Initialize tasks with completed: false on client mount
    // This avoids hydration mismatch if we were to use localStorage later
    setTasks(initialTasksData.map(task => ({ ...task, completed: false })));
  }, []);

  const calculateCompletion = useCallback((currentTasks: Task[]): number => {
    if (currentTasks.length === 0) return 0;
    const completedCount = currentTasks.filter(task => task.completed).length;
    return (completedCount / currentTasks.length) * 100;
  }, []);

  useEffect(() => {
    if (isClient) { // Only run calculation if tasks have been initialized
        setCompletionPercentage(calculateCompletion(tasks));
    }
  }, [tasks, calculateCompletion, isClient]);

  const handleTaskToggle = (taskId: number) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return updatedTasks;
    });
  };

  if (!isClient) {
    // Render a loading state or null on the server to avoid hydration errors with initialTasks
    // Or ensure initialTasks is truly static and not derived from client-only sources
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-8">
        <h1 className="text-4xl font-headline font-bold text-primary text-center my-8">
          HealthXP: Habit Engine
        </h1>
        <p className="text-foreground">Loading tasks...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-background p-4 sm:p-8 font-body">
      <header className="w-full mb-10">
        <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary text-center">
          HealthXP: Habit Engine
        </h1>
      </header>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        <section className="md:w-1/2 w-full">
          <TaskList tasks={tasks} onTaskToggle={handleTaskToggle} />
        </section>
        <section className="md:w-1/2 w-full flex justify-center">
          <RewardDisplay percentage={completionPercentage} />
        </section>
      </div>

      <footer className="mt-12 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} HealthXP. Fuel your habits, energize your life.</p>
      </footer>
    </main>
  );
}
