# Vet App

This a Vet App in order to explain in a short Pass it On, the differences and different structures of BackEnd and FrontEnd

## Clone the project repo

```bash
git clone <repo_name>.git
```

---

## Client

```bash
cd client
```

## Available scripts

This is a list of the available scripts to run the project.

<details style="margin-bottom: 15px">
    <summary><code>yarn install</code></summary>
    <p style="font-size: 14px; padding: 5px 0 0 10px">
        Installs the necessary packages in order to run the project. 
        You may need to delete the node_modules folder if switching between branches.
    </p>
</details>

<details style="margin-bottom: 15px">
    <summary><code>yarn start</code></summary>
    <p style="font-size: 14px; padding: 5px 0 0 10px">
        Starts the project in development mode
    </p>
</details>

<details style="margin-bottom: 15px">
    <summary><code>yarn run build</code></summary>
    <p style="font-size: 14px; padding: 5px 0 0 10px">
        Builds the project
    </p>
</details>

---

## Server

```bash
cd server
```

### Only the first time

1 - Install VirtualEnv

```bash
pip install virtualenv
```

2 - Create our own virtual Environment.

```bash
virtualenv <environment_name>
```

3 - Activate(or deactivate) virtual environment

-   On Windows run `<environment_name>\Scripts\activate.bat` (_`deactivate.bat` to deactivate the environment_).
-   On Windows using PowerShell, run `<environment_name>\Scripts\activate.ps1` (_just `deactivate` to deactivate the environment_).
-   On Windows using Git Bash run `<environment_name>\Scripts\activate` (_`deactivate` to deactivate the environment_).
-   On Linux run `source <environment_name>/bin/activate` (_`deactivate` to deactivate the environment_)

4 - Install required libraries

```bash
pip install -r requirements.txt
```

5 - Run server

For development:

```bash
uvicorn app:app --reload
```

> --reload is for the server to restart on changes

### Every time you run the server

-   Step 3 in order to enter the virtual environment

-   Step 5 to run the server

---

## Project structure

```text
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
```

---
