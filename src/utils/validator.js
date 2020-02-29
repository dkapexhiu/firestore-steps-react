import { EMAIL_REGEXP } from "../constants/index";

// start fields validators.
let isInvalid = [];
export default async function validator(data) {
  isInvalid = [];
  try {
    let validatedData = Object.assign({}, data);
    for (let key in validatedData) {
      if (data[key].validator) {
        validatedData[key] = await validators[validatedData[key].validator](
          validatedData[key]
        );
      }
    }
    if (isInvalid.length) {
      return validatedData;
    } else {
      return "OK";
    }
  } catch (err) {
    return err;
  }
}

// validators for form fields.
let validators = {
  gamertag: async data => {
    if (data.value === "") {
      data.valid = false;
      data.errorMessage = "Field is empty";
      isInvalid.push(false);
      return data;
    } else {
      data.valid = true;
      data.errorMessage = "";
      return data;
    }
  },

  // validators for email field.
  email: async data => {
    if (data.value === "") {
      data.valid = false;
      data.errorMessage = "Field is empty";
      isInvalid.push(false);
      return data;
    } else if (!EMAIL_REGEXP.test(data.value)) {
      data.valid = false;
      data.errorMessage = "Invalid email";
      isInvalid.push(false);
      return data;
    } else {
      data.valid = true;
      data.errorMessage = "";
      return data;
    }
  },

  // validators for postcode field.
  password: async data => {
    if (data.value === "") {
      data.valid = false;
      data.errorMessage = "Field is empty";
      isInvalid.push(false);
      return data;
    } else {
      data.valid = true;
      data.errorMessage = "";
      return data;
    }
  }
};
