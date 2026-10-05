import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import type { Task } from '../types/task';

interface TaskCardProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}

const TaskCard = ({ tasks, onDelete }: TaskCardProps) => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1.5,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Action',
      flex: 1.5,
      sortable: false,
      renderCell: (params) => (
        <>
          <button
            className="view-btn"
            onClick={() => navigate(`/tasks/${params.row.task_uuid}`)}
          >
            View
          </button>

          <button
            className="edit-btn"
            onClick={() => navigate(`/tasks/${params.row.task_uuid}/edit`)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(params.row.task_uuid)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="task-table">
      <DataGrid
        rows={tasks}
        columns={columns}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default TaskCard;