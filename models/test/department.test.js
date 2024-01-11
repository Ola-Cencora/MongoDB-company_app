const Department = require("../department.model");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Department", () => {
  it('should throw an error if no "name" arg', async () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value

    dep.validateSync((err) => {
      expect(err.errors.name).to.exist;
    });
    after(() => {
      mongoose.models = {};
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validateSync((err) => {
        expect(err.errors.name).to.exist;
      });
    }
    after(() => {
      mongoose.models = {};
    });
  });

  it('should throw an error if "name" is shorter than 5 or longer than 20', async () => {
    const cases = ['abc', 'qwertyqwertyqwertyqwerty'];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validateSync((err) => {
        expect(err.errors.name).to.exist;
      });
    }
    after(() => {
      mongoose.models = {};
    });
  });

  it('should NOT throw an error if "name" is OK', async () => {
    const cases = ['Lorem', 'qwertyqwertyqwerty', 'Lorem123'];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validateSync((err) => {
        expect(err.errors.name).to.not.exist;
      });
    }
    after(() => {
      mongoose.models = {};
    });
  });

});
