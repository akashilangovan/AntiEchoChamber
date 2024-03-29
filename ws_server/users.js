const users = [];

const addUser = ({ id, name, room, interest, stance }) => {
  console.log(name+" added to " + room)
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  interest = interest.trim().toLowerCase();
  stance = stance.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);
  if(!name || !room) return { error: 'Username and room are required.' };
  //if(existingUser) return { error: 'Username is taken.' }; removed for debugging sake(should make a dev branch lol)

  const user = { id, name, room, interest, stance };

  users.push(user);

  return { user }; 
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => {
  users.filter((user) => user.room === room);

}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };