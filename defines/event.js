/**
 *  Error events that throw or generate the errors
 *
 *  The most and commonly used events are listed
 *
 *  Total 8 bits
 *
 *  Users have the abilities to extend the events for their own projects
 *
 */



var events = {
  REGISTER: 1,
  LOGIN: 2,
  LOGOUT: 3,

  CREATE: 4,

  //Alias have the same value
  RETRIEVE: 5,
  READ:5,
  GET:5,

  UPDATE: 6,
  REMOVE: 7,
  DELETE: 7
};

module.exports = events;
