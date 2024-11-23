import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@material-tailwind/react';
import React from 'react';

const DeleteModal = (props: { isOpen: Function, onClose: Function, onConfirm: Function, tipo: string  }) => {
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-5">
      <IconButton color="red" className="flex items-center justify-center w-12 h-12">
        <ExclamationTriangleIcon className="h-6 w-6" />
      </IconButton>
    </div>
        <h2 className="mb-8">Deseja mesmo apagar esse registro de {props.tipo}?</h2 >
        <div className="flex justify-end">
          <button
            onClick={props.onClose}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={props.onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

