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

    
<img width="469" alt="Screenshot 2024-06-14 at 13 41 42" src="https://github.com/Anurag-kuswaha/anurag-kushwaha-AnswersAi-Backend/assets/73064862/f29ed32f-db67-42ab-9e72-a9612bc5ed19">

