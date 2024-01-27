import {
  CircularProgress,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material"
import React, { ReactElement, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { Column, useTable } from "react-table"
import actions from "src/actions"
import styles from "./index.module.scss"
import { CheckIn } from "types/CheckIn"

const CheckInTable = (): ReactElement => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const [checkIns, setCheckIns] = useState([])

  useEffect(() => {
    const getCheckIn = async () => {
      setLoading(true)
      try {
        const { data } = await dispatch(actions.checkin.allCheckInItems())
        data.sort((a: { startTime: number }, b: { startTime: number }) => {
          return a.startTime > b.startTime
        })
        setCheckIns(data)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    getCheckIn()
  }, [dispatch])

  const columns: Column<CheckIn>[] = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id"
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "center"
            }}
          >
            Points
          </div>
        ),
        accessor: "points",
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "center"
            }}
          >
            Check-In Count
          </div>
        ),
        accessor: "checkinCount",
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>
      }
    ],
    []
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<CheckIn>({
      columns,
      data: checkIns,
      initialState: {
        hiddenColumns: ["_id"]
      }
    })

  return (
    <>
      <div className={styles.dialogContent}>
        <Collapse in={loading}>
          <div className={styles.spinnerContainer}>
            <CircularProgress />
          </div>
        </Collapse>
        <TableContainer>
          <Table {...getTableProps()}>
            <TableHead>
              {
                // Loop over the header rows
                headerGroups.map((headerGroup, headerIdx) => (
                  // Apply the header row props
                  <TableRow
                    {...headerGroup.getHeaderGroupProps()}
                    key={headerIdx}
                  >
                    {
                      // Loop over the headers in each row
                      headerGroup.headers.map((column, cellIdx) => (
                        // Apply the header cell props
                        <TableCell {...column.getHeaderProps()} key={cellIdx}>
                          {
                            // Render the header
                            column.render("Header")
                          }
                        </TableCell>
                      ))
                    }
                  </TableRow>
                ))
              }
            </TableHead>
            {/* Apply the table body props */}
            <TableBody {...getTableBodyProps()}>
              {rows.map((row, rowIdx) => {
                // Prepare the row for display
                prepareRow(row)
                return (
                  // Apply the row props
                  <TableRow {...row.getRowProps()} key={rowIdx}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell, cellIdx) => {
                        // Apply the cell props
                        return (
                          <TableCell {...cell.getCellProps()} key={cellIdx}>
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </TableCell>
                        )
                      })
                    }
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default CheckInTable
