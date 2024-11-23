import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import fetchWeaponProfileId from '../../services/fetchWeaponProfileId';

const TermoResponsabilidade = () => {
  const { id } = useParams();
  const {data, isLoading, error} = useQuery(["sicknote", id], fetchWeaponProfileId);
  if (isLoading) return <div>Loading...</div>;
if (error) return <div>An error occurred: {error.message}</div>;
  const dados =  data.weapons[0] 
  console.log(data)
  
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase mb-2">Polícia Militar da Bahia</h1>
        <h2 className="text-xl font-semibold mb-1">Comando de Policiamento da Região Leste</h2>
        <h3 className="text-lg font-medium">6ª Companhia Independente de Polícia Militar</h3>
        <h4 className="text-lg">Rio Real</h4>
      </header>

      <h2 className="text-xl font-bold text-center mb-6">TERMO DE RESPONSABILIDADE Nº {dados.id}/SMS/2024</h2>

      <div className="space-y-4">
        <p>
          Eu,{dados.posto} <span className="font-semibold">{dados.name}</span>, Mat.: {dados.mat}, CPF nº 909.751.625-00, RG nº 5.698.686-61 SSP/BA, declaro ter recebido 01 (uma) Pistola semi-automática, marca FORJAS TAURUS, calibre .40, modelo PT100, número de série {dados.serialNumber} conforme características e numeração de série abaixo descritas.
        </p>

        <p>
          Assumo total responsabilidade e comprometo-me a ressarcir ao Estado, em caso de dano, roubo ou furto, nas suas formas simples e qualificadas, ou qualquer outra forma de extravio, por dolo ou culpa, além da responsabilidade administrativa disciplinar e penal que possa requerer.
        </p>

        <p>
          Autorizo a Polícia Militar da Bahia, da forma irrevogável, debitar em minha conta de pagamento, o valor correspondente ao material bélico acima descrito, em parcelas conforme o previsto nas normas sobre Processo Administrativo da Polícia Militar da Bahia, no caso de ressarcimento pelos motivos citados no item anterior.
        </p>
      </div>
      <div className="mt-12">
        <div className="flex justify-between">
          <div className="text-center">
            <div className="border-t border-gray-400 pt-2 w-64 mx-auto">
            <table className="table-auto">
                <thead>
                  <tr>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Year</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td>Malcolm Lockyer</td>
                    <td>1961</td>
                  </tr>
                  <tr>
                    <td>Witchy Woman</td>
                    <td>The Eagles</td>
                    <td>1972</td>
                  </tr>
                  <tr>
                    <td>Shining Star</td>
                    <td>Earth, Wind, and Fire</td>
                    <td>1975</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center">
          <table className="table-auto">
            <thead>
              <tr>
                <th>Song</th>
                <th>Artist</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <p className="text-center mb-8">Quartel em Rio Real, 05 de novembro de 2024.</p>
        <div className="flex justify-between">
          <div className="text-center">
            <div className="border-t border-gray-400 pt-2 w-64 mx-auto">
              <p className="font-semibold">FABRICIO DOS PASSOS – CB PM</p>
              <p className="text-sm uppercase">Requerente</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 pt-2 w-64 mx-auto">
              <p className="font-semibold">PAULO HENRIQUE DE MATOS – SUB TEN PM</p>
              <p className="text-sm uppercase">Almoxarife</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermoResponsabilidade;