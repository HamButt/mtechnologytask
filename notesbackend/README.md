# Notes Backend

## Description
This project is handling all crud requests coming from notesfrontend (client side)

## Prerequisites
Make sure you have the following installed before starting:

- Node.js: [Download](https://nodejs.org/)
- npm (Node Package Manager): [Install](https://www.npmjs.com/get-npm)
- MongoDB: [Install](https://docs.mongodb.com/manual/installation/)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/HamButt/notesbackend.git

npm install

PORT=4040
MONGODB_URI=mongodb://localhost:27017/notes_app
nodemon start

## Database Collections

- users: Collection for storing user information
- notes: Collection for storing user notes

## API Endpoints

- /auth/login: Endpoint for signIm operation
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