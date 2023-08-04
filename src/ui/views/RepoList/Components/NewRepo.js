/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import GridItem from '../../../components/Grid/GridItem.jsx';
import GridContainer from '../../../components/Grid/GridContainer.jsx';
import Card from '../../../components/Card/Card.jsx';
import CardBody from '../../../components/Card/CardBody.jsx';
import Button from '../../../components/CustomButtons/Button.jsx';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import {addRepo} from '../../../services/repo.js';
import CardHeader from '../../../components/Card/CardHeader.jsx';
import {makeStyles} from '@material-ui/core/styles';
import styles from '../../../assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

function AddRepositoryDialog(props) {
  const [project, setProject] = useState('');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [tip, setTip] = useState(false);
  const {onClose, open, onSuccess} = props;
  const classes = useStyles();

  const handleClose = () => {
    setError('');
    resetRepo();
    onClose();
  };

  const handleSuccess = (data)=>{
    onSuccess(data);
    setTip(true);
  };

  const resetRepo = ()=>{
    setProject('');
    setName('');
    setUrl('');
  };

  const add = async () => {
    const data = {
      project: project,
      name: name,
      url: url,
      maxUser: 1,
    };

    if (data.project.trim().length == 0 || data.project.length > 100) {
      setError('project name length unexpected');
      return;
    }

    if (data.name.trim().length == 0 || data.name.length > 100) {
      setError('Repo name length unexpected');
      return;
    }

    try {
      new URL(data.url);
    } catch (e) {
      setError('Invalid URL');
      return;
    }

    try {
      await addRepo(onClose, setError, data);
      handleSuccess(data);
      handleClose();
    } catch (e) {
      if (e.message) {
      } else {
        setError(e.toString());
      }
    }
  };

  const inputStyle = {
    width: '100%',
  };

  return (<>
    <Snackbar open={tip} anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }} autoHideDuration={5000} message="Repository is added successfully" onClose={()=>setTip(false)}/>
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle style={{'color': 'red'}} id="simple-dialog-title">{error}</DialogTitle>
      <Card>
        <CardHeader color="danger" stats icon>
          <h3 className={classes.cardTitle}>Add a remote Repository</h3>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <FormControl style={inputStyle}>
                <InputLabel htmlFor="project">Project</InputLabel>
                <Input
                  id="project"
                  inputProps={{maxLength: 200, minLength: 3}}
                  aria-describedby="project-helper-text"
                  onChange={(e) => setProject(e.target.value)}
                  />
                <FormHelperText id="project-helper-text">The project</FormHelperText>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <FormControl style={inputStyle}>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  inputProps={{maxLength: 200, minLength: 3}}
                  id="name"
                  aria-describedby="name-helper-text"
                  onChange={(e) => setName(e.target.value)}/>
                <FormHelperText id="name-helper-text">The project Name</FormHelperText>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <FormControl style={inputStyle}>
                <InputLabel htmlFor="url">Url</InputLabel>
                <Input
                 inputProps={{maxLength: 200, type: 'url'}}
                  type="url"
                  id="url"
                  aria-describedby="url-helper-text"
                  onChange={(e) => setUrl(e.target.value)} />
                <FormHelperText id="url-helper-text">The Project Url</FormHelperText>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Button variant="outlined" color="primary" onClick={handleClose}>Cancel</Button>
              <Button variant="outlined" color="primary" onClick={add}>Add</Button>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    </Dialog></>
  );
}

AddRepositoryDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

NewRepo.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default function NewRepo(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>Add New Repository</Button>
      <AddRepositoryDialog open={open} onClose={handleClose} onSuccess={props.onSuccess}/>
    </div>
  );
}
