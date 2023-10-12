import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";


const router = express.Router();

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

router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  // If updating the password, first verify the current password
  if (req.body.currentPassword && req.body.newPassword) {
    let collection = await db.collection("users");
    const user = await collection.findOne(query);

    if (req.body.currentPassword !== user.password) {
      return res.status(400).send({ message: "Current password is incorrect" });
    }

    // Construct the update object for user details and password
    const updates = {
      $set: {
        ...req.body.firstName && { firstName: req.body.firstName },
        ...req.body.lastName && { lastName: req.body.lastName },
        ...req.body.email && { email: req.body.email },
        ...req.body.username && { username: req.body.username },
        ...req.body.profilePicture && { profilePicture: req.body.profilePicture },
        password: req.body.newPassword
      }
    };

    let result = await collection.updateOne(query, updates);

    if (result.matchedCount === 0) {
      res.status(404).send({ message: "User not found" });
    } else if (result.modifiedCount === 0) {
      res.status(400).send({ message: "No changes made" });
    } else {
      res.status(200).send({ message: "User updated successfully" });
    }
  } else {
    // Construct the update object for user details only
    const updates = {
      $set: {
        ...req.body.firstName && { firstName: req.body.firstName },
        ...req.body.lastName && { lastName: req.body.lastName },
        ...req.body.email && { email: req.body.email },
        ...req.body.username && { username: req.body.username },
        ...req.body.profilePicture && { profilePicture: req.body.profilePicture }
      }
    };

    let collection = await db.collection("users");
    let result = await collection.updateOne(query, updates);

    if (result.matchedCount === 0) {
      res.status(404).send({ message: "User not found" });
    } else if (result.modifiedCount === 0) {
      res.status(400).send({ message: "No changes made" });
    } else {
      res.status(200).send({ message: "User updated successfully" });
    }
  }
});



// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("users");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

// This section will help you get a username by user id
router.get("/usernameFromId/:id", async (req, res) => {
  let collection = await db.collection("users");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query, { projection: { username: 1 } }); // Only fetch the username field

  if (!result) res.status(404).send({ message: "User not found" });
  else res.status(200).send({ username: result.username });
});

// Backend: Fetch an event by its ID
router.get("/event/:eventId", async (req, res) => {
  try {
    let collection = await db.collection("events");
    let query = { "event.id": req.params.eventId };
    let result = await collection.findOne(query);

    if (!result) {
      res.status(404).send({ message: "Event not found" });
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).send({ message: "Internal server error" });
  }
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
 function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  // Login function to set up user session
async function loginUser(userId, res) {
  const sessionId = generateUniqueId();

  const newDocument = {
    userId: userId,
    session: sessionId
  };

  const collection = await db.collection("sessions");
  await collection.insertOne(newDocument);

  // Send session token back to the user so it can be stored locally
  res.status(200).send(sessionId);
}


//USED FOR SIGNUP
router.post("/signup", async (req, res) => {
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
  
  //Add user to DB
  let collection = await db.collection("users");
  let result = await collection.insertOne(newDocument);

  await loginUser(result.insertedId, res);
});
//******************************************************************
  // Login function to set up user session
router.post("/login", async (req, res) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);

  //Step 1 check if passwords match
  let collection = await db.collection("users");
  let query = {username: req.body.username};
  let result = await collection.findOne(query);
  if (!result) return res.status(401).send({"error": "username"}); //username couldnt be found 
  let userId = result._id;

  if(String(result.password) != String(req.body.password)) return res.status(401).send({"error": "password"}); //wrong password 
  //TODO: hash req password when fixed hashing

  //Step 2 update last logged in
  query = { username: req.body.usename };
  let updates =  {
    $set: {
      lastLoggedIn: currentTimestamp
    }
  };

  result = await collection.updateOne(query, updates);
  if (!result) return res.status(500).send({"error": "fatal"}); //couldnt update lastlloggedin? this error shouldnt happen

  //Step 3 log in
  await loginUser(userId, res);
}); 

router.get("/getPassword/:username", async (req, res) => {
  let collection = await db.collection("users");
  let query = {username: req.params.username};
  let result = await collection.findOne(query);

  if (!result) res.status(200).send(false);
  else res.status(200).send(result.password);
});


//EVENTS


router.post("/createEvent", async (req, res) => {
  const currentTimestamp = Math.floor(Date.now() / 1000); 

  let collection = await db.collection("events");
  
  try {
    let result = await collection.insertOne(req.body);
    
    if (result.acknowledged) {
      res.status(200).send({ message: "Event added successfully" });
    } else {
      res.status(500).send({ message: "Failed to add event" });
    }

  } catch (error) {
    console.error("Error inserting event:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Delete an event based on its nested event.id
router.delete("/deleteEvent/:eventId", async (req, res) => {
  try {
    // Connect to the events collection
    let collection = await db.collection("events");

    // Use the provided eventId
    let eventId = req.params.eventId;

    // Delete the event using the nested structure
    let result = await collection.deleteOne({ "event.id": eventId });

    // Check if the operation was acknowledged
    if (result.acknowledged) {
      res.status(200).send({ message: "Event deleted successfully" });
    } else {
      res.status(404).send({ message: "Event not found or deletion not acknowledged" });
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});


router.post("/getEvents", async (req, res) => {
  try {
    let collection = await db.collection("events");
    let query = { userId: req.body.userId };
    
    // Find all events for the user
    let results = await collection.find(query).toArray();

    // Extract only the 'event' field from each result
    let events = results.map(entry => entry.event);

    res.status(200).send(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Internal Server Error");
  }
});



//GET USERID FROM SESSIONID
router.post("/userId", async (req, res) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);

  let collection = await db.collection("sessions");
  let query = {session: req.body.sessionId};
  let result = await collection.findOne(query);

  if(!result) res.status(500).send(result);
  else res.status(200).send(result);
});

export default router;