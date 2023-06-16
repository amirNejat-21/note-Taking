import React from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, Select,FormControl,InputLabel } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  box: {
    width: '100px',
    height: '70px',
    // border: '1px solid black',
    position: "relative",
    top: "30px",
    display: "flex"
  },

}));


interface LanguageSwitcherProps {}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = (props) => {
  const classes = useStyles();

  const { i18n } = useTranslation();

  const handleChangeLanguage = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    i18n.changeLanguage(event.target.value as string);
  };

  return (

    <FormControl className={classes.box}>
    <InputLabel id="demo-simple-select-label">Language</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={i18n.language}
      label="Age"
      onChange={handleChangeLanguage}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="fa">فارسی</MenuItem>
    </Select>
  </FormControl>
  );
};

export default LanguageSwitcher;