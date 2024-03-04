import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import config from "../utils/config";
import fetchEfetivo from "../services/fetchEfetivo";
import { useQuery } from "@tanstack/react-query";

export default function TableQuantityPosto() {
  interface efetivo {
    id: string;
    posto: string;
    qtd: number;
  }
  const [efetivo, setEfetivo] = useState([]);
  const results = useQuery(["efetivo"], fetchEfetivo);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  return (
    <div className="max-w-sm ml-28 items-center justify-center">
      <div className="overflow-auto max-h-52 ">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">Posto/Grad</th>
              <th className="py-3 px-4 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {results.data.map((efetivo) => (
              <tr className="border-b border-blue-gray-200" key={efetivo.id}>
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
