import React from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Player from './Player/VideoPlayer.js';
import VideoMapper from './Mapper/VideoMapper.js';
import {TableContainer, Table,TableRow, TableBody} from '@material-ui/core/';
import MuiTableCell from "@material-ui/core/TableCell";
import AudioListner from './MeetingListner/AudioListner';

const TableCell = withStyles({
  root: {
    borderBottom: "none"
  }
})(MuiTableCell);

function App() {
  AudioListner.init();
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell align="center">
              <Player.VideoPlayer/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <VideoMapper/>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
