import styles from "./index.module.css";
import IMDBLogo from "assets/images/tmdb.jpg";
import { useHistory, useLocation } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

const AppHeader = (): React.ReactElement => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className={styles.root}>
      <IconButton
        aria-label="back"
        onClick={() => history.goBack()}
        style={{
          visibility: location.pathname === "/" ? "hidden" : "visible",
        }}
        className={styles.backBtn}
      >
        <ArrowBackIosRoundedIcon fontSize="large" />
      </IconButton>
      <img height={69}
        width={69}
        className={styles.appLogo}
        onClick={() => history.replace("/")} src={IMDBLogo}/>
     
    </div>
  );
};

export default AppHeader;
