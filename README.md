# Internship Web-scraper
This application is meant to scrape the internet for intern positions from a predefined set of companies (mainly Ottawa or remote), and then send weekly/daily updates on new open positions through email.


## Prerequisites

Ensure you have the following installed/setup on your system:

- NodeJS [(download)](https://nodejs.org/en/download)
- Postgresql [(download)](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- Ensure Github SSH is setup [(tutorial)](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

## Setup

Here is how to setup the project locally for development:

### Create new project
```bash
mkdir <folder-name>
cd <folder-name
```

### Clone repo from Github
```bash
git clode git@github.com:osHamad/internship-webscraper.git  # make sure you have ssh set up
```

### Setup node dependencies
```bash
cd internship-webscraper
npm install
npx prisma generate
```

### Add env varaibles
In development, we will use an `.env` file. Create an `.env` file in the main directory (where index.js is) and add the following:
```ini
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/mydb"
PORT=<port-number>
```

`<username>` should be replaced with your local postgresql username (the default username is "postgres")

`<password>` should be replaced with whatever password you set when downloading postgresql

`<port-number>` should be replaced with a port (typically 3000)

### Run Prisma migrations
```bash
npx prisma migrate dev --name init
```

### Start server
```bash
npm run dev     # for auto-restarting servers
npm run start   # for regular start (for production)
```
Either command can be used in development, but `npm run dev` is useful since it restarts the server when you make changes to it
