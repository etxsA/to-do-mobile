import { useQuery } from '@tanstack/react-query';

import { getTasksByList, getTodayTasks } from '@/services/task.service';
import { taskKeys } from '@/utils/queryKeys';

/** Incomplete tasks due today (Home "Due Today"). */
export function useToday() {
  return useQuery({
    queryKey: taskKeys.today(),
    queryFn: getTodayTasks,
  });
}

/** Tasks belonging to a list (list detail screen). */
export function useTasksByList(listId: number) {
  return useQuery({
    queryKey: taskKeys.byList(listId),
    queryFn: () => getTasksByList(listId),
    enabled: Number.isFinite(listId) && listId > 0,
  });
}
