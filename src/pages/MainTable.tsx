import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { dateToISO, formatDate } from '../utils/date';
import {
  fetchTableData,
  deleteRow,
  addRow,
  editRow,
} from '../redux/rows/slice';
import { AddRowForm, ITableItem } from '../types';

import Header from '../components/Header';
import Spinner from '../components/Spinner.js';
import ErrorBlock from '../components/ErrorBlock';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { AddCircle, Edit, Delete, Save } from '@mui/icons-material';

const tableHeaderStyling = {
  borderBottom: '1px solid',
  borderBottomColor: '#1976d2',
};

const MainTable: FC = () => {
  const [items, setItems] = React.useState<ITableItem[]>([]);
  const [fields, setFields] = React.useState<AddRowForm>({
    companySigDate: '',
    companySignatureName: '',
    documentName: '',
    documentStatus: '',
    documentType: '',
    employeeNumber: '',
    employeeSigDate: '',
    employeeSignatureName: '',
  });

  const [editFormData, setEditFormData] = React.useState({
    id: '',
    companySigDate: '',
    companySignatureName: '',
    documentName: '',
    documentStatus: '',
    documentType: '',
    employeeNumber: '',
    employeeSigDate: '',
    employeeSignatureName: '',
  });
  const [editRowId, setEditRowId] = React.useState<null | string>(null);

  const dispatch = useAppDispatch();
  const { rows, status, error } = useAppSelector(state => state.rows);
  const {
    companySigDate,
    companySignatureName,
    documentName,
    documentStatus,
    documentType,
    employeeNumber,
    employeeSigDate,
    employeeSignatureName,
  } = fields;

  const getTableData = async () => {
    try {
      await dispatch(fetchTableData());
    } catch (error) {
      console.error(error);
      alert('ОШИБКА:' + error);
    }
  };

  const handleChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickDelete = (id: string) => {
    if (window.confirm('Вы хотите удалить строку?')) {
      try {
        dispatch(deleteRow(id));
      } catch (error) {
        console.error(error);
        alert('ОШИБКА ПРИ УДАЛЕНИИ:' + error);
      }
    }
  };

  const handleClickAddRow = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Creating object with row data
    if (
      companySigDate &&
      companySignatureName &&
      documentName &&
      documentStatus &&
      documentType &&
      employeeNumber &&
      employeeSigDate &&
      employeeSignatureName
    ) {
      const newRow = {
        companySigDate: dateToISO(companySigDate),
        companySignatureName,
        documentName,
        documentStatus,
        documentType,
        employeeNumber,
        employeeSigDate: dateToISO(employeeSigDate),
        employeeSignatureName,
      };

      try {
        dispatch(addRow(newRow));
      } catch (error) {
        console.error(error);
        alert('ОШИБКА ПРИ ДОБАВЛЕНИИ ДАННЫХ' + error);
      }

      setFields({
        companySigDate: '',
        companySignatureName: '',
        documentName: '',
        documentStatus: '',
        documentType: '',
        employeeNumber: '',
        employeeSigDate: '',
        employeeSignatureName: '',
      });
    } else {
      alert('Заполните все поля');
    }
  };
  const handleClickEdit = (row: ITableItem) => {
    const id = row.id;
    setEditRowId(id);
    const formInitialValues = {
      id: row.id,
      companySigDate: row.companySigDate,
      companySignatureName: row.companySignatureName,
      documentName: row.documentName,
      documentStatus: row.documentStatus,
      documentType: row.documentType,
      employeeNumber: row.employeeNumber,
      employeeSigDate: row.employeeSigDate,
      employeeSignatureName: row.employeeSignatureName,
    };

    setEditFormData(formInitialValues);
  };

  const handleClickSave = (id: string) => {
    // Creating object with initial row data

    if (
      editFormData.id &&
      editFormData.companySigDate &&
      editFormData.companySignatureName &&
      editFormData.documentName &&
      editFormData.documentStatus &&
      editFormData.documentType &&
      editFormData.employeeNumber &&
      editFormData.employeeSigDate &&
      editFormData.employeeSignatureName
    ) {
      const editedRow = {
        id: editFormData.id,
        companySigDate: editFormData.companySigDate,
        companySignatureName: editFormData.companySignatureName,
        documentName: editFormData.documentName,
        documentStatus: editFormData.documentStatus,
        documentType: editFormData.documentType,
        employeeNumber: editFormData.employeeNumber,
        employeeSigDate: editFormData.employeeSigDate,
        employeeSignatureName: editFormData.employeeSignatureName,
      };

      dispatch(editRow(editedRow));
      setEditRowId(null);
    } else {
      alert('Заполните все поля');
    }
  };

  React.useEffect(() => {
    getTableData();
    //dispatch(fetchTableData());
  }, []);

  if (!window.localStorage.getItem('pryaniki-token')) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div>
        <Container maxWidth="xl">
          <Grid container component="main">
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ marginTop: '20px' }}
            >
              Таблица
            </Typography>

            {status === 'loading' && <Spinner />}

            {status === 'success' && (
              <>
                <TableContainer>
                  <Grid container sx={{ marginBottom: '60px' }}>
                    <Table sx={{ tableLayout: 'auto' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ ...tableHeaderStyling }}>
                            companySignatureName
                          </TableCell>
                          <TableCell sx={{ ...tableHeaderStyling }}>
                            companySigDate
                          </TableCell>
                          <TableCell sx={{ ...tableHeaderStyling }}>
                            documentName
                          </TableCell>
                          <TableCell sx={{ ...tableHeaderStyling }}>
                            documentStatus
                          </TableCell>
                          <TableCell sx={{ ...tableHeaderStyling }}>
                            documentType
                          </TableCell>
                          <TableCell sx={{ ...tableHeaderStyling }}>
                            employeeNumber
                          </TableCell>
                          <TableCell sx={{ ...tableHeaderStyling }}>
                            employeeSigDate
                          </TableCell>
                          <TableCell sx={{ ...tableHeaderStyling }}>
                            employeeSignatureName
                          </TableCell>
                          <TableCell sx={{ ...tableHeaderStyling, width: 120 }}>
                            Действия
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows?.map(row => (
                          <TableRow key={row.id} id={row.id}>
                            <TableCell>
                              {editRowId === row.id ? (
                                <TextField
                                  placeholder={
                                    editFormData.companySignatureName
                                  }
                                  value={editFormData.companySignatureName}
                                  name="companySignatureName"
                                  onChange={handleEditFormChange}
                                />
                              ) : (
                                row.companySignatureName
                              )}
                            </TableCell>
                            <TableCell>
                              {editRowId === row.id ? (
                                <TextField
                                  placeholder={formatDate(
                                    editFormData.companySigDate
                                  )}
                                  name="companySigDate"
                                  value={editFormData.companySigDate}
                                  onChange={handleEditFormChange}
                                />
                              ) : (
                                formatDate(row.companySigDate)
                              )}
                            </TableCell>

                            <TableCell>
                              {editRowId === row.id ? (
                                <TextField
                                  placeholder={editFormData.documentName}
                                  value={editFormData.documentName}
                                  name="documentName"
                                  onChange={handleEditFormChange}
                                />
                              ) : (
                                row.documentName
                              )}
                            </TableCell>
                            <TableCell>
                              {editRowId === row.id ? (
                                <TextField
                                  placeholder={editFormData.documentStatus}
                                  value={editFormData.documentStatus}
                                  name="documentStatus"
                                  onChange={handleEditFormChange}
                                />
                              ) : (
                                row.documentStatus
                              )}
                            </TableCell>
                            <TableCell>
                              {editRowId === row.id ? (
                                <TextField
                                  placeholder={editFormData.documentType}
                                  value={editFormData.documentType}
                                  name="documentType"
                                  onChange={handleEditFormChange}
                                />
                              ) : (
                                row.documentType
                              )}
                            </TableCell>
                            <TableCell>
                              {editRowId === row.id ? (
                                <TextField
                                  placeholder={editFormData.employeeNumber}
                                  value={editFormData.employeeNumber}
                                  name="employeeNumber"
                                  onChange={handleEditFormChange}
                                />
                              ) : (
                                row.employeeNumber
                              )}
                            </TableCell>
                            <TableCell>
                              {editRowId === row.id ? (
                                <TextField
                                  placeholder={formatDate(
                                    editFormData.employeeSigDate
                                  )}
                                  value={editFormData.employeeSigDate}
                                  name="employeeSigDate"
                                  onChange={handleEditFormChange}
                                />
                              ) : (
                                formatDate(row.employeeSigDate)
                              )}
                            </TableCell>
                            <TableCell>
                              {editRowId === row.id ? (
                                <TextField
                                  placeholder={
                                    editFormData.employeeSignatureName
                                  }
                                  value={editFormData.employeeSignatureName}
                                  name="employeeSignatureName"
                                  onChange={handleEditFormChange}
                                />
                              ) : (
                                row.employeeSignatureName
                              )}
                            </TableCell>
                            <TableCell align="left">
                              <IconButton
                                color="error"
                                aria-label="Удалить данные"
                                component="button"
                                onClick={() => handleClickDelete(row.id)}
                              >
                                <Delete sx={{ fontSize: 20 }} />
                              </IconButton>
                              {editRowId === row.id ? (
                                <IconButton
                                  aria-label="Сохранить данные"
                                  component="button"
                                  type="button"
                                  sx={{ marginLeft: '10px' }}
                                  onClick={() => handleClickSave(row.id)}
                                >
                                  <Save sx={{ fontSize: 20 }} />
                                </IconButton>
                              ) : (
                                <IconButton
                                  aria-label="Редактировать данные"
                                  component="button"
                                  type="button"
                                  sx={{ marginLeft: '10px' }}
                                  onClick={() => handleClickEdit(row)}
                                >
                                  <Edit sx={{ fontSize: 20 }} />
                                </IconButton>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                </TableContainer>

                <Grid container>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleClickAddRow}
                    sx={{
                      width: '100%',
                      '& .MuiTextField-root': { m: 2, width: 140 },
                    }}
                  >
                    <Grid container spacing={2}>
                      <TextField
                        required
                        variant="standard"
                        id="companySignatureName"
                        label="companySignatureName"
                        name="companySignatureName"
                        value={companySignatureName}
                        onChange={handleChangeField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        required
                        variant="standard"
                        name="companySigDate"
                        label="companySigDate"
                        type="date"
                        id="companySigDate"
                        value={fields.companySigDate}
                        onChange={handleChangeField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        required
                        variant="standard"
                        name="documentName"
                        label="documentName"
                        type="documentName"
                        id="documentName"
                        value={fields.documentName}
                        onChange={handleChangeField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        required
                        variant="standard"
                        name="documentStatus"
                        label="documentStatus"
                        type="documentStatus"
                        id="documentStatus"
                        value={fields.documentStatus}
                        onChange={handleChangeField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        required
                        variant="standard"
                        name="documentType"
                        label="documentType"
                        type="documentType"
                        id="documentType"
                        value={fields.documentType}
                        onChange={handleChangeField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        required
                        variant="standard"
                        name="employeeNumber"
                        label="employeeNumber"
                        type="employeeNumber"
                        id="employeeNumber"
                        value={fields.employeeNumber}
                        onChange={handleChangeField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        required
                        variant="standard"
                        name="employeeSigDate"
                        label="employeeSigDate"
                        type="date"
                        id="employeeSigDate"
                        value={fields.employeeSigDate}
                        onChange={handleChangeField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        required
                        variant="standard"
                        name="employeeSignatureName"
                        label="employeeSignatureName"
                        type="employeeSignatureName"
                        id="employeeSignatureName"
                        value={fields.employeeSignatureName}
                        onChange={handleChangeField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <IconButton
                        color="secondary"
                        aria-label="Добавить данные"
                        component="button"
                        type="submit"
                        sx={{ marginLeft: '20px' }}
                      >
                        <AddCircle sx={{ fontSize: 40 }} />
                      </IconButton>
                    </Grid>
                  </Box>
                </Grid>
              </>
            )}
            {error && <ErrorBlock />}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default MainTable;
