import React, { useState } from 'react';
import { Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { DropzoneDialog } from 'material-ui-dropzone';
import axios from 'axios';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FileUpload = () => {
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({
    severity: '',
    message: ''
  });

  function uploadFile(file) {
    axios
      .post('/channel/uploadfile', file)
      .then(res => {
        setOpen(false);
        setSnackbarOpen(true);
        setSnackbarMessage({
          severity: 'success',
          message: `${res.data.recordInserted} resume submitted successfully !`
        });
      })
      .catch(err => {
        console.log(err);
        setOpen(false);
        setSnackbarMessage({
          severity: 'error',
          message: 'Something went wrong. Please try again !'
        });
        setSnackbarOpen(true);
      });
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <div
        style={{
          minHeight: '50px',
          minWidth: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setOpen(true)}
        >
          Upload Resume
        </Button>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          style={{ width: '100%' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarMessage.severity}
          >
            {snackbarMessage.message}
          </Alert>
        </Snackbar>

        <DropzoneDialog
          acceptedFiles={[
            '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          ]}
          cancelButtonText={'cancel'}
          submitButtonText={'submit'}
          maxFileSize={5000000}
          open={open}
          onClose={() => setOpen(false)}
          onSave={files => {
            const formData = new FormData();

            // Update the formData object
            formData.append('file', files[0], files[0].name);

            // Request made to the backend api
            // Send formData object
            // axios.post('/channel/uploadfile', formData);
            // setOpen(false);
            // setSnackbarOpen(true);
            uploadFile(formData);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
      </div>
    </>
  );
};

export default FileUpload;