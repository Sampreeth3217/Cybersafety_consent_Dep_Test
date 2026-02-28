/**
 * Predefined cybersafety awareness statements in English and Telugu
 */

export const statements = {
  en: [
    "No one informed or threatened me saying that a non-bailable case has been registered against me or that an arrest warrant has been issued.",
    "No one threatened me stating that my phone number is linked to any anti-social or illegal activities.",
    "No one threatened me saying that SIM cards, passport, laptop, narcotic substances, or other prohibited items are being sent abroad in my name through courier.",
    "No one told me that I had been placed under “digital arrest”, nor threatened me that sharing this information with anyone would be an offense under the Official Secrets Act.",
    "No one threatened me stating that my phone number or Aadhaar card was found with persons arrested in anti-social activity cases.",
    "No one pressured me to transfer money in order to be released from any so-called digital arrest case.",
    "The person with whom I conducted bank transactions is personally known to me, and I was not on a phone call with anyone while carrying out the bank transactions.",
    "No one contacted me via video call claiming to be from CBI, Customs, ED, or the Police and threatened me.",
    "No one asked me to close or break my Fixed Deposit (FD) and transfer the money.",
    "I am aware that “digital arrest” does not exist, and that CBI, Customs, Police, or other law-enforcement agencies do not arrest people through video calls."
  ],
  te: [
    "నా మీద నాన్ బెయిలెబుల్ కేసు నమోదయిందనీలేదా వారెంట్ జారీ అయిందని నన్ను ఎవరైనా భయపెట్టలేదు",
    "నా ఫోన్ నంబరు అసాముగత కార్యకలాపాలకు లింక్ అయిందని ఎవరు భయపెట్టలేదు",
    "సిమ్ కార్డులు, పాసుపోర్ట్, లాప్‌టాప్, మాదకద్రవ్యాలు వంటి నిషిద్ధ వస్తువులు నావనుపే విదేశాలకు కొరియర్ ద్వారా పంపబడుతున్నాయని ఎవరు బెదిరించలేదు",
    "నన్ను డిజిటల్ అరెస్ట్ చేశారని ఎవరును ఎలాటీయను చెప్పలేదు, దేన్ని ఇతరులతో షేర్ చేయడం ఆఫీషియల్ సీక్రెట్స్ యాక్ట్ కింద నేరం అన్నలేందని నన్ను ఎవరు బెదిరించలేదు",
    "నాను సంబంధించిన ఫోన్ నంబర్ గని ఆధార్ కార్డ్ గని అసామాజిక కార్యకలాపాలు కేసులో అరెస్టైనే వ్యక్తి దగ్గర దొరికిందని నన్ను ఎవరు బెదిరించలేదు",
    "డిజిటల్ అరెస్ట్ కేసు నుంచి బయటపడటానికి డబ్బులు లావాదేవీ చేసుమని నా పై ఎవరు ఒత్తిడి చేయలేదు",
    "నేను బ్యాంకు లావాదేవీలు చేస్తున్నపుడు వ్యక్తి నాకు వ్యక్తిగతంగా తెలుసు మరియు నేను బ్యాంకులో డబ్బులు లావాదేవీలు చేస్తున్నపుడు ఎవరితోనూ ఫోన్ మాట్లాడుతలేదు",
    "CBI, CUSTOMS, ED లేదా పోలీస్ అని చెప్పి ఎవరు వీడియో కాల్ చేసి బెదిరించలేదు",
    "బ్యాంక్ లో నున్న FD ను చెప్పు డబ్బులు పంపమని ఎవరు అడగలేదు",
    "డిజిటల్ అరెస్ట్ అనేది లేదని సిబిఐ, కస్టమ్స్, పోలీస్ మున్నగునాదు VIDEO CALL ద్వారా అరెస్ట్ చేయరని నాకు తెలుసు"
  ]
};

/**
 * Get statements for a specific language
 */
export const getStatements = (language) => {
  return statements[language] || statements.en;
};

/**
 * Get total number of statements
 */
export const getStatementCount = (language) => {
  return getStatements(language).length;
};
