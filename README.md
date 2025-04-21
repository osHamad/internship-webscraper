# Internship Web-scraper
This application is meant to scrape the internet for intern positions from a predefined set of companies (mainly Ottawa or remote), and then send weekly/daily updates on new open positions through email.
## Development
Make sure you have Node.js and npm installed
To run this application, run:
`npm install`
```
npm install
npm run start
```
or 
```
npm run devStart
```
to auto-restart the server with nodemon
## Companies
The list of supported companies can be found in [this spreadsheet](https://docs.google.com/spreadsheets/d/1kNesURBzUGJBTGEnVRp_krIUi35DgWyEwB0Y2wRq0F0/edit?usp=sharing)
## Progress
So far, the scraper for all companies that use Workday for posting new positions is complete. However, the scraper can only fetch the first page. Fix under progress