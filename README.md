# anurag-kushwaha-answersai-backend
 Assignment


## Installation

Install project with npm

```bash
  npm install
  npm start
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

