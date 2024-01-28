interface Question {
  id: string;
  question: string;
  answer: string[];
  name: string;
}

const questions: Question[] = [
  {
    id: '0',
    name: "healthStatus",
    question: "Каков ваш текущий общий статус здоровья?",
    answer: ["Отличное", "Хорошее", "Удовлетворительное", "Плохое"]
  },
  {
    id: '1',
    name: "seriousDiseases",
    question: "Были ли у вас серьезные заболевания или травмы в прошлом?",
    answer: ["Да", "Нет"]
  },
  {
    id: '2',
    name: "operations",
    question: "Были ли у вас операции в прошлом?",
    answer: ["Да", "Нет"]
  },
  {
    id: '3',
    name: "familyDiseases",
    question: "Есть ли случаи серьезных заболеваний у членов вашей семьи?",
    answer: ["Да", "Нет"]
  },
  {
    id: '4',
    name: "allergies",
    question: "Есть ли у вас аллергии на какие-либо вещества?",
    answer: ["Да", "Нет"]
  },
  {
    id: '5',
    name: "medicalExaminations",
    question: "Как часто вы проходите медицинские осмотры?",
    answer: ["Регулярно", "Иногда", "Редко", "Никогда"]
  },
  {
    id: '6',
    name: "smoking",
    question: "Курите ли вы?",
    answer: ["Да", "Нет"]
  },
  {
    id: '7',
    name: "alcohol",
    question: "Употребляете ли алкоголь, и если да, в каких количествах?",
    answer: ["Никогда", "Иногда", "Регулярно"]
  },
  {
    id: '8',
    name: "extremeActivities",
    question: "Участвуете ли вы в каких-либо видов экстремальных или опасных видов деятельности?",
    answer: ["Да", "Нет"]
  },
  {
    id: '9',
    name: "pregnancy",
    question: "В случае страхования материнства, есть ли планы на ближайший год по поводу беременности?",
    answer: ["Да", "Нет"]
  },
  {
    id: '10',
    name: "medicalTests",
    question: "Когда вы последний раз проходили обследование, анализы крови или другие медицинские тесты?",
    answer: ["В течение последних 6 месяцев", "В течение последнего года", "Более года назад", "Никогда не проходил(а)"]
  },
  {
    id: '11',
    name: "medicalHelp",
    question: "Были ли у вас случаи обращения за медицинской помощью в течение последних нескольких лет?",
    answer: ["Да", "Нет"]
  },
  {
    id: '12',
    name: "drugs",
    question: "Употребляете ли вы наркотики?",
    answer: ["Да", "Нет"]
  }
];

const totalQuestions = questions.length;
const part1Size = Math.ceil(totalQuestions / 3);
const part2Size = part1Size;
const part3Size = totalQuestions - part1Size - part2Size;

export const part1Questions = questions.slice(0, part1Size);
export const part2Questions = questions.slice(part1Size, part1Size + part2Size);
export const part3Questions = questions.slice(part1Size + part2Size, totalQuestions);

export const randQuestions = [
  "у американского режиссёра Стивена Спилберга  жизнь застрахована на $1,2 млрд",
  "Дэвид Бекхэм: Легендарный футболист, будучи на вершине успеха, застраховал свое тело на $195 млн.",
  "Родиной страхования жизни считается Англия.",
  "В экономически развитых странах на страхование жизни приходится от 37% до 78% сборов премий страховых компаний",
  "Объем страхования жизни в Японии составляет примерно 35 триллионов иен, и страна заняла второе место по общей годовой премии после Соединенных Штатов."
]

export default questions;
