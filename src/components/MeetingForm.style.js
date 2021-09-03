import { makeStyles } from "@material-ui/core";

export default makeStyles({
  "meeting-form": {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    maxWidth: "600px",

    "& .MuiTextField-root": {
      marginBottom: "0.5rem",
    },
  },
  "meeting-actions": {
    display: "flex",
    justifyContent: "flex-end",

    "& .MuiButton-root:not(:last-child)": {
      marginRight: "0.5rem",
    },
  },
});
