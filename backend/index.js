const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");


const app = express();
app.use(express.json());

app.use(cors());
const dbPath = path.join(__dirname, "info.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(4001, () => {
      console.log("Server Running at http://localhost:4001/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();



const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        
        next();
      }
    });
  }
};


//Registe_API!!!

app.post("/register", async (request, response) => {
  const { name, email, password } = request.body;
  const hashedPassword = await bcrypt.hash(request.body.password, 10);
  const selectUserQuery = `SELECT * FROM user WHERE name = '${name}'`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    const createUserQuery = `
      INSERT INTO 
        user (name, email, password) 
      VALUES 
        (
          
          '${name}',
          '${email}',
          '${hashedPassword}'
          
        )`;
    const dbResponse = await db.run(createUserQuery);
    const newUserId = dbResponse.lastID;
    response.send(`Created new user with ${newUserId}`);
  } else {
    response.status = 400;
    response.send("User already exists");
  }
});

//Login_API!!!!

app.post("/login", async (request, response) => {
  const { name, password } = request.body;
  const selectUserQuery = `SELECT * FROM user WHERE name = '${name}'`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    response.status(400).json({ error: "Invalid Password" });
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatched === true) {
      // response.send("Login Success!");
        const payload = {
          name: name,
        };
        const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
        response.send({ jwtToken });
    } else {
      
      response.status(400).json({ error: "Invalid Password" });
    }
  }
});




//assessment_submitted_api
app.post("/tasks", async (request, response) => {
  const { assessment_id, assessment_name } = request.body;
 
  const selectQuery = `SELECT * FROM assessments WHERE assessment_id = '${assessment_id}' AND assessment_name = '${assessment_name}'`;
  const dbQuery = await db.get(selectQuery);

  if (dbQuery !== undefined) {
    response.status(400);
    response.send("assessment already submitted...");
  } else {
   
      const insertQuery = `
      INSERT INTO 
      assessments (assessment_id, assessment_name) 
    VALUES 
      (
          ${assessment_id},
        '${assessment_name}'
        
        
      )`;
    const dbResponse = await db.run(insertQuery);
    
    response.send(`assessment submitted successfully....`);
  
  }
});

//display_assessments_api
app.get("/assessments", async  (request, response) => {
  
  const getAssessmentsQuery = `
  SELECT
    *
  FROM
   assessments
  
  `;
  const AssessmentsArray = await db.all(getAssessmentsQuery);
  response.send(AssessmentsArray);
})
