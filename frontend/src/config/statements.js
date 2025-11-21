/**
 * Predefined cybersafety awareness statements in English and Telugu
 */

export const statements = {
  en: [
    "No one has threatened me saying that an arrest warrant has been issued in my name.",
    "No one has threatened me saying that if I do not respond, an arrest order will be executed immediately.",
    "No one has threatened me that a non-bailable case has been filed against me.",
    "No one has threatened me saying this is the final warning before arrest.",
    "No one has informed me that suspicious transactions were detected in my bank account.",
    "No one has threatened me saying that my phone number is linked to illegal activities.",
    "No one has told me that prohibited items like drugs, SIM cards, passports, or laptops were sent abroad under my name through courier.",
    "I personally know the person with whom I am carrying out this bank transaction.",
    "No one has pressurised me to transfer money under the pretext of digital arrest or fine.",
    "I am not on phone Call While carrying out this transaction in the bank",
    "No one claiming to be from CBI, Customs, ED, or Police has made a video call  and frightened me.",
    "No one has threatened me to take a loan or cancel an FD in the bank and send money.",
    "I understand that agencies like CBI, Customs, or Police do not arrest people through video calls."
  ],
  te: [
    "నా పేరుతో అరెస్ట్ వారెంట్ జారీ అయ్యిందని ఎవరూ భయపెట్టలేదు.",
    "నేను స్పందించకపోతే వెంటనే అరెస్ట్ ఆదేశం అమలవుతుందని ఎవరూ భయపెట్టలేదు.",
    "నా మీద నాన్ బయిలబులు  కేసు నమోదైందని ఎవరూ చెప్పలేదు.",
    "అరెస్ట్‌ చేసే ముందు ఇదే చివరి హెచ్చరిక అని నన్ను ఎవరూ బెదిరించలేదు.",
    "నా బ్యాంకు ఖాతాలో అనుమానాస్పద లావాదేవీలు జరిగాయని ఎవరూ బెదిరించలేదు.",
    "నా ఫోన్ నంబర్ అసాంఘిక  కార్యకలాపాలకు లింక్ అయ్యి  ఉందని ఎవరూ భయపెట్టలేదు.",
    " సిమ్ కార్డులు, పాస్‌పోర్టు, ల్యాప్‌టాప్ , మాదకద్రవ్యాలు వంటి నిషేధిత వస్తువులు నా పేరుతో విదేశాలకు పంపబడుతున్నాయని ఎవరూ భయపెట్టలేదు.",
    "నేను బ్యాంకులో లావాదేవీలు చేస్తున్న వ్యక్తి నాకు వ్యక్తిగతంగా తెలుసు.",
    "డిజిటల్ అరెస్ట్ పేరుతో జరిమానా కింద డబ్బులు పంపమని నాపై ఎవరూ ఒత్తిడి చేయలేదు.",
    "నేను బ్యాంకులో డబ్బులు లావాదేవీలు చేస్తున్నప్పుడు ఎవరితోనూ ఫోన్‌లో మాట్లాడడం లేదు .",
    "సిబిఐ, కస్టమ్స్, ఈడీ లేదా పోలీస్ పేరుతో ఎవరూ నాకు వీడియో కాల్ చేసి భయపెట్టలేదు.",
    "బ్యాంకులో రుణం లేదా ఫిక్స్డ్ డిపాజిట్ తీసుకుని డబ్బులు పంపమని ఎవరూ నన్ను భయపెట్టలేదు.",
    "సిబిఐ, కస్టమ్స్, పోలీసు శాఖలు వీడియో కాల్ ద్వారా అరెస్ట్ చేయవని నాకు తెలుసు."
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
