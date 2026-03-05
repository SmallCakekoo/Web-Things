export const CardUser = ({ user, deleteUser, editUser, id }) => {
  return (
    <div key={id} className="user-card">
      <h3>{user.inputName}</h3>
      <p>{user.inputEmail}</p>
      <button type="button" onClick={() => deleteUser(id)}>
        Delete Card
      </button>
      <button type="button" onClick={() => editUser(id)}>
        Edit Card
      </button>
    </div>
  );
};
