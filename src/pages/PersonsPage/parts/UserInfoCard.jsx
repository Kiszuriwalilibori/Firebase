import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    position: "fixed",
    right: "1vw",
    top: "1vh",
    backgroundColor: "#1995AD",
    color: "white",
    boxShadow: "0 0 1px rgba(0,0,0,0.6), 0 0 2px rgba(0,0,0, 0.6), 0 0 4px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.6),0 0 16px rgba(0,0,0,0.6)",
  },
  media: {
    height: 60,
    width: 60,
    margin: "0 auto",
    backgroundSize: "contain",
    color: "white",
  },
});

export default function UserInfoCard(props) {
  const classes = useStyles();
  const { user } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={user.photoURL} title="user photo" component="img" />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {user.displayName || user.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.email || user.displayName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

UserInfoCard.propTypes = {
  user: PropTypes.object,
};
