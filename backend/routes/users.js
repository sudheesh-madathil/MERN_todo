var express = require("express");
var router = express.Router();
const task = require("./schema/schema");
/* post user task. */
router.post("/", function (req, res) {
  const userData = new task({
    task: req.body.task,
  });

  userData.save().then((user) => {
    res.send(user);
    console.log("data saved", user);
  });
});

//get user data//

router.get("/", async (req, res) => {
  try {
    const response = await task.find();
    res.send(response);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Internal Server Error");
  }
});


// delete user data//
router.delete("/:_id", (req, res) => {
  const userId = req.params._id;
  console.log(userId, "user id");
  task
    .findByIdAndDelete({ _id: userId })
    .then((data) => {
      if (data) {
        res.send(`Deleted user: ${data._id}`);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((error) => {
      res.status(500).send("Error deleting user");
    });
});


//user data editing//

router.put("/:_id", (req, res) => {
  const userId = req.params._id; // Retrieve the _id from URL parameters
  const updatedData = req.body; // Assuming the updated data is in the request body
  console.log(updatedData,"hjjjjjjjjjjjjjjjjjj");

  task.findByIdAndUpdate(userId, updatedData, { new: true })
    .then((data) => {
      if (data) {
        res.send(`Updated user: ${data._id}`);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((error) => {
      res.status(500).send("Error updating user");
    });
});
module.exports = router;
