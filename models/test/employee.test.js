const Employee = require("../employee.model");
const expect = require("chai").expect;

describe("Employee", () => {
    it('should throw an error if no arguments', async () => {
        const empl = new Employee({});

        const err = empl.validateSync();
        expect(err.errors.firstName && err.errors.lastName && err.errors.department).to.exist;        
    });

    it('should throw an error if there is an arg missing', () => {
        const cases = [
            { firstName: 'Amanda', lastName: 'Doe' },
            { firstName: 'Amanda' },
            { lastName: 'Doe', department: 'IT' }
        ]

        for (let c of cases) {
            const empl = new Employee(c)

            const err = empl.validateSync();
            expect(err).to.exist;
        }
    });

    it('should throw an error if any of arguments is not a string', () => {
        const cases = [
            { firstName: 'Amanda', lastName: 'Doe', department: [] },
            { firstName: 'Amanda', lastName: {}, department: 'IT' },
            { firstName: [], lastName: {}, department: [] },
        ]
        
        for (let c of cases) {
            const empl = new Employee(c)

            const err = empl.validateSync();
            expect(err).to.exist;
        }
    });

    it('should NOT throw an error if all of arguments are OK', () => {
        const cases = [
            { firstName: 'Amanda', lastName: 'Doe', department: 'IT' },
            { firstName: 'John', lastName: 'Doe', department: 'Marketing' }
        ]
        
        for (let c of cases) {
            const empl = new Employee(c)

            const err = empl.validateSync();
            expect(err).to.not.exist;
        }
    });
});