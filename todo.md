# todo

## ten kod jest stary jak świat. Najpierw nalezałoby zrobić dane w rekordzie a nie w tabeli

## sparawdzić dokładnie błędy. Używam showError, w reducerze wynika, że do tego przychodzi obiekt, natomiast wszędzie poza reducerem wrzucam jako argument string

## chyba stan isError z tego

case actions.SHOW_ERROR:
return {
...state,
isError: true,
errorMessage: action.payload ? action.payload : "Nieokreślony błąd",
};
nie jest nigdzie czytany
Ten artykół jest o typwaniu błędów

https://bobbyhadz.com/blog/typescript-catch-clause-variable-type-annotation-must-be

## showMessage, showWarning, showError - coś za dużo tego

service worker reg error

prawdopodbnie tu próbowałem rozwiązać brak połączenia inaczej, sporawdzić i ujednolicić jeżeli trzeba

sprawdzić czy nnie rzuca błędu service workera

Dać by grawatara jako alternatywę dla obrazka, którago nie ma

PersonFields i Fields, tu podobno da się wykorzystać tuple.

export const headings = ["ID", "NAME", "E-MAIL"]; w pliku config, czy nie przerobić tego na enum?

Pytanie czy Erorpage to nie jest z armatą na wróblla, czy nie wystarczyłby notistack

bezpośrednio po zalogowaniu nie widać kalwiszy usuwania. Trzeba przesortować i wtedy sie pojawiaja

jest tak, że setUserSubmitted pobiera dane użytkownika ale ich nigdzie nie zapisuje (tzn w reducerze nic się z tym nie dzieje). Zasadniczo nie przeszkadza to w niczym, ale jednak prawdopodobnie ted dane powinny być dołączane do widoku ( w reducerze, niezależnie od tego, że to idzie zasadniczo z fb)

ta unknown action w reducerze może wartaby przepsania z env. variables? że jak develpoment to jest a jak nie ma to nie ma
