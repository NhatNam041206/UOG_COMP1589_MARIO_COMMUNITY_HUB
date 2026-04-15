# Mario Community Hub

## Project Overview

Mario Community Hub is a front-end coursework project for a community hub website themed around Mario fan meetings and karting activities.

The chosen direction for the project is:

- A real-world styled Mario fan community website
- Focused on fan meetings, karting events, membership perks, and community engagement
- Designed as a static multi-page website for beginner-friendly front-end development

The website keeps a playful Mario visual theme, but the content should read like a real community organizer rather than a full fictional Mushroom Kingdom government site.

## Current Tech Stack

- HTML5
- CSS3
- Bootstrap 5
- Vanilla JavaScript

This project does not currently use:

- A backend
- A database
- User login
- Admin dashboard
- Translation system

## How To Run

This is a static website, so no build step is required.

1. Open the project folder.
2. Open `index.html` in a browser.
3. Navigate between the five main pages using the top navigation bar.

Recommended:

- Use Live Server in VS Code for smoother local testing.
- Keep an internet connection available because Bootstrap is loaded from a CDN.

## Main Pages

- `index.html`
  Home page with hero content, featured services, announcements, and the optional arcade bonus section.
- `about.html`
  About page with history, timeline, community groups, and leadership.
- `services.html`
  Services page explaining karting setup, fan meetings, and member merchandise.
- `events.html`
  Events page showing upcoming community activities.
- `contact.html`
  Contact page with a message form and organizer details.

## Project Structure

```text
UOG_WEB0_MARIO/
  about.html
  contact.html
  events.html
  index.html
  services.html
  README.md

  css/
    about.css
    contact.css
    events.css
    index.css
    services.css
    shared.css

  js/
    main.js
    home.js
    contact.js
    services.data.js
    services.js
    events.js

  imgs/
    events/fan_meeting_feature.jpg
    stone_texture.jpg
    merch_fan_meeting.jpeg
    start-outdoor-karting.jpg
    welcome_background_home.svg
    ...

  fonts/
    ...

  game/
    Game.html
    Content/
    Scripts/
```
