declare global {
  interface Window {
    ethereum: any;
  }
}

import * as React from 'react';
import Container from '@mui/material/Container';
import {useState} from "react";
import './ApplicationForm.css'
import * as yup from 'yup';
import { Box, Card, CardContent, CircularProgress, MenuItem, MobileStepper, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Image, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useFormik } from "formik";
import questions, {
  part1Questions,
  part2Questions,
  part3Questions,
  randQuestions
} from "@/components/ApplicationForm/questions.ts";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useAlertMessage, { AlertMessageType } from "@/lib/hooks/useAlertMessage.ts";
import AlertMessage from "@/components/AlertMessage.tsx";
import PdfUploader from "@/components/PdfUploader/PdfUploader.tsx";
import usePostSurvey from "@/lib/hooks/usePostSurvey.ts";
import Grid from "@mui/material/Grid";
import ItemPaper from "@/components/ApplicationForm/ItemPaper.tsx";
import PolicyCard from "@/components/PolicyCard.tsx";
import useMetaMask from '@/lib/hooks/useMetamask';
import contractAbi from '../../abi.json'
import Web3 from "web3";

const steps = [
  {
      label: 'Part 1',
      description: `Part 1 Details`,
  },
  {
    label: 'Part 2',
    description: `Part 2 Details`,
  },
  {
    label: 'Part 3',
    description: `Part 3 Details`,
  },
];

const policyCards: {title: string, description: string, imageUrl: string}[] = [
  {
    title: "«Life-Инвест+»",
    description: "С каждым годом в нашей стране растет число людей, которые сегодня знают, что хотят получить завтра. Но иногда наши замыслы порой...",
    imageUrl: "https://www.halyklife.kz/storage/app/uploads/public/60a/32d/207/60a32d207595c648910115.jpeg"
  },
  {
    title: "«Life-Персона»",
    description: "Смешанное страхование жизни за 5 минут для создания накоплений и защиты благосостояния семьи. Взносы от 200 тенге в день.",
    imageUrl: "https://www.halyklife.kz/storage/app/uploads/public/658/2e4/33a/6582e433a7309211496393.jpg",
  },

];

const validationSchema = yup.object({
  '0': yup.string().required('Email is required'),
  '1': yup.string().required('disease is required'),
  '2': yup.string().required('It`s required'),
  '3': yup.string().required('It`s required'),
  '4': yup.string().required('It`s required'),
  '5': yup.string().required('It`s required'),
  '6': yup.string().required('It`s required'),
  '7': yup.string().required('It`s required'),
  '8': yup.string().required('It`s required'),
  '9': yup.string().required('It`s required'),
  '10': yup.string().required('It`s required'),
  '11': yup.string().required('It`s required'),
  '12': yup.string().required('It`s required'),
});

const validationSchema1 = yup.object({
  '0': yup.string().required('Email is required'),
  '1': yup.string().required('disease is required'),
  '2': yup.string().required('It`s required'),
});

const validationSchema2 = yup.object({
  '3': yup.string().required('It`s required'),
  '4': yup.string().required('It`s required'),
  '5': yup.string().required('It`s required'),
});

const validationSchema3 = yup.object({
  '6': yup.string().required('It`s required'),
  '7': yup.string().required('It`s required'),
  '8': yup.string().required('It`s required'),
  '9': yup.string().required('It`s required'),
  '10': yup.string().required('It`s required'),
  '11': yup.string().required('It`s required'),
  '12': yup.string().required('It`s required'),
});

const ApplicationForm: React.FC = () => {
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(false);
  const isConnected = useMetaMask();
  const contractAddress = "0x6848ab8A45aDca9DC46Cd148FAAFE9A467Cd93E2"

  let web3;
  web3 = new Web3(window.ethereum);
  const myContract = new web3.eth.Contract(contractAbi, contractAddress);

  const createPolicy = async (premium, duration, amount, condition) => {
    setLoading(true)
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error("No connected accounts");
    }
    let confirmationCount = 0;
    await myContract.methods.createPolicy(premium, duration, amount, condition)
        .send({ from: accounts[0] })
        .on('transactionHash', function(hash){
          console.log('transactionHash', hash);
          setLoading(false)
        })
        .on('confirmation', function(confirmationNumber, receipt){
          if(confirmationCount < 1){
            confirmationCount++;
            showAlertMessage(
                `Страховой полис успешно обработан`,
                AlertMessageType.SUCCESS
            );
            setLoading(false)
            console.log('confirmation', confirmationNumber);
          }

        })
        .on('receipt', function(receipt){
          console.log('receipt', receipt);
          setLoading(false)
        })
        .on('error', () => {
          setLoading(false)
        }); // If a out of gas error, the second parameter is the receipt.
  }

  const { mutate: postSurvey, isPending, isSuccess, data } = usePostSurvey();

  const renderQuestions = (questions) => {
    return (
      <>
        {questions.map((question) => (
          <React.Fragment key={question.id}>
            <Typography mt={3}>{question.question}</Typography>
            <Select
              size='small'
              sx={{ width: '100%' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name={question.id.toString()}
              value={formik.values[question.id]}
              label="Age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched[question.id] && Boolean(formik.errors[question.id])}
            >
              {question.answer.map((answer) => (
                <MenuItem key={answer} value={answer}>{answer}</MenuItem>
              ))}
            </Select>
          </React.Fragment>
        ))}
      </>
    );
  };

  const formik = useFormik({
    initialValues: {
      '0': '',
      '1': '',
      '2': '',
      '3': '',
      '4': '',
      '5': '',
      '6': '',
      '7': '',
      '8': '',
      '9': '',
      '10': '',
      '11': '',
      '12': '',
      'pdfFile': null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formattedValues: any = questions.reduce((acc, question) => {
        acc[question.question] = values[question.id];
        return acc;
      }, {});

      formattedValues.pdfFile = values.pdfFile;

      postSurvey(formattedValues, {
        onError: (error) => {
          showAlertMessage(
            `Произашла ошибка при сабмите!`,
            AlertMessageType.ERROR,
          );
        },
        onSuccess: (response) => {
          formik.resetForm();
          showAlertMessage(
            `Спасибо за заполнение анкеты!`,
            AlertMessageType.SUCCESS,
          )
        }
      });
    },
  });

  const [randomQuestion, setRandomQuestion] = useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * randQuestions.length);
      setRandomQuestion(randQuestions[randomIndex]);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [activeStep, setActiveStep] = useState(1);
  const maxSteps = steps.length;
  const partition = Math.round(100 / maxSteps);
  const [percent, setPercent] = useState(0);
  const { alertMessage, showAlertMessage, hideAlertMessage } =
    useAlertMessage();
  const handleNext = async () => {
    let currentValidationSchema;
    switch (activeStep) {
      case 1:
        currentValidationSchema = validationSchema1;
        break;
      case 2:
        currentValidationSchema = validationSchema2;
        break;
      case 3:
        currentValidationSchema = validationSchema3;
        break;
      default:
        break;
    }

    try {
      await currentValidationSchema.validate(formik.values);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setPercent((prevPercent) => prevPercent + partition >= partition * (maxSteps - 1) ? 100 : prevPercent + partition)
    } catch (error) {
      showAlertMessage(
        `Заполните все поля!`,
        AlertMessageType.INFO,
      );
    }
  };

  const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setPercent((prevPercent) => prevPercent - partition)

  };
  const radius = 70;
  const circumference = 2 * Math.PI * radius -1;
  const strokeDashoffset = ((100 - percent) / 100) * circumference;


  if (isPending) {
    return (
      <Container component="main" maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={10}
        >
          <CircularProgress size={50} />
          <Typography mt={3} textAlign='center'>
            {randomQuestion}
          </Typography>
        </Box>
      </Container>
    )
  }

  if (isSuccess) {
    return (
      <Box>
        <Box width='100%' sx={{
          backgroundImage: 'url(https://i.imgur.com/YG9dK2k.png)',
          objectFit: 'cover',
          height: '150px'
        }}

        >
        </Box>
        <Container component="main" maxWidth="md">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={5}
          >
            <Typography component="h1" variant="h5" textAlign='center'>
              Ваша вероятность исполнения страхового полиса
            </Typography>
            <Typography component="h1" variant="h4" mt={3} color='primary.main'>
              {data?.data?.probability}%
            </Typography>
            <Card sx={{ minWidth: 275, marginTop: 2, marginBottom: 2, }}>
              <CardContent>
              <Typography sx={{textAlign: 'center', fontSize: '18px'}}>
                {data?.data?.description}
                {/*На основе предоставленной информации и результатов общего анализа крови наблюдаются некоторые отклонения (повышенный уровень тромбоцитов и лимфоцитов, пониженный уровень нейтрофилов и МPV, что может указывать на воспалительные процессы или иные здоровьесберегающие условия), также учитывается наличие рискованных привычек (курение, участие в экстремальных видов деятельности, употребление наркотиков), что повышает вероятность возникновения страховых случаев*/}
              </Typography>
              </CardContent>
            </Card>
            <Typography mb={3} component="h1" variant="h6" textAlign='center'>
              Рекомендаций
            </Typography>
            <Grid sx={{ maxWidth: 800 }} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {data?.data?.recommendations.map((rec) => (
                <Grid item xs={6}>
                  <ItemPaper>{rec}</ItemPaper>
                </Grid>
              ))}
            </Grid>
            <Typography my={3} component="h1" variant="h6" textAlign='center'>
              А лучше! Оформите страховой полис прямо сейчас!
            </Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              m={1}
            >
              {policyCards.map((policyCard) => (
                <Box m={1}>
                <PolicyCard imageUrl={policyCard.imageUrl} title={policyCard.title} description={policyCard.description} duration={duration} setDuration={setDuration} createPolicy={createPolicy} loading={loading} />
                </Box>
              ))}
            </Box>
          </Box>
          {alertMessage && (
              <AlertMessage
                  message={alertMessage.message}
                  type={alertMessage.type}
                  onClose={hideAlertMessage}
              />
          )}
        </Container>
      </Box>
    )
  }
  return (
      <Container component="main" maxWidth="md">
          <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <div className="circular-progress-container">
            <svg className="circular-progress" viewBox="0 0 160 160">
              <circle
                className="circular-progress-background"
                cx="80"
                cy="80"
                r={radius}
                strokeWidth="10"
                fill="none"
              />
              <circle
                className="circular-progress-bar"
                cx="80"
                cy="80"
                r={radius}
                strokeWidth="10"
                transform="rotate(-90 80 80)"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="circular-progress-text">
              {percent}%
              {/*<span className="circular-progress-subtext">COMPLETED</span>*/}
            </div>
          </div>

          <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              {activeStep === 1 && renderQuestions(part1Questions)}
              {activeStep === 2 && renderQuestions(part2Questions)}
              {activeStep === 3 && (
                <>
                  {renderQuestions(part3Questions)}
                  <PdfUploader field={formik.getFieldProps("pdfFile")} form={formik} />
                  <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, width: "100%" }}>
                    Отправить
                  </Button>
                </>
              )}
            </form>
            <MobileStepper
              variant="text"
              steps={maxSteps}
              position="static"
              activeStep={activeStep - 1}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps}
                >
                  Next

                  <KeyboardArrowRight />

                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 1}>

                  <KeyboardArrowLeft />

                  Back
                </Button>
              }
            />
          </Box>
        </Box>
        {alertMessage && (
          <AlertMessage
            message={alertMessage.message}
            type={alertMessage.type}
            onClose={hideAlertMessage}
          />
        )}
      </Container>
  );
};

export default ApplicationForm;
