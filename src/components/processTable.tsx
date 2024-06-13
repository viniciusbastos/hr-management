import React, { useEffect, useState } from 'react';


interface Process {
  id: number;
  name: string;
  description: string;
  frequency: string;
  setor:string;
  user: {
    name: string;
  };
}

const ProcessTable: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([]);

 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Inventário de Processos da Seção de Suporte Operacional</h1>
      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"></div>
      <table className="min-w-full bg-white border  divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr className='dark:bg-gray-800'>
            <th className="py-2 px-4 border">Nome do Processo</th>
            <th className="py-2 px-4 border">Descrição</th>
            <th className="py-2 px-4 border">Frequência</th>
            <th className="py-2 px-4 border">Responsável</th>
            <th className="py-2 px-4 border">Setor Responsável</th>
          </tr>
        </thead>
        <tbody className='dark:bg-gray-700'>
            <tr key="1">
              <td className="py-2 px-4 border">Boletim Interno Ostensivo</td>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border">Mensal</td>
              <td className="py-2 px-4 border">SD PM MANOEL</td>
              <td className="py-2 px-4 border">SRHSP</td>
            </tr>
            <tr key="2">
              <td className="py-2 px-4 border">Mapa de Substituição de Função</td>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border">Quadrimestral</td>
              <td className="py-2 px-4 border">Cap PM VINICIUS</td>
              <td className="py-2 px-4 border">SRHSP</td>
            </tr>
            <tr key="3">
              <td className="py-2 px-4 border">Mapa de Condutores - CET</td>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border">Quadrimestral</td>
              <td className="py-2 px-4 border">Cap PM VINICIUS</td>
              <td className="py-2 px-4 border">SRHSP</td>
            </tr>
            <tr key="4">
              <td className="py-2 px-4 border">Plano de Férias</td>
              <td className="py-2 px-4 border">Coletar através de formulário duas opções de férias dos policiais lotados na 6ªCIPM</td>
              <td className="py-2 px-4 border">Anual</td>
              <td className="py-2 px-4 border">Cap PM VINICIUS / SGT PM ELISANGELA</td>
              <td className="py-2 px-4 border">SRHSP</td>
            </tr>
            <tr key="5">
              <td className="py-2 px-4 border">Memorando de Férias</td>
              <td className="py-2 px-4 border">Realizar mensalmente confirmação do quanto planejado no Plamo de Férias anual</td>
              <td className="py-2 px-4 border">Mensal</td>
              <td className="py-2 px-4 border">SGT PM ELISANGELA</td>
              <td className="py-2 px-4 border">SRHSP</td>
            </tr>
            <tr key="5">
              <td className="py-2 px-4 border">Atualização do Péculio</td>
              <td className="py-2 px-4 border">Atualizar o efetivo quando o policial for transferido, apresentado e outras movimentações no efetivo da 6ªCIPM </td>
              <td className="py-2 px-4 border">Sempre que houver movimentação</td>
              <td className="py-2 px-4 border">CAP PM VINICIUS</td>
              <td className="py-2 px-4 border">SRHSP</td>
            </tr>
            <tr key="5">
              <td className="py-2 px-4 border">Requisições para Apresentação à Justiça</td>
              <td className="py-2 px-4 border">Produzir ofícios de apresentação para conforme requisitado informando aos policias envolvidos</td>
              <td className="py-2 px-4 border">Sempre que houver requisição</td>
              <td className="py-2 px-4 border">ST PM RR JULIO CESAR - Func. Civil Janne</td>
              <td className="py-2 px-4 border">SRHSP</td>
            </tr>
            <tr key="5">
              <td className="py-2 px-4 border">Getão do SEI</td>
              <td className="py-2 px-4 border">Necessidade de cadastro,remoção e reativação de usuário no SEI</td>
              <td className="py-2 px-4 border">Sempre que houver requisição</td>
              <td className="py-2 px-4 border">CAP PM VINICIUS</td>
              <td className="py-2 px-4 border">SRHSP</td>
            </tr>
            <tr key="5">
              <td className="py-2 px-4 border">Controle de Atestados Médicos</td>
              <td className="py-2 px-4 border">Registrar em nota para BIO e Lançamento no aplicativo para controle</td>
              <td className="py-2 px-4 border">Diário</td>
              <td className="py-2 px-4 border">SGT ELISANGELA/ Func. Civil Janne</td>
              <td className="py-2 px-4 border">SRHSP</td>
            </tr>
            <tr key="5">
              <td className="py-2 px-4 border">Processo de Diárias e Transporte</td>
              <td className="py-2 px-4 border">Produzir documentos pertinentes ao pagamento de diárias e transporte</td>
              <td className="py-2 px-4 border">Mensal</td>
              <td className="py-2 px-4 border">SD PM TAMIRES</td>
              <td className="py-2 px-4 border">SSO</td>
            </tr>
            <tr key="5">
              <td className="py-2 px-4 border">Aniversariantes do Mês</td>
              <td className="py-2 px-4 border">Produzir lista mensal com aniversariantes do mês</td>
              <td className="py-2 px-4 border">Mensal</td>
              <td className="py-2 px-4 border">ST PM RR JULIO CESAR - Func. Civil Janne</td>
              <td className="py-2 px-4 border">SSO</td>
            </tr>
            <tr key="5">
              <td className="py-2 px-4 border">Verificar Email</td>
              <td className="py-2 px-4 border">Verificação de email e adotar as medidas pertinentes caso haja necessidade</td>
              <td className="py-2 px-4 border">Diário</td>
              <td className="py-2 px-4 border">ST PM RR JULIO CESAR - Func. Civil Janne - SGT PM ELISANGELA E SD PM MANOEL</td>
              <td className="py-2 px-4 border">SSO</td>
            </tr>
            <tr key="5">
              <td className="py-2 px-4 border">Verificar SEI</td>
              <td className="py-2 px-4 border">Verificação de Sei</td>
              <td className="py-2 px-4 border">Diário</td>
              <td className="py-2 px-4 border">ST PM RR JULIO CESAR - Func. Civil Janne - SGT PM ELISANGELA E SD PM MANOEL</td>
              <td className="py-2 px-4 border">SSO</td>
            </tr>
            <tr key="5">
              <td className="py-2 px-4 border">Verificar das Publicações de BGO</td>
              <td className="py-2 px-4 border">Verificação das Publicações de BGO, registrar as informações pertinentes em BIO e preencher lista de controle de BGO lidos</td>
              <td className="py-2 px-4 border">Diário</td>
              <td className="py-2 px-4 border">ST PM RR JULIO CESAR - Func. Civil Janne - SGT PM ELISANGELA E SD PM MANOEL</td>
              <td className="py-2 px-4 border">SSO</td>
            </tr>
            <tr key="5">
              <td className="py-2 px-4 border">Solicitações de aquisição de arma de fogo/renovação do Craf</td>
              <td className="py-2 px-4 border">Verificação das Publicações de BGO, registrar as informações pertinentes em BIO e preencher lista de controle de BGO lidos</td>
              <td className="py-2 px-4 border">Diário</td>
              <td className="py-2 px-4 border">ST PM RR JULIO CESAR - Func. Civil Janne - SGT PM ELISANGELA E SD PM MANOEL</td>
              <td className="py-2 px-4 border">SSO</td>
            </tr>
        </tbody>
      </table>
      </div>
  );
};

export default ProcessTable;