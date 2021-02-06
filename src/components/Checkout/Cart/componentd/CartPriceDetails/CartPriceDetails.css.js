import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    divider:{
      margin: '10px 0'
    },
    cardContentPriceDetails:{
      padding: "12px 16px !important",
      "& > div":{
        padding: "5px 0"
      }
    }
  }));

  export default useStyles
