// Import necessary packages and dependencies
const { expect } = require("chai");

// Describe the contract and its functionalities
describe("CappedSet", function () {
  let cappedSet;

  // Deploy the contract before each test case
  beforeEach(async function () {
    const CappedSet = await ethers.getContractFactory("CappedSet");
    cappedSet = await CappedSet.deploy(3); // Pass the desired number of elements to the constructor
    await cappedSet.deployed();
  });

  // Test the initialization of the contract
  describe("Initialization", function () {
    it("should set the correct number of elements", async function () {
      const numElements = await cappedSet.numElements();
      expect(numElements).to.equal(3);
    });

    describe('Inserting Elements', function () {
        it('should insert an element when the array is empty', async function () {
          const result = await cappedSet.insert('0x123', 10); // Pass the desired address and value
          const elements = await cappedSet.elements();
    
          expect(elements.length).to.equal(1);
          expect(elements[0].addr).to.equal('0x123');
          expect(elements[0].value).to.equal(10);
          expect(result).to.deep.equal([ethers.constants.AddressZero, 0]);
        });
    
        it('should insert an element and replace the lowest value when the array is not full', async function () {
          await cappedSet.insert('0x123', 10);
          await cappedSet.insert('0x456', 20);
          const result = await cappedSet.insert('0x789', 15);
    
          const elements = await cappedSet.elements();
          expect(elements.length).to.equal(3);
    
          expect(elements[0].addr).to.equal('0x123');
          expect(elements[0].value).to.equal(10);
    
          expect(elements[1].addr).to.equal('0x789');
          expect(elements[1].value).to.equal(15);
    
          expect(elements[2].addr).to.equal('0x456');
          expect(elements[2].value).to.equal(20);
    
          expect(result).to.deep.equal([ethers.constants.AddressZero, 0]);
        });
    
        it('should replace the lowest value when inserting an element and the array is full', async function () {
          await cappedSet.insert('0x123', 10);
          await cappedSet.insert('0x456', 20);
          await cappedSet.insert('0x789', 30);
          const result = await cappedSet.insert('0xabc', 25);
    
          const elements = await cappedSet.elements();
          expect(elements.length).to.equal(3);
    
          expect(elements[0].addr).to.equal('0xabc');
          expect(elements[0].value).to.equal(25);
    
          expect(elements[1].addr).to.equal('0x789');
          expect(elements[1].value).to.equal(30);
    
          expect(elements[2].addr).to.equal('0x456');
          expect(elements[2].value).to.equal(20);
    
          expect(result).to.deep.equal(['0x123', 10]);
        });
      });
    
      // Test updating elements in the array
      describe('Updating Elements', function () {
        beforeEach(async function () {
          await cappedSet.insert('0x123', 10);
          await cappedSet.insert('0x456', 20);
          await cappedSet.insert('0x789', 30);
        });
    
        it('should update an existing element and return the smallest element', async function () {
          const result = await cappedSet.update('0x789', 35);
    
          const elements = await cappedSet.elements();
          expect(elements.length).to.equal(3);
    
          expect(elements[0].addr).to.equal('0x123');
          expect(elements[0].value).to.equal(10);
    
          expect(elements[1].addr).to.equal('0x456');
          expect(elements[1].value).to.equal(20);
    
          expect(elements[2].addr).to.equal('0x789');
          expect(elements[2].value).to.equal(35);
    
          expect(result).to.deep.equal(['0x123', 10]);
        });
    
        it('should return the smallest element when updating a non-existing element', async function () {
          const result = await cappedSet.update('0xabc', 25);
    
          const elements = await cappedSet.elements();
          expect(elements.length).to.equal(3);
    
          expect(elements[0].addr).to.equal('0x123');
          expect(elements[0].value).to.equal(10);
    
          expect(elements[1].addr).to.equal('0x456');
          expect(elements[1].value).to.equal(20);
    
          expect(elements[2].addr).to.equal('0x789');
          expect(elements[2].value).to.equal(30);
    
          expect(result).to.deep.equal(['0x123', 10]);
        });
      });
    
      // Test removing elements from the array
      describe('Removing Elements', function () {
        beforeEach(async function () {
          await cappedSet.insert('0x123', 10);
          await cappedSet.insert('0x456', 20);
          await cappedSet.insert('0x789', 30);
        });
    
        it('should remove an existing element and return the smallest element', async function () {
          const result = await cappedSet.remove('0x456');
    
          const elements = await cappedSet.elements();
          expect(elements.length).to.equal(2);
    
          expect(elements[0].addr).to.equal('0x123');
          expect(elements[0].value).to.equal(10);
    
          expect(elements[1].addr).to.equal('0x789');
          expect(elements[1].value).to.equal(30);
    
          expect(result).to.deep.equal(['0x123', 10]);
        });
    
        it('should return the smallest element when removing a non-existing element', async function () {
          const result = await cappedSet.remove('0xabc');
    
          const elements = await cappedSet.elements();
          expect(elements.length).to.equal(3);
    
          expect(elements[0].addr).to.equal('0x123');
          expect(elements[0].value).to.equal(10);
    
          expect(elements[1].addr).to.equal('0x456');
          expect(elements[1].value).to.equal(20);
    
          expect(elements[2].addr).to.equal('0x789');
          expect(elements[2].value).to.equal(30);
    
          expect(result).to.deep.equal(['0x123', 10]);
        });
      });
    
      // Test getting the value of an element
      describe('Getting Element Value', function () {
        beforeEach(async function () {
          await cappedSet.insert('0x123', 10);
          await cappedSet.insert('0x456', 20);
          await cappedSet.insert('0x789', 30);
        });
    
        it('should return the value of an existing element', async function () {
          const value = await cappedSet.getValue('0x456');
          expect(value).to.equal(20);
        });
    
        it('should revert when getting the value of a non-existing element', async function () {
          await expect(cappedSet.getValue('0xabc')).to.be.revertedWith('Element not found');
        });
      });

  });





});
