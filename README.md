<H1>Solid Node Js Boilerplate</H1>
<h4>Technology Stack</h4>
<li>Node-express (Typescript)</li>
<li>Postgresql</li>
<li>Mysql</li>
<li>Mongo</li>

<h3>Features</h3>
<ul dir="auto">
<li><strong>ORM</strong>: <a href="https://sequelize.org/" rel="nofollow">Sequelize</a>  orm for object data modeling</li>

<li><strong>Migration and Seed</strong>: DB migration and Seed using <a href="https://github.com/sequelize/cli">Sequelize-CLI</a></li>

<li><strong>Authentication and authorization</strong>: using <a href="http://www.passportjs.org/packages/passport-jwt/">passport-jwt</a></li>

<li><strong>Error handling</strong>: centralized error handling</li>

<li><strong>Validation</strong>: request data validation using <a href="https://github.com/hapijs/joi">Joi</a></li>

<li><strong>Logging</strong>: using <a href="https://github.com/winstonjs/winston">winston</a></li>

<li><strong>Testing</strong>: unittests using <a href="https://mochajs.org/" rel="nofollow">Mocha</a></li>

<li><strong>Caching</strong>: Caching using <a href="https://redis.io/" rel="nofollow">Redis</a></li>

<li><strong>Bidirectional Communication</strong>: using <a href="https://socket.io/" rel="nofollow">Scoket</a></li>

<li><strong>Job scheduler</strong>: with <a href="https://www.npmjs.com/package/node-cron" rel="nofollow">Node-cron</a></li>

<li><strong>Dependency management</strong>: with <a href="https://yarnpkg.com" rel="nofollow">Yarn</a></li>

<li><strong>Environment variables</strong>: using <a href="https://github.com/motdotla/dotenv">dotenv</a> and <a href="https://github.com/kentcdodds/cross-env#readme">cross-env</a></li>

<li><strong>CORS</strong>: Cross-Origin Resource-Sharing enabled using <a href="https://github.com/expressjs/cors">cors</a></li>

<li><strong>Docker support</strong></li>

<li><strong>Linting</strong>: with <a href="https://eslint.org" rel="nofollow">ESLint</a> and <a href="https://prettier.io" rel="nofollow">Prettier</a></li>

</ul>

<br><br>Follow the following steps to set up the project.

<h3>Step 1:</h3>
Make sure your system have installed docker and docker compose.Follow the following steps to
install docker in your machine (Ubuntu)

<a href="https://dev.to/semirteskeredzic/docker-docker-compose-on-ubuntu-20-04-server-4h3k">Docker Install</a>
<br>Just follow the Step 1 and Step 4 from this link to install docker and docker-compose

<h3>Step 2:</h3>
Open your Project.
<br>
Create a .env file and copy all from the .env.example

<h3>Step 3:</h3>
Run the following command to create the environment

<b>cd docker-env/</b>
<br>Copy docker-compose.yml.example to docker-compose.yml
<br>open the docker-compose.yml and change all the volume path of your service.<br>
To update the path replace <b>UPDATE_PATH</b> with your local path.

<h3>Step 4:</h3>
Go to your core-frontend app repository and copy .env.example to .env file and update the values.
<h3>Step 5:</h3>
Run the docker compose command
<br>
<b>sudo docker-compose up -d</b>

<br>
To browse the project go to following link
<br>
<a href="http://localhost:5088/api/solid/v1/test">http://localhost:5088/api/solid/v1/test</a>
<br>
To browse the database go to following link
<br>
<a href="http://localhost:9888/">http://localhost:9888/</a>
<br>
user: root<br>
Password: root
<br>

<h3>Check your logs</h3>
To check the logs you use following commands<br>
<b>sudo docker logs -f solid-boilerplate</b><br>

<h1>Project Structure</h1>
<pre class="notranslate">
<code>specs\
docker-env\         # Local environment setup with this file, Like: mysql, adminer etc 
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--dao\            # Data Access Object for models
 	|--contract\		# Contracts for all dao
 	|--implementation 	# Implementation of the contracts
 |--db\             # Migrations and Seed files
 |--helper\          # All kind of classes and functions file in this folder.
 |--middlewares\     # All kind of middlewares class file in this list.
 |--models\         # Sequelize models (data layer).It this folder we make seperate model for seperate databased.Make folder with your db name, Like : your db name is olk9ai so folder is db_olk9ai
    |--db_olk9ai\    # Sequelize models (data layer) for databased olk9ai.
        |interfaces\     # All interface file in this folder for olk9ai db
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
  	|--contract\		# Contracts for all service
 	|--implementation 	# Implementation of the contracts
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--cronJobs.ts     # Job Scheduler
 |--index.ts        # App entry point
</code>
</pre>

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:
<pre>
<code>

#Server environment
NODE_ENV=local
#Port number
PORT=5088

#Mysql Db configuration
DB_HOST=olk9ai-mysql
DB_USER=root
DB_PASS=root
DB_NAME=olk9ai
#JWT secret key
JWT_SECRET=your-jwt-secret-key
#Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=5
#Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30

#Mailgun Auth
MAILGUN_API_KEY=MAILGUN_API_KEY
MAILGUN_DOMAIN=domain.com
system_email=noreply@domain.com

#Log config
LOG_FOLDER=logs/
LOG_FILE=%DATE%-app-log.log
LOG_LEVEL=error

#S3 config
S3_BUCKET=S3_BUCKET
AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
S3_REGION="us-east-1"

#Google APP Client
GOOGLE_CLIENT_ID=7GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT=GOOGLE_REDIRECT
GOOGLE_API_KEY=GOOGLE_API_KEY

</code>
</pre>

<h1>How to start the project:</h1>
<h5>Step: 1</h5>

<b>Create a database schema</b>
run this command to enter the container

<b>sudo docker exec -it {YOUR CONTANIER NAME} sh</b>
## docker-composer.yml container name : solid-boilerplate
<br>
After that Run the migration command
<br>
<b>database=Database1 yarn run sequelize:db:migrate</b><br>
<br>If you want to run this in windows environment without docker run this command:</br>
<b>set "database=Database1" && yarn run sequelize:db:migrate</b><br>
run this command :
<pre>database=Database1 yarn run sequelize:db:migrate</pre>
<br>
When this command successfully run, you can see all table in your databased.
<br>
Run the Seeds command command
<br>
<pre>database=Database1 yarn run sequelize:db:seed:all</pre>

<h1>How to project work from index.ts </h1>

## 1. project run from index.ts file and connect app.ts file
        ## socket initialization,createServer
## 2. in app.ts file you see the route like : app.use('/api/solid/v1', routes);
        <pre>
        ## routes access to Router route/index.ts
        ## in index.ts file setup multiple route name

        {
            path: '/auth',
            route: authRoute, file name of authRoute.ts
        }
        ## If you need you can defing route here
        ## authRoutes.ts file we make this route for authentication related routing
        ## In this section 2 type of route name write here
            1. router.post('/login', userValidator.userLoginValidator, authController.login);
                ## Without middleware
                ## router.post('YOUR-ROUTE-NAME', 'VALIDATION FILE', 'CONTROLLER FILE')
            2. router.put('/change-password', auth(),userValidator.changePasswordValidator,authController.changePassword)
                ## with middleware
                ## router.post('YOUR-ROUTE-NAME', 'MIDDILEWIRE', 'VALIDATION FILE', 'CONTROLLER FILE')
        
        </pre>

## 3. Route to Contoller, Service and userDao
      1. Contoller: call service from this file
      2. Service: All kind of logical operation write here
      3. Dao: call to model file for excute query
```
