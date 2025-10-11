const TeamCard = ({name, title, description, image}) => {
    let handleClick = () => {
        console.log("Clicked");
    }
    return(
        <div className="bg-white shadow-md rounded-lg p-6 h-[500px] w-full max-w-md mx-auto hover:shadow-lg transition"> 
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-60 object-cover rounded-md mb-4 object-top oject-cover"
        />
      )}
      <p className="text-xl font-semibold mb-2 text-teal-700">{name}</p>
      <h5 className="text-lg font-semibold mb-2 text-teal-700">{title}</h5>
      <p className="text-gray-600 text-sm">{description}</p>
      <button className="text-sm cursor-pointer hover:underline pt-2" onClick={handleClick}>Know More</button>
    </div>
    )
}

export default TeamCard;