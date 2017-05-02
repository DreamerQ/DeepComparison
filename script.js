'use strict';
function DeepComp(firstValue, secondValue) {
    var simple = { 'number':1, 'string':1, "undefined":1 };

    if (firstValue === null && secondValue === null) return firstValue === secondValue;

    if ( Number.isNaN( firstValue ) && Number.isNaN( secondValue ) ) return true;

    if (typeof firstValue in simple && typeof secondValue in simple) return firstValue === secondValue;

    if ( typeof firstValue === 'object' && secondValue === null ||
        typeof secondValue === 'object' && firstValue === null ) return false;

    if ( typeof firstValue in simple && typeof secondValue === 'object' ||
        typeof secondValue in simple && typeof firstValue === 'object' ) return false;

    if ( Array.isArray(firstValue) && Array.isArray(secondValue) ) {

        if (firstValue.length != secondValue.length) return false;

        for (var i = 0; i < firstValue.length; i++) {
            if ( !DeepComp( firstValue[i], secondValue[i] ) ) return false;
        }
        return true;
    }

    var firstValueKeysArr = Object.keys(firstValue);
    var secondValueKeysArr = Object.keys(secondValue);

    if ( firstValueKeysArr.length != secondValueKeysArr.length ) return false;

    firstValueKeysArr.sort();

    for ( var j = 0; j < firstValueKeysArr.length; j++ ) {
        if ( !(firstValueKeysArr[j] in secondValue) ) return false;
    }

    for (var k = 0; k < firstValueKeysArr.length; k++) {
        if ( !DeepComp(firstValue[ firstValueKeysArr[k] ], secondValue[ firstValueKeysArr[k] ]) ) return false;
    }
    return true;

}

function DeepComp_Tests() {
    var number1 = 777;
    var number2 = 777;
    var number3 = 666;

    var str1 = 'There can be only one';
    var str2 = 'There can be only one';

    var arr1 = [1, 2, 3, [4,5]];
    var arr2 = [1, 2, 3, [4,5]];
    var arr3 = [1, 2, 3, 4, 5];

    var hash1 = {'1':[1,2], '2':'bbb', '3': 'ccc'};
    var hash2 = {'1':[1,2], '2':'bbb', '3': 'ccc'};

    var H1={ a:5, b: { b1:6, b2:7 } };
    var H2={ b: { b1:6, b2:7 }, a:5 };
    var H3={ a:5, b: { b1:6 } };
    var H4={ a:5, b: { b1:66, b2:7 } };
    var H5={ a:5, b: { b1:6, b2:7, b3:8 } };
    var H6={ a:null, b:undefined, c:Number.NaN };
    var H7={ a:null, b:undefined, c:Number.NaN };

    // Число и текст
    console.log('DeepComp(5, "5") => false');
    console.log( DeepComp(5, "5") ? 'НЕ ПРОЙДЕН!' : 'пройден :)' );

    // Число и массив
    console.log('DeepComp(number1, arr1) => false');
    console.log( DeepComp(number1, arr1) ? 'НЕ ПРОЙДЕН!' : 'пройден :)' );

    // Число и хэш
    console.log('DeepComp(number1, H1) => false');
    console.log( DeepComp(number1, H1) ? 'НЕ ПРОЙДЕН!' : 'пройден :)' );

    // Массив и хэш
    console.log('DeepComp(arr1, H1) => false');
    console.log( DeepComp(arr1, H1) ? 'НЕ ПРОЙДЕН!' : 'пройден :)' );

    // Тесты для чиcел
    console.log('DeepComp(number1, number2) => true');
    console.log( DeepComp(number1, number2) ? 'пройден :)' : 'НЕ ПРОЙДЕН!' );

    console.log('DeepComp(number1, number3) => false');
    console.log( DeepComp(number1, number3) ? 'НЕ ПРОЙДЕН!' : 'пройден :)' );

    // Тесты для строки
    console.log('DeepComp(str1, str2) => true');
    console.log( DeepComp(str1, str2) ? 'пройден :)' : 'НЕ ПРОЙДЕН!' );

    // Тесты для массива
    console.log('DeepComp(arr1, arr2) => true');
    console.log( DeepComp(arr1, arr2) ? 'пройден :)' : 'НЕ ПРОЙДЕН!' );

    console.log('DeepComp(arr1, arr3) => false');
    console.log( DeepComp(arr1, arr3) ? 'НЕ ПРОЙДЕН!' : 'пройден :)' );

    // Тесты для хэша
    console.log('DeepComp(hash1, hash2) => true');
    console.log( DeepComp(hash1, hash2) ? 'пройден :)' : 'НЕ ПРОЙДЕН!' );

    console.log('DeepComp(H1, H2) => true');
    console.log( DeepComp(H1, H2) ? 'пройден :)' : 'НЕ ПРОЙДЕН!' );

    console.log('DeepComp(H1, H3) => false');
    console.log( DeepComp(H1, H3) ? 'НЕ ПРОЙДЕН!' : 'пройден :)' );

    console.log('DeepComp(H1, H4) => false');
    console.log( DeepComp(H1, H4) ? 'НЕ ПРОЙДЕН!' : 'пройден :)' );

    console.log('DeepComp(H1, H5) => false');
    console.log( DeepComp(H1, H5) ? 'НЕ ПРОЙДЕН!' : 'пройден :)' );

    console.log('DeepComp(H6, H7) => true');
    try {
        console.log( DeepComp(H6, H7) ? 'пройден :)' : 'НЕ ПРОЙДЕН!' );
    } catch(err) {
        console.log('НЕ ПРОЙДЕН!');
    }
}
