##Parking Management Solution Overview##

I am developing a Parking Management Solution using a monorepo architecture. The project includes four frontend applications, and it is built with a strong focus on scalability and efficiency. Here are the key features and technologies:
Key Features:
* User Authentication: Users can log in using their credentials or via Google authentication.
* Garage Search: Users can search for garages on the map through three main methods:
    1. Map-based Search: As users move the map, the system fetches nearby garages based on the map's latitude and longitude.
    2. Date-based Filtering: Users can filter garages based on specific dates.
    3. Advanced Filtering: Users can filter garages by vehicle type, price per hour, width, and height.
* Additional Features: The application is continuously evolving, with more features being added as development progresses.
Technology Stack:
* Backend (BE): Built using NestJS, supporting both REST and GraphQL APIs. On the frontend, GraphQL is primarily used for data fetching.
* Frontend (FE):
    * Next.js is used for building the frontend applications.
    * Tailwind CSS is used for styling, with a custom color palette. Material-UI (MUI) is also used in some areas for UI components.
    * React Hook Form and Zod are used for form handling and validation, respectively, with TypeScript schema validation.
Backend and Frontend Integration:
* Prisma is used for database management, simplifying certain backend tasks.
* GraphQL Codegen is utilized to generate GraphQL types, making it easier to integrate backend types into the frontend.
Shared Libraries:
We use several shared libraries to maintain consistency across our frontend applications:
* @autospace/ui: Contains reusable UI components and Tailwind configuration. This allows us to share UI components and styling configurations across all frontend applications.
* @autospace/network: Manages network requests and GraphQL code generation, enabling seamless backend communication.
* @autospace/forms: Provides reusable form components and validations, leveraging React Hook Form and Zod for form handling and validation.
* @autospace/util: A utility library that contains common types, custom hooks, and utility functions used across the frontend applications.
Development Tools:
* Prettier is used for code formatting.
* ESLint helps identify and fix issues in JavaScript and TypeScript code.
* Husky is used to enforce pre-commit hooks, ensuring code quality before commits.
