
const PlainCard = ({ icon, stats, label }) => {
  return (
<div className="bg-orange-500 border-r border-b border-white p-6 text-white ">
      <div className="flex items-center">
        <div className="mr-4 text-5xl ">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-semibold">{stats}</p>
          <p className="text-sm">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default PlainCard;
