import {Grid, TextField} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

const FormElement = ({label, name, value, onChange, required, error, autoComplete, type}) => {
    return (
        <Grid item xs={12}>
            <TextField
                type={type}
                autoComplete={autoComplete}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                error={Boolean(error)}
                helperText={error}
            />
        </Grid>
    );
};

FormElement.propsType = {
    label: PropTypes.string.isRequares,
    name: PropTypes.string.isRequares,
    value: PropTypes.any.isRequares,
    onChange: PropTypes.func.isRequares,
    required: PropTypes.bool,
    error: PropTypes.string,

};

export default FormElement;