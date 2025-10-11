import TeamCard from "./TeamCard";
import TeamData from "./TeamData";

const Team = () => {
  return (
    <div className="px-6 md:px-12 py-12 text-center bg-yellow-50">
      <h3 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-teal-400 to-orange-400 text-transparent bg-clip-text">
        Our Team
      </h3>
      <h4 className="text-lg text-gray-600 mb-8">
        Your Smile, Our Responsibility.
      </h4>
      <div className="flex gap-8">
        {TeamData.map((member, idx) => (
          <div key={idx}>
            <TeamCard
              name={member.name}
              title={member.title}
              description={member.description}
              image={member.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
