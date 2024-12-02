import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  useReactTable, 
  createColumnHelper, 
  getCoreRowModel, 
  getFilteredRowModel,
  flexRender, 
  getPaginationRowModel,
  getSortedRowModel
} from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import fetchSickNote from "../../services/fetchSickNote";
import { useState, useMemo } from "react";
import { api } from "../../services/api";
import { Button, Dialog } from "@material-tailwind/react";
import SicknoteForm from "./newSicknote";
import DeleteModal from "../../components/modalDelete";

const SickNotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  

  const [deleteId, setDeleteId] = useState(null);

  const queryClient = useQueryClient();
  const { data: sickNotes, isLoading } = useQuery(["sicknote"], fetchSickNote, {
    onSuccess: (data) => {
      console.log("Data refetched:", data);
    },
  });

  const openDeleteModal = (id: any) => {
    console.log(id)
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/sicknote/${deleteId}`);
      queryClient.invalidateQueries(["sicknote"]);
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting sicknote:', error);
    }
  };

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
    columnHelper.accessor('posto', {
      header: 'Posto/Grad',
      cell: info => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('name', {
      header: 'Nome',
      cell: info => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('mat', {
      header: 'Mat',
      cell: info => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('InitialDate', {
      header: 'Início',
      cell: info => format(parseISO(info.getValue()), "dd/MM/yyyy"),
      enableSorting: true,
    }),
    columnHelper.accessor('finaldate', {
      header: 'Término',
      cell: info => format(parseISO(info.getValue()), "dd/MM/yyyy"),
      enableSorting: true,
    }),
    columnHelper.accessor('Days', {
      header: 'Dias de Afastamento',
      cell: info => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('Cid', {
      header: 'Cid',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('id', {
      header: 'Actions',
      cell: info => (
        <button
          onClick={() => openDeleteModal(info.getValue())}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          Delete
        </button>
      ),
    }),
  ], []);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  
  const table = useReactTable({
    data: sickNotes?.sicknotes || [],
    columns,
    state: {
      columnFilters,
      pagination,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  });
  

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto my-8 dark:bg-slate-600  bg-white rounded-lg shadow-xl overflow-hidden">
    <div className="px-4 py-5 sm:px-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Atestados Médicos</h2>
      <p className="mt-1 text-sm text-gray-600"></p>
    </div>
    <div>
        <Button
           className="flex items-left gap-3 dark:bg-blue-gray-700 mb-5 ml-5"
           size="xl"
           onClick={handleOpen}
            >
              Registrar Atestado
        </Button>
        <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <SicknoteForm />
      </Dialog>
  
    <div className="overflow-x-auto dark:bg-slate-600 ">
      <table className="min-w-full divide-y divide-gray-200 dark:bg-slate-600 ">
        <thead className="bg-gray-50 dark:bg-slate-600 darrk:text-white">
          {table.getHeaderGroups().map(headerGroup => (
            <>
              <tr>
                {headerGroup.headers.map(header => (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={header.column.getToggleSortingHandler()}>
                    <div className="flex items-center">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span className="ml-2">
                        {{
                          asc: '🔼',
                          desc: '🔽',
                        }[header.column.getIsSorted()] ?? null}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
              <tr>
                {headerGroup.headers.map(header => (
                  <th className="px-6 py-3 bg-gray-100">
                    {header.column.getCanFilter() ? (
                      <input
                        type="text"
                        onChange={(e) => header.column.setFilterValue(e.target.value)}
                        value={header.column.getFilterValue() || ''}
                        placeholder={`Filter ${header.column.columnDef.header}`}
                        className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : null}
                  </th>
                ))}
              </tr>
            </>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous
        </button>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span> of <span className="font-medium">{table.getPageCount()}</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              First
            </button>
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </button>
            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Last
            </button>
          </nav>
        </div>
      </div>
      <select
        value={table.getState().pagination.pageSize}
        onChange={e => table.setPageSize(Number(e.target.value))}
        className="ml-2 p-2 border rounded-md text-sm"
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
    <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        tipo="Atestado Médicos"
      />
  </div>
  </div>
  );
};

export default SickNotes;
