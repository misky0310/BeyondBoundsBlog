
# MERN Blog App

This is a responsive blog application built with React.js using the Vite framework, state management with User Context, and styled with Tailwind CSS. The application allows users to interact with other people by providing a platform where they can share the latest updates happening around the world on different issues.

## Features

- `Sign Up`: Easily add a new user. The data is stored locally in a DB.
- `Log In`: Provide correct credentials and easily log in to your profile
- `Add Posts`: Easily add a new post sharing your thoughts on the latest happenings.
- `Edit Posts`: Make changes if necessary after the post has been added. Changes can be made only on your posts.
- `Basic Security`: Bcrypt used to encrypt the password so as to achieve basic security measures.
- `Responsive Design`: The application is designed to work seamlessly on various screen sizes, including desktops, tablets, and mobile devices.

## Folder Structure
- `client/src/components`: React components used in the application.
- `client/src/context`: Stores the current user info when logged in.
- `api/app.js`: Contains the entire backend logic with proper use of REST API's.
- `api/models`: Defines the structure of an user and the post in the DB concerned.
- `api/upload`: Contains the pictures uploaded as the cover photo of your article.


## Acknowledgements

 - [Vite](https://vitejs.dev/guide/)
 - [Tailwind with Vite](https://tailwindcss.com/docs/guides/vite)
  - [Awesome TailwindCSS components](https://flowbite.com/)

