import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import moment from "moment";

import { CustomTimeline, RemoveUserDialog } from "components";
import styles from "./Organization.module.scss";
import {
  deleteUserById,
  getDataByUrl,
  getUsers,
  getVacationRequests,
  updateVacationRequestById,
} from "services/api";
import { Vacation, VacationStatus } from "store/types/vacation";
import { UserInfo } from "store/userSlice";

const Organization = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [vacationRequests, setVacationRequests] = useState<Vacation[]>([]);
  const [actionsCounter, setActionsCounter] = useState<number>(0);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  const userGroups = useMemo(
    () =>
      users.map((user) => ({
        id: user.email,
        title: user.firstName + " " + user.lastName,
      })),
    [users],
  );

  useEffect(() => {
    getVacationRequests().then((res) => {
      setVacationRequests(res);
    });
  }, [actionsCounter]);

  const [email, setEmail] = useState("");
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const onRequestAction = (vacation: Vacation, newStatus: VacationStatus) => {
    const { _links, startDate, endDate } = vacation;
    const vacationId = _links?.self.href.split("/").pop();
    if (!vacationId) return;

    updateVacationRequestById(vacationId, {
      status: newStatus,
      startDate,
      endDate,
    })
      .then((res) => {
        setActionsCounter(actionsCounter + 1);
        alert(`Request has been changed to ${newStatus}`);
        console.log("updateVacationRequestById:", res);
      })
      .catch((err) => {
        console.log("updateVacationRequestById error:", err);
      });
  };

  const handleApprove = (vacation: Vacation) => {
    onRequestAction(vacation, "APPROVED");
  };

  const handleDelete = (vacation: Vacation) => {
    onRequestAction(vacation, "DECLINED");
  };

  const handleInvitation = () => {
    console.log("Send invitation");
    setEmail("");
  };

  const openRemoveDialog = () => {
    setIsRemoveDialogOpen(true);
  };

  const closeRemoveDialog = () => {
    setIsRemoveDialogOpen(false);
  };

  const handleUserDelete = async (user: UserInfo) => {
    const userId = user._links?.self.href.split("/").pop();
    deleteUserById(userId)
      .then(() => getUsers())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log("deleteUserById error:", err);
      });
  };

  const requestListColumns: GridColDef[] = [
    { field: "id", headerName: "№", width: 20, disableColumnMenu: true },
    { field: "lastName", headerName: "Last name", width: 120 },
    { field: "firstName", headerName: "First name", width: 120 },
    { field: "status", headerName: "Status", width: 80 },
    { field: "from", headerName: "From", width: 160 },
    { field: "to", headerName: "To", width: 160 },
    {
      field: "action",
      headerName: "Action",
      disableColumnMenu: true,
      disableReorder: true,
      width: 180,
      renderCell: ({ row }) => {
        return (
          <div className={styles.vacationActions}>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => handleApprove(row.request)}
              disabled={row.status === "APPROVED"}
            >
              approve
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => handleDelete(row.request)}
              disabled={row.status === "DECLINED"}
            >
              reject
            </Button>
          </div>
        );
      },
    },
  ];

  const requestDataRows = vacationRequests.map((request: Vacation, index) => {
    // TODO: Get user data by url and provide it to the list
    // const userData = await getDataByUrl(request?._links?.user?.href);
    return {
      id: index,
      firstName: "John",
      lastName: "Dow",
      status: request.status,
      from: moment(request.startDate).format("Do MMMM YYYY"),
      to: moment(request.endDate).format("Do MMMM YYYY"),
      request,
    };
  });

  return (
    <div>
      <div className={styles.header}>
        <Link to="/dashboard" className={styles.link}>
          Dashboard
        </Link>
        <Typography variant="body1" className={styles.pageTitle}>
          Manager's Dashboard
        </Typography>
      </div>

      <div className={styles.topActions}>
        <div className={styles.invitation}>
          <Typography component="span" className={styles.invitation__label}>
            Invite with email:
          </Typography>
          <TextField
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.invitation__input}
          />
          <Button size="small" variant="contained" onClick={handleInvitation}>
            Add to the team
          </Button>
        </div>
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={openRemoveDialog}
        >
          Remove User
        </Button>
      </div>

      <h3 className={styles.listTitle}>Requested list:</h3>

      {requestDataRows?.length > 0 && (
        <DataGrid
          rows={requestDataRows}
          columns={requestListColumns}
          disableRowSelectionOnClick
          disableVirtualization
          hideFooter
          autoHeight
          className={styles.requestTable}
          classes={{
            root: styles.requestTable,
            cellContent: styles.cellContent,
          }}
        />
      )}
      <h3 className={styles.listTitle}>Organization overview:</h3>
      {userGroups?.length > 0 && <CustomTimeline users={userGroups} />}

      <RemoveUserDialog
        open={isRemoveDialogOpen}
        onClose={closeRemoveDialog}
        users={users}
        handleUserDelete={handleUserDelete}
      />
    </div>
  );
};

export default Organization;
