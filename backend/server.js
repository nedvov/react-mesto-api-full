const app = require('./app');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Приложение слушает на ${PORT} порте`);
});
