import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import config from "../utils/config";

export default function TableQuantityPosto() {
  const [efetivo, setEfetivo] = useState([]);
  useEffect(() => {
    api.get("/efetivo", config).then((response) => {
      setEfetivo(response.data);
      console.log(efetivo);
    });
  }, []);
  return (
    <div className="flex  items-center justify-center">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">Posto/Grad</th>
              <th className="py-3 px-4 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {efetivo.map((efetivo) => (
              <tr className="border-b border-blue-gray-200">
                <td className="py-3 px-4">{efetivo.posto}</td>
                <td className="py-3 px-4">{efetivo.qtd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
