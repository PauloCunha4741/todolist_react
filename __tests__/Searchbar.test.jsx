import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import TodoList from '../pages/index';

describe('TodoList Search Bar', () => {
  it('filters tasks based on search input', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
      { id: 3, title: 'Task 3', completed: false },
      { id: 4, title: 'Task 4', completed: false },
    ];

    // Mock the fetch function globally
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTasks),
      })
    );

    render(<TodoList />);

    const searchInput = screen.getByTestId('filterTaskTitle');

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'Task' } });
    });

    const filteredTasks = screen
      .queryAllByTestId('incompleted')

    expect(filteredTasks).toHaveLength(3);
  });
});
