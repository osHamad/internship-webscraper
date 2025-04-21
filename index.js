import { scraper } from "./scraper.mjs"

// works for:
// dayforce, workday, n-able, 
// scraper('https://careers.n-able.com/jobs?stretchUnit=MILES&stretch=10&location=Ottawa,%20ON,%20Canada&woe=7&regionCode=CA', '.job-title-link')
// scraper('https://fa-evmr-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1/jobs?lastSelectedFacet=TITLES&location=Ottawa%2C+Ontario%2C+Canada&locationId=100000018991137&locationLevel=city&mode=location&radius=25&radiusUnit=MI&selectedTitlesFacet=TRA', '.search-results a', '.job-tile__title')
scraper('https://careers-kinaxis.icims.com/jobs/search?ss=1&searchRelation=keyword_all&searchLocation=12955-12964-Ottawa&mobile=false&width=1195&height=500&bga=true&needsRedirect=false&jan1offset=-300&jun1offset=-240&in_iframe=1', '.iCIMS_Anchor')
