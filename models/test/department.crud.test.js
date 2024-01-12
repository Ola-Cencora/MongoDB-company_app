const Department = require("../department.model");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Department", () => {
  before(async () => { //chcemy, aby testy uruchomiły się dopiero wtedy, kiedy mamy pewność, że połączenie jest gotowe
    try {
      await mongoose.connect("mongodb://localhost:27017/companyDBtest", { //jeśli próbujemy połączyć się z bazą, która nie istnieje, to Mongoose po prostu ją utworzy
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }

  });
});
