# Sportiz

<a href="https://assembly.com/sportiz/bounties"><img src="https://asm-badger.herokuapp.com/sportiz/badges/tasks.svg" height="24px" alt="Open Tasks" /></a>

## Social network for amateur athletes

# Here's what's done so far:
+ nodeJS / mongooose / passport / mongoDB initial setup is done.
+ user (account) and event entities have been created.
+ user authentication is done. The APIs are:
    + POST /api/v1/auth/login
    + POST /api/v1/auth/register
    + GET /api/v1/auth/logout
+ events - basic APIs are done for creation and read all:
    + POST /api/v1/events
    + GET /api/v1/events
+ tests: basic positive tests have been done with mocha and superagent

# Getting this running:
+ Install nodejs / npm
+ Do an npm install from the command line to install all the packages in package.json
+ Run mongodb locally (I usually run it as mongod --dbpath db)
+ Run node app.js from the server directory to start the server
+ Run npm test from another window to run all the tests
+ Hit the http://localhost:3000/api/v1/events API in your browser to see basic events

# Whats left to be done:
+ Authorization for the routes
+ Routes for read one, update and delete for events
+ Routes for user management? (delete user, update user)
+ Negative tests 
+ Add validation to event and user model

# What I need:
+ More detail on the event model and user model
+ Any thoughts on the APIs
+ Thoughts on authorization


This is a product being built by the Assembly community. You can help push this idea forward by visiting [https://assembly.com/sportiz](https://assembly.com/sportiz).

### How Assembly Works

Assembly products are like open-source and made with contributions from the community. Assembly handles the boring stuff like hosting, support, financing, legal, etc. Once the product launches we collect the revenue and split the profits amongst the contributors.

Visit [https://assembly.com](https://assembly.com) to learn more.
