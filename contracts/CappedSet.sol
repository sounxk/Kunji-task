// SPDX-License-Identifier:MIT
pragma solidity ^0.8.9;

/// @title A CappedSet contract
/// @author Sounak Ghosh
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without side effects

contract CappedSet {
  struct Element {
    address addr;
    uint256 value;
  }

  uint256 public numElements;

  //set of elements
  Element[] public elements;

  event Insert(address addr, uint256 value);
  event Update(address addr, uint256 value);
  event Remove(address addr, uint256 value);

  //taking number of maximum elements that can be stored in the set
  constructor(uint256 _numElements) {
    numElements = _numElements;
  }

  //Function 1 for insertion that adds a new element to the set and returns the address and value of the element with the lowest value
  function insert(
    address addr,
    uint256 value
  ) public returns (address, uint256) {
    if (elements.length == 0) {
      elements.push(Element(addr, value));
      return (address(0), 0);
    }
    emit Insert(addr, value);

    uint256 lowestIndex = getLowestValueIndex();

    // If the new element has a higher value than the lowest value, then replace the lowest value with the new element
    if (elements.length < numElements) {
      elements.push(Element(addr, value));
    } else {
      return (elements[lowestIndex].addr, elements[lowestIndex].value);
    }
  }

  //Function 2 for updating the element array and it returns the address and value of the element with the lowest value
  function update(
    address addr,
    uint256 newVal
  ) public returns (address, uint256) {
    require(elements.length > 0, "No elements in the set");

    emit Update(addr, newVal);

    // Find the element with the given address
    uint256 updateIndex = elements.length;
    for (uint256 i = 0; i < elements.length; i++) {
      if (elements[i].addr == addr) {
        updateIndex = i;
        break;
      }
    }

    if (updateIndex == elements.length) {
      // Address not found, return the current smallest element
      return getSmallestElement();
    }

    elements[updateIndex].value = newVal;

    // Find the index of the element with the lowest value after the update
    uint256 lowestIndex = getLowestValueIndex();
    return (elements[lowestIndex].addr, elements[lowestIndex].value);
  }

  function remove(address addr) public returns (address, uint256) {
    require(elements.length > 0, "No elements in the set");

    // Find the index of the element with the given address
    uint256 removeIndex = elements.length;
    for (uint256 i = 0; i < elements.length; i++) {
      if (elements[i].addr == addr) {
        removeIndex = i;
        break;
      }
    }

    if (removeIndex == elements.length) {
      // Address not found, return the current smallest element without removing anything
      return getSmallestElement();
    }

    // Remove the element from the array by replacing it with the last element
    elements[removeIndex] = elements[elements.length - 1];
    elements.pop();
    emit Remove(addr, elements[removeIndex].value);

    // Find the index of the element with the lowest value after the removal
    uint256 lowestIndex = getLowestValueIndex();

    return (elements[lowestIndex].addr, elements[lowestIndex].value);
  }

  function getValue(address addr) public view returns (uint256) {
    for (uint256 i = 0; i < elements.length; i++) {
      if (elements[i].addr == addr) {
        return elements[i].value;
      }
    }
    revert("Element not found");
  }

  function getElements() public view returns (Element[] memory) {
    return elements;
  }

  function getNumElements() public view returns (uint256) {
    return elements.length;
  }

  function getSmallestElement() public view returns (address, uint256) {
    require(elements.length > 0, "No elements in the set");
    uint256 lowestIndex = getLowestValueIndex();
    return (elements[lowestIndex].addr, elements[lowestIndex].value);
  }

  function getLowestValueIndex() internal view returns (uint256) {
    uint256 lowestIndex = 0;
    uint256 lowestValue = elements[0].value;
    for (uint256 i = 1; i < elements.length; i++) {
      if (elements[i].value < lowestValue) {
        lowestIndex = i;
        lowestValue = elements[i].value;
      }
    }
    return lowestIndex;
  }

  function getIndexByAddress(address addr) internal view returns (uint256) {
    for (uint256 i = 0; i < elements.length; i++) {
      if (elements[i].addr == addr) {
        return i;
      }
    }
    return elements.length;
  }
}
