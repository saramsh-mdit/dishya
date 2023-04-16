type UserData = string;

type DiseaseToDoctor = {
  disease_id: string;
  doctor_id: string;
  name: string;
};

type SymptomToDisease = {
  symptom_id: string;
  doctor_id: string;
  name: string;
};

type BodyToDoctor = {
  body_id: string;
  name: string;
  doctor_id: string;
};

const bodyData: BodyToDoctor[] = [
  { body_id: '01', name: 'head', doctor_id: 'nd' },
  { body_id: '02', name: 'neck', doctor_id: 'nnd' },
  { body_id: '04', name: 'stomach', doctor_id: 'sd' },
  { body_id: '05', name: 'legs', doctor_id: 'bd' },
  { body_id: '03', name: 'bone', doctor_id: 'db' },
  { body_id: '05', name: 'hands', doctor_id: 'db' },
  { body_id: '05', name: 'sex', doctor_id: 'gy' },
  { body_id: '05', name: 'teeth', doctor_id: 'dd' },
  { body_id: '05', name: 'other', doctor_id: 'gd' },
];

const symptomData: SymptomToDisease[] = [
  { symptom_id: '01', name: 'pain', doctor_id: 'gd' },
  { symptom_id: '02', name: 'fever', doctor_id: 'gd' },
  { symptom_id: '04', name: 'diarrhea', doctor_id: 'gd' },
  { symptom_id: '05', name: 'headache', doctor_id: 'gd' },
  { symptom_id: '03', name: 'fracture', doctor_id: 'bd' },
  { symptom_id: '05', name: 'reproduction', doctor_id: 'gd' },
  { symptom_id: '05', name: 'decay', doctor_id: 'dd' },
  { symptom_id: '05', name: 'other', doctor_id: 'ds' },
];

const haveData = () => {
    const result:string[]= [];
    symptomData?.forEach(item => result.push(item.name))
    bodyData?.forEach((item) => result.push(item.name));
    return result;
}


const userData = 'I have fever with head pain.';

const filter = (d: string) => {
    const dataToKeep = haveData();
    return  d?.split(" ").filter((item:string) => {
        return dataToKeep.includes(item)
    })
}



const filterData = filter(userData);

const findDoctorWithBody = (data: BodyToDoctor[], body: string[]) => {
    const recommendedDoctors: BodyToDoctor[] = [];
    data?.forEach(item => {
        body.forEach(part => {
            if (part === item.name) recommendedDoctors.push(item);
        })
    })

    return recommendedDoctors
}

const doctorRecommendation = findDoctorWithBody(bodyData, filterData);
console.log('BODY RESULT', doctorRecommendation);


const letData = "i was ill for 2 day";


function extractDays(input: string): number {
  const matches = input.match(/(\d+)\s*(day|days)/g);

    let days = 0;

  if (matches) {
    matches.forEach((match) => {
      const parts = match.split(' ');
      const value = parseInt(parts[0]);
      const unit = parts[1];
      switch (unit) {
        case 'day':
        case 'days':
          days = days + value;
          break;
      }
    });
  }

  return days;
}


const resultDays = extractDays(letData);

console.log(resultDays)