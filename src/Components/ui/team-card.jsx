export function TeamCard({ img, name, role }) {
  return (
    <div className="text-center bg-white rounded-xl shadow-sm p-8 border border-slate-200">
      <img
        src={img}
        alt={name}
        className="w-32 h-32 mx-auto rounded-full object-cover mb-4 shadow-md"
      />
      <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
}

export default TeamCard;
