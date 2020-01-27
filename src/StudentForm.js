import React, { Component } from "react";

import validator, { field } from './validator';

export default class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: field({name: 'name', value: '', isRequired: true, minLength: 2}),
      email: field({name: 'email', value: '', isRequired: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/}),
      age: field({name: 'age', value: 18, isRequired: true}),
      course: field({name: 'course', value: '', isRequired: true}),
      image: field({name: 'image', value: '', pattern: /^(http|https)/})
    };
    console.log(this.state);
  }

  onChange = ({target: { name: fieldName, value }}) => {
    //validate,
    
    const errors = validator(fieldName, value, this.state[fieldName].validations);
    console.log(errors);
    
    //update state with / without errors
    this.setState({
        [fieldName]: {
            ...this.state[fieldName],
            value,
            errors
        }
      });
  }

  onNameChange = e => {
    const nameErrors = [];

    if (!e.target.value) {
      nameErrors.push("Name is required");
    }
    if (e.target.value.length < 2) {
      nameErrors.push("Name should be no less than 2 characthers");
    }

    this.setState({
      name: e.target.value,
      errors: {
        ...this.state.errors,
        name: nameErrors
      }
    });
  };

  onEmailChange = e => {
    const emailErrors = [];

    if (!e.target.value) {
      emailErrors.push("Email is required");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
      emailErrors.push("Email should be a valid email");
    }

    this.setState({
      email: e.target.value,
      errors: {
        ...this.state.errors,
        email: emailErrors
      }
    });
  };

  onAgeChange = e => {
    const ageErrors = [];

    this.setState({
      age: e.target.value
    });
  };

  onCourseChange = e => {
    const courseErrors = [];

    if (!e.target.value) {
      courseErrors.push("Please select a course");
    }

    this.setState({
      course: e.target.value,
      errors: {
        ...this.state.errors,
        course: courseErrors
      }
    });
  };

  onImageChange = e => {
    const imageErrors = [];

    if (e.target.value && !/^(http|https)/.test(e.target.value)) {
      imageErrors.push("Image URL should start with http or https");
    }

    this.setState({
      image: e.target.value,
      errors: {
        ...this.state.errors,
        image: imageErrors
      }
    });
  };

  submit = e => {
    e.preventDefault();
    console.log("Submitting the form...", this.state);
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        <div className="form-group">
          <label htmlFor="sname">Name</label>
          <input
            type="text"
            className="form-control"
            id="sname"
            name="name"
            placeholder="Student Name"
            defaultValue={this.state.name.value}
            onBlur={this.onChange}
          ></input>
          {this.state.name.errors.map((error,index) => (
            <small key={index} className="form-text text-danger">{error}</small>
          ))}
        </div>
        {/* <div className="form-group">
          <label htmlFor="semail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="semail"
            name="semail"
            placeholder="name@example.com"
            defaultValue={this.state.email}
            onBlur={this.onEmailChange}
          ></input>
          {this.state.errors.email.map(error => (
            <small className="form-text text-danger">{error}</small>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="sage">Age</label>
          <input
            type="range"
            className="custom-range"
            min="18"
            max="100"
            id="sage"
            name="sage"
            defaultValue={this.state.age}
            onInput={this.onAgeChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="scourse">Course</label>
          <select
            className="form-control"
            id="scourse"
            name="scourse"
            defaultValue={this.state.course}
            onBlur={this.onCourseChange}
          >
            <option value="">Select Course</option>
            <option value="node">Node</option>
            <option value="js">JavaScript</option>
            <option value="sql">SQL</option>
            <option value="react">React</option>
          </select>
          {this.state.errors.course.map(error => (
            <small className="form-text text-danger">{error}</small>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="simage">Image</label>
          <input
            type="text"
            className="form-control"
            id="simage"
            name="simage"
            placeholder="Student Image Url"
            defaultValue={this.state.image}
            onBlur={this.onImageChange}
          ></input>
          {this.state.errors.image.map(error => (
            <small className="form-text text-danger">{error}</small>
          ))}
        </div>
         */}
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </form>
    );
  }
}
