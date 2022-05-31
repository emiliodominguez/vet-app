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

* On Windows run `<environment_name>\Scripts\activate.bat`  (*`deactivate.bat` to deactivate the environment*).
* On Windows using PowerShell, run `<environment_name>\Scripts\activate.ps1`  (*just `deactivate` to deactivate the environment*).
* On Windows using Git Bash run `<environment_name>\Scripts\activate`  (*`deactivate` to deactivate the environment*).
* On Linux run `source <environment_name>/bin/activate`     (*`deactivate` to deactivate the environment*)

4 - Install required libraries

```bash
pip install -r requirements.txt
```

5 - Run server

```bash
uvicorn app:app
```

### Every time you run the server

* Step 3 in order to enter the virtual environment

* Step 5 to run the server

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