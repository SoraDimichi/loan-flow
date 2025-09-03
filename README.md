# Loan Flow Application Documentation

Loan Flow is a multi-step loan application form built with React.

## Live Demo

You can view the live application at: [https://soradimichi.github.io/loan-flow](https://soradimichi.github.io/loan-flow)

## Application Structure

The application consists of three main steps:

1. **Personal Information** - Collects basic user details:
   - Phone number
   - First name
   - Last name
   - Gender

2. **Address and Workplace** - Collects:
   - Workplace information
   - Residential address

3. **Loan Parameters** - Allows users to:
   - Select loan amount (200-1000$)
   - Choose loan term (10-30 days)

## Technical Details

- **Frontend Framework**: React with TypeScript
- **Routing**: React Router v7
- **Form Handling**: React Hook Form with Zod validation
- **Component library**: Shardcn
- **Deployment**: GitHub Pages

## Form Validation

Each step includes validation rules:

- Personal information validates phone numbers, names, and requires gender selection
- Address information requires workplace selection and address entry
- Loan parameters have min/max constraints for amount and term

## Navigation Flow

The application enforces a sequential flow:

- Users must complete the personal information before proceeding to address
- Address information must be completed before configuring loan parameters
- Form data is preserved in localStorage api between steps

## Development

To run the application locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`.
