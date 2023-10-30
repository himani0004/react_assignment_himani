import React, { Component } from 'react';
 import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      number: '',
      email: '',
      gender: 'male',
      subjects: '',
      people: [],
    };
  }
 
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
 
  generateRandomID = () => {
    return Math.floor(Math.random() * 50000); 
  }
 
  handleSubmit = (event) => {
    event.preventDefault();
 
    const { firstName, lastName, number, email, gender, subjects } = this.state;
 
    // Validation of given  phone number 
    if (number.length !== 10 || !/^\d+$/.test(number)) {
      alert("Phone number must be 10 digits.");
      return;
    }
 
    // Generate a random ID
    const id = this.generateRandomID();
 
    const person = {
      id,
      firstName,
      lastName,
      number,
      email,
      gender,
      subjects,
    };
 
    const updatedPeople = [...this.state.people, person];
    this.setState({
      people: updatedPeople,
      firstName: '',
      lastName: '',
      number: '',
      email: '',
      gender: 'male',
      subjects: '',
    });
 
    // Storing data in local storage------------------>>>>>>>>>>>
    localStorage.setItem(`person_${id}`, JSON.stringify(person));
  }
 
  handleDelete = (id) => {
    const updatedPeople = this.state.people.filter(person => person.id !== id);
    this.setState({ people: updatedPeople });
    // deleting data from local storage
    localStorage.removeItem(`person_${id}`);
  }
     componentDidMount() {
    // Load existing data from local storage on page load---------->>>>>>>>>>
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("person_")) {
        const person = JSON.parse(localStorage.getItem(key));
        this.setState((prevState) => ({
          people: [...prevState.people, person],
        }));
      }
    }
  }
 
  render() {
    return (
      <div>
          <h2>Person Information</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
            type="text"
            id="firstName"
            name="firstName"
           value={this.state.firstName}
            onChange={this.handleInputChange}
            placeholder='Enter your First Name'
            required
            /><br ></br>
 
           <label htmlFor="lastName">Last Name:</label>
           <input
            type="text"
            id="lastName"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInputChange}
            placeholder='Enter your last Name'
            required
           /><br ></br>
 
           <label htmlFor="number">Phone Number (10 digits):</label>
           <input
            type="text"
            id="number"
            name="number"
            value={this.state.number}
            onChange={this.handleInputChange}
            placeholder='Enter your Phone Number'
            required
           /><br ></br>
 
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            placeholder='Enter your Email'
            required
          /><br ></br>
 
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={this.state.gender}
            onChange={this.handleInputChange}
            placeholder='Enter your gender'
            required
          >
            <option value="male">Male(M)</option>
            <option value="female">Female(F)</option>
            <option value="other">Other</option>
          </select><br ></br>
 
          <label htmlFor="subjects">Subjects:</label>
          <input
            type="text"
            id="subjects"
            name="subjects"
            value={this.state.subjects}
            onChange={this.handleInputChange}
            placeholder='Enter your Subject'
          /> <br></br>
 
          <button type="submit">Submit</button>
         </form>
 
        <h2>Person Table</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Subjects</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.people.map(person => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.number}</td>
                <td>{person.email}</td>
                <td>{person.gender}</td>
                <td>{person.subjects}</td>
                <td>
                  <button onClick={() => this.handleDelete(person.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
         </table>
        </div>
    );
  }
}
 
export default App;