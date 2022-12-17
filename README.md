# Loadshedding Calculator

Welcome to the Loadshedding Calculator! This tool allows you to create a plan and invite other users to join, and calculates the most optimal times for all plan members to have meetings and gaming sessions based on their loadshedding schedules.

## Features

- Sign in with Google or Twitter
- Create a plan and invite other users to join via email (for Google users) or username (for Twitter users)
- Users can accept or decline the invite using their unique UUID
- Calculate the most optimal times for all plan members based on their loadshedding schedules
- Uses the Eskomsepush API to grab loadshedding times for all plan members

## How to use

1. Sign in with Google or Twitter
2. Create a plan and invite other users to join by entering their email addresses (for Google users) or username (for Twitter users)
3. Users will receive an invite to join the plan and can choose to accept or decline using their unique UUID
4. Once all users have accepted the invite, the loadshedding calculator will use the Eskomsepush API to grab the loadshedding times for all plan members and calculate the most optimal times for meetings and gaming sessions
5. Use the calculated times to schedule your activities with other plan members

## Requirements

- A valid Eskomsepush API key
- A Supabase account for database management
- A Firebase account for authentication

## Tech Stack

- Next.js
- Yarn (package manager)
- Supabase
- Firebase
- TypeScript
- React Query
- React Icons
- Lottie files
- Tailwind CSS

## Development

To start the development server, run `yarn dev`. To build the project, run `yarn build`.

## Credits

- API provided by Eskomsepush
- Algorithm developed by [Milahn Martin](https://github.com/milahnmartin)

We hope you enjoy using the Loadshedding Calculator!
