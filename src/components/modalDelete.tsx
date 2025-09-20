import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@material-tailwind/react';
import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tipo: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  tipo
}) => {
  // Early return if modal is not open
  if (!isOpen) return null;

  const handleConfirm = () => {
    try {
      onConfirm();
    } catch (error) {
      console.error('Error during deletion confirmation:', error);
      // In a real app, you might want to show an error message to the user
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-center mb-5">
          <IconButton
            color="red"
            className="flex items-center justify-center w-12 h-12"
            aria-label="Delete confirmation icon"
          >
            <ExclamationTriangleIcon className="h-6 w-6" />
          </IconButton>
        </div>
        
        <h2
          id="modal-title"
          className="mb-8 text-lg font-medium text-gray-800"
        >
          Deseja mesmo apagar esse registro de {tipo}?
        </h2>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            aria-label="Cancel deletion"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            aria-label="Confirm deletion"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

