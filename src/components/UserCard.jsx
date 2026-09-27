const UserCard = ({user}) => {
    console.log(user);
    const {firstName, lastName} = user;
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName}</h2>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-secondary">Ignore</button>
      <button className="btn btn-primary">Interested</button>
    </div>
  </div>
</div>
    );
}

export default UserCard;