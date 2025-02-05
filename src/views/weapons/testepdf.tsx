// WeaponRequestForm.tsx
import { useState } from 'react'
// import pmba from '../../assets/pmba2.png'
import { useLocation } from 'react-router-dom'
import { usePDF } from 'react-to-pdf'

import { useRef } from 'react'
export const WeaponRequestForm = () => {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' })

  const location = useLocation()
  const weapon = location.state
  console.log(weapon)

  return (
    <div className="max-w-5xl mx-auto p-5 font-sans " ref={targetRef}>
      {/* Header Grid */}
      <button onClick={() => toPDF()}>Download PDF</button>
      <div className="grid grid-cols-3 gap-5  p-4 mb-8">
        {/* Left Section */}

        <div className="text-center">
          <p className="mt-2">Chefe ALMOXARIFADO</p>
          <p>Ao: Sr Comandante Da OPM</p>
          <div className=" p-3">
            <div className="flex items-center gap-2 mb-1">
              <input type="checkbox" id="defiro" />
              <label htmlFor="defiro">Defiro</label>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <input type="checkbox" id="indefiro" />
              <label htmlFor="indefiro">Indefiro</label>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <input type="checkbox" id="publique" />
              <label htmlFor="publique">Publique-se</label>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <input type="checkbox" id="arquive" />
              <label htmlFor="arquive">Arquive-se</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="informar" />
              <label htmlFor="informar">Informar</label>
            </div>
            <p className="mt-2">Rio Real ___/____/2025</p>
            <p className="mt-2">____________________</p>
            <p>Almoxarife 6ªCIPM</p>
          </div>
        </div>

        {/* Center Section */}
        <div className="text-center">
          <img src={pmba} alt="PMBA Logo" className="max-w-[120px] mx-auto" />
          <p className="text-lg">POLÍCIA MILITAR DA BAHIA CPR/L- 6ª CIPM</p>
        </div>

        {/* Right Section */}
        <div className="text-center">
          <p>6ª CIPM - CMT OPM</p>
          <p>Ao: Chefe DO ALMOX</p>
          {/* Checkbox Container */}
          <div className="flex flex-col items-start px-6 my-5 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="viabilidade-sim" />
              <label htmlFor="viabilidade-sim">Há Viabilidade</label>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="publique" />
              <label htmlFor="publique">Publique-se</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="viabilidade-nao" />
              <label htmlFor="viabilidade-nao">Não Há Viabilidade</label>
            </div>
          </div>

          <p className="mt-2">Rio Real ___/____/2025</p>
          <p className="mt-2">____________________</p>
          <p>Cmt 6ªCIPM</p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-center font-bold my-8 uppercase">
        Requerimento de Carga Pessoal de Arma de Fogo da PMBA
      </h1>

      {/* Form */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <p>
            Eu, {weapon.name}, {weapon.posto}, Mat:{weapon.mat}
          </p>
        </div>
        <div></div>
      </div>

      <div className="grid grid-cols-3 gap-4"></div>

      {/* Signatures */}
      <div className="grid grid-cols-3 gap-8 mt-12">
        <div className="text-center"></div>
        <div className="text-center">
          <div className="border-t border-black pt-2">
            <p className="text-sm">
              {weapon.posto} {weapon.name.toUpperCase()} - {weapon.mat}
            </p>
          </div>
        </div>
        <div className="text-center"></div>
      </div>

      {/* Date */}
      <div className="text-right mt-8">
        <p>Rio Real, _____ de _____________ de 2025</p>
      </div>
      <div className="mt-12 w-full border border-black">
        <div className="flex justify-between items-center p-4">
          <p>Do: Chefe da Corregedoria Setorial </p>
          <p>Rio Real, ___/___/2025</p>
        </div>
        <div className="flex justify-between items-center p-4 mt-0">
          <p>Ao: Sr. Comandante da OPM</p>
        </div>
        <div className="flex justify-between items-center p-4">
          Informo a V.Sª que o
          Requerente_____________________________________________________________________________
          ________________________________________________________________________________________________________
          ________________________________________________________________________________________________________
          ________________________________________________________________________________________________________
        </div>

        <div className="flex flex-col items-center justify-center p-4 mt-8">
          <div className="border-t border-black pt-2 w-48">
            <p className="text-center">Chefe da CorSet</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <table className="w-full table-auto text-left border border-collapse border-slate-500">
          <thead className="border-b border-black">
            <tr className="border-b border-black">
              <th className="border-b border-black border-r border-l px-4 py-2">
                #
              </th>
              <th className="border-b border-black border-r px-4 py-2">
                Descrição
              </th>
              <th className="border-b border-black border-r px-4 py-2">
                N Serie
              </th>
            </tr>
          </thead>
          <tbody className="border-b border-black">
            <tr className="border-b border-black">
              <td className="border-b border-black border-r border-l px-4 py-2">
                {weapon.id}
              </td>
              <td className="border-b border-black border-r px-4 py-2">
                {weapon.weaponType} {weapon.model}
              </td>
              <td className="border-b border-black border-r px-4 py-2">
                {weapon.serialNumber}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <p>BIR Nº _______ de ___ / ___ / ___</p>
        </div>
      </div>
    </div>
  )
}
