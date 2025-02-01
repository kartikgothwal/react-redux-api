import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { FetchUsers, UpdateUser, DeleteUser, AddUser } from "./userSlice";
import { IUser } from "../../types";
const UserDetail = () => {
  const users = useSelector((state) => state.users.users);
  const pending = useSelector((state) => state.users.pending);
  const error = useSelector((state) => state.users.error);
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  useEffect(() => {
    dispatch(FetchUsers());
  }, [dispatch]);
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableColumnActions: false,
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Full Name",
        enableColumnActions: false,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        enableColumnActions: false,
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: "phone",
        header: "Phone",
        enableColumnActions: false,
        muiEditTextFieldProps: {
          type: "string",
          required: true,
          error: !!validationErrors?.phone,
          helperText: validationErrors?.phone,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              phone: undefined,
            }),
        },
      },
      {
        accessorKey: "city",
        header: "City",
        enableColumnActions: false,
        muiEditTextFieldProps: {
          type: "string",
          required: true,
          error: !!validationErrors?.city,
          helperText: validationErrors?.city,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              city: undefined,
            }),
        },
      },
      {
        accessorKey: "zipcode",
        header: "Zip Code",
        enableColumnActions: false,
        muiEditTextFieldProps: {
          type: "string",
          required: true,
          error: !!validationErrors?.zipcode,
          helperText: validationErrors?.zipcode,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              zipcode: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );

  const handleCreateUser: MRT_TableOptions<IUser>["onCreatingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateUser(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await dispatch(AddUser(values));
      table.setCreatingRow(null);
    };

  const handleSaveUser: MRT_TableOptions<IUser>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    dispatch(UpdateUser(values));
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row: MRT_Row<User>) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(DeleteUser(row.original.id));
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: users,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    enableSorting: false,
    enableFilters: false,
    enableHiding: false,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: error
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "400px",
        margin: "1rem",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New User
      </Button>
    ),
    state: {
      isLoading: pending,
      isSaving: pending,
      showAlertBanner: pending,
      showProgressBars: pending,
    },
  });

  return <MaterialReactTable table={table} />;
};

const ReactQueryDevtoolsProduction = lazy(() =>
  import("@tanstack/react-query-devtools").then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserDetail />
      <Suspense fallback={null}>
        <ReactQueryDevtoolsProduction />
      </Suspense>
    </QueryClientProvider>
  );
}

const validateRequired = (value: string) =>
  !!value.length && value.trim() !== "" && typeof value === "string";
const validateNumber = (value: string) =>
  !!value.length && /^[0-9]{10}$/.test(value);
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user: IUser) {
  return {
    name: !validateRequired(user.name) ? "Name is Required" : "",
    email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
    phone: !validateNumber(user.phone)
      ? "Incorrect Number Format, should be 10 numbers"
      : "",
    city: !validateRequired(user.city) ? "City is Required" : "",
    zipcode: !validateRequired(user.zipcode) ? "Zip Code Name is Required" : "",
  };
}
