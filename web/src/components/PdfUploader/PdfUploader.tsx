import { useState } from 'react';

import Button from '@mui/material/Button';
import { Box, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FieldInputProps, FormikProps } from "formik";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
interface PdfUploaderProps {
    field: FieldInputProps<any>;
    form: FormikProps<any>;
}

const PdfUploader: React.FC<PdfUploaderProps> = ({ field, form }) => {
    const [fileName, setFileName] = useState(''); // Add this line

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        const validTypes = ['image/jpeg', 'image/png'];

        if (file && validTypes.includes(file.type)) {
            form.setFieldValue(field.name, file);
            setFileName(file.name);
        } else {
            form.setFieldValue(field.name, null);
            alert('Please select a valid image file (jpg or png).');
        }
    };

    return (
      <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onChange={handleFileChange}
          >
              Загрузить Файл
              <VisuallyHiddenInput type="file" />
          </Button>
          {fileName && <Typography ml={2}>Uploaded file: {fileName}</Typography>} {/* And this line */}
      </Box>
    );
}

export default PdfUploader;
