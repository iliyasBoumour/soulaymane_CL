import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LoadingButton } from '@mui/lab';
import { FunctionComponent } from 'react';
import { Demand } from '../types';

interface Props {
  rows: Demand[];
  requestId: string | null;
  acceptRequest: (requestId: string) => void;
  loadingAcceptRequest: boolean;
  refuseRequest: (requestId: string) => void;
  loadingRefuseRequest: boolean;
}

export const Table: FunctionComponent<Props> = ({
  rows,
  requestId,
  acceptRequest,
  loadingAcceptRequest,
  refuseRequest,
  loadingRefuseRequest,
}) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Matériel</TableCell>
            <TableCell align="right">Demandeur</TableCell>
            <TableCell align="right" />
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.offerTitle}
              </TableCell>
              <TableCell align="right">{row.demanderTitle}</TableCell>
              <TableCell align="right">
                <LoadingButton
                  variant="outlined"
                  color="secondary"
                  loading={row.id === requestId && loadingAcceptRequest}
                  onClick={() => acceptRequest(row.id)}
                >
                  Accepter
                </LoadingButton>
              </TableCell>
              <TableCell align="right">
                <LoadingButton
                  variant="outlined"
                  color="error"
                  loading={loadingRefuseRequest}
                  onClick={() => refuseRequest(row.id)}
                >
                  Refuser
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
