export const RECEIVE_USERS = "RECEIVE_USERS";

export function reveiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}
