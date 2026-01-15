import { personalityCalc, PersonalityChart } from './personalityChart'
import './App.css'
import { useState, useMemo } from 'react';
/*
Zwanghaft -> Dauer (Ordnung, Regeln, Beständigkeit)
Depressiv -> Nähe (Harmonie, Hilfe, Kontakt)
Hysterisch -> Wechsel (Risiko, Freiheit, Abwechslung)
Schizoid -> Distanz (Logik, Unabhängikeit, Sachlichkeit)

Programm Logik Algo:
  -> Struct mit allen Fragen (Arrays)
  -> Funktion die in das Array die Texte mit Zahlen ersetzt (Punkte)
  -> Array Daten werden zusammen addiert für die jeweilige Persönlichkeit
*/

interface resultCharData {
  asked: boolean;
  question: string;
  value: number;
  type: number;
}

const resultData: resultCharData[] = [
  // Dauer (Zwanghaft) #0
  { question: 'Ich halte mich bei meinen Handlungen konsequent an meine Grundsätze.', asked: false, value: 0, type: 0 },
  { question: 'Schlamperei und Unordnung ärgern mich sehr.', asked: false, value: 0, type: 0 },
  { question: 'Ich lege auf korrektes und verantwortungsbewusstes Vorgehen größten Wert. ', asked: false, value: 0, type: 0 },
  { question: 'Es ist mir angenehm, feste Tageseinteilungen und Lebensgewohnheiten beizubehalten. ', asked: false, value: 0, type: 0 },
  { question: 'Andere Menschen schätzen an mir vor allem meine Fähigkeit zu systematisieren und zu ordnen. ', asked: false, value: 0, type: 0 },
  { question: 'Ich verschaffe mir gerne einen Überblick über das, was rund um mich geschieht. ', asked: false, value: 0, type: 0 },

  // Nähe (Depressiv) #1
  { question: 'Ich unterstütze gerne andere Menschen.', asked: false, value: 0, type: 1 },
  { question: 'Ich kann mich sehr gut auf andere Menschen einstellen. ', asked: false, value: 0, type: 1 },
  { question: 'Am liebsten arbeite ich mich anderen Menschen zusammen und löse mit ihnen gemeinsam die Probleme. ', asked: false, value: 0, type: 1 },
  { question: '“Nein“ zu sagen, wenn Menschen mit einem Anliegen an mich herantreten, fällt mir schwer. ', asked: false, value: 0, type: 1 },
  { question: 'Andere Menschen halten mich für kooperationsfähig und kompromissbereit. ', asked: false, value: 0, type: 1 },
  { question: 'Erfolge anderer, selbst wenn ich am Rande mitgewirkt habe, machen mich überhaupt nicht neidisch. ', asked: false, value: 0, type: 1 },

  // Wechsel (Hysterisch) #2

  { question: 'Ich fühle mich durch Regeln und Normen in meiner Handlungsfähigkeit sehr eingeschränkt. ', asked: false, value: 0, type: 2 },
  { question: 'Ungewöhnliche und riskante Aufgaben finde ich sehr reizvoll. ', asked: false, value: 0, type: 2 },
  { question: 'Andere Menschen halten mich für einfallsreich und phantasievoll. ', asked: false, value: 0, type: 2 },
  { question: 'Es ist mir angenehm, im Mittelpunkt zu stehen und von allen beachtet zu werden. ', asked: false, value: 0, type: 2 },
  { question: 'Immer dieselbe Tätigkeit auszuführen langweilt mich. Ich liebe die Abwechslung. ', asked: false, value: 0, type: 2 },
  { question: 'Geduldig und hartnäckig an einer Lösung zu arbeiten, um ihr den letzten Schliff zu geben, ist nicht meine Stärke. ', asked: false, value: 0, type: 2 },

  // Distanz (Schizoid) #3

  { question: 'Ich lege bei meinen KollegInnen und bei mir selbst großen Wert auf rational-logisches Vorgehen bei der Arbeit ', asked: false, value: 0, type: 3 },
  { question: 'Ich lasse mich von meinen Gefühlen selten leiten. ', asked: false, value: 0, type: 3 },
  { question: 'Es fällt mir schwer, schnell und unmittelbar mit anderen Menschen Kontakt aufzunehmen. ', asked: false, value: 0, type: 3 },
  { question: 'Ich arbeite am liebsten und besten alleine. ', asked: false, value: 0, type: 3 },
  { question: 'Ich habe gern ein klares Ziel vor Augen, auf das ich hinarbeiten kann. ', asked: false, value: 0, type: 3 },
  { question: 'Andere Menschen halten mich für einen analytischen Denken mit großem Abstraktionsvermögen. ', asked: false, value: 0, type: 3 },
];

function App() {

  const shuffledQuestions = useMemo(() => {
    const array = [...resultData];
    // Fisher-Yates Shuffle
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Plätze tauschen
    }
    return array;
  }, []); // Leeres Array bedeutet: Nur beim ersten Laden der Komponente mischen

  const [currentIndex, setCurrentIndex] = useState(0);
  const isFinished: boolean = currentIndex >= shuffledQuestions.length;

  const pickNumber = (value: number) => {
    shuffledQuestions[currentIndex].value = value;
    shuffledQuestions[currentIndex].asked = true;
    personalityCalc(value, shuffledQuestions[currentIndex].type);
    setCurrentIndex((prev) => prev + 1);
  }

  return (
    <div className="App">
      <div className="container">
        {!isFinished ? (
          <div className="quiz-card">
            <div className="question-container">
              <p className="question-text">{shuffledQuestions[currentIndex].question}</p>
            </div>

            <div className="selection-area">
              <div className="numbers">
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <button
                    className="number-button"
                    key={num}
                    onClick={() => pickNumber(num)}>
                    {num}
                  </button>
                ))}
              </div>

              <div className="label-container">
                <span>Stimme ich nicht zu</span>
                <span>Stimme ich zu</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="results-container">
            <h2>Geschafft! Hier ist Ihr Ergebnis</h2>
            <PersonalityChart />
          </div>
        )}
      </div>
    </div>
  );
}

export default App
