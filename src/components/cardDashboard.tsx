const CardDashboard = (props: {
  title: string;
  quant: number;
  info: string;
}) => {
  return (
    <div className="p-10 mb-10 mt-10 bg-white rounded-lg shadow-2xl flex flex-row ">
      <div className="shrink-0">
        <div className="text-2xl font-medium text-gray-800 font-sans">
          {props.title}
        </div>
        <h2 className="text-lg text-gray-600  font-sans">{props.quant}</h2>
        <p className="text-gray-400 font-sans ">{props.info}</p>
      </div>
    </div>
  );
};

export default CardDashboard;
