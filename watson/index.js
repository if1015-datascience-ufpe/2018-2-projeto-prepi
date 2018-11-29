import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { NaturalLanguageUnderstandingV1 } from 'watson-developer-cloud';

let app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2018-11-06',
  iam_apikey: 'CYxkYk1WaTim7PTCMlaaEfvZFUG8sPcBS-HB3K8PaLWK',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api'
});

let number = 0

app.post('/analyze', (req, res) => {
  const {text} = req.body

  console.log("text", number)

  number += 1

  const parameters = {
    'text': text,
    'features': {
      'entities': {
          'model': '1013f4c4-aa78-4375-b165-6a6aac81db3d'
      }
    }
  };

  naturalLanguageUnderstanding.analyze(parameters, (error, response) => {
    if (!error) {
      res.status(200).json(response);
    } else {
      console.log(error);
      res.status(500).json({ message: 'internal server error' });
    }
  })
});

const port = app.get('port');
http.createServer(app).listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

