import { fireEvent, render, screen } from '@testing-library/react-native';

import { TaskRow } from '@/components/tasks/TaskRow';
import type { Task } from '@/types/api';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: 'light' },
}));

const task: Task = {
  id: 1,
  title: 'Buy milk',
  priority: 'HIGH',
  completed: false,
  taskListIds: [1],
};

describe('TaskRow', () => {
  test('renders title and priority badge', () => {
    render(<TaskRow task={task} />);
    expect(screen.getByText('Buy milk')).toBeTruthy();
    expect(screen.getByText('High')).toBeTruthy();
  });

  test('pressing the checkbox toggles completion', () => {
    const onToggle = jest.fn();
    render(<TaskRow task={task} onToggle={onToggle} />);
    fireEvent.press(screen.getByTestId('toggle-task-1'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  test('no checkbox is rendered without onToggle', () => {
    render(<TaskRow task={task} />);
    expect(screen.queryByTestId('toggle-task-1')).toBeNull();
  });
});
