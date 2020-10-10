# API Project: URL Shortener Microservice
API Project: URL Shortener Microservice



##  How to run the app
1. Either fork or download the app and open the folder in the cli
2. Install all dependencies using the `npm i` command
3. Start the web server using the `npm start` command. The app will be served at http://localhost:2125/ or http://localhost:3000/   




### User Stories
1. I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`. *HINT*: to be sure that the submitted url points to a valid site you can use the function `dns.lookup(host, cb)` from the `dns` core module.
3. When I visit the shortened URL, it will redirect me to my original link.



#### Creation Example:
POST [project_url]/api/shorturl/new - body (urlencoded) :  url=https://www.google.com

#### Usage:
[this_project_url]/api/shorturl/3

#### Will redirect to:
https://www.freecodecamp.org/forum/



##### Dependencies
- Express
- Node
- body-parser
- dotenv









