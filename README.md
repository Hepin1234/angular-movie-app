# Angular Movie App

A small movie browsing app built with **Angular 16** and **TypeScript**, with login and sign-up connected to a REST API.

I built it in 2023 while working as a developer at Antim Technologies, to practise Angular components, routing, forms and HTTP services.

![Screenshot](docs/screenshot.png)

## Features

- **Login and sign-up** with Angular reactive forms and validation. Form data is sent to a REST API with `HttpClient`.
- **User list** loaded from the API.
- **Movie pages** for trending, in theatres and popular movies, with a detail page for each movie (`/movie/:type/:id`).
- **Reusable star-rating component** using `@Input()`.
- Code split into components, services and a feature module.

## Tech stack

Angular 16 · TypeScript · RxJS · Reactive Forms · Angular Router · Bootstrap / ng-bootstrap · SCSS · Jasmine + Karma

## Run it locally

You need Node.js (18 or newer) and npm.

```bash
git clone https://github.com/Hepin1234/angular-movie-app.git
cd angular-movie-app
npm install
npm start
```

Then open http://localhost:4200.

The movie data comes from JSON files in `src/assets/data`, so the movie pages work offline.
Login and sign-up call the company's demo API from 2023, which may no longer be online.

## Tests

```bash
npm test
```

The login form has unit tests that check:

- the form is invalid when the fields are empty
- the API is not called when the form is invalid
- a correct login goes to the home page
- a wrong login shows an error message

## What I would do differently today

- Check the password on the server and return a token, instead of comparing it in the browser.
- Use typed interfaces instead of `any` for API responses.
- Load the movie JSON with a relative path instead of `http://localhost:4200/...`.
