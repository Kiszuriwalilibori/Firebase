import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { User } from "types";
import { Paper } from "@material-ui/core";
import { userCardStyles } from "../styles";
import { Styles } from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles(userCardStyles as Styles<{}, {}, "root" | "media">);

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
