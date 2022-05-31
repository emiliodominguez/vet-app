# Vet App

This a Vet Aoo in order to explain in a short Pass it On, the differences and different structures of BackEnd and FrontEnd

## Client

## Available scripts

This is a list of the available scripts to run the project.

<details style="margin-bottom: 15px">
<summary><code>npm run dev</code></summary>
<p style="font-size: 14px; padding: 5px 0 0 10px">
    Runs the app with Live Server and starts the SASS compiler<br>
</details>

<details style="margin-bottom: 15px">
<summary><code>npm run serve</code></summary>
<p style="font-size: 14px; padding: 5px 0 0 10px">
    Runs Live Server
</p>
</details>

---

## Project structure

    .
    ├── assets              # Tests folder
    └── js                  # Scripts folder
    │   ├── components      # A set of reusable components
    │   └── config          # Contains the config files
    │   ├── helpers         # A set of reusable blocks of code
    │   └── models          # Contains the data models
    │   ├── pages           # The scripts for specific pages
    │   └── services        # Contains the services
    │   └── ...
    └── styles              # Styles configuration
    │   ├── css             # Compiled CSS files (shouldn't edit nothing here)
    │   ├── scss            # SASS files
    ├── clients-ls.html     # Clients page (using Local Storage)
    ├── clients.html        # Clients page (using Python API)
    ├── index.html          # Home page
    └── ...

---