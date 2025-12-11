// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import SignupLoginModel from './SignupLoginModel';
// import "../css/w3.css";

// describe('SignupLoginModel', () => {
//   it('renders login form without errors', () => {
//     render(<SignupLoginModel isSignUp={false} />);
//     expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
//   });

//   it('renders signup form without errors', () => {
//     render(<SignupLoginModel isSignUp={true} />);
//     expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
//   });

//   it('submits login form', async () => {
//     render(<SignupLoginModel isSignUp={false} />);
//     const emailInput = screen.getByPlaceholderText('Email');
//     const passwordInput = screen.getByPlaceholderText('Password');
//     const submitButton = screen.getByRole('button', { name: 'Submit' });

//     // Mock API response
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         json: () => Promise.resolve({ token: 'mockToken' }),
//       })
//     );

//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(localStorage.getItem('authToken')).toBe('mockToken');
//     });
//   });

//   it('submits signup form', async () => {
//     render(<SignupLoginModel isSignUp={true} />);
//     // Similar to the login form test, simulate user interaction and assert results
//   });

//   // Add more test cases as needed
// });




// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import SignupLoginModel from './SignupLoginModel';

// // Mocking the fetch function
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ token: 'mocked-token' }),
//   })
// );

// describe('SignupLoginModel', () => {
//   test('renders login form without errors', () => {
//     render(
//       <MemoryRouter>
//         <SignupLoginModel isSignUp={false} />
//       </MemoryRouter>
//     );

//     // Test your rendering expectations here
//     expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
//     // expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
//   });

//   test('renders signup form without errors', () => {
//     render(
//       <MemoryRouter>
//         <SignupLoginModel isSignUp={true} />
//       </MemoryRouter>
//     );

//     // Test your rendering expectations here
//     expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
//   });

//   // Add more test cases as needed
// });




import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignupLoginModel from './SignupLoginModel';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';


describe('SignupLoginModel Component', () => {
  test('renders login form without errors', () => {
    const { getByPlaceholderText, getByText } = render
    (
        <BrowserRouter>
        <SignupLoginModel isSignUp={false} />
      </BrowserRouter>);

    // Get input fields
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    // Verify that input fields exist
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Verify that user input is reflected in input fields
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('testpassword');

    // Simulate button click
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    // Assert that the redirection link exists (not testing the actual redirect functionality)
    const redirectLink = getByText('Details Link');
    expect(redirectLink).toBeInTheDocument();
  });

  test('renders sign-up form without errors', () => {
    const { getByPlaceholderText, getByText } = render(
        <BrowserRouter>
        <SignupLoginModel isSignUp={true} />
      </BrowserRouter>);

    // Get input fields
    const userNameInput = getByPlaceholderText('User Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    // Verify that input fields exist
    expect(userNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(userNameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Verify that user input is reflected in input fields
    expect(userNameInput.value).toBe('testuser');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('testpassword');

    // Simulate button click
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    // Assert that the redirection link exists (not testing the actual redirect functionality)
    const redirectLink = getByText('Details Link');
    expect(redirectLink).toBeInTheDocument();
  });
});
