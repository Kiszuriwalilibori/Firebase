import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { User } from "types/index";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        position: "fixed",
        right: "1vw",
        top: "1vh",
        backgroundColor: "#1E656D",
        color: "white",
        border: "1px solid",
        cursor: "default !important",
    },
    media: {
        height: 60,
        width: 60,
        margin: "12px auto 0 auto",
        backgroundSize: "contain",
        color: "white",
        backgroundColor: "#1f9a73",
    },
});

interface Props {
    user: User;
}

export default function UserCard(props: Props) {
    const classes = useStyles();
    const { user } = props;

    return (
        <Paper elevation={2} component="aside" aria-label="user card">
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={user.photoURL as string | undefined}
                        component="img"
                        alt="user picture"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            {user.displayName || user.email}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {user.email || user.displayName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Paper>
    );
}
