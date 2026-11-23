# The Squash Community

A small, dependency-free website structure for The Squash Community. The page is built from separate JavaScript elements, while `app.js` connects them and `config.js` controls which elements are displayed.

## Folder guide

- `index.html` — the page shell and the places where the elements appear.
- `styles.css` — shared colours, layout, and responsive styling.
- `app.js` — connects the elements and handles section and page navigation.
- `config.js` — the on/off switches and the section and page names.
- `elements/title/` — the website name. The live title uses the blue-and-lime Club design; its four alternate Club colour/layout concepts remain in the admin design tests.
- `elements/section/` — the Squash, Racketball, and Juniors tabs.
- `elements/tabs/` — the tabs for pages within the selected section.
- `elements/login/` — a link to the member-area sign-in.
- `elements/signup/` — a link to member account creation.
- `assets/brand/` — the [Karakal Tec Pro Elite product photo](https://www.directsportseshop.co.uk/karakal-tec-pro-elite-squash-racket-8B17), approved for sponsorship promotion and used in the Admin title concepts. The transparent PNG is used on the site; the source JPEG is retained here.
- `pages/` — the content shown for the selected page. Each Squash tab has its own file in `pages/squash/`; `pages/page-content.js` connects the selected tab to that file.
- `enabledElements` in `config.js` — on/off switches for all of the above.

## Add or edit page content

Open `config.js` to change the section and page labels or switch elements on and off. Edit the matching file in `pages/squash/` to change a Squash tab's content. The other section pages remain blank until their content is ready.

## View the website

Because this site uses JavaScript modules, open it through a local web server rather than directly as a file. If Node.js is installed, open a terminal in this folder and run:

```text
node preview.js
```

Then visit `http://localhost:8000` in your browser. The preview server uses only Node.js built-in features; it does not install packages. If Python is installed instead, `python -m http.server 8000` also works.

## Accounts

The public site's log-in and sign-up buttons open the corresponding forms in `../loginsystem/`. Supabase handles authentication there. A member can sign in before their account is linked to a competition player profile; profile linking is only needed for personal competition details.
