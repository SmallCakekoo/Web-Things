import { useState } from 'react';
import { CardUser } from '../CardUser/CardUser';

export const CrudUsers = () => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [users, setUsers] = useState([]);

  const createrUser = (e) => {
    e.preventDefault();
    setUsers([...users, { inputName, inputEmail }]);
    setInputName('');
    setInputEmail('');
  };

  //   const deleteUser = (index) => {
  //     const newUsers = [...users];
  //     newUsers.splice(index, 1);
  //     setUsers(newUsers);
  //   };

  const deleteUser = (id) => {
    setUsers(users.filter((user, index) => index !== id));
  };

  const editUser = (id) => {
    const userToEdit = users[id];
    setInputName(userToEdit.inputName);
    setInputEmail(userToEdit.inputEmail);
    deleteUser(id);
  };

// const editUser = (id) => {
//     const userUpdates = users.map((user, index) => {
//       return index === id
//         ? { ...user, inputName: inputName, inputEmail: inputEmail }
//         : user;
//     });

//     setUsers(userUpdates);
//   };

  return (
    <div className="crud-users">
      <form>
        <h1>Crud Users</h1>
        <h5>You have {users.length} users</h5>
        <input
          type="text"
          placeholder="Name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <button type="button" onClick={createrUser}>
          Crear Usuario
        </button>

        <div className="users-list">
          {users.map((user, id) => {
            return (
             <CardUser user={user} deleteUser={deleteUser} editUser={editUser} id={id} />
            );
          })}
        </div>
      </form>
    </div>
  );
};
