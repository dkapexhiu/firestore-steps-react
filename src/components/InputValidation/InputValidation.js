import React, { Component } from "react";

export default class InputValidation extends Component {
  render() {
    return (
      // Validtion for fields.
      <div className="input-validation-container">
        <div>
          <input
            className={`input ${!this.props.isEditing ? "disabled" : ""}`}
            type="text"
            placeholder={this.props.placeholder}
            name={this.props.name}
            onChange={this.props.onChange}
            value={this.props.value}
            disabled={!this.props.isEditing}
          />
          <div className={!this.props.valid ? "error-container" : "hidden"}>
            <p className="error">{this.props.errorMessage || ""}</p>
          </div>
        </div>
      </div>
    );
  }
}
