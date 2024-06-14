# anurag-kushwaha-answersai-backend
 Assignment


## Installation

Install project with npm

```bash
  npm install
  npm start
```
Env file that needs to configure (database used is online and same can be used for testing and ANTHROPIC api key is not allowed to host on github)
```bash
DB_USERNAME=avnadmin
DB_PASSWORD=AVNS_Vmne3XujMKC87-p6KMM
DB_HOST=public-pg-f64fddc-ak4032777-4df8.l.aivencloud.com
DB_PORT=12181
DB_DATABASE=answerai
DB_DIALECT=postgres
ANTHROPIC_API_KEY=
```
## Tech Stack Used 

- Node Js
- Express Js
- Postgres (Online hosted database)
- Sequelize (ORM for database)
- jsonwebtoken && bcryptjs for password hashing and geneating jwt token
- joi for schema validation
- lodash for easy syntax data manipulation and access

## Folder Structure
.
├── server.js - Server starting point
├── routes.js - REST API handle endpoints
├── controllers/ 
│   ├── authController.js
│   ├── questionController.js
│   └── userController.js
├── middlewares/
│   └── auth.js
├── routes/
│   ├── auth.js
│   ├── question.js
│   └── user.js
├── sequelize/
│   ├── config/
│   └── models/
├── services/
│   ├── aiService.js
│   ├── questionService.js
│   └── userService.js
└── utils/
    └── validateSchema.js

    
<img width="469" alt="Screenshot 2024-06-14 at 13 41 42" src="https://github.com/Anurag-kuswaha/anurag-kushwaha-AnswersAi-Backend/assets/73064862/f29ed32f-db67-42ab-9e72-a9612bc5ed19">

