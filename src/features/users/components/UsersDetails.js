

const UserDetails = ({ extraObject, closeModal }) => {

    const { userName, id } = extraObject

    console.log(userName)

    return (

        <>
            <div className="card card-side bg-base-100">
                <figure><img src={`https://avatars.dicebear.com/api/male/${userName.userName}.svg`} alt="avatar" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{userName.userName}</h2>
                    <p>ذی نفع</p>
                    <p>{id.id}</p>

                </div>
            </div>


        </>
    );
}

export default UserDetails;