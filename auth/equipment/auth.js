const Equipment = require("../../model/equipment.js");

const jwt = require("jsonwebtoken");

const jwtSecret ="576df66cea407b30c66f3e8d87b52ac8222d0939bff76bdca8825f4d45361dbe31eaad";

exports.add = async (req, res, next) => {
  const { equipmentName, type, description, timeCreated } = req.body;
 
  Equipment.create({
      equipmentName,
      type,
      description,
      timeCreated
    })
      .then((equipment) => {
        res.status(201).json({
          message: "Equiptment successfully created",
          equipment
        });
      })
      .catch((error) =>
        res.status(400).json({
          message: "User not successful created",
          error: error.message,
        })
      );
  }


exports.update = async (req, res, next) => {
  const { role, id } = req.body;
  // Verifying if role and id is presnt
  if (role && id) {
    // Verifying if the value of role is admin
    if (role === "admin") {
      // Finds the user with the id
      await User.findById(id)
        .then((user) => {
          // Verifies the user is not an admin
          if (user.role !== "admin") {
            user.role = role;
            user.save((err) => {
              //Monogodb error checker
              if (err) {
                return res
                  .status("400")
                  .json({ message: "An error occurred", error: err.message });
                process.exit(1);
              }
              res.status("201").json({ message: "Update successful", user });
            });
          } else {
            res.status(400).json({ message: "User is already an Admin" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    } else {
      res.status(400).json({
        message: "Role is not admin",
      });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present" });
  }
};

exports.deleteEquipment = async (req, res, next) => {
  const { id } = req.body;
  await Equipment.findById(id)
    .then((equipment) => equipment.remove())
    .then((equipment) =>
      res.status(201).json({ message: "equipment successfully deleted", equipment })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};

exports.getEquipments = async (req, res, next) => {
  await Equipment.find({})
    .then((equipments) => {
      const equipmentFunction = equipments.map((equipment) => {
        const container = {};

        container.equipmentName = equipment.equipmentName;
        container.type = equipment.type;
        container.description = equipment.description;

        return container;
      });
      res.status(200).json({ equipment: equipmentFunction });
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};

