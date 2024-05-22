# My_book_library_server_API
# Book Library Server

## Overview

This is a RESTful API for a book library application using Node.js and Express. It allows you to manage users and books, including operations like adding, deleting, loaning out, and returning books.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/book-library-server.git
    cd book-library-server
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Run the server:
    ```sh
    node server.js
    ```

## API Endpoints

### Users

- **Create User**: `POST /users`
  ```json
 {
    "firstname":"Users",
    "lastname":"One",
    "email":"user1@gmail.com",
    "username":"user1",
    "password":"password1"
}
**Authenticate User: POST /users/authenticate**
{
  "username": "user1",
  "password": "password"
}
**Get All Users: GET /users**

#### Books
**Create Book: POST /books**
{
  "title": "Book Title",
  "author": "Author Name"
}
**Delete Book: DELETE /books/:id**

**Loan Out Book: POST /books/:id/loan**
{
  "userId": 12345
}

**Return Book: POST /books/:id/return**

**Update Book: PUT /books/:id**
{
  "title": "Updated Title",
  "author": "Updated Author"
}

## Testing
Use Postman or ThunderClient to test the API endpoints.

## Deployment
Deploy your project to GitHub and submit the repository link.

## Error Handling
The API includes robust error handling and returns meaningful messages for different error scenarios.

## Notes
Ensure your code is clean and maintainable with proper comments where necessary.
Follow asynchronous operations to maintain non-blocking behavior.


### 6. Testing and Submission

Use Postman or ThunderClient to test all endpoints to ensure they work correctly. Once done, push your code to a GitHub repository and submit the link to the specified email before the deadline.

This setup will give you a fully functional RESTful API for managing a book library with user and book operations using file-based storage.

