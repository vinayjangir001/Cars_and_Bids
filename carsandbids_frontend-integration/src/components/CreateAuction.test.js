// import React from 'react';
// import { render, fireEvent, waitFor, screen } from '@testing-library/react';
// import CreateAuction from './CreateAuction'; // Adjust the import path as needed

// describe('CreateAuction Component', () => {
//   test('renders form inputs and buttons', () => {
//     render(<CreateAuction />);
    
//     // Test for the presence of specific input fields and buttons
//     expect(screen.getByLabelText('User ID:')).toBeInTheDocument();
//     expect(screen.getByLabelText('Email:')).toBeInTheDocument();
//     // ... repeat for other input fields
//     expect(screen.getByLabelText('Car Images:')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
//   });

//   test('handles form submission correctly', async () => {
//     // Mock fetch calls
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         json: () => Promise.resolve({ auctionId: '123' }),
//       })
//     );
    
//     render(<CreateAuction />);

//     // Fill out the form inputs
//     fireEvent.change(screen.getByLabelText('User ID:'), { target: { value: 'user123' } });
//     // ... repeat for other input fields
    
//     // Submit the form
//     fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
//     // Wait for fetch calls to finish
//     await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    
//     // Assert that the auction ID and form data are displayed
//     expect(screen.getByText('Auction ID: 123')).toBeInTheDocument();
//     expect(screen.getByText('User ID: user123')).toBeInTheDocument();
//     // ... assert for other form data
//   });

//   // Add more test cases as needed
// });



import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateAuction from './CreateAuction'; // Adjust the import path as needed

describe('CreateAuction Component', () => {
  test('renders form inputs and buttons', () => {
    const { getByLabelText, getByRole } = render(<CreateAuction />);

    // Test for the presence of specific input fields and buttons
    expect(getByLabelText('userId:')).toBeInTheDocument();
    expect(getByLabelText('email:')).toBeInTheDocument();
    // ... repeat for other input fields
    expect(getByLabelText('Car Images:')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('handles form input changes', () => {
    const { getByLabelText } = render(<CreateAuction />);

    // Simulate user input changes
    fireEvent.change(getByLabelText('userId:'), { target: { value: 'user123' } });
    fireEvent.change(getByLabelText('email:'), { target: { value: 'test@example.com' } });
    // ... repeat for other input fields

    // Assert that input values have changed
    expect(getByLabelText('userId:')).toHaveValue('user123');
    expect(getByLabelText('email:')).toHaveValue('test@example.com');
    // ... assert for other input fields
  });

  test('handles form submission', () => {
    const { getByLabelText, getByRole, queryByText } = render(<CreateAuction />);

    // Simulate user input changes
    fireEvent.change(getByLabelText('userId:'), { target: { value: 'user123' } });
    // ... repeat for other input fields

    // Simulate form submission
    fireEvent.click(getByRole('button', { name: 'Submit' }));

    // Assert that the submitted form data is displayed
    expect(queryByText('userId: user123')).toBeInTheDocument();
    // ... assert for other form data
  });

  // Add more test cases as needed
});
