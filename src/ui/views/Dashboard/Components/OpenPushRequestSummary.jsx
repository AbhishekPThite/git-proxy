/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import {getPushes} from '../../../services/git-push';
import Card from '../../../components/Card/Card.jsx';
import CardHeader from '../../../components/Card/CardHeader.jsx';
import CardIcon from '../../..//components/Card/CardIcon.jsx';
import CardFooter from '../../../components/Card/CardFooter.jsx';

import styles from '../../../assets/jss/material-dashboard-react/views/dashboardStyle.js';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles(styles);


export default function OpenPushRequestSummary(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const query={blocked: true, canceled: false, authorised: false, rejected: false};
    getPushes(setIsLoading, setData, setAuth, setIsError, query);
    }, [props]);

    if (isLoading) return (<div>Loading ...</div>);
    if (isError) return (<div>Something went wrong ...</div>);
    if (!auth) return (<Redirect to={{pathname: '/login'}} />);

  return (
    <Card>
      <CardHeader color="success" stats icon>
        <CardIcon color="success">
          <Icon>content_copy</Icon>
        </CardIcon>
        <p className={classes.cardCategory}>Open</p>
        <h3 className={classes.cardTitle}>
        {data.length} <small>Pushes</small>
        </h3>
      </CardHeader>
      <CardFooter stats>
      </CardFooter>
    </Card>
  );
}
