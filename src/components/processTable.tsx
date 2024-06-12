import React, { useEffect, useState } from 'react';


interface Process {
  id: number;
  name: string;
  description: string;
  frequency: string;
  user: {
    name: string;
  };
}

const ProcessTable: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([]);

 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventário de Processos</h1>
      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"></div>
      <table className="min-w-full bg-white border  divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="py-2 px-4 border">Nome do Process</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Frequencia</th>
            <th className="py-2 px-4 border">Responsável</th>
          </tr>
        </thead>
        <tbody>
            <tr key="1">
              <td className="py-2 px-4 border">Boletim Interno Ostensivo</td>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border">Mensal</td>
              <td className="py-2 px-4 border">SD PM MANOEL</td>
            </tr>
            <tr key="2">
              <td className="py-2 px-4 border">Mapa de Substituição de Função</td>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border">Quadrimestral</td>
              <td className="py-2 px-4 border">Cap PM VINICIUS</td>
            </tr>
            <tr key="3">
              <td className="py-2 px-4 border">Mapa de Condutores - CET</td>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border">Quadrimestral</td>
              <td className="py-2 px-4 border">Cap PM VINICIUS</td>
            </tr>
            <tr key="4">
              <td className="py-2 px-4 border">Plano de Férias</td>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border">Anual</td>
              <td className="py-2 px-4 border">Cap PM VINICIUS / SGT PM ELISANGELA</td>
            </tr>
            <tr key="5">
              <td className="py-2 px-4 border">Memorando de Férias</td>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border">Mensal</td>
              <td className="py-2 px-4 border">SGT PM ELISANGELA</td>
            </tr>
            <tr key="5">
              <td className="py-2 px-4 border">Atualização do Péculio</td>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border">Sempre que houver movimentação</td>
              <td className="py-2 px-4 border">CAP PM VINICIUS</td>
            </tr>
            <tr key="5">
              <td className="py-2 px-4 border">Requisições para Apresentação à Justiça</td>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border">Sempre que houver requisição</td>
              <td className="py-2 px-4 border">ST PM RR JULIO CESAR - Func. Civil Janne</td>
            </tr>
        </tbody>
      </table>
      </div>
  );
};

export default ProcessTable;