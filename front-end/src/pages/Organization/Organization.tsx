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
  BASE_API_URL,
  createUser,
  deleteUserById,
  deleteVacationById,
  getDataByUrl,
  getUsers,
  getVacationRequests,
  updateVacationRequestById,
} from "services/api";
import type { Vacation, VacationStatus } from "store/types/vacation"; // modify types
import { UserInfo } from "store/userSlice";

const Organization = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [vacations, setVacations] = useState<any>([]);
  const [actionsCounter, setActionsCounter] = useState<number>(0);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  const userGroups = useMemo(() => {
    return users.map((user) => {
      const { firstName, lastName, _links } = user;
      const userId = _links?.self?.href.split("/").slice(-1)[0];

      return {
        id: Number.parseInt(userId!) || 0,
        title: firstName + " " + lastName,
        stackItems: true,
      };
    });
  }, [users]);

  useEffect(() => {
    getVacations();
  }, [actionsCounter]);

  const [email, setEmail] = useState("");
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const getVacations = function () {
    getVacationRequests().then((rawVacations: Vacation[]) => {
      Promise.all(
        rawVacations.map(async (vacation: any, index: number) => {
          const link = vacation._links.user.href;
          const {
            status,
            startDate,
            endDate,
            _links: {
              self: { href: vacLink },
            },
          } = vacation;
          const vacationId = vacLink.split("/").slice(-1)[0];
          const user = await getDataByUrl(link);
          if (user) {
            const {
              firstName,
              lastName,
              _links: {
                self: { href: selfLink },
              },
            } = user;
            const userId = selfLink.split("/").slice(-1)[0];

            return {
              id: index + 1,
              userId,
              vacationId,
              firstName,
              lastName,
              status,
              from: moment(startDate).format("Do MMMM YYYY"),
              to: moment(endDate).format("Do MMMM YYYY"),
              request: vacation,
            };
          }
          return null;
        }),
      ).then((combinedVacations) => {
        setVacations(combinedVacations);
      });
    });
  };
  
  const items = useMemo(() => {
    return vacations.map((vacation: any) => {
      const {
        vacationId,
        userId,
        request: { startDate, endDate, status },
      } = vacation;
      return {
        id: Number.parseInt(vacationId),
        group: Number.parseInt(userId),
        start_time: moment(startDate, "YYYY-MM-DD"),
        end_time: moment(endDate, "YYYY-MM-DD").add(24, "hours"),
        title: "vacation",
        itemProps: {
          className: styles[`${status}`],
        },
      };
    });
  }, [vacations, users]);

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
    if (!email?.length) return;
    const userData: UserInfo = {
      firstName: "new-user",
      lastName: `${users.length}`,
      email,
      birthDate: "1991-08-24", // user will provide it later
      phoneNumber: "_", // user will provide it later
      role: "WORKER",
      organization: `${BASE_API_URL}/organizations/1`, // "ITstep",
    };
    createUser(userData)
      .then(() => {
        alert("New user has been created!");
        setEmail("");
        return getUsers();
      })
      .then((data) => setUsers(data));
  };

  const openRemoveDialog = () => {
    setIsRemoveDialogOpen(true);
  };

  const closeRemoveDialog = () => {
    setIsRemoveDialogOpen(false);
  };

  const handleUserDelete = async (user: UserInfo) => {
    const userId = user._links?.self.href.split("/").pop();

    const userVacations = vacations.filter((v: any) => v.userId === userId);

    Promise.all(
      userVacations.map(async (v: any) => {
        return deleteVacationById(v.vacationId);
      }),
    ).then((res) => {
      deleteUserById(userId)
        .then(() => getUsers())
        .then((data) => setUsers(data))
        .then(() => {
          return getVacations();
        })
        .catch((err) => {
          console.log("deleteUserById error:", err);
        });
    });
  };

  const requestListColumns: GridColDef[] = [
    { field: "id", headerName: "№", width: 20, disableColumnMenu: true },
    { field: "lastName", headerName: "Last name", width: 120 },
    { field: "firstName", headerName: "First name", width: 120 },
    { field: "status", headerName: "Status", minWidth: 50 },
    { field: "from", headerName: "From", width: 160 },
    { field: "to", headerName: "To", width: 160 },
    {
      field: "action",
      headerName: "Action",
      disableColumnMenu: true,
      disableReorder: true,
      hideSortIcons: true,
      minWidth: 190,
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
              Approve
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => handleDelete(row.request)}
              disabled={row.status === "DECLINED"}
            >
              Decline
            </Button>
          </div>
        );
      },
    },
  ];

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
            User e-mail:
          </Typography>
          <TextField
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.invitation__input}
          />
          <Button size="small" variant="contained" onClick={handleInvitation}>
            Add user
          </Button>
        </div>
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={openRemoveDialog}
        >
          Manage User
        </Button>
      </div>

      {vacations?.length > 0 && (
        <>
          <h3 className={styles.listTitle}>Requested list:</h3>
          <DataGrid
            rows={vacations}
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
        </>
      )}
      <h3 className={styles.listTitle}>Organization overview:</h3>
      <CustomTimeline users={userGroups} items={items} />

      <RemoveUserDialog
        open={isRemoveDialogOpen}
        onClose={closeRemoveDialog}
        users={users.filter((user) => user.role === "WORKER")}
        handleUserDelete={handleUserDelete}
      />
    </div>
  );
};

export default Organization;
