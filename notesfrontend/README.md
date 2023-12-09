# Notes App

## Description
This project is running crud operation to create notes and delete,edit. Basic user authentication with chatbackend server along with mongodb using mongoose (ODM) 

## Prerequisites
Make sure you have the following installed before starting:

- Node.js: [Download](https://nodejs.org/)
- npm (Node Package Manager): [Install](https://www.npmjs.com/get-npm)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/HamButt/notesfrontend.git

cd notes
npm install

PORT=3000
npm start

## Node Version

- node --version
- v20.7.0

## Folder Structure

- src/
- |-- components/
- |-- config/
- |-- pages/
- |-- styles/
- |-- App.js
- |-- index.js

## Base Path

- http://localhost:4040

## API Endpoints

- /auth/login: Endpoint for signIn operation
- /auth/register: Endpoint for signUp operation
- /fetchAllNotes: Endpoint to fetch all notes
- /notes/:type : Endpoint to filter notes
- /fetchNote/:id : Endpoint to fetch note on the basis of id to edit note
- /createNote : Endpoint for creating note
- /updateNote : Endpoint for updating note
- /deleteNote : Endpoint for deleting note

## Contributing

If you'd like to contribute, please follow these steps:

- Fork the repository
- Create a new branch: git checkout -b feature/my-feature
- Commit your changes: git commit -am 'Add my feature'
- Push to the branch: git push origin feature/my-feature
- Submit a pull request