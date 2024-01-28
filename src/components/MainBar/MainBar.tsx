import styles from "./MainBar.module.css";
import api from "../../services/mockApi";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useFormik } from "formik";
import * as yup from "yup";
import { useFormStore } from "../../store/FormContext";

type City = {
  id: number;
  name: string;
};

export const MainBar = () => {
  const [cities, setCities] = useState([] as City[]);
  const [radioValue, setRadioValue] = useState("return");
  const { updateForm } = useFormStore();

  useEffect(() => {
    api
      .getCities()
      .then((data) => {
        setCities(data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const validationSchema = yup.object().shape({
    radioValue: yup.string().required("Required"),
    returnDate: yup.string().when("radioValue", ([radioValue], schema) => {
      if (radioValue === "return") {
        return schema.required("Required");
      } else {
        return schema;
      }
    }),
    departureDate: yup.string().required("Required"),
    from: yup.object().required("Required"),
    to: yup.object().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      radioValue: "return",
      from: "",
      to: "",
      departureDate: "",
      returnDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateForm(values);
    },
  });

  return (
    <form className={styles.container} onSubmit={formik.handleSubmit}>
      <div className={styles.radioContainer}>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          defaultValue={"return"}
          value={radioValue}
          onChange={(e) => {
            setRadioValue(e.target.value);
            formik.setFieldValue("radioValue", e.target.value);
          }}
        >
          <FormControlLabel
            value="oneway"
            control={<Radio />}
            label="One Way"
          />
          <FormControlLabel value="return" control={<Radio />} label="Return" />
        </RadioGroup>
      </div>
      <div className={styles.autoCompleteContainer}>
        <Autocomplete
          disablePortal
          id="from"
          getOptionLabel={(option) => option.name}
          onChange={(e, value) => formik.setFieldValue("from", value)}
          options={cities}
          sx={{ width: 250 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="From"
              variant="filled"
              color="primary"
              placeholder="Search for a city"
              error={formik.touched.from && Boolean(formik.errors.from)}
              helperText={formik.touched.from && formik.errors.from}
              value={formik.values.from}
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="to"
          getOptionLabel={(option) => option.name}
          options={cities}
          onChange={(e, value) => formik.setFieldValue("to", value)}
          sx={{ width: 250 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="To"
              variant="filled"
              color="primary"
              placeholder="Search for a city"
              error={formik.touched.to && Boolean(formik.errors.to)}
              helperText={formik.touched.to && formik.errors.to}
              value={formik.values.to}
            />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disablePast
            label={"Departure Date"}
            onChange={(value) => formik.setFieldValue("departureDate", value)}
            slotProps={{
              textField: {
                variant: "outlined",
                error:
                  formik.touched.departureDate &&
                  Boolean(formik.errors.departureDate),
                helperText:
                  formik.touched.departureDate && formik.errors.departureDate,
              },
            }}
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disablePast
            label={"Return Date"}
            onChange={(value) => formik.setFieldValue("returnDate", value)}
            slotProps={{
              textField: {
                variant: "outlined",
                error:
                  formik.touched.returnDate &&
                  Boolean(formik.errors.returnDate),
                helperText:
                  formik.touched.returnDate && formik.errors.returnDate,
              },
            }}
            format="DD/MM/YYYY"
            disabled={radioValue === "oneway"}
          />
        </LocalizationProvider>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} type="submit">
          Search
        </button>
      </div>
    </form>
  );
};
