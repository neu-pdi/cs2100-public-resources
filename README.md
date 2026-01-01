# NEU CS 2100 Public Resources

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Managing semester versions

### Lecture notes

Before the start of the semester, make all necessary updates to the lecture note files in `docs/lecture-notes`. Then, run this, replacing `25fa` with the semester that is about to begin:

```
npm run docusaurus docs:version 25fa
```

This will copy the lecture notes into a subfolder in `versioned_docs`. Any updates to lecture notes during the semester should happen there.

The "working version" that is still in the `docs` folder is a newer version than the semester you just named, and you can optionally copy mid-semester updates there, to propogate to the following semester. (This is because Docusaurus is meant for software documentation with versions, so named versions are the "published" versions, and `Next` is the unpublished, upcoming version.)

### Things linked in the lecture notes (e.g., slides and practice quizzes)

In the `docs` folder, there are directories for `quizzes`, `slides`, and `pages`. They are for practice quizzes, lecture slides, and other pages as needed, respectively. They have subdirectories for each semester. Add one for the new semester. Link to them as needed.

### Other pages on the website (e.g., Syllabus and Course Staff)

The directory `src/pages` has subdirectories for each semester. Copy all the files from the most recent semester into a new semester directory with the appropriate name. Make any changes in the new semester's files.

On the website, the lecture notes version drop down will apply to these pages. You can also access older versions of these non-lecture-note pages, add the semester name to the URL before the name of the page (e.g., `cs2100-public-resources/25fa/schedule`).

**Updating the schedule**: In the directory you just made, there is a file named `schedule_data.json`. Update the dates and assignment links in there.

## Installation

```
$ yarn
```

## Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
