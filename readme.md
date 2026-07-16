# Taha Todo App

A polished static todo list web app built with HTML, CSS, and JavaScript.

## About

This project is a modern task manager featuring a colorful top navigation bar, animated card layout, and responsive design. It lets users add tasks, mark them complete, filter by status, and clear completed tasks.

## Features

- Add new tasks with a friendly input form
- Mark tasks as completed or active
- Filter tasks by `All`, `Active`, or `Completed`
- Clear completed tasks with one click
- Responsive layout for desktop and mobile
- Colorful sticky navbar with mobile menu support
- Smooth hover and entry animations
- Tasks saved locally in browser storage

## Project files

- `index.html` — page structure and navigation
- `styles.css` — styling, layout, animations, and navbar design
- `script.js` — todo behavior, storage, and menu handling

## How to use

1. Open `index.html` directly, or run a local server.
2. Enter a task in the input field and click **Add task**.
3. Click the checkbox button on a task to toggle completion.
4. Use the filter buttons to show active or completed tasks.
5. Click **Clear completed** to remove finished items.

## Run locally

From the project root folder:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Design notes

The app uses a bright gradient navbar, clean hero card layout, and accessible task controls. It is designed to look modern while remaining simple and easy to use.

## Notes

- No build process is required.
- The task list is stored in `localStorage`, so tasks remain after refreshing the page.

## License

MIT — free to reuse or modify.




