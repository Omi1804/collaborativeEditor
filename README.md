# Collaborative Text Editor

## Overview

This project implements a web-based collaborative text editor using JavaScript, Node.js, Express.js, Socket.IO, and Monaco Editor. The editor allows multiple users to collaboratively edit a shared document in real-time, with features such as cursor synchronization, text highlighting, user presence indicators, and conflict resolution.

## Features

- Real-time collaboration: Multiple users can edit the same document simultaneously.
- Cursor synchronization: Cursors of other users are displayed in real-time to show their current editing position.
- Text highlighting: Users can highlight text selections, and these highlights are synchronized across all clients.
- User presence indicators: Active users are displayed in the UI to show who is currently connected.
- Optional user authentication: User authentication system can be optionally implemented for controlling access to documents.
- Conflict resolution: Operational Transformation (OT) algorithm is used to resolve conflicts that arise when multiple users edit the same document simultaneously.

## Setup

1. Clone the repository.
2. Navigate to the project directory and run `npm install` to install dependencies.
3. Start the server using `node server.js`.
4. Open the client application in a web browser.

## Project Structure

- `client`: Contains client-side code including HTML, CSS, and JavaScript files.
- `server`: Contains server-side code including Node.js and Socket.IO logic.

## Dependencies

- Express.js: For creating the server.
- Socket.IO: For real-time communication between clients and server.
- Monaco Editor: For integrating a rich text editor in the browser.
- Bootstrap (optional): For styling the user interface.

## Usage

- Open the application in a web browser.
- Collaborate with others by editing the shared document in real-time.
- Use cursor synchronization and text highlighting features to enhance collaboration.
- Implement user authentication for controlling document access if needed.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests with any improvements or additional features.

## License

This project is licensed under the [MIT License](LICENSE).
