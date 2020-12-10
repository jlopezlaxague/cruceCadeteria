import React from "react";
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const OrdersTable = ({ orders, handler }) => {
  const { pathname } = useLocation()
  const { role } = useSelector(state => state.user.user)
  console.log("location", pathname)
  const classes = useStyles();
  return (
    <>
      {orders.length ? (
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
              <caption>Listado de Cadetes/Empresas</caption>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">E-mail</TableCell>
                  <TableCell align="center">Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell align="center">{order.orderId}</TableCell>
                    <TableCell align="center">{order.client.name}</TableCell>
                    <TableCell align="center">{order.client.email}</TableCell>
                    <TableCell align="center">{order.state}</TableCell>
                    <TableCell align="center">
                      {pathname === "/ordenes" && role === "Cadete" ? <IconButton
                        onClick={() => handler(order.id)}
                        aria-label="delete"
                        className={classes.margin}
                        size="medium"
                      >
                        <CheckIcon fontSize="inherit" />
                      </IconButton> : null}
                      <Link to={`/orden/${order.id}`}>
                        <IconButton size="medium">
                          <VisibilityOutlinedIcon fontSize="inherit" />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}
    </>
  );
};

export default OrdersTable;
