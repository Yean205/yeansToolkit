import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

// Das Interface definiert, wie die Daten für TypeScript aussehen müssen
interface ChartData {
  trait: string;
  value: number;
  fullMark: number;
}

const data: ChartData[] = [
  { trait: 'Zwanghaft', value: 0, fullMark: 30 }, // 0
  { trait: 'Depressiv', value: 0, fullMark: 30 }, // 1
  { trait: 'Hysterisch', value: 0, fullMark: 30 }, // 2
  { trait: 'Schizoid', value: 0, fullMark: 30 }, // 3
];

export const personalityCalc = (questionValue: number, type: number) => {
  switch(type) {
    case 0:
      data[0].value += questionValue;
      break;
    case 1:
      data[1].value += questionValue;
      break;
    case 2:
      data[2].value += questionValue;
      break;
    case 3:
      data[3].value += questionValue;
      break;
  }
}

export const PersonalityChart = () => {
  return (
    <div style={{ width: '100%', height: '400px', outline: 'none' }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="59%" data={data} id='radarChart'>
          <PolarGrid stroke="#e0e0e0" />
          <PolarAngleAxis dataKey="trait" />
          <Radar
            name="Deine Ausprägung"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div> Personalitäten Übersicht: </div>
      <div> Zwanghaft (Dauer): {data[0].value} </div>
      <div> Depressiv (Nähe): {data[1].value} </div>
      <div> Hysterisch (Wechsel): {data[2].value} </div>
      <div> Schizoid (Distanz): {data[3].value} </div>
      <div className='links'> 
        <div> Nützliche Links: </div>
        <a href='https://www.thalia.de/shop/home/artikeldetails/A1000361631'> Wenn sie das Buch "Grundformen der Angst" interessiert </a> 
        <a href='https://www.hamburg.de/resource/blob/1082552/6a5e5ca921a5e90b5bebeebcb2bc7c2f/riemann-thomann-modell-data.pdf'> Wenn Sie mehr zu den Persönlichkeiten nach dem Rhiemann-Thomann Modell erfahren wollen (hier clicken) </a>
      </div>
      
    </div>
  );
};