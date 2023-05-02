// @flow strict

type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

interface ContactInfo {
  email: string;
  phone: string;
}

class User implements ContactInfo {
  firstName: string;
  lastName: string;
  address: Address;
  email: string;
  phone: string;

  constructor(
    firstName: string,
    lastName: string,
    address: Address,
    email: string,
    phone: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    this.phone = phone;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getAddress(): Address {
    return this.address;
  }
}

// Usage example:
const userAddress: Address = {
  street: '123 Main St',
  city: 'Anytown',
  state: 'CA',
  zipCode: '12345',
};

const user = new User('John', 'Doe', userAddress, 'john.doe@example.com', '555-123-4567');
console.log(user.getFullName());
console.log(user.getAddress());
