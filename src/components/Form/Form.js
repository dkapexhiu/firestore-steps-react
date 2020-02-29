import React, { Component } from "react";
import update from "immutability-helper";
//import validator from "../../utils/validator";
import InputValidation from "../InputValidation/InputValidation";
import firebase from "firebase";
// eslint-disable-next-line no-unused-vars
import config from "../firebaseConfig";
import 'firebase/firestore';

export default class testComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formEditableData: {
        gamertag: {
          value: "",
          valid: true,
          validator: "gamertag",
          errorMessage: ""
        },
        email: {
          value: "",
          valid: true,
          validator: "email",
          errorMessage: ""
        },
        password: {
          value: "",
          valid: true,
          validator: "password",
          errorMessage: ""
        }
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeInputValue = this.changeInputValue.bind(this);
  }
  // get form data from redux
  componentWillMount() {
    let formEditableData = Object.assign({}, this.state.formEditableData);
    for (let key in this.props.formData) {
      formEditableData[key].value = this.props.formData[key];
    }
    this.setState({ formEditableData });
  }
  componentWillReceiveProps(nextProps) {
    let formEditableData = Object.assign({}, this.state.formEditableData);
    for (let key in nextProps.formData) {
      formEditableData[key].value = nextProps.formData[key];
    }
    this.setState({ formEditableData });
  }

  // change input value
  changeInputValue({ target: { value, name } }) {
    this.setState(
      {
        formEditableData: update(this.state.formEditableData, {
          [name]: {
            value: { $set: value },
            valid: { $set: true }
          }
        })
      },
      () => {
        this.props.saveFormData(name, value, "form");
      }
    );
  }

  handleSubmit = event => {
    event.preventDefault();

    let gamertag = this.state.formEditableData.gamertag.value;
    let email = this.state.formEditableData.email.value;
    let password = this.state.formEditableData.password.value;
    let uid = Math.random().toString(36).substring(7);

    const db = firebase.firestore();
    const rootRef = db.collection("clients").doc(uid);

    rootRef.set({ uid, gamertag, email, password }).then(res => {
      alert("Data Saved");
      return {};
    }).then(success => {
        console.log('success',success);
    },
    error => {
        console.log('error',error);
    }
    );
  	};

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <label>Gamer Tag: </label>
          <InputValidation
            isEditing={this.props.isEditing}
            valid={this.state.formEditableData.gamertag.valid}
            errorMessage={this.state.formEditableData.gamertag.errorMessage}
            name="gamertag"
            placeholder="Gamer Tag"
            value={this.props.formData.gamertag}
            onChange={this.changeInputValue}
          />
          <label>Email: </label>
          <InputValidation
            isEditing={this.props.isEditing}
            valid={this.state.formEditableData.email.valid}
            errorMessage={this.state.formEditableData.email.errorMessage}
            name="email"
            placeholder="Email"
            value={this.props.formData.email}
            onChange={this.changeInputValue}
          />
          <label>Password: </label>
          <InputValidation
            isEditing={this.props.isEditing}
            valid={this.state.formEditableData.password.valid}
            errorMessage={this.state.formEditableData.password.errorMessage}
            name="password"
            placeholder="Password"
            value={this.props.formData.password}
            onChange={this.changeInputValue}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}
