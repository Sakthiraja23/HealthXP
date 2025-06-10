"use client";

import type { Task } from '@/app/page'; // Assuming Task interface is in page.tsx or a shared file
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskToggle }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-center text-primary">Daily Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-colors duration-150">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => onTaskToggle(task.id)}
                aria-labelledby={`label-task-${task.id}`}
              />
              <Label
                htmlFor={`task-${task.id}`}
                id={`label-task-${task.id}`}
                className={cn(
                  "text-base cursor-pointer flex-grow",
                  task.completed ? "line-through text-muted-foreground" : "text-foreground"
                )}
              >
                {task.name}
              </Label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TaskList;
