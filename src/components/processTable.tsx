import React, { useEffect, useState } from 'react';


interface Process {
  id: number;
  name: string;
  description: string;
  status: string;
  frequency: string;
  user: {
    name: string;
  };
}

const ProcessTable: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([]);

 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Process Inventory</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Process Name</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Frequency</th>
            <th className="py-2 px-4 border">Responsible User</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.id}>
              <td className="py-2 px-4 border">Boletim Interno Ostensivo</td>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border">Mensal</td>
              <td className="py-2 px-4 border">SD PM MANOEL</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessTable;