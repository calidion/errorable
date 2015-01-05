/**
 *  Error types that throws or generated
 *
 *  The most and commonly used typys are listed
 *
 *  Total 8 bits
 *
 *  Users have the abilities to extend the types for their own projects
 *
 */



var types = {

  //Basic error types
  SUCCEEDED: 0,
  FAILURE: 1,
  FAILED: 1,

  //Validation error types
  INVALID: 2,
  MISMATCH: 3,
  REQUIRED: 4,

  //Existence related
  NOT_FOUND: 5,
  EXISTED: 6,

  //Accessibility or authentication related
  NOT_LOGIN: 7,
  EXPIRED: 8,
  BLOCKED: 9,

  //Resources related
  EXCEEDED: 10

};

module.exports = types;
