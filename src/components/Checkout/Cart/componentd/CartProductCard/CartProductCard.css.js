import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      marginBottom:theme.spacing(1),
    },
    image: {
      width: 134,
      height: 134,
      backgroundColor: '#0000000d',
      padding: 5
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    // totalPrice:{
    //   textAlign:"right",
    //   fontWeight: 600
    // },
    removeBtn: {
      border: 'none'
    },
    removeIconButton: {
      position: 'absolute',
      //marginRight: '175px',
      //marginTop: '-8px'
      marginTop: '5px',
      marginRight: '115px',
      right: '0',
      top: '0',
    },
    cartProductTitle:{
      fontSize: '16px',
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-box-orient": "vertical",
      "-webkit-line-clamp": 3,
      cursor:'pointer',
      "&:hover": {
        color: theme.palette.primary.main
      }
    }
  }));

  export default useStyles
