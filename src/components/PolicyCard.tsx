import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box, CardActions, CircularProgress, FormControl, InputLabel, MenuItem, Modal} from "@mui/material";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import {Info as InfoIcon, Close as CloseIcon, Label} from '@mui/icons-material';

interface PolicyCardProps {
  imageUrl: string;
  title: string;
  description: string;
  duration: number;
  setDuration: any;
  createPolicy: any;
  loading: boolean;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function PolicyCard({ imageUrl, title, description, duration, setDuration, createPolicy, loading }: PolicyCardProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <Card sx={{ maxWidth: 345, marginTop: 2 }}>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {
                    loading ? (
                        <Container component="main" maxWidth="md">
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <CircularProgress size={50} />
                            </Box>
                        </Container>
                    ) : (
                        <>
                            <FormControl fullWidth>
                                <div style={{display: 'flex', justifyContent: 'flex-end'}}><CloseIcon style={{cursor: 'pointer'}} onClick={handleClose} /></div>
                                <div style={{marginBottom: '5px'}}>Длительность</div>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={duration}
                                    label="Длительность"
                                    onChange={(e) => setDuration(e.target.value)}
                                >
                                    <MenuItem value={1}>1 год</MenuItem>
                                    <MenuItem value={5}>5 лет</MenuItem>
                                    <MenuItem value={10}>10 лет</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{mb: 2, mt: 2}}
                                onClick={() => createPolicy(1, duration, 1, description)}
                            >
                                Оформить
                            </Button>
                        </>
                    )
                }

            </Box>

        </Modal>
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          sx={{mb: 2 }}
          onClick={handleOpen}
        >
          Оформить
        </Button>
      </CardActions>
    </Card>
  );
}
