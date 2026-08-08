import { useState, useEffect } from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import clsx from 'clsx';

export type ReadingLevel = 'easy' | 'medium' | 'hard';

export interface ReadingItem {
  id: string;
  cyrillic: string;
  phonetic: string;
  translation: string;
}

export const READING_DATA: Record<ReadingLevel, ReadingItem[]> = {
  easy: [
    { id: 'e1', cyrillic: 'ДА', phonetic: 'DA', translation: 'Yes' },
    { id: 'e2', cyrillic: 'МА-МА', phonetic: 'MA-MA', translation: 'Mom' },
    { id: 'e3', cyrillic: 'ПА-ПА', phonetic: 'PA-PA', translation: 'Dad' },
    { id: 'e4', cyrillic: 'КОТ', phonetic: 'KOT', translation: 'Cat' },
    { id: 'e5', cyrillic: 'ДОМ', phonetic: 'DOM', translation: 'House' },
    { id: 'e6', cyrillic: 'СОК', phonetic: 'SOK', translation: 'Juice' },
    { id: 'e7', cyrillic: 'НОС', phonetic: 'NOS', translation: 'Nose' },
    { id: 'e8', cyrillic: 'ТА-МА', phonetic: 'TA-MA', translation: 'Tama (name)' },
    { id: 'e9', cyrillic: 'КА-ФЕ', phonetic: 'KA-FE', translation: 'Cafe' },
    { id: 'e10', cyrillic: 'СУП', phonetic: 'SOUP', translation: 'Soup' },
    { id: 'e11', cyrillic: 'СНЕГ', phonetic: 'SNEG', translation: 'Snow' },
    { id: 'e12', cyrillic: 'ХЛЕБ', phonetic: 'KHLEB', translation: 'Bread' },
    { id: 'e13', cyrillic: 'МЁД', phonetic: 'MYOD', translation: 'Honey' },
    { id: 'e14', cyrillic: 'ДЕНЬ', phonetic: 'DEN\'', translation: 'Day' },
    { id: 'e15', cyrillic: 'НОЧЬ', phonetic: 'NOCH\'', translation: 'Night' },
    { id: 'e16', cyrillic: 'РЫБА', phonetic: 'RYBA', translation: 'Fish' },
    { id: 'e17', cyrillic: 'УТРО', phonetic: 'UTRO', translation: 'Morning' },
    { id: 'e18', cyrillic: 'ЛЕТО', phonetic: 'LETO', translation: 'Summer' },
    { id: 'e19', cyrillic: 'ЗИМА', phonetic: 'ZIMA', translation: 'Winter' },
    { id: 'e20', cyrillic: 'НЕБО', phonetic: 'NEBO', translation: 'Sky' },
    { id: 'e21', cyrillic: 'МОРЕ', phonetic: 'MORE', translation: 'Sea' },
    { id: 'e22', cyrillic: 'РЕКА', phonetic: 'REKA', translation: 'River' },
    { id: 'e23', cyrillic: 'ПОЛЕ', phonetic: 'POLE', translation: 'Field' },
    { id: 'e24', cyrillic: 'ГОРА', phonetic: 'GORA', translation: 'Mountain' },
    { id: 'e25', cyrillic: 'СЕЛО', phonetic: 'SELO', translation: 'Village' },
    { id: 'e26', cyrillic: 'ПАРК', phonetic: 'PARK', translation: 'Park' },
    { id: 'e27', cyrillic: 'РУКА', phonetic: 'RUKA', translation: 'Hand / Arm' },
    { id: 'e28', cyrillic: 'НОГА', phonetic: 'NOGA', translation: 'Leg / Foot' },
    { id: 'e29', cyrillic: 'ГЛАЗ', phonetic: 'GLAZ', translation: 'Eye' },
    { id: 'e30', cyrillic: 'УХО', phonetic: 'UKHO', translation: 'Ear' },
    { id: 'e31', cyrillic: 'БРАТ', phonetic: 'BRAT', translation: 'Brother' },
    { id: 'e32', cyrillic: 'СЫН', phonetic: 'SYN', translation: 'Son' },
    { id: 'e33', cyrillic: 'ДОЧЬ', phonetic: 'DOCH\'', translation: 'Daughter' },
    { id: 'e34', cyrillic: 'БАБА', phonetic: 'BABA', translation: 'Grandma' },
    { id: 'e35', cyrillic: 'ДЕТИ', phonetic: 'DETI', translation: 'Children' },
    { id: 'e36', cyrillic: 'ДРУГ', phonetic: 'DRUG', translation: 'Friend' },
    { id: 'e37', cyrillic: 'ОКНО', phonetic: 'OKNO', translation: 'Window' },
    { id: 'e38', cyrillic: 'ДВЕРЬ', phonetic: 'DVER\'', translation: 'Door' },
    { id: 'e39', cyrillic: 'СТОЛ', phonetic: 'STOL', translation: 'Table' },
    { id: 'e40', cyrillic: 'СТУЛ', phonetic: 'STUL', translation: 'Chair' },
    { id: 'e41', cyrillic: 'КНИГА', phonetic: 'KNIGA', translation: 'Book' },
    { id: 'e42', cyrillic: 'РУЧКА', phonetic: 'RUCHKA', translation: 'Pen' },
    { id: 'e43', cyrillic: 'СУМКА', phonetic: 'SUMKA', translation: 'Bag' },
    { id: 'e44', cyrillic: 'ШАПКА', phonetic: 'SHAPKA', translation: 'Hat / Cap' },
    { id: 'e45', cyrillic: 'ШУБА', phonetic: 'SHUBA', translation: 'Fur coat' },
    { id: 'e46', cyrillic: 'ОБУВЬ', phonetic: 'OBUV\'', translation: 'Footwear' },
    { id: 'e47', cyrillic: 'ЧАСЫ', phonetic: 'CHASY', translation: 'Clock / Watch' },
    { id: 'e48', cyrillic: 'ЛОЖКА', phonetic: 'LOZHKA', translation: 'Spoon' },
    { id: 'e49', cyrillic: 'ВИЛКА', phonetic: 'VILKA', translation: 'Fork' },
    { id: 'e50', cyrillic: 'ЧАШКА', phonetic: 'CHASHKA', translation: 'Cup' },
    { id: 'e51', cyrillic: 'КАША', phonetic: 'KASHA', translation: 'Porridge' },
    { id: 'e52', cyrillic: 'МЯСО', phonetic: 'MYASO', translation: 'Meat' },
    { id: 'e53', cyrillic: 'ЯЙЦО', phonetic: 'YAYTSO', translation: 'Egg' },
    { id: 'e54', cyrillic: 'САХАР', phonetic: 'SAKHAR', translation: 'Sugar' },
    { id: 'e55', cyrillic: 'МЫЛО', phonetic: 'MYLO', translation: 'Soap' },
    { id: 'e56', cyrillic: 'КОФЕ', phonetic: 'KOFE', translation: 'Coffee' },
    { id: 'e57', cyrillic: 'РЫСЬ', phonetic: 'RYS\'', translation: 'Lynx' },
    { id: 'e58', cyrillic: 'ВОЛК', phonetic: 'VOLK', translation: 'Wolf' },
    { id: 'e59', cyrillic: 'ЛИСА', phonetic: 'LISA', translation: 'Fox' },
    { id: 'e60', cyrillic: 'СОВА', phonetic: 'SOVA', translation: 'Owl' },
    { id: 'e61', cyrillic: 'ЧАЙ', phonetic: 'CHAY', translation: 'Tea' },
    { id: 'e62', cyrillic: 'МИР', phonetic: 'MIR', translation: 'World / Peace' },
    { id: 'e63', cyrillic: 'ЛЕД', phonetic: 'LED', translation: 'Ice' },
    { id: 'e64', cyrillic: 'СЫР', phonetic: 'SYR', translation: 'Cheese' },
    { id: 'e65', cyrillic: 'ШАР', phonetic: 'SHAR', translation: 'Balloon / Sphere' },
    { id: 'e66', cyrillic: 'МЯЧ', phonetic: 'MYACH', translation: 'Ball' },
    { id: 'e67', cyrillic: 'САД', phonetic: 'SAD', translation: 'Garden' },
    { id: 'e68', cyrillic: 'ЛЕС', phonetic: 'LES', translation: 'Forest' },
    { id: 'e69', cyrillic: 'ЗУБ', phonetic: 'ZUB', translation: 'Tooth' },
    { id: 'e70', cyrillic: 'ДУБ', phonetic: 'DUB', translation: 'Oak' },
    { id: 'e71', cyrillic: 'ЛУК', phonetic: 'LUK', translation: 'Onion / Bow' },
    { id: 'e72', cyrillic: 'РОТ', phonetic: 'ROT', translation: 'Mouth' },
    { id: 'e73', cyrillic: 'НОЖ', phonetic: 'NOZH', translation: 'Knife' },
    { id: 'e74', cyrillic: 'СОН', phonetic: 'SON', translation: 'Dream / Sleep' },
    { id: 'e75', cyrillic: 'ТОК', phonetic: 'TOK', translation: 'Current' },
    { id: 'e76', cyrillic: 'КОД', phonetic: 'KOD', translation: 'Code' },
    { id: 'e77', cyrillic: 'БАК', phonetic: 'BAK', translation: 'Tank' },
    { id: 'e78', cyrillic: 'МАК', phonetic: 'MAK', translation: 'Poppy' },
    { id: 'e79', cyrillic: 'ЛАК', phonetic: 'LAK', translation: 'Lacquer' },
    { id: 'e80', cyrillic: 'РАК', phonetic: 'RAK', translation: 'Crayfish' },
    { id: 'e81', cyrillic: 'ТАК', phonetic: 'TAK', translation: 'So / Thus' },
    { id: 'e82', cyrillic: 'ЧАС', phonetic: 'CHAS', translation: 'Hour' },
    { id: 'e83', cyrillic: 'ШАГ', phonetic: 'SHAG', translation: 'Step' },
    { id: 'e84', cyrillic: 'БОЙ', phonetic: 'BOY', translation: 'Battle' },
    { id: 'e85', cyrillic: 'МАЙ', phonetic: 'MAY', translation: 'May' },
    { id: 'e86', cyrillic: 'РАЙ', phonetic: 'RAY', translation: 'Paradise' },
    { id: 'e87', cyrillic: 'ГОД', phonetic: 'GOD', translation: 'Year' },
    { id: 'e88', cyrillic: 'РОД', phonetic: 'ROD', translation: 'Kind / Gender' },
    { id: 'e89', cyrillic: 'СОЛЬ', phonetic: 'SOL\'', translation: 'Salt' },
    { id: 'e90', cyrillic: 'БОЛЬ', phonetic: 'BOL\'', translation: 'Pain' },
    { id: 'e91', cyrillic: 'РОЛЬ', phonetic: 'ROL\'', translation: 'Role' },
    { id: 'e92', cyrillic: 'ТЕМ', phonetic: 'TEM', translation: 'By that' },
    { id: 'e93', cyrillic: 'ТОМ', phonetic: 'TOM', translation: 'Volume' },
    { id: 'e94', cyrillic: 'КОМ', phonetic: 'KOM', translation: 'Lump' },
    { id: 'e95', cyrillic: 'ДЕД', phonetic: 'DED', translation: 'Grandpa' },
    { id: 'e96', cyrillic: 'ЛУЧ', phonetic: 'LUCH', translation: 'Ray' },
    { id: 'e97', cyrillic: 'МЕЧ', phonetic: 'MECH', translation: 'Sword' },
    { id: 'e98', cyrillic: 'ПЕЧЬ', phonetic: 'PECH\'', translation: 'Oven' },
    { id: 'e99', cyrillic: 'РЕЧЬ', phonetic: 'RECH\'', translation: 'Speech' },
    { id: 'e100', cyrillic: 'ВЕС', phonetic: 'VES', translation: 'Weight' }
  ],
  medium: [
    { id: 'm1', cyrillic: 'ВО-ДА', phonetic: 'VO-DA', translation: 'Water' },
    { id: 'm2', cyrillic: 'ГО-РОД', phonetic: 'GO-ROD', translation: 'City' },
    { id: 'm3', cyrillic: 'АП-ТЕ-КА', phonetic: 'AP-TE-KA', translation: 'Pharmacy' },
    { id: 'm4', cyrillic: 'ШКО-ЛА', phonetic: 'SHKO-LA', translation: 'School' },
    { id: 'm5', cyrillic: 'МО-ЛО-КО', phonetic: 'MO-LO-KO', translation: 'Milk' },
    { id: 'm6', cyrillic: 'ПАРК', phonetic: 'PARK', translation: 'Park' },
    { id: 'm7', cyrillic: 'ЛИ-МОН', phonetic: 'LI-MON', translation: 'Lemon' },
    { id: 'm8', cyrillic: 'СОЛН-ЦЕ', phonetic: 'SOLN-TSE', translation: 'Sun' },
    { id: 'm9', cyrillic: 'РЕ-КА', phonetic: 'RE-KA', translation: 'River' },
    { id: 'm10', cyrillic: 'ОК-НО', phonetic: 'OK-NO', translation: 'Window' },
    { id: 'm11', cyrillic: 'БА-НАН', phonetic: 'BA-NAN', translation: 'Banana' },
    { id: 'm12', cyrillic: 'ПИ-ЦЦА', phonetic: 'PIT-SA', translation: 'Pizza' },
    { id: 'm13', cyrillic: 'ЛАМ-ПА', phonetic: 'LAM-PA', translation: 'Lamp' },
    { id: 'm14', cyrillic: 'ПО-ЕЗД', phonetic: 'PO-YEZD', translation: 'Train' },
    { id: 'm15', cyrillic: 'ЛОД-КА', phonetic: 'LOD-KA', translation: 'Boat' },
    { id: 'm16', cyrillic: 'РЫ-БА', phonetic: 'RY-BA', translation: 'Fish' },
    { id: 'm17', cyrillic: 'МУ-ЗЫ-КА', phonetic: 'MU-ZY-KA', translation: 'Music' },
    { id: 'm18', cyrillic: 'ПИ-СЬ-МО', phonetic: 'PIS\'-MO', translation: 'Letter' },
    { id: 'm19', cyrillic: 'КНИ-ГА', phonetic: 'KNI-GA', translation: 'Book' },
    { id: 'm20', cyrillic: 'РУЧ-КА', phonetic: 'RUCH-KA', translation: 'Pen' },
    { id: 'm21', cyrillic: 'СУМ-КА', phonetic: 'SUM-KA', translation: 'Bag' },
    { id: 'm22', cyrillic: 'ШАП-КА', phonetic: 'SHAP-KA', translation: 'Hat' },
    { id: 'm23', cyrillic: 'НО-СОК', phonetic: 'NO-SOK', translation: 'Sock' },
    { id: 'm24', cyrillic: 'О-БУВЬ', phonetic: 'O-BUV\'', translation: 'Footwear' },
    { id: 'm25', cyrillic: 'ДВЕРЬ', phonetic: 'DVER\'', translation: 'Door' },
    { id: 'm26', cyrillic: 'СТЕН-КА', phonetic: 'STEN-KA', translation: 'Wall' },
    { id: 'm27', cyrillic: 'СТОЛ', phonetic: 'STOL', translation: 'Table' },
    { id: 'm28', cyrillic: 'СТУЛ', phonetic: 'STUL', translation: 'Chair' },
    { id: 'm29', cyrillic: 'ЛОЖ-КА', phonetic: 'LOSH-KA', translation: 'Spoon' },
    { id: 'm30', cyrillic: 'ВИЛ-КА', phonetic: 'VIL-KA', translation: 'Fork' },
    { id: 'm31', cyrillic: 'ЧАШ-КА', phonetic: 'CHASH-KA', translation: 'Cup' },
    { id: 'm32', cyrillic: 'МАС-ЛО', phonetic: 'MAS-LO', translation: 'Butter / Oil' },
    { id: 'm33', cyrillic: 'ХЛЕБ', phonetic: 'KHLEB', translation: 'Bread' },
    { id: 'm34', cyrillic: 'МЯ-СО', phonetic: 'MYA-SO', translation: 'Meat' },
    { id: 'm35', cyrillic: 'РИС', phonetic: 'RIS', translation: 'Rice' },
    { id: 'm36', cyrillic: 'СА-ХАР', phonetic: 'SA-KHAR', translation: 'Sugar' },
    { id: 'm37', cyrillic: 'О-ГУ-РЕЦ', phonetic: 'O-GU-RETS', translation: 'Cucumber' },
    { id: 'm38', cyrillic: 'ТО-МАТ', phonetic: 'TO-MAT', translation: 'Tomato' },
    { id: 'm39', cyrillic: 'ГРИБ', phonetic: 'GRIB', translation: 'Mushroom' },
    { id: 'm40', cyrillic: 'ЯБ-ЛО-КО', phonetic: 'YAB-LO-KO', translation: 'Apple' },
    { id: 'm41', cyrillic: 'ГРУ-ША', phonetic: 'GRU-SHA', translation: 'Pear' },
    { id: 'm42', cyrillic: 'СЛИ-ВА', phonetic: 'SLI-VA', translation: 'Plum' },
    { id: 'm43', cyrillic: 'А-ПЕЛЬ-СИН', phonetic: 'A-PEL\'-SIN', translation: 'Orange' },
    { id: 'm44', cyrillic: 'МЕ-ДОК', phonetic: 'ME-DOK', translation: 'Honey' },
    { id: 'm45', cyrillic: 'ТОРТ', phonetic: 'TORT', translation: 'Cake' },
    { id: 'm46', cyrillic: 'КЕКС', phonetic: 'KEKS', translation: 'Muffin' },
    { id: 'm47', cyrillic: 'ПИ-РОГ', phonetic: 'PI-ROG', translation: 'Pie' },
    { id: 'm48', cyrillic: 'КО-ФЕ', phonetic: 'KO-FE', translation: 'Coffee' },
    { id: 'm49', cyrillic: 'ЧАЙ-НИК', phonetic: 'CHAY-NIK', translation: 'Teapot' },
    { id: 'm50', cyrillic: 'ПУТЬ', phonetic: 'PUT\'', translation: 'Path / Way' },
    { id: 'm51', cyrillic: 'ЗИ-МА', phonetic: 'ZI-MA', translation: 'Winter' },
    { id: 'm52', cyrillic: 'ВЕС-НА', phonetic: 'VES-NA', translation: 'Spring' },
    { id: 'm53', cyrillic: 'ЛЕ-ТО', phonetic: 'LE-TO', translation: 'Summer' },
    { id: 'm54', cyrillic: 'О-СЕНЬ', phonetic: 'O-SEN\'', translation: 'Autumn' },
    { id: 'm55', cyrillic: 'У-ТРО', phonetic: 'U-TRO', translation: 'Morning' },
    { id: 'm56', cyrillic: 'ДЕНЬ', phonetic: 'DEN\'', translation: 'Day' },
    { id: 'm57', cyrillic: 'ВЕ-ЧЕР', phonetic: 'VE-CHER', translation: 'Evening' },
    { id: 'm58', cyrillic: 'НОЧЬ', phonetic: 'NOCH\'', translation: 'Night' },
    { id: 'm59', cyrillic: 'ВЕ-ТЕР', phonetic: 'VE-TER', translation: 'Wind' },
    { id: 'm60', cyrillic: 'ДОЖДЬ', phonetic: 'DOSHD\'', translation: 'Rain' },
    { id: 'm61', cyrillic: 'СНЕГ', phonetic: 'SNEG', translation: 'Snow' },
    { id: 'm62', cyrillic: 'ГРО-ЗА', phonetic: 'GRO-ZA', translation: 'Storm' },
    { id: 'm63', cyrillic: 'НЕ-БО', phonetic: 'NE-BO', translation: 'Sky' },
    { id: 'm64', cyrillic: 'ЛУ-НА', phonetic: 'LU-NA', translation: 'Moon' },
    { id: 'm65', cyrillic: 'ЗВЕЗ-ДА', phonetic: 'ZVEZ-DA', translation: 'Star' },
    { id: 'm66', cyrillic: 'МЕ-СЯЦ', phonetic: 'ME-SYATS', translation: 'Month' },
    { id: 'm67', cyrillic: 'ЧА-СЫ', phonetic: 'CHA-SY', translation: 'Clock / Watch' },
    { id: 'm68', cyrillic: 'КИ-НО', phonetic: 'KI-NO', translation: 'Cinema' },
    { id: 'm69', cyrillic: 'ТЕ-АТР', phonetic: 'TE-ATR', translation: 'Theater' },
    { id: 'm70', cyrillic: 'МУ-ЗЕЙ', phonetic: 'MU-ZEY', translation: 'Museum' },
    { id: 'm71', cyrillic: 'КАС-СА', phonetic: 'KAS-SA', translation: 'Cashier' },
    { id: 'm72', cyrillic: 'ЦЕ-НА', phonetic: 'TSE-NA', translation: 'Price' },
    { id: 'm73', cyrillic: 'КАР-ТА', phonetic: 'KAR-TA', translation: 'Map / Card' },
    { id: 'm74', cyrillic: 'ПОРТ', phonetic: 'PORT', translation: 'Port' },
    { id: 'm75', cyrillic: 'МЕ-ТРО', phonetic: 'ME-TRO', translation: 'Subway' },
    { id: 'm76', cyrillic: 'ТАК-СИ', phonetic: 'TAK-SI', translation: 'Taxi' },
    { id: 'm77', cyrillic: 'АВ-ТО-БУС', phonetic: 'AV-TO-BUS', translation: 'Bus' },
    { id: 'm78', cyrillic: 'БИ-ЛЕТ', phonetic: 'BI-LET', translation: 'Ticket' },
    { id: 'm79', cyrillic: 'ЗА-ВОД', phonetic: 'ZA-VOD', translation: 'Factory' },
    { id: 'm80', cyrillic: 'ПО-ЛЕ', phonetic: 'PO-LE', translation: 'Field' },
    { id: 'm81', cyrillic: 'МЕ-СТО', phonetic: 'ME-STO', translation: 'Place' },
    { id: 'm82', cyrillic: 'СЛО-ВО', phonetic: 'SLO-VO', translation: 'Word' },
    { id: 'm83', cyrillic: 'ГО-ЛОС', phonetic: 'GO-LOS', translation: 'Voice' },
    { id: 'm84', cyrillic: 'ГЛАЗ', phonetic: 'GLAZ', translation: 'Eye' },
    { id: 'm85', cyrillic: 'У-ХО', phonetic: 'U-KHO', translation: 'Ear' },
    { id: 'm86', cyrillic: 'РУ-КА', phonetic: 'RU-KA', translation: 'Hand / Arm' },
    { id: 'm87', cyrillic: 'НО-ГА', phonetic: 'NO-GA', translation: 'Leg / Foot' },
    { id: 'm88', cyrillic: 'ЛИ-ЦО', phonetic: 'LI-TSO', translation: 'Face' },
    { id: 'm89', cyrillic: 'Я-ЗЫК', phonetic: 'YA-ZYK', translation: 'Language / Tongue' },
    { id: 'm90', cyrillic: 'ПЕ-СНЯ', phonetic: 'PE-SNYA', translation: 'Song' },
    { id: 'm91', cyrillic: 'ТА-НЕЦ', phonetic: 'TA-NETS', translation: 'Dance' },
    { id: 'm92', cyrillic: 'И-ГРА', phonetic: 'I-GRA', translation: 'Game' },
    { id: 'm93', cyrillic: 'ДРУГ', phonetic: 'DRUG', translation: 'Friend' },
    { id: 'm94', cyrillic: 'БРАТ', phonetic: 'BRAT', translation: 'Brother' },
    { id: 'm95', cyrillic: 'СЕ-СТРА', phonetic: 'SE-STRA', translation: 'Sister' },
    { id: 'm96', cyrillic: 'ДЯ-ДЯ', phonetic: 'DYA-DYA', translation: 'Uncle' },
    { id: 'm97', cyrillic: 'ТЁ-ТЯ', phonetic: 'TYO-TYA', translation: 'Aunt' },
    { id: 'm98', cyrillic: 'О-ТЕЦ', phonetic: 'O-TETS', translation: 'Father' },
    { id: 'm99', cyrillic: 'МА-ТЬ', phonetic: 'MAT\'', translation: 'Mother' },
    { id: 'm100', cyrillic: 'СЫН', phonetic: 'SYN', translation: 'Son' }
  ],
  hard: [
    { id: 'h1', cyrillic: 'БА-БУШ-КА', phonetic: 'BA-BUSH-KA', translation: 'Grandmother' },
    { id: 'h2', cyrillic: 'РЕ-СТО-РАН', phonetic: 'RE-STO-RAN', translation: 'Restaurant' },
    { id: 'h3', cyrillic: 'ЗДРАВ-СТВУЙ-ТЕ', phonetic: 'ZDRAV-STVUY-TE', translation: 'Hello' },
    { id: 'h4', cyrillic: 'ОБЪ-ЕКТ', phonetic: "OB'YEKT", translation: 'Object' },
    { id: 'h5', cyrillic: 'СУБЪ-ЕКТ', phonetic: "SUB'YEKT", translation: 'Subject' },
    { id: 'h6', cyrillic: 'ЭК-РАН', phonetic: 'EK-RAN', translation: 'Screen' },
    { id: 'h7', cyrillic: 'ЩИТ', phonetic: 'SHCHIT', translation: 'Shield' },
    { id: 'h8', cyrillic: 'ЮГ', phonetic: 'YUG', translation: 'South' },
    { id: 'h9', cyrillic: 'ПРЕД-ПРИ-Я-ТИ-Е', phonetic: 'PRED-PRI-YA-TI-YE', translation: 'Enterprise' },
    { id: 'h10', cyrillic: 'ДО-СТО-ПРИ-МЕ-ЧА-ТЕЛЬ-НОСТЬ', phonetic: 'DO-STO-PRI-ME-CHA-TEL\'-NOST\'', translation: 'Attraction / Sight' },
    { id: 'h11', cyrillic: 'БЛА-ГО-ДАР-НОСТЬ', phonetic: 'BLA-GO-DAR-NOST\'', translation: 'Gratitude' },
    { id: 'h12', cyrillic: 'У-ДО-ВОЛЬ-СТВИ-Е', phonetic: 'U-DO-VOL\'-STVI-YE', translation: 'Pleasure' },
    { id: 'h13', cyrillic: 'ПРЕ-КРАС-НО', phonetic: 'PRE-KRAS-NO', translation: 'Wonderful' },
    { id: 'h14', cyrillic: 'ПУ-ТЕ-ШЕ-СТВИ-Е', phonetic: 'PU-TE-SHE-STVI-YE', translation: 'Journey / Travel' },
    { id: 'h15', cyrillic: 'ВДОХ-НО-ВЕ-НИ-Е', phonetic: 'VDOKH-NO-VE-NI-YE', translation: 'Inspiration' },
    { id: 'h16', cyrillic: 'СНЕ-ГО-ПАД', phonetic: 'SNE-GO-PAD', translation: 'Snowfall' },
    { id: 'h17', cyrillic: 'ЗЕ-МЛЕ-ТРЯ-СЕ-НИ-Е', phonetic: 'ZE-MLE-TRYA-SE-NI-YE', translation: 'Earthquake' },
    { id: 'h18', cyrillic: 'ПРО-ИЗ-ВОД-СТВО', phonetic: 'PRO-IZ-VOD-STVO', translation: 'Production' },
    { id: 'h19', cyrillic: 'СТРО-И-ТЕЛЬ-СТВО', phonetic: 'STRO-I-TEL\'-STVO', translation: 'Construction' },
    { id: 'h20', cyrillic: 'ПРА-ВИ-ТЕЛЬ-СТВО', phonetic: 'PRA-VI-TEL\'-STVO', translation: 'Government' },
    { id: 'h21', cyrillic: 'БЕ-ЗО-ПАС-НОСТЬ', phonetic: 'BE-ZO-PAS-NOST\'', translation: 'Safety' },
    { id: 'h22', cyrillic: 'СНЕ-ГУ-РОЧ-КА', phonetic: 'SNE-GU-ROCH-KA', translation: 'Snow Maiden' },
    { id: 'h23', cyrillic: 'ПРИ-КЛЮ-ЧЕ-НИ-Е', phonetic: 'PRI-KLYU-CHE-NI-YE', translation: 'Adventure' },
    { id: 'h24', cyrillic: 'ВО-ОБ-РА-ЖЕ-НИ-Е', phonetic: 'VO-OB-RA-ZHE-NI-YE', translation: 'Imagination' },
    { id: 'h25', cyrillic: 'ВЕ-ЛИ-КО-ЛЕП-НО', phonetic: 'VE-LI-KO-LEP-NO', translation: 'Magnificent' },
    { id: 'h26', cyrillic: 'ОБ-ЩЕ-ЖИ-ТИ-Е', phonetic: 'OB-SHCHE-ZHI-TI-YE', translation: 'Dormitory' },
    { id: 'h27', cyrillic: 'ПЕ-РЕ-ВОД-ЧИК', phonetic: 'PE-RE-VOD-CHIK', translation: 'Translator' },
    { id: 'h28', cyrillic: 'Э-ЛЕК-ТРО-НИ-КА', phonetic: 'E-LEK-TRO-NI-KA', translation: 'Electronics' },
    { id: 'h29', cyrillic: 'АВ-ТО-МО-БИЛЬ', phonetic: 'AV-TO-MO-BIL\'', translation: 'Automobile' },
    { id: 'h30', cyrillic: 'ПРО-ГРАМ-МИ-РО-ВА-НИ-Е', phonetic: 'PRO-GRAM-MI-RO-VA-NI-YE', translation: 'Programming' },
    { id: 'h31', cyrillic: 'ТЕ-ЛЕ-ФОН', phonetic: 'TE-LE-FON', translation: 'Telephone' },
    { id: 'h32', cyrillic: 'ТЕ-ЛЕ-ВИ-ЗОР', phonetic: 'TE-LE-VI-ZOR', translation: 'Television' },
    { id: 'h33', cyrillic: 'ВЕ-ЛО-СИ-ПЕД', phonetic: 'VE-LO-SI-PED', translation: 'Bicycle' },
    { id: 'h34', cyrillic: 'ФО-ТО-ГРА-ФИ-Я', phonetic: 'FO-TO-GRA-FI-YA', translation: 'Photograph' },
    { id: 'h35', cyrillic: 'ЭК-СКУР-СИ-Я', phonetic: 'EK-SKUR-SI-YA', translation: 'Excursion' },
    { id: 'h36', cyrillic: 'ИН-ФОР-МА-ЦИ-Я', phonetic: 'IN-FOR-MA-TSI-YA', translation: 'Information' },
    { id: 'h37', cyrillic: 'КУЛЬ-ТУ-РА', phonetic: 'KUL\'-TU-RA', translation: 'Culture' },
    { id: 'h38', cyrillic: 'ЛИ-ТЕ-РА-ТУ-РА', phonetic: 'LI-TE-RA-TU-RA', translation: 'Literature' },
    { id: 'h39', cyrillic: 'АР-ХИ-ТЕК-ТУ-РА', phonetic: 'AR-KHI-TEK-TU-RA', translation: 'Architecture' },
    { id: 'h40', cyrillic: 'У-НИ-ВЕР-СИ-ТЕТ', phonetic: 'U-NI-VER-SI-TET', translation: 'University' },
    { id: 'h41', cyrillic: 'БИБ-ЛИ-О-ТЕ-КА', phonetic: 'BIB-LI-O-TE-KA', translation: 'Library' },
    { id: 'h42', cyrillic: 'ГОС-У-ДАР-СТВО', phonetic: 'GOS-U-DAR-STVO', translation: 'State / Nation' },
    { id: 'h43', cyrillic: 'ПРО-ФЕС-СОР', phonetic: 'PRO-FES-SOR', translation: 'Professor' },
    { id: 'h44', cyrillic: 'ИН-ЖЕ-НЕР', phonetic: 'IN-ZHE-NER', translation: 'Engineer' },
    { id: 'h45', cyrillic: 'ХУ-ДОЖ-НИК', phonetic: 'KHU-DOZH-NIK', translation: 'Artist' },
    { id: 'h46', cyrillic: 'МУ-ЗЫ-КАНТ', phonetic: 'MU-ZY-KANT', translation: 'Musician' },
    { id: 'h47', cyrillic: 'СМЕРТЬ', phonetic: 'SMERT\'', translation: 'Death' },
    { id: 'h48', cyrillic: 'ЖИЗНЬ', phonetic: 'ZHIZN\'', translation: 'Life' },
    { id: 'h49', cyrillic: 'СЧА-СТЬЕ', phonetic: 'SCHA-ST\'YE', translation: 'Happiness' },
    { id: 'h50', cyrillic: 'ЗДО-РО-ВЬЕ', phonetic: 'ZDO-RO-V\'YE', translation: 'Health' },
    { id: 'h51', cyrillic: 'УС-ПЕХ', phonetic: 'US-PEKH', translation: 'Success' },
    { id: 'h52', cyrillic: 'ЛЮ-БОВЬ', phonetic: 'LYU-BOV\'', translation: 'Love' },
    { id: 'h53', cyrillic: 'ДРУЖ-БА', phonetic: 'DRUZH-BA', translation: 'Friendship' },
    { id: 'h54', cyrillic: 'СЕМЬ-Я', phonetic: 'SEM\'-YA', translation: 'Family' },
    { id: 'h55', cyrillic: 'ЧЕ-ЛО-ВЕК', phonetic: 'CHE-LO-VEK', translation: 'Person / Human' },
    { id: 'h56', cyrillic: 'РЕ-БЕ-НОК', phonetic: 'RE-BE-NOK', translation: 'Child' },
    { id: 'h57', cyrillic: 'ВЗРОС-ЛЫЙ', phonetic: 'VZROS-LYY', translation: 'Adult' },
    { id: 'h58', cyrillic: 'РО-ДИ-ТЕ-ЛИ', phonetic: 'RO-DI-TE-LI', translation: 'Parents' },
    { id: 'h59', cyrillic: 'У-ЧИ-ТЕЛЬ', phonetic: 'U-CHI-TEL\'', translation: 'Teacher' },
    { id: 'h60', cyrillic: 'У-ЧЕ-НИК', phonetic: 'U-CHE-NIK', translation: 'Student' },
    { id: 'h61', cyrillic: 'ШКОЛЬ-НИК', phonetic: 'SHKOL\'-NIK', translation: 'Schoolboy' },
    { id: 'h62', cyrillic: 'ПАС-СА-ЖИР', phonetic: 'PAS-SA-ZHIR', translation: 'Passenger' },
    { id: 'h63', cyrillic: 'ВО-ДИ-ТЕЛЬ', phonetic: 'VO-DI-TEL\'', translation: 'Driver' },
    { id: 'h64', cyrillic: 'ПО-КУ-ПА-ТЕЛЬ', phonetic: 'PO-KU-PA-TEL\'', translation: 'Buyer' },
    { id: 'h65', cyrillic: 'ПРО-ДА-ВЕЦ', phonetic: 'PRO-DA-VETS', translation: 'Seller' },
    { id: 'h66', cyrillic: 'ВРАЧ', phonetic: 'VRACH', translation: 'Doctor' },
    { id: 'h67', cyrillic: 'ПО-ЛИ-ЦЕЙ-СКИЙ', phonetic: 'PO-LI-TSEY-SKIY', translation: 'Police officer' },
    { id: 'h68', cyrillic: 'ПО-ЖАР-НЫЙ', phonetic: 'PO-ZHAR-NYY', translation: 'Firefighter' },
    { id: 'h69', cyrillic: 'ВО-ЕН-НЫЙ', phonetic: 'VO-YEN-NYY', translation: 'Military officer' },
    { id: 'h70', cyrillic: 'Ю-РИСТ', phonetic: 'YU-RIST', translation: 'Lawyer' },
    { id: 'h71', cyrillic: 'Э-КО-НО-МИСТ', phonetic: 'E-KO-NO-MIST', translation: 'Economist' },
    { id: 'h72', cyrillic: 'ЖУР-НА-ЛИСТ', phonetic: 'ZHUR-NA-LIST', translation: 'Journalist' },
    { id: 'h73', cyrillic: 'ПИ-СА-ТЕЛЬ', phonetic: 'PI-SA-TEL\'', translation: 'Writer' },
    { id: 'h74', cyrillic: 'ПО-ЭТ', phonetic: 'PO-ET', translation: 'Poet' },
    { id: 'h75', cyrillic: 'АР-ТИСТ', phonetic: 'AR-TIST', translation: 'Artist / Actor' },
    { id: 'h76', cyrillic: 'СПОРТС-МЕН', phonetic: 'SPORTS-MEN', translation: 'Athlete' },
    { id: 'h77', cyrillic: 'ПЕ-КАРЬ', phonetic: 'PE-KAR\'', translation: 'Baker' },
    { id: 'h78', cyrillic: 'СТРО-И-ТЕЛЬ', phonetic: 'STRO-I-TEL\'', translation: 'Builder' },
    { id: 'h79', cyrillic: 'СА-ДОВ-НИК', phonetic: 'SA-DOV-NIK', translation: 'Gardener' },
    { id: 'h80', cyrillic: 'ПА-РИК-МА-ХЕР', phonetic: 'PA-RIK-MA-KHER', translation: 'Hairdresser' },
    { id: 'h81', cyrillic: 'О-ФИ-ЦИ-АНТ', phonetic: 'O-FI-TSI-ANT', translation: 'Waiter' },
    { id: 'h82', cyrillic: 'КУ-РЬЕР', phonetic: 'KU-R\'YER', translation: 'Courier' },
    { id: 'h83', cyrillic: 'ШО-ФЕР', phonetic: 'SHO-FER', translation: 'Chauffeur' },
    { id: 'h84', cyrillic: 'ЛЁТ-ЧИК', phonetic: 'LYOT-CHIK', translation: 'Pilot' },
    { id: 'h85', cyrillic: 'МАТ-РОС', phonetic: 'MAT-ROS', translation: 'Sailor' },
    { id: 'h86', cyrillic: 'РЫ-БАК', phonetic: 'RY-BAK', translation: 'Fisherman' },
    { id: 'h87', cyrillic: 'ФЕР-МЕР', phonetic: 'FER-MER', translation: 'Farmer' },
    { id: 'h88', cyrillic: 'ШАХ-ТЁР', phonetic: 'SHAKH-TYOR', translation: 'Miner' },
    { id: 'h89', cyrillic: 'У-ЧЁ-НЫЙ', phonetic: 'U-CHYO-NYY', translation: 'Scientist' },
    { id: 'h90', cyrillic: 'АС-ТРО-НАВТ', phonetic: 'AS-TRO-NAVT', translation: 'Astronaut' },
    { id: 'h91', cyrillic: 'Э-КО-ЛОГ', phonetic: 'E-KO-LOG', translation: 'Ecologist' },
    { id: 'h92', cyrillic: 'БИ-О-ЛОГ', phonetic: 'BI-O-LOG', translation: 'Biologist' },
    { id: 'h93', cyrillic: 'ХИ-МИК', phonetic: 'KHI-MIK', translation: 'Chemist' },
    { id: 'h94', cyrillic: 'ФИ-ЗИК', phonetic: 'FI-ZIK', translation: 'Physicist' },
    { id: 'h95', cyrillic: 'МА-ТЕ-МА-ТИК', phonetic: 'MA-TE-MA-TIK', translation: 'Mathematician' },
    { id: 'h96', cyrillic: 'ИС-КУС-СТВО', phonetic: 'IS-KUS-STVO', translation: 'Art' },
    { id: 'h97', cyrillic: 'ПРИ-РО-ДА', phonetic: 'PRI-RO-DA', translation: 'Nature' },
    { id: 'h98', cyrillic: 'ОК-Е-АН', phonetic: 'OK-E-AN', translation: 'Ocean' },
    { id: 'h99', cyrillic: 'КОС-МОС', phonetic: 'KOS-MOS', translation: 'Space / Cosmos' },
    { id: 'h100', cyrillic: 'ГА-ЛАК-ТИ-КА', phonetic: 'GA-LAK-TI-KA', translation: 'Galaxy' }
  ]
};

export function ReadingTrainer() {
  const [level, setLevel] = useState<ReadingLevel>('easy');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const currentList = READING_DATA[level];
  const item = currentList[currentIndex] || currentList[0];

  // Pick a random index when level changes or component mounts
  useEffect(() => {
    const list = READING_DATA[level];
    const randomIdx = Math.floor(Math.random() * list.length);
    setCurrentIndex(randomIdx);
    setRevealed(false);
  }, [level]);

  const handleNext = () => {
    setRevealed(false);
    let nextIdx = Math.floor(Math.random() * currentList.length);
    if (nextIdx === currentIndex && currentList.length > 1) {
      nextIdx = (currentIndex + 1) % currentList.length;
    }
    setCurrentIndex(nextIdx);
  };

  const handleLevelChange = (newLevel: ReadingLevel) => {
    setLevel(newLevel);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] relative">
      {/* Level selector tabs */}
      <div className="flex gap-2 mb-8 w-full max-w-md">
        {(['easy', 'medium', 'hard'] as ReadingLevel[]).map((lvl) => (
          <button
            key={lvl}
            onClick={() => handleLevelChange(lvl)}
            className={clsx(
              "flex-1 py-2 font-mono text-xs font-bold uppercase tracking-wider border-2 border-vintage-ink transition-all cursor-pointer",
              level === lvl
                ? "bg-vintage-gold text-vintage-ink shadow-[2px_2px_0_0_#2C2A29]"
                : "bg-white text-vintage-ink/70 hover:bg-gray-100"
            )}
          >
            {lvl === 'easy' ? 'Easy (Short)' : lvl === 'medium' ? 'Medium (Words)' : 'Hard (Complex)'}
          </button>
        ))}
      </div>

      <h3 className="font-bold text-vintage-blue uppercase tracking-widest text-sm mb-2 text-center">
        Read the Cyrillic out loud
      </h3>
      <p className="font-serif text-sm italic text-vintage-ink/70 mb-8 text-center max-w-md">
        Sound out the syllables below, then click Reveal to check your pronunciation and translation.
      </p>

      {/* Main Cyrillic Card */}
      <div className="w-full max-w-md bg-white border-2 border-vintage-ink p-8 flex flex-col items-center justify-center mb-8 shadow-[4px_4px_0_0_#2C2A29]">
        <div className="text-5xl md:text-6xl font-serif font-bold text-vintage-ink tracking-widest mb-4 text-center">
          {item.cyrillic}
        </div>

        {/* Revealed Details */}
        {revealed && (
          <div className="mt-6 pt-6 border-t-2 border-vintage-ink border-dashed w-full text-center">
            <div className="text-2xl font-mono font-bold text-vintage-blue mb-1">
              [{item.phonetic}]
            </div>
            <div className="text-xl font-serif italic text-vintage-red mb-3">
              "{item.translation}"
            </div>
            <a 
              href={`https://en.wiktionary.org/wiki/${encodeURIComponent(item.cyrillic.replace(/[-'’]/g, '').toLowerCase())}#Russian`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-vintage-blue hover:text-vintage-red underline font-serif font-bold text-sm cursor-pointer"
            >
              View on Wiktionary &rarr;
            </a>
          </div>
        )}
      </div>

      {/* Controls */}
      {!revealed ? (
        <div className="w-full max-w-md flex gap-4">
          <button
            onClick={handleNext}
            className="flex-1 py-3 font-serif font-bold text-lg border-2 border-vintage-ink bg-white hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Skip Word
          </button>
          <button
            onClick={() => setRevealed(true)}
            className="flex-1 py-3 font-serif font-bold text-lg border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] bg-vintage-gold hover:bg-[#d4a849] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-none cursor-pointer flex items-center justify-center gap-2"
          >
            <Eye size={20} /> Reveal
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md flex justify-between gap-4">
          <button
            onClick={handleNext}
            className="w-full py-3 bg-vintage-ink text-white font-serif font-bold text-xl hover:bg-gray-800 transition-colors cursor-pointer shadow-[4px_4px_0_0_#D9AD5B] flex items-center justify-center gap-2"
          >
            Next Word <ArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
