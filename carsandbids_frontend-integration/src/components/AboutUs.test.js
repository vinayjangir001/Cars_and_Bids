// import React from 'react';
// import { render } from '@testing-library/react';
// import AboutUs from './AboutUs';
// import '@testing-library/jest-dom/extend-expect';


// describe('AboutUs Component', () => {
//   test('renders about us page with mocked data', () => {
//     const { getByText } = render(<AboutUs />);
    
//     // Assert header and description
//     const header = getByText("What's Cars & Bids?");
//     expect(header).toBeInTheDocument();
//     const description = getByText(/The 505-horsepower Alfa Romeo Giulia/);
//     expect(description).toBeInTheDocument();

//     // Assert about section
//     const aboutHeader = getByText('About US');
//     expect(aboutHeader).toBeInTheDocument();
//     const aboutContent = getByText(/Over the last few years, many car enthusiasts/);
//     expect(aboutContent).toBeInTheDocument();

//     // Assert how it works section
//     const howItWorksHeader = getByText('How it works');
//     expect(howItWorksHeader).toBeInTheDocument();
//     const howItWorksContent = getByText(/Buying a Car Once you’ve found a car you’re interested in/);
//     expect(howItWorksContent).toBeInTheDocument();

//     // Add more assertions if needed
//   });
// });



import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this line

import AboutUs from './AboutUs'; // Update the path if needed

describe('AboutUs Component', () => {
  test('testing total component with data', () => {
    const { getByText } = render(<AboutUs />);
    
    // Assert header and description
    const header = getByText("What's Cars & Bids?");
    expect(header).toBeInTheDocument();
    
    const description = getByText(/The 505-horsepower Alfa Romeo Giulia/);
    expect(description).toBeInTheDocument();
  });
});



describe('AboutUs Component', () => {
  test('renders all detail with data', () => {
    const { getByText } = render(<AboutUs />);
    
    // Assert header and description
    const header = getByText("What's Cars & Bids?");
    expect(header).toBeInTheDocument();
    const description = getByText(/The 505-horsepower Alfa Romeo Giulia/);
    expect(description).toBeInTheDocument();

    // Assert about section
    const aboutHeader = getByText('About US');
    expect(aboutHeader).toBeInTheDocument();
    const aboutContent = getByText(/Over the last few years, many car enthusiasts/);
    expect(aboutContent).toBeInTheDocument();

    // Assert how it works section
    const howItWorksHeader = getByText('How it works');
    expect(howItWorksHeader).toBeInTheDocument();
    const howItWorksContent = getByText(/Buying a Car Once you’ve found a car you’re interested in/);
    expect(howItWorksContent).toBeInTheDocument();

    // Add more assertions if needed
  })
})
