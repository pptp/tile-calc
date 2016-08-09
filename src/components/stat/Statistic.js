require("./../../styles/statistic.less")

import { List, Map } from 'immutable'

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

export default class Statistic extends Component {
  generateStat() {
    const {
      wallList,
      tileList
    } = this.props

    let stat = {
      tiles: {},
      walls: [],
      total: {}
    }

    wallList.forEach((wall, i) => {
      const wallTiles = wall.get('tiles') || List.of()

      stat.walls[i] = {}

      wallTiles.forEach(item => {
        const tileId = item.get('tileId')
        const tile = tileList.find(_tile => _tile.get('id') == tileId)
        const tileName = tile.get('name')

        if (stat.tiles[tileId] == undefined) {
          stat.tiles[tileId] = tileName
        }

        if (!stat.walls[i][tileId]) {
          stat.walls[i][tileId] = 0
        }

        if (!stat.total[tileId]) {
          stat.total[tileId] = 0
        }

        stat.walls[i][tileId]++
        stat.total[tileId]++
      })
    })

    return stat
  }

  render() {
    const stat = this.generateStat()
    // debugger;

    let headers = [];
    let rows = [];
    let total = [];
    for (const tileId in stat.tiles) {
      const tileName = stat.tiles[tileId]
      
      headers.push(tileName);

      stat.walls.forEach((tileList, i) => {
        if (!rows[i]) {
          rows[i] = []
        }
        rows[i].push(tileList[tileId])
      })

      total.push(stat.total[tileId])
    }

    // headers = headers.join();
    // rows = rows.map(row => <TableRow>row.join()</TableRow>)

    if (!this.props.wallList.count() ) {
      return <div className="statistic">
        <Toolbar>
          <ToolbarGroup >
            <ToolbarTitle text="Statistic" />
          </ToolbarGroup>
        </Toolbar>

        <Paper>
          <div className="dummy">Nothing to show</div>
        </Paper>
      </div>
    }


    return <div className="statistic">
      <Toolbar>
        <ToolbarGroup >
          <ToolbarTitle text="Statistic" />
        </ToolbarGroup>
      </Toolbar>

      <Paper>
        <Table selectable={false} >
          <TableHeader displaySelectAll={false} displayRowCheckbox={false}>
            <TableRow  displayBorder={false}>
              <TableHeaderColumn>
              </TableHeaderColumn>
              {headers.map((header, i) => 
                <TableHeaderColumn key={'stat-header-' + i}>
                  {header}
                </TableHeaderColumn>
              )}
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false}>
            {rows.map((row, i) => 
              <TableRow key={'stat-row-' + i}>
                <TableRowColumn>
                  Wall #{i + 1}
                </TableRowColumn>
                {row.map((val, j) => 
                  <TableRowColumn key={'stat-val-' + i + '-' + j}>
                    {val}
                  </TableRowColumn>
                )}
              </TableRow>
            )}


            <TableRow>
              <TableRowColumn>
                Total
              </TableRowColumn>
              {total.map((val, j) => 
                <TableRowColumn key={'stat-val-total-' + j}>
                  {val}
                </TableRowColumn>
              )}
            </TableRow>

          </TableBody>
        </Table>
      </Paper>
    </div>
  }
}

Statistic.propTypes = {
  wallList: PropTypes.instanceOf(List),
  tileList: PropTypes.instanceOf(List),
}