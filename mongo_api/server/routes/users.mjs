import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

//Backend validation functions
function validUsername(username)
{
  if(username.length < 35 && username.length > 3 && /^[A-Za-z0-9åäöÅÄÖ]+$/.test(username)) return true;
  return false;
}

function validFirstName()
{
  if(username.length < 35 && username.length > 3 && /^[A-Za-z0-9åäöÅÄÖ]+$/.test(username)) return true;
  return false;
}

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("users");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level
    }
  };

  let collection = await db.collection("users");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("users");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

//  ANYONE CAN USE API CALLS ****************************************
//-------------------------------------------------------------------
//Checks if a given username or email exists
router.get("/username/:username", async (req, res) => {
  let collection = await db.collection("users");
  let query = {username: req.params.username};
  let result = await collection.findOne(query);

  if (!result) res.status(200).send(false);
  else res.status(200).send(true);
});

router.get("/email/:email", async (req, res) => {
  let collection = await db.collection("users");
  let query = {email: req.params.email};
  let result = await collection.findOne(query);

  if (!result) res.status(200).send(false);
  else res.status(200).send(true);
});
//-----------------------------------------------------------------

//USED FOR SIGNUP
router.post("/", async (req, res) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  let newDocument = {

    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,

    password: req.body.password,
    ip: req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.connection.remoteAddress,
    accountCreatedAt: currentTimestamp,
    lastLoggedIn: currentTimestamp
  };
  //BACKEND VALIDATION

  //BACKEND VALIDATION
  if (req.body.password.length < 8 || req.body.password.length > 50) return res.status(404).send(false);
  if(!(/^[A-Za-zåäöÅÄÖ]+$/.test(req.body.lastName)) || req.body.lastName.length < 2 || req.body.lastName.length > 35) return res.status(404).send(false);
  if(!(/^[A-Za-zåäöÅÄÖ]+$/.test(req.body.firstName)) || req.body.firstName.length < 2 || req.body.firstName.length > 35) return res.status(404).send(false);
  if(!(/^[A-Za-z0-9åäöÅÄÖ]+$/.test(req.body.username)) || req.body.username.length < 2 || req.body.username.length > 35) return res.status(404).send(false);
  if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(req.body.email))) return res.status(404).send(false);
  
  let collection = await db.collection("users");

  let result = await collection.insertOne(newDocument);

  //TODO: SEND SESSION TOKEN
  res.status(200).send(true);
});
//******************************************************************

router.get("/getPassword/:username", async (req, res) => {
  let collection = await db.collection("users");
  let query = {username: req.params.username};
  let result = await collection.findOne(query);

  if (!result) res.status(200).send(false);
  else res.status(200).send(result.password);
});

export default router;