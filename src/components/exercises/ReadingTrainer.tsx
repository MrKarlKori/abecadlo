import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, Eye } from 'lucide-react';
import clsx from 'clsx';

export type ReadingLevel = 'easy' | 'medium' | 'hard';

export interface ReadingItem {
  id: string;
  cyrillic: string;
  phonetic: string;
  translation: string;
}

export const READING_DATA: Record<string, Record<ReadingLevel, ReadingItem[]>> = {
  ru: {
    easy: [
      {"id":"e51","cyrillic":"ЛЁД","phonetic":"LYOD","translation":"Ice"},
      {"id":"e52","cyrillic":"ЛЕС","phonetic":"LES","translation":"Forest"},
      {"id":"e53","cyrillic":"СЫР","phonetic":"SYR","translation":"Cheese"},
      {"id":"e54","cyrillic":"СОЛЬ","phonetic":"SOL'","translation":"Salt"},
      {"id":"e55","cyrillic":"ВОК-ЗАЛ","phonetic":"VOK-ZAL","translation":"Station"},
      {"id":"e56","cyrillic":"ВО-ДА","phonetic":"VO-DA","translation":"Water"},
      {"id":"e57","cyrillic":"КА-ША","phonetic":"KA-SHA","translation":"Porridge"},
      {"id":"e58","cyrillic":"ВА-ТА","phonetic":"VA-TA","translation":"Cotton wool"},
      {"id":"e59","cyrillic":"МЫ-ЛО","phonetic":"MY-LO","translation":"Soap"},
      {"id":"e60","cyrillic":"ЛУК","phonetic":"LUK","translation":"Onion / Bow"},
      {"id":"e61","cyrillic":"ЖУК","phonetic":"ZHUK","translation":"Beetle"},
      {"id":"e62","cyrillic":"РАК","phonetic":"RAK","translation":"Crayfish"},
      {"id":"e63","cyrillic":"БОР","phonetic":"BOR","translation":"Pine forest"},
      {"id":"e64","cyrillic":"СИ-НИЙ","phonetic":"SI-NIY","translation":"Blue"},
      {"id":"e65","cyrillic":"А-ЛЫЙ","phonetic":"A-LYY","translation":"Scarlet"},
      {"id":"e66","cyrillic":"БЕ-ЛЫЙ","phonetic":"BE-LYY","translation":"White"},
      {"id":"e67","cyrillic":"МИР","phonetic":"MIR","translation":"Peace / World"},
      {"id":"e68","cyrillic":"ШАР","phonetic":"SHAR","translation":"Ball / Sphere"},
      {"id":"e69","cyrillic":"МАЙ","phonetic":"MAY","translation":"May"},
      {"id":"e70","cyrillic":"ЧАЙ","phonetic":"CHAY","translation":"Tea"},
      {"id":"e71","cyrillic":"ЮГ","phonetic":"YUG","translation":"South"},
      {"id":"e72","cyrillic":"ЁЖ","phonetic":"YOZH","translation":"Hedgehog"},
      {"id":"e73","cyrillic":"УЖ","phonetic":"UZH","translation":"Grass snake"},
      {"id":"e74","cyrillic":"ДУБ","phonetic":"DUB","translation":"Oak"},
      {"id":"e75","cyrillic":"ЛУЧ","phonetic":"LUCH","translation":"Ray"},
      {"id":"e76","cyrillic":"МЯЧ","phonetic":"MYACH","translation":"Ball"},
      {"id":"e77","cyrillic":"ВОР","phonetic":"VOR","translation":"Thief"},
      {"id":"e78","cyrillic":"ВЕС","phonetic":"VES","translation":"Weight"},
      {"id":"e79","cyrillic":"ВЕК","phonetic":"VEK","translation":"Century"},
      {"id":"e80","cyrillic":"ВИД","phonetic":"VID","translation":"View / Aspect"},
      {"id":"e81","cyrillic":"ДАР","phonetic":"DAR","translation":"Gift"},
      {"id":"e82","cyrillic":"ДОК","phonetic":"DOK","translation":"Dock"},
      {"id":"e83","cyrillic":"ДОЛ","phonetic":"DOL","translation":"Valley"},
      {"id":"e84","cyrillic":"ДЫМ","phonetic":"DYM","translation":"Smoke"},
      {"id":"e85","cyrillic":"ЖИР","phonetic":"ZHIR","translation":"Fat"},
      {"id":"e86","cyrillic":"ЗОВ","phonetic":"ZOV","translation":"Call"},
      {"id":"e87","cyrillic":"ЗУБ","phonetic":"ZUB","translation":"Tooth"},
      {"id":"e88","cyrillic":"ИСК","phonetic":"ISK","translation":"Claim"},
      {"id":"e89","cyrillic":"КОД","phonetic":"KOD","translation":"Code"},
      {"id":"e90","cyrillic":"КОМ","phonetic":"KOM","translation":"Lump"},
      {"id":"e91","cyrillic":"КУТ","phonetic":"KUT","translation":"Corner"},
      {"id":"e92","cyrillic":"ЛАК","phonetic":"LAK","translation":"Varnish"},
      {"id":"e93","cyrillic":"ЛОБ","phonetic":"LOB","translation":"Forehead"},
      {"id":"e94","cyrillic":"ЛОМ","phonetic":"LOM","translation":"Crowbar"},
      {"id":"e95","cyrillic":"ЛУГ","phonetic":"LUG","translation":"Meadow"},
      {"id":"e96","cyrillic":"МАТ","phonetic":"MAT","translation":"Mat"},
      {"id":"e97","cyrillic":"МОХ","phonetic":"MOKH","translation":"Moss"},
      {"id":"e98","cyrillic":"МУЖ","phonetic":"MUZH","translation":"Husband"},
      {"id":"e99","cyrillic":"ПАН","phonetic":"PAN","translation":"Lord / Mister"},
      {"id":"e100","cyrillic":"ПАР","phonetic":"PAR","translation":"Steam"},

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
    { id: 'e100', cyrillic: 'ВЕС', phonetic: 'VES', translation: 'Weight' },
    // 100 NEW EASY EXAMPLES (e101 - e200)
    { id: 'e101', cyrillic: 'БОР', phonetic: 'BOR', translation: 'Pine forest' },
    { id: 'e102', cyrillic: 'ПАР', phonetic: 'PAR', translation: 'Steam' },
    { id: 'e103', cyrillic: 'ЖАР', phonetic: 'ZHAR', translation: 'Heat / Fever' },
    { id: 'e104', cyrillic: 'ДЫМ', phonetic: 'DYM', translation: 'Smoke' },
    { id: 'e105', cyrillic: 'ЛУГ', phonetic: 'LUG', translation: 'Meadow' },
    { id: 'e106', cyrillic: 'МОСТ', phonetic: 'MOST', translation: 'Bridge' },
    { id: 'e107', cyrillic: 'КУСТ', phonetic: 'KUST', translation: 'Bush' },
    { id: 'e108', cyrillic: 'ЛИСТ', phonetic: 'LIST', translation: 'Leaf / Sheet' },
    { id: 'e109', cyrillic: 'КРЕСТ', phonetic: 'KREST', translation: 'Cross' },
    { id: 'e110', cyrillic: 'ХВОСТ', phonetic: 'KHVOST', translation: 'Tail' },
    { id: 'e111', cyrillic: 'ХОЛМ', phonetic: 'KHOLM', translation: 'Hill' },
    { id: 'e112', cyrillic: 'ГРАД', phonetic: 'GRAD', translation: 'Hail / City' },
    { id: 'e113', cyrillic: 'ГРОМ', phonetic: 'GROM', translation: 'Thunder' },
    { id: 'e114', cyrillic: 'КРАЙ', phonetic: 'KRAY', translation: 'Edge / Region' },
    { id: 'e115', cyrillic: 'КЛЮЧ', phonetic: 'KLYUCH', translation: 'Key / Spring' },
    { id: 'e116', cyrillic: 'ГРАЧ', phonetic: 'GRACH', translation: 'Rook' },
    { id: 'e117', cyrillic: 'КРИК', phonetic: 'KRIK', translation: 'Shout / Cry' },
    { id: 'e118', cyrillic: 'СМЕХ', phonetic: 'SMEKH', translation: 'Laughter' },
    { id: 'e119', cyrillic: 'ГРЕХ', phonetic: 'GREKH', translation: 'Sin' },
    { id: 'e120', cyrillic: 'ПЛУГ', phonetic: 'PLUG', translation: 'Plow' },
    { id: 'e121', cyrillic: 'СНОП', phonetic: 'SNOP', translation: 'Sheaf' },
    { id: 'e122', cyrillic: 'СЛЕД', phonetic: 'SLED', translation: 'Track / Footprint' },
    { id: 'e123', cyrillic: 'ЗВОН', phonetic: 'ZVON', translation: 'Chime' },
    { id: 'e124', cyrillic: 'КЛОН', phonetic: 'KLON', translation: 'Clone' },
    { id: 'e125', cyrillic: 'ЗВЕРЬ', phonetic: 'ZVER\'', translation: 'Beast' },
    { id: 'e126', cyrillic: 'ДВОР', phonetic: 'DVOR', translation: 'Yard / Courtyard' },
    { id: 'e127', cyrillic: 'ВОР', phonetic: 'VOR', translation: 'Thief' },
    { id: 'e128', cyrillic: 'СОР', phonetic: 'SOR', translation: 'Trash' },
    { id: 'e129', cyrillic: 'СПОРТ', phonetic: 'SPORT', translation: 'Sport' },
    { id: 'e130', cyrillic: 'БОРЩ', phonetic: 'BORSCH', translation: 'Borscht' },
    { id: 'e131', cyrillic: 'КИТ', phonetic: 'KIT', translation: 'Whale' },
    { id: 'e132', cyrillic: 'КОНЬ', phonetic: 'KON\'', translation: 'Horse' },
    { id: 'e133', cyrillic: 'ТЕНЬ', phonetic: 'TEN\'', translation: 'Shadow' },
    { id: 'e134', cyrillic: 'ПЕНЬ', phonetic: 'PEN\'', translation: 'Stump' },
    { id: 'e135', cyrillic: 'ЛЕНЬ', phonetic: 'LEN\'', translation: 'Laziness' },
    { id: 'e136', cyrillic: 'ОГОНЬ', phonetic: 'OGON\'', translation: 'Fire' },
    { id: 'e137', cyrillic: 'УГОЛЬ', phonetic: 'UGOL\'', translation: 'Coal' },
    { id: 'e138', cyrillic: 'МЫШЬ', phonetic: 'MYSH\'', translation: 'Mouse' },
    { id: 'e139', cyrillic: 'ТИШЬ', phonetic: 'TISH\'', translation: 'Quiet' },
    { id: 'e140', cyrillic: 'ТУЧА', phonetic: 'TUCHA', translation: 'Cloud' },
    { id: 'e141', cyrillic: 'ДАЧА', phonetic: 'DACHA', translation: 'Summer house' },
    { id: 'e142', cyrillic: 'ЧАЩА', phonetic: 'CHASHCHA', translation: 'Thicket' },
    { id: 'e143', cyrillic: 'РОЩА', phonetic: 'ROSHCHA', translation: 'Grove' },
    { id: 'e144', cyrillic: 'КОЖА', phonetic: 'KOZHA', translation: 'Skin / Leather' },
    { id: 'e145', cyrillic: 'ЛУЖА', phonetic: 'LUZHA', translation: 'Puddle' },
    { id: 'e146', cyrillic: 'СТУЖА', phonetic: 'STUZHA', translation: 'Severe cold' },
    { id: 'e147', cyrillic: 'ДУША', phonetic: 'DUSHA', translation: 'Soul' },
    { id: 'e148', cyrillic: 'КИТАЙ', phonetic: 'KITAY', translation: 'China' },
    { id: 'e149', cyrillic: 'АЗИЯ', phonetic: 'AZIYA', translation: 'Asia' },
    { id: 'e150', cyrillic: 'ЗОНА', phonetic: 'ZONA', translation: 'Zone' },
    { id: 'e151', cyrillic: 'РОЗА', phonetic: 'ROZA', translation: 'Rose' },
    { id: 'e152', cyrillic: 'ВАЗА', phonetic: 'VAZA', translation: 'Vase' },
    { id: 'e153', cyrillic: 'КОЗА', phonetic: 'KOZA', translation: 'Goat' },
    { id: 'e154', cyrillic: 'ЛОЗА', phonetic: 'LOZA', translation: 'Vine' },
    { id: 'e155', cyrillic: 'СЛЕЗА', phonetic: 'SLEZA', translation: 'Tear' },
    { id: 'e156', cyrillic: 'БЕРЕЗА', phonetic: 'BEREZA', translation: 'Birch tree' },
    { id: 'e157', cyrillic: 'ТРАВА', phonetic: 'TRAVA', translation: 'Grass' },
    { id: 'e158', cyrillic: 'ДРОВА', phonetic: 'DROVA', translation: 'Firewood' },
    { id: 'e159', cyrillic: 'СЛАВА', phonetic: 'SLAVA', translation: 'Glory' },
    { id: 'e160', cyrillic: 'ГЛАВА', phonetic: 'GLAVA', translation: 'Chapter' },
    { id: 'e161', cyrillic: 'ТЬМА', phonetic: 'T\'MA', translation: 'Darkness' },
    { id: 'e162', cyrillic: 'ДОМА', phonetic: 'DOMA', translation: 'At home' },
    { id: 'e163', cyrillic: 'ТЕМА', phonetic: 'TEMA', translation: 'Topic' },
    { id: 'e164', cyrillic: 'СХЕМА', phonetic: 'SKHEMA', translation: 'Diagram' },
    { id: 'e165', cyrillic: 'ПОЭМА', phonetic: 'POEMA', translation: 'Poem' },
    { id: 'e166', cyrillic: 'СИСТЕМА', phonetic: 'SISTEMA', translation: 'System' },
    { id: 'e167', cyrillic: 'ПЛАНЕТА', phonetic: 'PLANETA', translation: 'Planet' },
    { id: 'e168', cyrillic: 'КОМЕТА', phonetic: 'KOMETA', translation: 'Comet' },
    { id: 'e169', cyrillic: 'РАКЕТА', phonetic: 'RAKETA', translation: 'Rocket' },
    { id: 'e170', cyrillic: 'КАРТА', phonetic: 'KARTA', translation: 'Map' },
    { id: 'e171', cyrillic: 'ПАРТА', phonetic: 'PARTA', translation: 'Desk' },
    { id: 'e172', cyrillic: 'МАРТ', phonetic: 'MART', translation: 'March' },
    { id: 'e173', cyrillic: 'АПРЕЛЬ', phonetic: 'APREL\'', translation: 'April' },
    { id: 'e174', cyrillic: 'ИЮНЬ', phonetic: 'IYUN\'', translation: 'June' },
    { id: 'e175', cyrillic: 'ИЮЛЬ', phonetic: 'IYUL\'', translation: 'July' },
    { id: 'e176', cyrillic: 'АВГУСТ', phonetic: 'AVGUST', translation: 'August' },
    { id: 'e177', cyrillic: 'СВЕТ', phonetic: 'SVET', translation: 'Light' },
    { id: 'e178', cyrillic: 'ЦВЕТ', phonetic: 'TSVET', translation: 'Color' },
    { id: 'e179', cyrillic: 'ОТВЕТ', phonetic: 'OTVET', translation: 'Answer' },
    { id: 'e180', cyrillic: 'СОВЕТ', phonetic: 'SOVET', translation: 'Advice' },
    { id: 'e181', cyrillic: 'ОБЕД', phonetic: 'OBED', translation: 'Lunch' },
    { id: 'e182', cyrillic: 'СОСЕД', phonetic: 'SOSED', translation: 'Neighbor' },
    { id: 'e183', cyrillic: 'ОБЕД', phonetic: 'OBED', translation: 'Meal' },
    { id: 'e184', cyrillic: 'ПАРА', phonetic: 'PARA', translation: 'Pair' },
    { id: 'e185', cyrillic: 'ФАРА', phonetic: 'FARA', translation: 'Headlight' },
    { id: 'e186', cyrillic: 'ТАРА', phonetic: 'TARA', translation: 'Packaging' },
    { id: 'e187', cyrillic: 'КАРА', phonetic: 'KARA', translation: 'Punishment' },
    { id: 'e188', cyrillic: 'МА-ЛО', phonetic: 'MA-LO', translation: 'Little' },
    { id: 'e189', cyrillic: 'МНО-ГО', phonetic: 'MNO-GO', translation: 'Much' },
    { id: 'e190', cyrillic: 'РА-НО', phonetic: 'RA-NO', translation: 'Early' },
    { id: 'e191', cyrillic: 'ПОЗД-НО', phonetic: 'POZD-NO', translation: 'Late' },
    { id: 'e192', cyrillic: 'ТЕМ-НО', phonetic: 'TEM-NO', translation: 'Dark' },
    { id: 'e193', cyrillic: 'ТЕП-ЛО', phonetic: 'TEP-LO', translation: 'Warm' },
    { id: 'e194', cyrillic: 'ХО-ЛОД', phonetic: 'KHO-LOD', translation: 'Cold' },
    { id: 'e195', cyrillic: 'ЖА-РА', phonetic: 'ZHA-RA', translation: 'Heat' },
    { id: 'e196', cyrillic: 'ТЫ', phonetic: 'TY', translation: 'You' },
    { id: 'e197', cyrillic: 'ОН', phonetic: 'ON', translation: 'He' },
    { id: 'e198', cyrillic: 'О-НА', phonetic: 'O-NA', translation: 'She' },
    { id: 'e199', cyrillic: 'О-НО', phonetic: 'O-NO', translation: 'It' },
    { id: 'e200', cyrillic: 'О-НИ', phonetic: 'O-NI', translation: 'They' }
  ],
  medium: [
      {"id":"m51","cyrillic":"ВЕС-НА","phonetic":"VES-NA","translation":"Spring"},
      {"id":"m52","cyrillic":"ГО-РОД","phonetic":"GO-ROD","translation":"City"},
      {"id":"m53","cyrillic":"У-ЛИ-ЦА","phonetic":"U-LI-TSA","translation":"Street"},
      {"id":"m54","cyrillic":"ПТИ-ЦА","phonetic":"PTI-TSA","translation":"Bird"},
      {"id":"m55","cyrillic":"ДЕ-РЕ-ВО","phonetic":"DE-RE-VO","translation":"Tree"},
      {"id":"m56","cyrillic":"СОЛН-ЦЕ","phonetic":"SOLN-TSE","translation":"Sun"},
      {"id":"m57","cyrillic":"СЕМЬ-Я","phonetic":"SEM'-YA","translation":"Family"},
      {"id":"m58","cyrillic":"ДРУЖ-БА","phonetic":"DRUZH-BA","translation":"Friendship"},
      {"id":"m59","cyrillic":"СОЛ-НЕЧ-НО","phonetic":"SOL-NECH-NO","translation":"Sunny"},
      {"id":"m60","cyrillic":"ДОЖ-ДЛИ-ВО","phonetic":"DOZH-DLI-VO","translation":"Rainy"},
      {"id":"m61","cyrillic":"ОБ-ЛА-КО","phonetic":"OB-LA-KO","translation":"Cloud"},
      {"id":"m62","cyrillic":"МЕ-ТЕЛЬ","phonetic":"ME-TEL'","translation":"Blizzard"},
      {"id":"m63","cyrillic":"У-ЧЕ-НИК","phonetic":"U-CHE-NIK","translation":"Student"},
      {"id":"m64","cyrillic":"У-ЧИ-ТЕЛЬ","phonetic":"U-CHI-TEL'","translation":"Teacher"},
      {"id":"m65","cyrillic":"БУК-ВА","phonetic":"BUK-VA","translation":"Letter"},
      {"id":"m66","cyrillic":"АЛ-ФА-ВИТ","phonetic":"AL-FA-VIT","translation":"Alphabet"},
      {"id":"m67","cyrillic":"МУ-ЗЫ-КА","phonetic":"MU-ZY-KA","translation":"Music"},
      {"id":"m68","cyrillic":"ТЕ-АТР","phonetic":"TE-ATR","translation":"Theater"},
      {"id":"m69","cyrillic":"БИБ-ЛИ-О-ТЕ-КА","phonetic":"BIB-LI-O-TE-KA","translation":"Library"},
      {"id":"m70","cyrillic":"АВ-ТО-БУС","phonetic":"AV-TO-BUS","translation":"Bus"},
      {"id":"m71","cyrillic":"ПО-ЕЗД","phonetic":"PO-YEZD","translation":"Train"},
      {"id":"m72","cyrillic":"СА-МО-ЛЁТ","phonetic":"SA-MO-LYOT","translation":"Airplane"},
      {"id":"m73","cyrillic":"ВОЗ-ДУХ","phonetic":"VOZ-DUKH","translation":"Air"},
      {"id":"m74","cyrillic":"ЗЕМ-ЛЯ","phonetic":"ZEM-LYA","translation":"Earth / Land"},
      {"id":"m75","cyrillic":"КО-РАБЛЬ","phonetic":"KO-RABL'","translation":"Ship"},
      {"id":"m76","cyrillic":"МЕ-СЯЦ","phonetic":"ME-SYATS","translation":"Month / Moon"},
      {"id":"m77","cyrillic":"ЗВЁЗ-ДОЧ-КА","phonetic":"ZVOZ-DOCH-KA","translation":"Little star"},
      {"id":"m78","cyrillic":"ПТИЧ-КА","phonetic":"PTICH-KA","translation":"Little bird"},
      {"id":"m79","cyrillic":"БЕ-РЁ-ЗА","phonetic":"BE-RYO-ZA","translation":"Birch"},
      {"id":"m80","cyrillic":"КЛЁН","phonetic":"KLYON","translation":"Maple"},
      {"id":"m81","cyrillic":"ЦВЕ-ТОК","phonetic":"TSVE-TOK","translation":"Flower"},
      {"id":"m82","cyrillic":"Я-ГО-ДА","phonetic":"YA-GO-DA","translation":"Berry"},
      {"id":"m83","cyrillic":"ЯБ-ЛО-КО","phonetic":"YAB-LO-KO","translation":"Apple"},
      {"id":"m84","cyrillic":"ГРУ-ША","phonetic":"GRU-SHA","translation":"Pear"},
      {"id":"m85","cyrillic":"О-ГУ-РЕЦ","phonetic":"O-GU-RETS","translation":"Cucumber"},
      {"id":"m86","cyrillic":"ПО-МИ-ДОР","phonetic":"PO-MI-DOR","translation":"Tomato"},
      {"id":"m87","cyrillic":"МОР-КОВЬ","phonetic":"MOR-KOV'","translation":"Carrot"},
      {"id":"m88","cyrillic":"КАР-ТО-ФЕЛЬ","phonetic":"KAR-TO-FEL'","translation":"Potato"},
      {"id":"m89","cyrillic":"КА-ПУ-СТА","phonetic":"KA-PU-STA","translation":"Cabbage"},
      {"id":"m90","cyrillic":"ЛУ-КОВ-КА","phonetic":"LU-KOV-KA","translation":"Little onion"},
      {"id":"m91","cyrillic":"ЧЕС-НОК","phonetic":"CHES-NOK","translation":"Garlic"},
      {"id":"m92","cyrillic":"АР-БУЗ","phonetic":"AR-BUZ","translation":"Watermelon"},
      {"id":"m93","cyrillic":"ДЫ-НЯ","phonetic":"DY-NYA","translation":"Melon"},
      {"id":"m94","cyrillic":"ЛИ-МОН","phonetic":"LI-MON","translation":"Lemon"},
      {"id":"m95","cyrillic":"А-ПЕЛЬ-СИН","phonetic":"A-PEL'-SIN","translation":"Orange"},
      {"id":"m96","cyrillic":"МАН-ДА-РИН","phonetic":"MAN-DA-RIN","translation":"Mandarin"},
      {"id":"m97","cyrillic":"ПЕР-СИК","phonetic":"PER-SIK","translation":"Peach"},
      {"id":"m98","cyrillic":"СЛИ-ВА","phonetic":"SLI-VA","translation":"Plum"},
      {"id":"m99","cyrillic":"ВИШ-НЯ","phonetic":"VISH-NYA","translation":"Cherry"},
      {"id":"m100","cyrillic":"ЧЕ-РЕШ-НЯ","phonetic":"CHE-RESH-NYA","translation":"Sweet cherry"},

    { id: 'm1', cyrillic: 'ВО-ДА', phonetic: 'VO-DA', translation: 'Water' },
    { id: 'm2', cyrillic: 'ГО-РОД', phonetic: 'GO-ROD', translation: 'City' },
    { id: 'm3', cyrillic: 'АП-ТЕ-КА', phonetic: 'AP-TE-KA', translation: 'Pharmacy' },
    { id: 'm4', cyrillic: 'ШКО-ЛА', phonetic: 'SHKO-LA', translation: 'School' },
    { id: 'm5', cyrillic: 'МО-ЛО-КО', phonetic: 'MO-LO-KO', translation: 'Milk' },
    { id: 'm6', cyrillic: 'О-ЗЕ-РО', phonetic: "O-ZE-RO", translation: 'Lake' },
    { id: 'm7', cyrillic: 'ЛИ-МОН', phonetic: 'LI-MON', translation: 'Lemon' },
    { id: 'm8', cyrillic: 'СОЛН-ЦЕ', phonetic: 'SOLN-TSE', translation: 'Sun' },
    { id: 'm9', cyrillic: 'ЛЕС', phonetic: "LES", translation: 'Forest' },
    { id: 'm10', cyrillic: 'ПТИ-ЦА', phonetic: "PTI-TSA", translation: 'Bird' },
    { id: 'm11', cyrillic: 'БА-НАН', phonetic: 'BA-NAN', translation: 'Banana' },
    { id: 'm12', cyrillic: 'ПИ-ЦЦА', phonetic: 'PIT-SA', translation: 'Pizza' },
    { id: 'm13', cyrillic: 'ЛАМ-ПА', phonetic: 'LAM-PA', translation: 'Lamp' },
    { id: 'm14', cyrillic: 'ПО-ЕЗД', phonetic: 'PO-YEZD', translation: 'Train' },
    { id: 'm15', cyrillic: 'ЛОД-КА', phonetic: 'LOD-KA', translation: 'Boat' },
    { id: 'm16', cyrillic: 'ЦВЕ-ТОК', phonetic: "TSVE-TOK", translation: 'Flower' },
    { id: 'm17', cyrillic: 'МУ-ЗЫ-КА', phonetic: 'MU-ZY-KA', translation: 'Music' },
    { id: 'm18', cyrillic: 'ПИ-СЬ-МО', phonetic: 'PIS\'-MO', translation: 'Letter' },
    { id: 'm19', cyrillic: 'КА-МЕНЬ', phonetic: "KA-MEN'", translation: 'Stone' },
    { id: 'm20', cyrillic: 'ПЕ-СОК', phonetic: "PE-SOK", translation: 'Sand' },
    { id: 'm21', cyrillic: 'ВЕ-ТЕР', phonetic: "VE-TER", translation: 'Wind' },
    { id: 'm22', cyrillic: 'ШАП-КА', phonetic: 'SHAP-KA', translation: 'Hat' },
    { id: 'm23', cyrillic: 'НО-СОК', phonetic: 'NO-SOK', translation: 'Sock' },
    { id: 'm24', cyrillic: 'О-БУВЬ', phonetic: 'O-BUV\'', translation: 'Footwear' },
    { id: 'm25', cyrillic: 'ДВЕРЬ', phonetic: 'DVER\'', translation: 'Door' },
    { id: 'm26', cyrillic: 'СТЕН-КА', phonetic: 'STEN-KA', translation: 'Wall' },
    { id: 'm27', cyrillic: 'О-БЛА-КО', phonetic: "O-BLA-KO", translation: 'Cloud' },
    { id: 'm28', cyrillic: 'ЛУ-НА', phonetic: "LU-NA", translation: 'Moon' },
    { id: 'm29', cyrillic: 'ЗВЕЗ-ДА', phonetic: "ZVEZ-DA", translation: 'Star' },
    { id: 'm30', cyrillic: 'ДОЖДЬ', phonetic: "DOZHD'", translation: 'Rain' },
    { id: 'm31', cyrillic: 'ГРО-ЗА', phonetic: "GRO-ZA", translation: 'Storm' },
    { id: 'm32', cyrillic: 'МАС-ЛО', phonetic: 'MAS-LO', translation: 'Butter / Oil' },
    { id: 'm33', cyrillic: 'СНЕ-ЖИН-КА', phonetic: "SNE-ZHIN-KA", translation: 'Snowflake' },
    { id: 'm34', cyrillic: 'ЛЁД', phonetic: "LYOD", translation: 'Ice' },
    { id: 'm35', cyrillic: 'РИС', phonetic: 'RIS', translation: 'Rice' },
    { id: 'm36', cyrillic: 'О-ГОНЬ', phonetic: "O-GON'", translation: 'Fire' },
    { id: 'm37', cyrillic: 'О-ГУ-РЕЦ', phonetic: 'O-GU-RETS', translation: 'Cucumber' },
    { id: 'm38', cyrillic: 'ТО-МАТ', phonetic: 'TO-MAT', translation: 'Tomato' },
    { id: 'm39', cyrillic: 'ГРИБ', phonetic: 'GRIB', translation: 'Mushroom' },
    { id: 'm40', cyrillic: 'ЯБ-ЛО-КО', phonetic: 'YAB-LO-KO', translation: 'Apple' },
    { id: 'm41', cyrillic: 'ГРУ-ША', phonetic: 'GRU-SHA', translation: 'Pear' },
    { id: 'm42', cyrillic: 'СЛИ-ВА', phonetic: 'SLI-VA', translation: 'Plum' },
    { id: 'm43', cyrillic: 'А-ПЕЛЬ-СИН', phonetic: 'A-PEL\'-SIN', translation: 'Orange' },
    { id: 'm44', cyrillic: 'ДЫМ', phonetic: "DYM", translation: 'Smoke' },
    { id: 'm45', cyrillic: 'ТОРТ', phonetic: 'TORT', translation: 'Cake' },
    { id: 'm46', cyrillic: 'КЕКС', phonetic: 'KEKS', translation: 'Muffin' },
    { id: 'm47', cyrillic: 'ПИ-РОГ', phonetic: 'PI-ROG', translation: 'Pie' },
    { id: 'm48', cyrillic: 'ЗЕМ-ЛЯ', phonetic: "ZEM-LYA", translation: 'Earth' },
    { id: 'm49', cyrillic: 'ЧАЙ-НИК', phonetic: 'CHAY-NIK', translation: 'Teapot' },
    { id: 'm50', cyrillic: 'ПУТЬ', phonetic: 'PUT\'', translation: 'Path / Way' },
    { id: 'm51', cyrillic: 'ТРА-ВА', phonetic: "TRA-VA", translation: 'Grass' },
    { id: 'm52', cyrillic: 'ВЕС-НА', phonetic: 'VES-NA', translation: 'Spring' },
    { id: 'm53', cyrillic: 'ДЕ-РЕ-ВО', phonetic: "DE-RE-VO", translation: 'Tree' },
    { id: 'm54', cyrillic: 'О-СЕНЬ', phonetic: 'O-SEN\'', translation: 'Autumn' },
    { id: 'm55', cyrillic: 'ЛИСТ', phonetic: "LIST", translation: 'Leaf' },
    { id: 'm56', cyrillic: 'ДЕНЬ', phonetic: 'DEN\'', translation: 'Day' },
    { id: 'm57', cyrillic: 'ВЕ-ЧЕР', phonetic: 'VE-CHER', translation: 'Evening' },
    { id: 'm58', cyrillic: 'НОЧЬ', phonetic: 'NOCH\'', translation: 'Night' },
    { id: 'm59', cyrillic: 'КО-РЕНЬ', phonetic: "KO-REN'", translation: 'Root' },
    { id: 'm60', cyrillic: 'ДОЖДЬ', phonetic: 'DOSHD\'', translation: 'Rain' },
    { id: 'm61', cyrillic: 'ГРИБ', phonetic: "GRIB", translation: 'Mushroom' },
    { id: 'm62', cyrillic: 'Я-ГО-ДА', phonetic: "YA-GO-DA", translation: 'Berry' },
    { id: 'm63', cyrillic: 'Я-БЛО-КО', phonetic: "YA-BLO-KO", translation: 'Apple' },
    { id: 'm64', cyrillic: 'ГРУ-ША', phonetic: "GRU-SHA", translation: 'Pear' },
    { id: 'm65', cyrillic: 'СЛИ-ВА', phonetic: "SLI-VA", translation: 'Plum' },
    { id: 'm66', cyrillic: 'МЕ-СЯЦ', phonetic: 'ME-SYATS', translation: 'Month' },
    { id: 'm67', cyrillic: 'ВИШ-НЯ', phonetic: "VISH-NYA", translation: 'Cherry' },
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
    { id: 'm80', cyrillic: 'МА-ЛИ-НА', phonetic: "MA-LI-NA", translation: 'Raspberry' },
    { id: 'm81', cyrillic: 'МЕ-СТО', phonetic: 'ME-STO', translation: 'Place' },
    { id: 'm82', cyrillic: 'СЛО-ВО', phonetic: 'SLO-VO', translation: 'Word' },
    { id: 'm83', cyrillic: 'ГО-ЛОС', phonetic: 'GO-LOS', translation: 'Voice' },
    { id: 'm84', cyrillic: 'КА-ПУС-ТА', phonetic: "KA-PUS-TA", translation: 'Cabbage' },
    { id: 'm85', cyrillic: 'МОР-КОВЬ', phonetic: "MOR-KOV'", translation: 'Carrot' },
    { id: 'm86', cyrillic: 'ЛУК', phonetic: "LUK", translation: 'Onion' },
    { id: 'm87', cyrillic: 'ЧЕС-НОК', phonetic: "CHES-NOK", translation: 'Garlic' },
    { id: 'm88', cyrillic: 'ЛИ-ЦО', phonetic: 'LI-TSO', translation: 'Face' },
    { id: 'm89', cyrillic: 'Я-ЗЫК', phonetic: 'YA-ZYK', translation: 'Language / Tongue' },
    { id: 'm90', cyrillic: 'ПЕ-СНЯ', phonetic: 'PE-SNYA', translation: 'Song' },
    { id: 'm91', cyrillic: 'ТА-НЕЦ', phonetic: 'TA-NETS', translation: 'Dance' },
    { id: 'm92', cyrillic: 'И-ГРА', phonetic: 'I-GRA', translation: 'Game' },
    { id: 'm93', cyrillic: 'КАР-ТО-ФЕЛЬ', phonetic: "KAR-TO-FEL'", translation: 'Potato' },
    { id: 'm94', cyrillic: 'ПО-МИ-ДОР', phonetic: "PO-MI-DOR", translation: 'Tomato' },
    { id: 'm95', cyrillic: 'СЕ-СТРА', phonetic: 'SE-STRA', translation: 'Sister' },
    { id: 'm96', cyrillic: 'ДЯ-ДЯ', phonetic: 'DYA-DYA', translation: 'Uncle' },
    { id: 'm97', cyrillic: 'ТЁ-ТЯ', phonetic: 'TYO-TYA', translation: 'Aunt' },
    { id: 'm98', cyrillic: 'О-ТЕЦ', phonetic: 'O-TETS', translation: 'Father' },
    { id: 'm99', cyrillic: 'МА-ТЬ', phonetic: 'MAT\'', translation: 'Mother' },
    { id: 'm100', cyrillic: 'О-ГУ-РЕЦ', phonetic: "O-GU-RETS", translation: 'Cucumber' },
    // 100 NEW MEDIUM EXAMPLES (m101 - m200)
    { id: 'm101', cyrillic: 'ПО-ГО-ДА', phonetic: 'PO-GO-DA', translation: 'Weather' },
    { id: 'm102', cyrillic: 'ПРИ-РО-ДА', phonetic: 'PRI-RO-DA', translation: 'Nature' },
    { id: 'm103', cyrillic: 'СВО-БО-ДА', phonetic: 'SVO-BO-DA', translation: 'Freedom' },
    { id: 'm104', cyrillic: 'ПО-БЕ-ДА', phonetic: 'PO-BE-DA', translation: 'Victory' },
    { id: 'm105', cyrillic: 'ЗА-ЩИ-ТА', phonetic: 'ZA-SHCHI-TA', translation: 'Protection' },
    { id: 'm106', cyrillic: 'РА-БО-ТА', phonetic: 'RA-BO-TA', translation: 'Work' },
    { id: 'm107', cyrillic: 'ЗА-БО-ТА', phonetic: 'ZA-BO-TA', translation: 'Care' },
    { id: 'm108', cyrillic: 'О-ХО-ТА', phonetic: 'O-KHO-TA', translation: 'Hunting' },
    { id: 'm109', cyrillic: 'СУБ-БО-ТА', phonetic: 'SUB-BO-TA', translation: 'Saturday' },
    { id: 'm110', cyrillic: 'О-ПЛА-ТА', phonetic: 'O-PLA-TA', translation: 'Payment' },
    { id: 'm111', cyrillic: 'ПА-ЛА-ТА', phonetic: 'PA-LA-TA', translation: 'Chamber' },
    { id: 'm112', cyrillic: 'МО-НЕ-ТА', phonetic: 'MO-NE-TA', translation: 'Coin' },
    { id: 'm113', cyrillic: 'ГА-ЗЕ-ТА', phonetic: 'GA-ZE-TA', translation: 'Newspaper' },
    { id: 'm114', cyrillic: 'КОН-ФЕ-ТА', phonetic: 'KON-FE-TA', translation: 'Candy' },
    { id: 'm115', cyrillic: 'КА-РЕ-ТА', phonetic: 'KA-RE-TA', translation: 'Carriage' },
    { id: 'm116', cyrillic: 'ПО-Э-ЗИ-Я', phonetic: 'PO-E-ZI-YA', translation: 'Poetry' },
    { id: 'm117', cyrillic: 'ТЕ-О-РИ-Я', phonetic: 'TE-O-RI-YA', translation: 'Theory' },
    { id: 'm118', cyrillic: 'И-СТО-РИ-Я', phonetic: 'I-STO-RI-YA', translation: 'History' },
    { id: 'm119', cyrillic: 'Э-НЕР-ГИ-Я', phonetic: 'E-NER-GI-YA', translation: 'Energy' },
    { id: 'm120', cyrillic: 'АР-МИ-Я', phonetic: 'AR-MI-YA', translation: 'Army' },
    { id: 'm121', cyrillic: 'ЛИ-НИ-Я', phonetic: 'LI-NI-YA', translation: 'Line' },
    { id: 'm122', cyrillic: 'СЕ-РИ-Я', phonetic: 'SE-RI-YA', translation: 'Series' },
    { id: 'm123', cyrillic: 'МА-ГИ-Я', phonetic: 'MA-GI-YA', translation: 'Magic' },
    { id: 'm124', cyrillic: 'ХИ-МИ-Я', phonetic: 'KHI-MI-YA', translation: 'Chemistry' },
    { id: 'm125', cyrillic: 'ФИ-ЗИ-КА', phonetic: 'FI-ZI-KA', translation: 'Physics' },
    { id: 'm126', cyrillic: 'ЛО-ГИ-КА', phonetic: 'LO-GI-KA', translation: 'Logic' },
    { id: 'm127', cyrillic: 'ОП-ТИ-КА', phonetic: 'OP-TI-KA', translation: 'Optics' },
    { id: 'm128', cyrillic: 'ПО-ЛИ-ТИ-КА', phonetic: 'PO-LI-TI-KA', translation: 'Politics' },
    { id: 'm129', cyrillic: 'ТАК-ТИ-КА', phonetic: 'TAK-TI-KA', translation: 'Tactics' },
    { id: 'm130', cyrillic: 'ТЕХ-НИ-КА', phonetic: 'TEKH-NI-KA', translation: 'Technique' },
    { id: 'm131', cyrillic: 'КРИ-ТИ-КА', phonetic: 'KRI-TI-KA', translation: 'Criticism' },
    { id: 'm132', cyrillic: 'ПРАК-ТИ-КА', phonetic: 'PRAK-TI-KA', translation: 'Practice' },
    { id: 'm133', cyrillic: 'Э-ТИ-КА', phonetic: 'E-TI-KA', translation: 'Ethics' },
    { id: 'm134', cyrillic: 'А-КУ-СТИ-КА', phonetic: 'A-KU-STI-KA', translation: 'Acoustics' },
    { id: 'm135', cyrillic: 'ПО-Э-ЗИ-Я', phonetic: 'PO-E-ZI-YA', translation: 'Verse' },
    { id: 'm136', cyrillic: 'СУДЬ-БА', phonetic: 'SUD\'-BA', translation: 'Fate' },
    { id: 'm137', cyrillic: 'БОРЬ-БА', phonetic: 'BOR\'-BA', translation: 'Struggle' },
    { id: 'm138', cyrillic: 'СЛУЖ-БА', phonetic: 'SLUZH-BA', translation: 'Service' },
    { id: 'm139', cyrillic: 'У-САДЬ-БА', phonetic: 'U-SAD\'-BA', translation: 'Estate' },
    { id: 'm140', cyrillic: 'СВАДЬ-БА', phonetic: 'SVAD\'-BA', translation: 'Wedding' },
    { id: 'm141', cyrillic: 'ПРО-ШЬ-БА', phonetic: 'PROSH-BA', translation: 'Request' },
    { id: 'm142', cyrillic: 'ХОДЬ-БА', phonetic: 'KHOD\'-BA', translation: 'Walking' },
    { id: 'm143', cyrillic: 'СТРЕЛЬ-БА', phonetic: 'STREL\'-BA', translation: 'Shooting' },
    { id: 'm144', cyrillic: 'У-ЧЕ-БА', phonetic: 'U-CHE-BA', translation: 'Studies' },
    { id: 'm145', cyrillic: 'СУДЬ-Я', phonetic: 'SUD\'-YA', translation: 'Judge' },
    { id: 'm146', cyrillic: 'ЛА-ДЬЯ', phonetic: 'LA-D\'YA', translation: 'Rook / Boat' },
    { id: 'm147', cyrillic: 'СТАТЬ-Я', phonetic: 'STAT\'-YA', translation: 'Article' },
    { id: 'm148', cyrillic: 'ПЛА-ТЬЕ', phonetic: 'PLA-T\'YE', translation: 'Dress' },
    { id: 'm149', cyrillic: 'ЖИ-ЛЬЕ', phonetic: 'ZHI-L\'YE', translation: 'Housing' },
    { id: 'm150', cyrillic: 'БЕ-ЛЬЕ', phonetic: 'BE-L\'YE', translation: 'Linen' },
    { id: 'm151', cyrillic: 'КО-ПЬЕ', phonetic: 'KO-P\'YE', translation: 'Spear' },
    { id: 'm152', cyrillic: 'ПЕР-ЬЯ', phonetic: 'PER\'-YA', translation: 'Feathers' },
    { id: 'm153', cyrillic: 'КРЫ-ЛЬЯ', phonetic: 'KRY-L\'YA', translation: 'Wings' },
    { id: 'm154', cyrillic: 'БРА-ТЬЯ', phonetic: 'BRA-T\'YA', translation: 'Brothers' },
    { id: 'm155', cyrillic: 'ЛИ-СТЬЯ', phonetic: 'LI-ST\'YA', translation: 'Leaves' },
    { id: 'm156', cyrillic: 'ДЕР-ЕВ-ЬЯ', phonetic: 'DER-EV-YA', translation: 'Trees' },
    { id: 'm157', cyrillic: 'ДРУ-ЗЬЯ', phonetic: 'DRU-Z\'YA', translation: 'Friends' },
    { id: 'm158', cyrillic: 'СУ-ДЬИ', phonetic: 'SU-D\'I', translation: 'Judges' },
    { id: 'm159', cyrillic: 'КНЯ-ЗЬЯ', phonetic: 'KNYA-Z\'YA', translation: 'Princes' },
    { id: 'm160', cyrillic: 'ГО-СТЬЯ', phonetic: 'GO-ST\'YA', translation: 'Guest (female)' },
    { id: 'm161', cyrillic: 'ЗДОР-ОВ-ЬЕ', phonetic: 'ZDOR-OV-YE', translation: 'Health' },
    { id: 'm162', cyrillic: 'ПРИ-МЕР', phonetic: 'PRI-MER', translation: 'Example' },
    { id: 'm163', cyrillic: 'РАЗ-МЕР', phonetic: 'RAZ-MER', translation: 'Size' },
    { id: 'm164', cyrillic: 'ОБ-МЕН', phonetic: 'OB-MEN', translation: 'Exchange' },
    { id: 'm165', cyrillic: 'ОБ-МАН', phonetic: 'OB-MAN', translation: 'Deception' },
    { id: 'm166', cyrillic: 'ТУ-МАН', phonetic: 'TU-MAN', translation: 'Fog' },
    { id: 'm167', cyrillic: 'О-КЕ-АН', phonetic: 'O-KE-AN', translation: 'Ocean' },
    { id: 'm168', cyrillic: 'ВУЛ-КАН', phonetic: 'VUL-KAN', translation: 'Volcano' },
    { id: 'm169', cyrillic: 'ФОН-ТАН', phonetic: 'FON-TAN', translation: 'Fountain' },
    { id: 'm170', cyrillic: 'Э-КРАН', phonetic: 'E-KRAN', translation: 'Screen' },
    { id: 'm171', cyrillic: 'ОР-ГАН', phonetic: 'OR-GAN', translation: 'Organ' },
    { id: 'm172', cyrillic: 'ДИ-ВАН', phonetic: 'DI-VAN', translation: 'Sofa' },
    { id: 'm173', cyrillic: 'СТА-КАН', phonetic: 'STA-KAN', translation: 'Glass' },
    { id: 'm174', cyrillic: 'КАР-МАН', phonetic: 'KAR-MAN', translation: 'Pocket' },
    { id: 'm175', cyrillic: 'ЧЕ-МО-ДАН', phonetic: 'CHE-MO-DAN', translation: 'Suitcase' },
    { id: 'm176', cyrillic: 'КА-ПИ-ТАН', phonetic: 'KA-PI-TAN', translation: 'Captain' },
    { id: 'm177', cyrillic: 'У-РА-ГАН', phonetic: 'U-RA-GAN', translation: 'Hurricane' },
    { id: 'm178', cyrillic: 'ВЕ-ТЕ-РАН', phonetic: 'VE-TE-RAN', translation: 'Veteran' },
    { id: 'm179', cyrillic: 'РЕ-ГИ-ОН', phonetic: 'RE-GI-ON', translation: 'Region' },
    { id: 'm180', cyrillic: 'СЕ-ЗОН', phonetic: 'SE-ZON', translation: 'Season' },
    { id: 'm181', cyrillic: 'СА-ЛОН', phonetic: 'SA-LON', translation: 'Salon' },
    { id: 'm182', cyrillic: 'ВА-ГОН', phonetic: 'VA-GON', translation: 'Wagon / Car' },
    { id: 'm183', cyrillic: 'БА-ЛОН', phonetic: 'BA-LON', translation: 'Cylinder' },
    { id: 'm184', cyrillic: 'РА-ЙОН', phonetic: 'RA-YON', translation: 'District' },
    { id: 'm185', cyrillic: 'БЕТ-ОН', phonetic: 'BET-ON', translation: 'Concrete' },
    { id: 'm186', cyrillic: 'БУ-ЛЬОН', phonetic: 'BU-L\'YON', translation: 'Broth' },
    { id: 'm187', cyrillic: 'КАН-ЬОН', phonetic: 'KAN-YON', translation: 'Canyon' },
    { id: 'm188', cyrillic: 'ЧЕМ-ПИ-ОН', phonetic: 'CHEM-PI-ON', translation: 'Champion' },
    { id: 'm189', cyrillic: 'СТА-ДИ-ОН', phonetic: 'STA-DI-ON', translation: 'Stadium' },
    { id: 'm190', cyrillic: 'МИЛ-ЛИ-ОН', phonetic: 'MIL-LI-ON', translation: 'Million' },
    { id: 'm191', cyrillic: 'БА-ТА-ЛЬОН', phonetic: 'BA-TA-L\'YON', translation: 'Battalion' },
    { id: 'm192', cyrillic: 'ПА-ВИ-ЛЬОН', phonetic: 'PA-VI-L\'YON', translation: 'Pavilion' },
    { id: 'm193', cyrillic: 'МЕД-А-ЛЬОН', phonetic: 'MED-A-L\'YON', translation: 'Locket' },
    { id: 'm194', cyrillic: 'ПО-ЧТА-ЛЬОН', phonetic: 'PO-CHTA-L\'YON', translation: 'Postman' },
    { id: 'm195', cyrillic: 'Э-ШЕ-ЛОН', phonetic: 'E-SHE-LON', translation: 'Echelon' },
    { id: 'm196', cyrillic: 'ОР-КЕСТР', phonetic: 'OR-KESTR', translation: 'Orchestra' },
    { id: 'm197', cyrillic: 'ТЕ-КСТ', phonetic: 'TE-KST', translation: 'Text' },
    { id: 'm198', cyrillic: 'ТЕСТ', phonetic: 'TEST', translation: 'Test' },
    { id: 'm199', cyrillic: 'ГЕ-РОЙ', phonetic: 'GE-ROY', translation: 'Hero' },
    { id: 'm200', cyrillic: 'ПРО-БОЙ', phonetic: 'PRO-BOY', translation: 'Breakthrough' }
  ],
  hard: [
    { id: 'h1', cyrillic: 'БА-БУШ-КА', phonetic: 'BA-BUSH-KA', translation: 'Grandmother' },
    { id: 'h2', cyrillic: 'РЕ-СТО-РАН', phonetic: 'RE-STO-RAN', translation: 'Restaurant' },
    { id: 'h3', cyrillic: 'ЗДРАВ-СТВУЙ-ТЕ', phonetic: 'ZDRAV-STVUY-TE', translation: 'Hello' },
    { id: 'h4', cyrillic: 'ОБЪ-ЕКТ', phonetic: "OB'YEKT", translation: 'Object' },
    { id: 'h5', cyrillic: 'СУБЪ-ЕКТ', phonetic: "SUB'YEKT", translation: 'Subject' },
    { id: 'h6', cyrillic: 'ПЕ-РЕЦ', phonetic: "PE-RETS", translation: 'Pepper' },
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
    { id: 'h97', cyrillic: 'СОЛЬ', phonetic: "SOL'", translation: 'Salt' },
    { id: 'h98', cyrillic: 'МАС-ЛО', phonetic: "MAS-LO", translation: 'Butter' },
    { id: 'h99', cyrillic: 'КОС-МОС', phonetic: 'KOS-MOS', translation: 'Space / Cosmos' },
    { id: 'h100', cyrillic: 'ГА-ЛАК-ТИ-КА', phonetic: 'GA-LAK-TI-KA', translation: 'Galaxy' },
    // 100 NEW HARD EXAMPLES (h101 - h200)
    { id: 'h101', cyrillic: 'ГО-СУ-ДАР-СТВЕН-НОСТЬ', phonetic: 'GOS-U-DAR-STVEN-NOST\'', translation: 'Statehood' },
    { id: 'h102', cyrillic: 'НЕ-ЗА-ВИ-СИ-МОСТЬ', phonetic: 'NE-ZA-VI-SI-MOST\'', translation: 'Independence' },
    { id: 'h103', cyrillic: 'О-ТВЕТ-СТВЕН-НОСТЬ', phonetic: 'O-TVET-STVEN-NOST\'', translation: 'Responsibility' },
    { id: 'h104', cyrillic: 'СПРА-ВЕД-ЛИ-ВОСТЬ', phonetic: 'SPRA-VED-LI-VOST\'', translation: 'Justice' },
    { id: 'h105', cyrillic: 'ДЕ-МО-КРА-ТИ-Я', phonetic: 'DE-MO-KRA-TI-YA', translation: 'Democracy' },
    { id: 'h106', cyrillic: 'ЦИ-ВИ-ЛИ-ЗА-ЦИ-Я', phonetic: 'TSI-VI-LI-ZA-TSI-YA', translation: 'Civilization' },
    { id: 'h107', cyrillic: 'Э-КО-НО-МИ-КА', phonetic: 'E-KO-NO-MI-KA', translation: 'Economy' },
    { id: 'h108', cyrillic: 'ПРО-МЫШ-ЛЕН-НОСТЬ', phonetic: 'PRO-MYSH-LEN-NOST\'', translation: 'Industry' },
    { id: 'h109', cyrillic: 'СЕЛЬ-СКО-Е ХО-ЗЯЙ-СТВО', phonetic: 'SEL\'-SKO-YE KHO-ZYAY-STVO', translation: 'Agriculture' },
    { id: 'h110', cyrillic: 'ЗА-КО-НО-ДА-ТЕЛЬ-СТВО', phonetic: 'ZA-KO-NO-DA-TEL\'-STVO', translation: 'Legislation' },
    { id: 'h111', cyrillic: 'СУ-ДО-ПРО-ИЗ-ВОД-СТВО', phonetic: 'SU-DO-PRO-IZ-VOD-STVO', translation: 'Legal proceedings' },
    { id: 'h112', cyrillic: 'ЗДРА-ВО-ОХ-РА-НЕ-НИ-Е', phonetic: 'ZDRA-VO-OKH-RA-NE-NI-YE', translation: 'Healthcare' },
    { id: 'h113', cyrillic: 'ОБ-РА-ЗО-ВА-НИ-Е', phonetic: 'OB-RA-ZO-VA-NI-YE', translation: 'Education' },
    { id: 'h114', cyrillic: 'ПРО-СВЕ-ЩЕ-НИ-Е', phonetic: 'PRO-SVE-SHCHE-NI-YE', translation: 'Enlightenment' },
    { id: 'h115', cyrillic: 'БЛА-ГО-У-СТРОЙ-СТВО', phonetic: 'BLA-GO-U-STROY-STVO', translation: 'Landscaping / Amenity' },
    { id: 'h116', cyrillic: 'ГРА-ДО-СТРО-И-ТЕЛЬ-СТВО', phonetic: 'GRA-DO-STRO-I-TEL\'-STVO', translation: 'Urban planning' },
    { id: 'h117', cyrillic: 'СЫР', phonetic: "SYR", translation: 'Cheese' },
    { id: 'h118', cyrillic: 'РЕ-КОН-СТРУК-ЦИ-Я', phonetic: 'RE-KON-STRUK-TSI-YA', translation: 'Reconstruction' },
    { id: 'h119', cyrillic: 'МО-ДЕР-НИ-ЗА-ЦИ-Я', phonetic: 'MO-DER-NI-ZA-TSI-YA', translation: 'Modernization' },
    { id: 'h120', cyrillic: 'О-ПТИ-МИ-ЗА-ЦИ-Я', phonetic: 'O-PTI-MI-ZA-TSI-YA', translation: 'Optimization' },
    { id: 'h121', cyrillic: 'АВ-ТО-МА-ТИ-ЗА-ЦИ-Я', phonetic: 'AV-TO-MA-TI-ZA-TSI-YA', translation: 'Automation' },
    { id: 'h122', cyrillic: 'РО-БО-ТО-ТЕХ-НИ-КА', phonetic: 'RO-BO-TO-TEKH-NI-KA', translation: 'Robotics' },
    { id: 'h123', cyrillic: 'КИ-БЕР-НЕ-ТИ-КА', phonetic: 'KI-BER-NE-TI-KA', translation: 'Cybernetics' },
    { id: 'h124', cyrillic: 'БИ-О-ТЕХ-НО-ЛО-ГИ-Я', phonetic: 'BI-O-TEKH-NO-LO-GI-YA', translation: 'Biotechnology' },
    { id: 'h125', cyrillic: 'НА-НО-ТЕХ-НО-ЛО-ГИ-Я', phonetic: 'NA-NO-TEKH-NO-LO-GI-YA', translation: 'Nanotechnology' },
    { id: 'h126', cyrillic: 'МИК-РО-Э-ЛЕК-ТРО-НИ-КА', phonetic: 'MIK-RO-E-LEK-TRO-NI-KA', translation: 'Microelectronics' },
    { id: 'h127', cyrillic: 'ТЕ-ЛЕ-КОМ-МУ-НИ-КА-ЦИ-Я', phonetic: 'TE-LE-KOM-MU-NI-KA-TSI-YA', translation: 'Telecommunication' },
    { id: 'h128', cyrillic: 'РА-ДИ-О-Э-ЛЕК-ТРО-НИ-КА', phonetic: 'RA-DI-O-E-LEK-TRO-NI-KA', translation: 'Radio electronics' },
    { id: 'h129', cyrillic: 'А-С-ТРО-ФИ-ЗИ-КА', phonetic: 'AS-TRO-FI-ZI-KA', translation: 'Astrophysics' },
    { id: 'h130', cyrillic: 'КОС-МО-НАВ-ТИ-КА', phonetic: 'KOS-MO-NAV-TI-KA', translation: 'Cosmonautics' },
    { id: 'h131', cyrillic: 'А-ВИ-А-ЦИ-Я', phonetic: 'A-VI-A-TSI-YA', translation: 'Aviation' },
    { id: 'h132', cyrillic: 'СУ-ДО-СТРО-Е-НИ-Е', phonetic: 'SU-DO-STRO-YE-NI-YE', translation: 'Shipbuilding' },
    { id: 'h133', cyrillic: 'МА-ШИ-НО-СТРО-Е-НИ-Е', phonetic: 'MA-SHI-NO-STRO-YE-NI-YE', translation: 'Mechanical engineering' },
    { id: 'h134', cyrillic: 'МЕ-ТАЛ-ЛУР-ГИ-Я', phonetic: 'ME-TAL-LUR-GI-YA', translation: 'Metallurgy' },
    { id: 'h135', cyrillic: 'Э-НЕР-ГЕ-ТИ-КА', phonetic: 'E-NER-GE-TI-KA', translation: 'Power engineering' },
    { id: 'h136', cyrillic: 'ГИ-ДРО-Э-НЕР-ГЕ-ТИ-КА', phonetic: 'GI-DRO-E-NER-GE-TI-KA', translation: 'Hydroelectric power' },
    { id: 'h137', cyrillic: 'А-ТОМ-НА-Я Э-НЕР-ГИ-Я', phonetic: 'A-TOM-NA-YA E-NER-GI-YA', translation: 'Nuclear energy' },
    { id: 'h138', cyrillic: 'Э-КО-ЛО-ГИ-Я', phonetic: 'E-KO-LO-GI-YA', translation: 'Ecology' },
    { id: 'h139', cyrillic: 'МЕ-ТЕ-О-РО-ЛО-ГИ-Я', phonetic: 'ME-TE-O-RO-LO-GI-YA', translation: 'Meteorology' },
    { id: 'h140', cyrillic: 'КЛИ-МА-ТО-ЛО-ГИ-Я', phonetic: 'KLI-MA-TO-LO-GI-YA', translation: 'Climatology' },
    { id: 'h141', cyrillic: 'ГЕ-О-ЛО-ГИ-Я', phonetic: 'GE-O-LO-GI-YA', translation: 'Geology' },
    { id: 'h142', cyrillic: 'ГЕ-О-ГРА-ФИ-Я', phonetic: 'GE-O-GRA-FI-YA', translation: 'Geography' },
    { id: 'h143', cyrillic: 'КАР-ТО-ГРА-ФИ-Я', phonetic: 'KAR-TO-GRA-FI-YA', translation: 'Cartography' },
    { id: 'h144', cyrillic: 'О-КЕ-А-НО-ЛО-ГИ-Я', phonetic: 'O-KE-A-NO-LO-GI-YA', translation: 'Oceanology' },
    { id: 'h145', cyrillic: 'АР-ХЕ-О-ЛО-ГИ-Я', phonetic: 'AR-KHE-O-LO-GI-YA', translation: 'Archaeology' },
    { id: 'h146', cyrillic: 'ЭТ-НО-ГРА-ФИ-Я', phonetic: 'ET-NO-GRA-FI-YA', translation: 'Ethnography' },
    { id: 'h147', cyrillic: 'АН-ТРО-ПО-ЛО-ГИ-Я', phonetic: 'AN-TRO-PO-LO-GI-YA', translation: 'Anthropology' },
    { id: 'h148', cyrillic: 'СО-ЦИ-О-ЛО-ГИ-Я', phonetic: 'SO-TSI-O-LO-GI-YA', translation: 'Sociology' },
    { id: 'h149', cyrillic: 'ПСИ-ХО-ЛО-ГИ-Я', phonetic: 'PSI-KHO-LO-GI-YA', translation: 'Psychology' },
    { id: 'h150', cyrillic: 'ПЕ-ДА-ГО-ГИ-КА', phonetic: 'PE-DA-GO-GI-KA', translation: 'Pedagogy' },
    { id: 'h151', cyrillic: 'ФИ-ЛО-СО-ФИ-Я', phonetic: 'FI-LO-SO-FI-YA', translation: 'Philosophy' },
    { id: 'h152', cyrillic: 'ФИ-ЛО-ЛО-ГИ-Я', phonetic: 'FI-LO-LO-GI-YA', translation: 'Philology' },
    { id: 'h153', cyrillic: 'ЛИНГ-ВИ-СТИ-КА', phonetic: 'LING-VI-STI-KA', translation: 'Linguistics' },
    { id: 'h154', cyrillic: 'ГРАМ-МА-ТИ-КА', phonetic: 'GRAM-MA-TI-KA', translation: 'Grammar' },
    { id: 'h155', cyrillic: 'ФO-НЕ-ТИ-КА', phonetic: 'FO-NE-TI-KA', translation: 'Phonetics' },
    { id: 'h156', cyrillic: 'ЛЕК-СИ-КО-ЛО-ГИ-Я', phonetic: 'LEK-SI-KO-LO-GI-YA', translation: 'Lexicology' },
    { id: 'h157', cyrillic: 'СЕМ-АН-ТИ-КА', phonetic: 'SEM-AN-TI-KA', translation: 'Semantics' },
    { id: 'h158', cyrillic: 'СИН-ТАК-СИС', phonetic: 'SIN-TAK-SIS', translation: 'Syntax' },
    { id: 'h159', cyrillic: 'СТИ-ЛИ-СТИ-КА', phonetic: 'STI-LI-STI-KA', translation: 'Stylistics' },
    { id: 'h160', cyrillic: 'РИ-ТО-РИ-КА', phonetic: 'RI-TO-RI-KA', translation: 'Rhetoric' },
    { id: 'h161', cyrillic: 'ДЕ-КЛА-МА-ЦИ-Я', phonetic: 'DE-KLA-MA-TSI-YA', translation: 'Recitation' },
    { id: 'h162', cyrillic: 'ДРА-МА-ТУР-ГИ-Я', phonetic: 'DRA-MA-TUR-GI-YA', translation: 'Dramaturgy' },
    { id: 'h163', cyrillic: 'ХИ-РО-МАН-ТИ-Я', phonetic: 'KHI-RO-MAN-TI-YA', translation: 'Palmistry' },
    { id: 'h164', cyrillic: 'АС-ТРО-ЛО-ГИ-Я', phonetic: 'AS-TRO-LO-GI-YA', translation: 'Astrology' },
    { id: 'h165', cyrillic: 'МИ-ФО-ЛО-ГИ-Я', phonetic: 'MI-FO-LO-GI-YA', translation: 'Mythology' },
    { id: 'h166', cyrillic: 'ТЕ-О-ЛО-ГИ-Я', phonetic: 'TE-O-LO-GI-YA', translation: 'Theology' },
    { id: 'h167', cyrillic: 'РЕ-ЛИ-ГИ-О-ВЕ-ДЕ-НИ-Е', phonetic: 'RE-LI-GI-O-VE-DE-NI-YE', translation: 'Religious studies' },
    { id: 'h168', cyrillic: 'ИС-КУС-СТВО-ВЕ-ДЕ-НИ-Е', phonetic: 'IS-KUS-STVO-VE-DE-NI-YE', translation: 'Art history' },
    { id: 'h169', cyrillic: 'МУ-ЗЫ-КО-VE-ДЕ-НИ-Е', phonetic: 'MU-ZY-KO-VE-DE-NI-YE', translation: 'Musicology' },
    { id: 'h170', cyrillic: 'КИ-НО-ИС-КУС-СТВО', phonetic: 'KI-NO-IS-KUS-STVO', translation: 'Cinema art' },
    { id: 'h171', cyrillic: 'ХО-РЕ-О-ГРА-ФИ-Я', phonetic: 'KHO-RE-O-GRA-FI-YA', translation: 'Choreography' },
    { id: 'h172', cyrillic: 'СЦE-НО-ГРА-ФИ-Я', phonetic: 'STSE-NO-GRA-FI-YA', translation: 'Scenography' },
    { id: 'h173', cyrillic: 'СКУЛЬП-ТУ-РА', phonetic: 'SKUL\'-PTU-RA', translation: 'Sculpture' },
    { id: 'h174', cyrillic: 'ЖИ-ВО-ПИСЬ', phonetic: 'ZHI-VO-PIS\'', translation: 'Painting' },
    { id: 'h175', cyrillic: 'ГРА-ФИ-КА', phonetic: 'GRA-FI-KA', translation: 'Graphics' },
    { id: 'h176', cyrillic: 'ИЛ-ЛЮ-СТРА-ЦИ-Я', phonetic: 'IL-LYU-STRA-TSI-YA', translation: 'Illustration' },
    { id: 'h177', cyrillic: 'ДИ-ЗАЙН', phonetic: 'DI-ZAYN', translation: 'Design' },
    { id: 'h178', cyrillic: 'КАЛ-ЛИ-ГРА-ФИ-Я', phonetic: 'KAL-LI-GRA-FI-YA', translation: 'Calligraphy' },
    { id: 'h179', cyrillic: 'ПО-ЛИ-ГРА-ФИ-Я', phonetic: 'PO-LI-GRA-FI-YA', translation: 'Printing / Polygraphy' },
    { id: 'h180', cyrillic: 'ИЗ-ДА-ТЕЛЬ-СТВО', phonetic: 'IZ-DA-TEL\'-STVO', translation: 'Publishing house' },
    { id: 'h181', cyrillic: 'ЖУР-НА-ЛИ-СТИ-КА', phonetic: 'ZHUR-NA-LI-STI-KA', translation: 'Journalism' },
    { id: 'h182', cyrillic: 'КОЛ-БА-СА', phonetic: "KOL-BA-SA", translation: 'Sausage' },
    { id: 'h183', cyrillic: 'РА-ДИ-О-ВЕ-ЩА-НИ-Е', phonetic: 'RA-DI-O-VE-SHCHA-NI-YE', translation: 'Broadcasting' },
    { id: 'h184', cyrillic: 'ИН-ТЕР-НЕТ', phonetic: 'IN-TER-NET', translation: 'Internet' },
    { id: 'h185', cyrillic: 'СЕ-ТЕ-ВО-Е ОБ-ЩЕ-СТВО', phonetic: 'SE-TE-VO-YE OB-SHCHE-STVO', translation: 'Networked society' },
    { id: 'h186', cyrillic: 'КИ-БЕР-БЕ-ЗО-ПАС-НОСТЬ', phonetic: 'KI-BER-BE-ZO-PAS-NOST\'', translation: 'Cybersecurity' },
    { id: 'h187', cyrillic: 'КРИП-ТО-ГРА-ФИ-Я', phonetic: 'KRIP-TO-GRA-FI-YA', translation: 'Cryptography' },
    { id: 'h188', cyrillic: 'БЛОК-ЧЕЙН', phonetic: 'BLOK-CHEYN', translation: 'Blockchain' },
    { id: 'h189', cyrillic: 'И-СКУС-СТВЕН-НЫЙ ИН-ТЕЛ-ЛЕКТ', phonetic: 'IS-KUS-STVEN-NYY IN-TEL-LEKT', translation: 'Artificial Intelligence' },
    { id: 'h190', cyrillic: 'МА-ШИН-НО-Е О-БУ-ЧЕ-НИ-Е', phonetic: 'MA-SHIN-NO-YE O-BU-CHE-NI-YE', translation: 'Machine Learning' },
    { id: 'h191', cyrillic: 'НЕЙ-РО-СЕ-ТИ', phonetic: 'NEY-RO-SE-TI', translation: 'Neural Networks' },
    { id: 'h192', cyrillic: 'АЛ-ГО-РИТМ', phonetic: 'AL-GO-RITM', translation: 'Algorithm' },
    { id: 'h193', cyrillic: 'ВЫ-ЧИС-ЛЕ-НИ-Я', phonetic: 'VY-CHIS-LE-NI-YA', translation: 'Computations' },
    { id: 'h194', cyrillic: 'СУ-ПЕР-КОМ-ПЬЮ-ТЕР', phonetic: 'SU-PER-KOM-P\'YU-TER', translation: 'Supercomputer' },
    { id: 'h195', cyrillic: 'КВАН-ТО-ВА-Я МЕ-ХА-НИ-КА', phonetic: 'KVAN-TO-VA-YA ME-KHA-NI-KA', translation: 'Quantum Mechanics' },
    { id: 'h196', cyrillic: 'ТЕ-О-РИ-Я ОТ-НО-СИ-ТЕЛЬ-НО-СТИ', phonetic: 'TE-O-RI-YA OT-NO-SI-TEL\'-NO-STI', translation: 'Theory of Relativity' },
    { id: 'h197', cyrillic: 'ТЕР-МО-ДИ-НА-МИ-КА', phonetic: 'TER-MO-DI-NA-MI-KA', translation: 'Thermodynamics' },
    { id: 'h198', cyrillic: 'Э-ЛЕК-ТРО-МА-ГНЕ-ТИЗМ', phonetic: 'E-LEK-TRO-MA-GNE-TIZM', translation: 'Electromagnetism' },
    { id: 'h199', cyrillic: 'МИК-РО-БИ-О-ЛО-ГИ-Я', phonetic: 'MIK-RO-BI-O-LO-GI-YA', translation: 'Microbiology' },
    { id: 'h200', cyrillic: 'ГЕ-НЕ-ТИ-КА', phonetic: 'GE-NE-TI-KA', translation: 'Genetics' }
  ]
  },
  be: {
    easy: [
      {
            "id": "be-e1",
            "cyrillic": "ТАК",
            "phonetic": "TAK",
            "translation": "Yes"
      },
      {
            "id": "be-e2",
            "cyrillic": "НЕ",
            "phonetic": "NYE",
            "translation": "No"
      },
      {
            "id": "be-e3",
            "cyrillic": "МА-МА",
            "phonetic": "MA-MA",
            "translation": "Mom"
      },
      {
            "id": "be-e4",
            "cyrillic": "ТА-ТА",
            "phonetic": "TA-TA",
            "translation": "Dad"
      },
      {
            "id": "be-e5",
            "cyrillic": "КОТ",
            "phonetic": "KOT",
            "translation": "Cat"
      },
      {
            "id": "be-e6",
            "cyrillic": "ДОМ",
            "phonetic": "DOM",
            "translation": "House"
      },
      {
            "id": "be-e7",
            "cyrillic": "СОК",
            "phonetic": "SOK",
            "translation": "Juice"
      },
      {
            "id": "be-e8",
            "cyrillic": "ДЗЕНЬ",
            "phonetic": "DZEN'",
            "translation": "Day"
      },
      {
            "id": "be-e9",
            "cyrillic": "НОЧ",
            "phonetic": "NOCH",
            "translation": "Night"
      },
      {
            "id": "be-e10",
            "cyrillic": "СНЕГ",
            "phonetic": "SNEG",
            "translation": "Snow"
      },
      {
            "id": "be-e11",
            "cyrillic": "ХЛЕБ",
            "phonetic": "KHLEB",
            "translation": "Bread"
      },
      {
            "id": "be-e12",
            "cyrillic": "СЫР",
            "phonetic": "SYR",
            "translation": "Cheese"
      },
      {
            "id": "be-e13",
            "cyrillic": "МЁД",
            "phonetic": "MYOD",
            "translation": "Honey"
      },
      {
            "id": "be-e14",
            "cyrillic": "ЛЕС",
            "phonetic": "LES",
            "translation": "Forest"
      },
      {
            "id": "be-e15",
            "cyrillic": "ЛЁД",
            "phonetic": "LYOD",
            "translation": "Ice"
      },
      {
            "id": "be-e16",
            "cyrillic": "РЫ-БА",
            "phonetic": "RY-BA",
            "translation": "Fish"
      },
      {
            "id": "be-e17",
            "cyrillic": "УТ-РО",
            "phonetic": "UT-RO",
            "translation": "Morning"
      },
      {
            "id": "be-e18",
            "cyrillic": "ЛЕ-ТА",
            "phonetic": "LE-TA",
            "translation": "Summer"
      },
      {
            "id": "be-e19",
            "cyrillic": "ЗІ-МА",
            "phonetic": "ZI-MA",
            "translation": "Winter"
      },
      {
            "id": "be-e20",
            "cyrillic": "НЕ-БА",
            "phonetic": "NYE-BA",
            "translation": "Sky"
      },
      {
            "id": "be-e21",
            "cyrillic": "МО-РА",
            "phonetic": "MO-RA",
            "translation": "Sea"
      },
      {
            "id": "be-e22",
            "cyrillic": "РА-КА",
            "phonetic": "RA-KA",
            "translation": "River"
      },
      {
            "id": "be-e23",
            "cyrillic": "ПО-ЛЕ",
            "phonetic": "PO-LYE",
            "translation": "Field"
      },
      {
            "id": "be-e24",
            "cyrillic": "ГА-РА",
            "phonetic": "HA-RA",
            "translation": "Mountain"
      },
      {
            "id": "be-e25",
            "cyrillic": "ВЁ-СКА",
            "phonetic": "VYO-SKA",
            "translation": "Village"
      },
      {
            "id": "be-e26",
            "cyrillic": "ПАРК",
            "phonetic": "PARK",
            "translation": "Park"
      },
      {
            "id": "be-e27",
            "cyrillic": "РУ-КА",
            "phonetic": "RU-KA",
            "translation": "Hand"
      },
      {
            "id": "be-e28",
            "cyrillic": "НА-ГА",
            "phonetic": "NA-HA",
            "translation": "Leg"
      },
      {
            "id": "be-e29",
            "cyrillic": "ВО-КА",
            "phonetic": "VO-KA",
            "translation": "Eye"
      },
      {
            "id": "be-e30",
            "cyrillic": "ВУ-ХО",
            "phonetic": "VU-KHO",
            "translation": "Ear"
      },
      {
            "id": "be-e31",
            "cyrillic": "БРАТ",
            "phonetic": "BRAT",
            "translation": "Brother"
      },
      {
            "id": "be-e32",
            "cyrillic": "СЫН",
            "phonetic": "SYN",
            "translation": "Son"
      },
      {
            "id": "be-e33",
            "cyrillic": "ДАЧ-КА",
            "phonetic": "DACH-KA",
            "translation": "Daughter"
      },
      {
            "id": "be-e34",
            "cyrillic": "БА-БА",
            "phonetic": "BA-BA",
            "translation": "Grandma"
      },
      {
            "id": "be-e35",
            "cyrillic": "ДЗЕ-ЦІ",
            "phonetic": "DZE-TSI",
            "translation": "Children"
      },
      {
            "id": "be-e36",
            "cyrillic": "СЯ-БАР",
            "phonetic": "SYA-BAR",
            "translation": "Friend"
      },
      {
            "id": "be-e37",
            "cyrillic": "АК-НО",
            "phonetic": "AK-NO",
            "translation": "Window"
      },
      {
            "id": "be-e38",
            "cyrillic": "ДЗВЕ-РЫ",
            "phonetic": "DZVE-RY",
            "translation": "Door"
      },
      {
            "id": "be-e39",
            "cyrillic": "СТОЛ",
            "phonetic": "STOL",
            "translation": "Table"
      },
      {
            "id": "be-e40",
            "cyrillic": "СТУЛ",
            "phonetic": "STUL",
            "translation": "Chair"
      },
      {
            "id": "be-e41",
            "cyrillic": "КНІ-ГА",
            "phonetic": "KNI-HA",
            "translation": "Book"
      },
      {
            "id": "be-e42",
            "cyrillic": "РУЧ-КА",
            "phonetic": "RUCH-KA",
            "translation": "Pen"
      },
      {
            "id": "be-e43",
            "cyrillic": "СУМ-КА",
            "phonetic": "SUM-KA",
            "translation": "Bag"
      },
      {
            "id": "be-e44",
            "cyrillic": "ШАП-КА",
            "phonetic": "SHAP-KA",
            "translation": "Hat"
      },
      {
            "id": "be-e45",
            "cyrillic": "ШУ-БА",
            "phonetic": "SHU-BA",
            "translation": "Fur coat"
      },
      {
            "id": "be-e46",
            "cyrillic": "А-БУЦ-ЦЕ",
            "phonetic": "A-BUTS-TSE",
            "translation": "Footwear"
      },
      {
            "id": "be-e47",
            "cyrillic": "ГА-ДЗІН-НІК",
            "phonetic": "HA-DZIN-NIK",
            "translation": "Clock"
      },
      {
            "id": "be-e48",
            "cyrillic": "МЯЧ",
            "phonetic": "MYACH",
            "translation": "Ball"
      },
      {
            "id": "be-e49",
            "cyrillic": "СУП",
            "phonetic": "SUP",
            "translation": "Soup"
      },
      {
            "id": "be-e50",
            "cyrillic": "КА-ША",
            "phonetic": "KA-SHA",
            "translation": "Porridge"
      },
      {
            "id": "be-e51",
            "cyrillic": "ВОК-ЗАЛ",
            "phonetic": "VAK-ZAL",
            "translation": "Station"
      },
      {
            "id": "be-e52",
            "cyrillic": "ВА-ДА",
            "phonetic": "VA-DA",
            "translation": "Water"
      },
      {
            "id": "be-e53",
            "cyrillic": "ВА-ТА",
            "phonetic": "VA-TA",
            "translation": "Cotton wool"
      },
      {
            "id": "be-e54",
            "cyrillic": "МЫ-ЛА",
            "phonetic": "MY-LA",
            "translation": "Soap"
      },
      {
            "id": "be-e55",
            "cyrillic": "ЦУ-КАР",
            "phonetic": "TSU-KAR",
            "translation": "Sugar"
      },
      {
            "id": "be-e56",
            "cyrillic": "СОЛЬ",
            "phonetic": "SOL'",
            "translation": "Salt"
      },
      {
            "id": "be-e57",
            "cyrillic": "ЛУК",
            "phonetic": "LUK",
            "translation": "Onion / Bow"
      },
      {
            "id": "be-e58",
            "cyrillic": "ЖУК",
            "phonetic": "ZHUK",
            "translation": "Beetle"
      },
      {
            "id": "be-e59",
            "cyrillic": "РАК",
            "phonetic": "RAK",
            "translation": "Crayfish"
      },
      {
            "id": "be-e60",
            "cyrillic": "БОР",
            "phonetic": "BOR",
            "translation": "Pine forest"
      },
      {
            "id": "be-e61",
            "cyrillic": "СІ-НІ",
            "phonetic": "SI-NI",
            "translation": "Blue"
      },
      {
            "id": "be-e62",
            "cyrillic": "А-ЛЫ",
            "phonetic": "A-LY",
            "translation": "Scarlet"
      },
      {
            "id": "be-e63",
            "cyrillic": "БЕ-ЛЫ",
            "phonetic": "BYE-LY",
            "translation": "White"
      },
      {
            "id": "be-e64",
            "cyrillic": "МІР",
            "phonetic": "MIR",
            "translation": "Peace / World"
      },
      {
            "id": "be-e65",
            "cyrillic": "ШАР",
            "phonetic": "SHAR",
            "translation": "Ball / Sphere"
      },
      {
            "id": "be-e66",
            "cyrillic": "МАЙ",
            "phonetic": "MAY",
            "translation": "May"
      },
      {
            "id": "be-e67",
            "cyrillic": "ЧАЙ",
            "phonetic": "CHAY",
            "translation": "Tea"
      },
      {
            "id": "be-e68",
            "cyrillic": "ПІ-ЦЬ",
            "phonetic": "PI-TS'",
            "translation": "To drink"
      },
      {
            "id": "be-e69",
            "cyrillic": "ЕС-ЦІ",
            "phonetic": "YES-TSI",
            "translation": "To eat"
      },
      {
            "id": "be-e70",
            "cyrillic": "ІС-ЦІ",
            "phonetic": "IS-TSI",
            "translation": "To go / walk"
      },
      {
            "id": "be-e71",
            "cyrillic": "СПА-ЦЬ",
            "phonetic": "SPA-TS'",
            "translation": "To sleep"
      },
      {
            "id": "be-e72",
            "cyrillic": "ПЯ-ЦІ",
            "phonetic": "PYA-TSI",
            "translation": "Five"
      },
      {
            "id": "be-e73",
            "cyrillic": "ШЭС-ЦІ",
            "phonetic": "SHES-TSI",
            "translation": "Six"
      },
      {
            "id": "be-e74",
            "cyrillic": "СЕМ",
            "phonetic": "SYEM",
            "translation": "Seven"
      },
      {
            "id": "be-e75",
            "cyrillic": "ВО-СЕМ",
            "phonetic": "VO-SYEM",
            "translation": "Eight"
      },
      {
            "id": "be-e76",
            "cyrillic": "ДЗЕ-ВЯЦЬ",
            "phonetic": "DZE-VYATS'",
            "translation": "Nine"
      },
      {
            "id": "be-e77",
            "cyrillic": "ДЗЕ-СЯЦЬ",
            "phonetic": "DZE-SYATS'",
            "translation": "Ten"
      },
      {
            "id": "be-e78",
            "cyrillic": "А-ДЗІН",
            "phonetic": "A-DZIN",
            "translation": "One"
      },
      {
            "id": "be-e79",
            "cyrillic": "ДВА",
            "phonetic": "DVA",
            "translation": "Two"
      },
      {
            "id": "be-e80",
            "cyrillic": "ТРЫ",
            "phonetic": "TRY",
            "translation": "Three"
      },
      {
            "id": "be-e81",
            "cyrillic": "ЧА-ТЫ-РЫ",
            "phonetic": "CHA-TY-RY",
            "translation": "Four"
      },
      {
            "id": "be-e82",
            "cyrillic": "ДАР",
            "phonetic": "DAR",
            "translation": "Gift"
      },
      {
            "id": "be-e83",
            "cyrillic": "ДЫМ",
            "phonetic": "DYM",
            "translation": "Smoke"
      },
      {
            "id": "be-e84",
            "cyrillic": "ЗУБ",
            "phonetic": "ZUB",
            "translation": "Tooth"
      },
      {
            "id": "be-e85",
            "cyrillic": "КОД",
            "phonetic": "KOD",
            "translation": "Code"
      },
      {
            "id": "be-e86",
            "cyrillic": "КУТ",
            "phonetic": "KUT",
            "translation": "Corner"
      },
      {
            "id": "be-e87",
            "cyrillic": "ЛАК",
            "phonetic": "LAK",
            "translation": "Varnish"
      },
      {
            "id": "be-e88",
            "cyrillic": "ЛОБ",
            "phonetic": "LOB",
            "translation": "Forehead"
      },
      {
            "id": "be-e89",
            "cyrillic": "ЛУГ",
            "phonetic": "LUG",
            "translation": "Meadow"
      },
      {
            "id": "be-e90",
            "cyrillic": "МОХ",
            "phonetic": "MOKH",
            "translation": "Moss"
      },
      {
            "id": "be-e91",
            "cyrillic": "МУЖ",
            "phonetic": "MUZH",
            "translation": "Husband"
      },
      {
            "id": "be-e92",
            "cyrillic": "ПАН",
            "phonetic": "PAN",
            "translation": "Lord / Mister"
      },
      {
            "id": "be-e93",
            "cyrillic": "ПАР",
            "phonetic": "PAR",
            "translation": "Steam"
      },
      {
            "id": "be-e94",
            "cyrillic": "РОТ",
            "phonetic": "ROT",
            "translation": "Mouth"
      },
      {
            "id": "be-e95",
            "cyrillic": "САД",
            "phonetic": "SAD",
            "translation": "Garden / Orchard"
      },
      {
            "id": "be-e96",
            "cyrillic": "СЕРП",
            "phonetic": "SYERP",
            "translation": "Sickle"
      },
      {
            "id": "be-e97",
            "cyrillic": "СНАП",
            "phonetic": "SNAP",
            "translation": "Sheaf"
      },
      {
            "id": "be-e98",
            "cyrillic": "ТОН",
            "phonetic": "TON",
            "translation": "Tone"
      },
      {
            "id": "be-e99",
            "cyrillic": "ШАЛ",
            "phonetic": "SHAL",
            "translation": "Shawl"
      },
      {
            "id": "be-e100",
            "cyrillic": "ШАРФ",
            "phonetic": "SHARF",
            "translation": "Scarf"
      }
],
    medium: [
      {
            "id": "be-m1",
            "cyrillic": "ВЯ-СНА",
            "phonetic": "VYA-SNA",
            "translation": "Spring"
      },
      {
            "id": "be-m2",
            "cyrillic": "ГО-РАД",
            "phonetic": "HO-RAD",
            "translation": "City"
      },
      {
            "id": "be-m3",
            "cyrillic": "ВУ-ЛІ-ЦА",
            "phonetic": "VU-LI-TSA",
            "translation": "Street"
      },
      {
            "id": "be-m4",
            "cyrillic": "РА-КА",
            "phonetic": "RA-KA",
            "translation": "River"
      },
      {
            "id": "be-m5",
            "cyrillic": "ПТУШ-КА",
            "phonetic": "PTUSH-KA",
            "translation": "Bird"
      },
      {
            "id": "be-m6",
            "cyrillic": "ДРЭ-ВА",
            "phonetic": "DRE-VA",
            "translation": "Tree"
      },
      {
            "id": "be-m7",
            "cyrillic": "СОН-ЦА",
            "phonetic": "SON-TSA",
            "translation": "Sun"
      },
      {
            "id": "be-m8",
            "cyrillic": "ДЗЕ-ЦІ",
            "phonetic": "DZE-TSI",
            "translation": "Children"
      },
      {
            "id": "be-m9",
            "cyrillic": "СЯ-БАР",
            "phonetic": "SYA-BAR",
            "translation": "Friend"
      },
      {
            "id": "be-m10",
            "cyrillic": "ШКО-ЛА",
            "phonetic": "SHKO-LA",
            "translation": "School"
      },
      {
            "id": "be-m11",
            "cyrillic": "КРА-І-НА",
            "phonetic": "KRA-I-NA",
            "translation": "Country"
      },
      {
            "id": "be-m12",
            "cyrillic": "СТА-ЛІ-ЦА",
            "phonetic": "STA-LI-TSA",
            "translation": "Capital"
      },
      {
            "id": "be-m13",
            "cyrillic": "РА-ДЗІ-МА",
            "phonetic": "RA-DZI-MA",
            "translation": "Motherland"
      },
      {
            "id": "be-m14",
            "cyrillic": "БЕ-ЛА-РУСЬ",
            "phonetic": "BYE-LA-RUS'",
            "translation": "Belarus"
      },
      {
            "id": "be-m15",
            "cyrillic": "СВЯ-ТА",
            "phonetic": "SVYA-TA",
            "translation": "Holiday"
      },
      {
            "id": "be-m16",
            "cyrillic": "ЧА-ЛА-ВЕК",
            "phonetic": "CHA-LA-VYEK",
            "translation": "Person"
      },
      {
            "id": "be-m17",
            "cyrillic": "ДЗЯЎ-ЧЫ-НА",
            "phonetic": "DZYAWT-CHY-NA",
            "translation": "Girl"
      },
      {
            "id": "be-m18",
            "cyrillic": "ХЛО-ПЕЦ",
            "phonetic": "KHLO-PYETS",
            "translation": "Boy"
      },
      {
            "id": "be-m19",
            "cyrillic": "СЯ-М'Я",
            "phonetic": "SYAM-YA",
            "translation": "Family"
      },
      {
            "id": "be-m20",
            "cyrillic": "СЯ-БРОЎ-СТВА",
            "phonetic": "SYA-BROW-STVA",
            "translation": "Friendship"
      },
      {
            "id": "be-m21",
            "cyrillic": "СО-НЕЧ-НА",
            "phonetic": "SO-NYECH-NA",
            "translation": "Sunny"
      },
      {
            "id": "be-m22",
            "cyrillic": "ДАЖ-ДЖЫ-СТА",
            "phonetic": "DAZH-DZHY-STA",
            "translation": "Rainy"
      },
      {
            "id": "be-m23",
            "cyrillic": "ВОБ-ЛА-КА",
            "phonetic": "VOB-LA-KA",
            "translation": "Cloud"
      },
      {
            "id": "be-m24",
            "cyrillic": "МЯ-ЦЕ-ЛІ-ЦА",
            "phonetic": "MYA-TSE-LI-TSA",
            "translation": "Blizzard"
      },
      {
            "id": "be-m25",
            "cyrillic": "КУ-ПА-ЛІН-КА",
            "phonetic": "KU-PA-LIN-KA",
            "translation": "Kupalinka"
      },
      {
            "id": "be-m26",
            "cyrillic": "ВУ-ЧАНЬ",
            "phonetic": "VU-CHAN'",
            "translation": "Student"
      },
      {
            "id": "be-m27",
            "cyrillic": "НА-СТАЎ-НІК",
            "phonetic": "NA-STAW-NIK",
            "translation": "Teacher"
      },
      {
            "id": "be-m28",
            "cyrillic": "ЛІ-ТА-РА",
            "phonetic": "LI-TA-RA",
            "translation": "Letter"
      },
      {
            "id": "be-m29",
            "cyrillic": "А-БЕ-ЦАД-ЛА",
            "phonetic": "A-BYE-TSAD-LA",
            "translation": "Alphabet"
      },
      {
            "id": "be-m30",
            "cyrillic": "МУ-ЗЫ-КА",
            "phonetic": "MU-ZY-KA",
            "translation": "Music"
      },
      {
            "id": "be-m31",
            "cyrillic": "ТЭ-АТР",
            "phonetic": "TE-ATR",
            "translation": "Theater"
      },
      {
            "id": "be-m32",
            "cyrillic": "БІБ-ЛІ-Я-ТЭ-КА",
            "phonetic": "BIB-LI-YA-TE-KA",
            "translation": "Library"
      },
      {
            "id": "be-m33",
            "cyrillic": "АЎ-ТО-БУС",
            "phonetic": "AW-TO-BUS",
            "translation": "Bus"
      },
      {
            "id": "be-m34",
            "cyrillic": "ПА-ЕЗД",
            "phonetic": "PA-YEZD",
            "translation": "Train"
      },
      {
            "id": "be-m35",
            "cyrillic": "СА-МА-ЛЁТ",
            "phonetic": "SA-MA-LYOT",
            "translation": "Airplane"
      },
      {
            "id": "be-m36",
            "cyrillic": "ВАК-ЗАЛ",
            "phonetic": "VAK-ZAL",
            "translation": "Station"
      },
      {
            "id": "be-m37",
            "cyrillic": "ПА-ВЕ-ТРА",
            "phonetic": "PA-VYE-TRA",
            "translation": "Air"
      },
      {
            "id": "be-m38",
            "cyrillic": "ЗЯМ-ЛЯ",
            "phonetic": "ZYAM-LYA",
            "translation": "Earth / Land"
      },
      {
            "id": "be-m39",
            "cyrillic": "КА-РА-БЕЛЬ",
            "phonetic": "KA-RA-BYEL'",
            "translation": "Ship"
      },
      {
            "id": "be-m40",
            "cyrillic": "МЕ-СЯЦ",
            "phonetic": "MYE-SYATS",
            "translation": "Month / Moon"
      },
      {
            "id": "be-m41",
            "cyrillic": "ЗО-РАЧ-КА",
            "phonetic": "ZO-RACH-KA",
            "translation": "Little star"
      },
      {
            "id": "be-m42",
            "cyrillic": "ПТА-ШАЧ-КА",
            "phonetic": "PTA-SHACH-KA",
            "translation": "Little bird"
      },
      {
            "id": "be-m43",
            "cyrillic": "БЯ-РО-ЗА",
            "phonetic": "BYA-RO-ZA",
            "translation": "Birch"
      },
      {
            "id": "be-m44",
            "cyrillic": "КЛЁН",
            "phonetic": "KLYON",
            "translation": "Maple"
      },
      {
            "id": "be-m45",
            "cyrillic": "ДУБ",
            "phonetic": "DUB",
            "translation": "Oak"
      },
      {
            "id": "be-m46",
            "cyrillic": "КВЕ-ТКА",
            "phonetic": "KVYE-TKA",
            "translation": "Flower"
      },
      {
            "id": "be-m47",
            "cyrillic": "Я-ГА-ДА",
            "phonetic": "YA-HA-DA",
            "translation": "Berry"
      },
      {
            "id": "be-m48",
            "cyrillic": "ЯБ-ЛЫК",
            "phonetic": "YAB-LYK",
            "translation": "Apple"
      },
      {
            "id": "be-m49",
            "cyrillic": "ГРУ-ША",
            "phonetic": "HRU-SHA",
            "translation": "Pear"
      },
      {
            "id": "be-m50",
            "cyrillic": "А-ГУ-РОК",
            "phonetic": "A-HU-ROK",
            "translation": "Cucumber"
      },
      {
            "id": "be-m51",
            "cyrillic": "ПА-МІ-ДОР",
            "phonetic": "PA-MI-DOR",
            "translation": "Tomato"
      },
      {
            "id": "be-m52",
            "cyrillic": "МАР-КОЎ-КА",
            "phonetic": "MAR-KOW-KA",
            "translation": "Carrot"
      },
      {
            "id": "be-m53",
            "cyrillic": "БАР-ШЧ",
            "phonetic": "BARSHCH",
            "translation": "Borscht"
      },
      {
            "id": "be-m54",
            "cyrillic": "ДРА-НІ-КІ",
            "phonetic": "DRA-NI-KI",
            "translation": "Potato pancakes (Draniki)"
      },
      {
            "id": "be-m55",
            "cyrillic": "КАР-ТОФ-ЛЯ",
            "phonetic": "KAR-TOF-LYA",
            "translation": "Potato"
      },
      {
            "id": "be-m56",
            "cyrillic": "КА-ПУ-СТА",
            "phonetic": "KA-PU-STA",
            "translation": "Cabbage"
      },
      {
            "id": "be-m57",
            "cyrillic": "ЧАС-НОК",
            "phonetic": "CHAS-NOK",
            "translation": "Garlic"
      },
      {
            "id": "be-m58",
            "cyrillic": "КА-ВУН",
            "phonetic": "KA-VUN",
            "translation": "Watermelon"
      },
      {
            "id": "be-m59",
            "cyrillic": "ДЫ-НЯ",
            "phonetic": "DY-NYA",
            "translation": "Melon"
      },
      {
            "id": "be-m60",
            "cyrillic": "ЛІ-МОН",
            "phonetic": "LI-MON",
            "translation": "Lemon"
      },
      {
            "id": "be-m61",
            "cyrillic": "А-ПЕЛЬ-СІН",
            "phonetic": "A-PYEL'-SIN",
            "translation": "Orange"
      },
      {
            "id": "be-m62",
            "cyrillic": "МАН-ДА-РЫН",
            "phonetic": "MAN-DA-RYN",
            "translation": "Mandarin"
      },
      {
            "id": "be-m63",
            "cyrillic": "ПЕР-СІК",
            "phonetic": "PYER-SIK",
            "translation": "Peach"
      },
      {
            "id": "be-m64",
            "cyrillic": "СЛІ-ВА",
            "phonetic": "SLI-VA",
            "translation": "Plum"
      },
      {
            "id": "be-m65",
            "cyrillic": "ВІШ-НЯ",
            "phonetic": "VISH-NYA",
            "translation": "Cherry"
      },
      {
            "id": "be-m66",
            "cyrillic": "ЧА-РЭШ-НЯ",
            "phonetic": "CHA-RESH-NYA",
            "translation": "Sweet cherry"
      },
      {
            "id": "be-m67",
            "cyrillic": "ПЕ-ЧЫ-ВА",
            "phonetic": "PYE-CHY-VA",
            "translation": "Cookies / Biscuits"
      },
      {
            "id": "be-m68",
            "cyrillic": "ЦУ-КЕР-КА",
            "phonetic": "TSU-KYER-KA",
            "translation": "Candy"
      },
      {
            "id": "be-m69",
            "cyrillic": "ПІ-РОГ",
            "phonetic": "PI-ROH",
            "translation": "Pie"
      },
      {
            "id": "be-m70",
            "cyrillic": "БЛІ-НЫ",
            "phonetic": "BLI-NY",
            "translation": "Pancakes"
      },
      {
            "id": "be-m71",
            "cyrillic": "ВА-РЭ-НІ-КІ",
            "phonetic": "VA-RE-NI-KI",
            "translation": "Dumplings (Vareniki)"
      },
      {
            "id": "be-m72",
            "cyrillic": "СМЯ-ТА-НА",
            "phonetic": "SMYA-TA-NA",
            "translation": "Sour cream"
      },
      {
            "id": "be-m73",
            "cyrillic": "МА-СЛА",
            "phonetic": "MA-SLA",
            "translation": "Butter"
      },
      {
            "id": "be-m74",
            "cyrillic": "МА-ЛА-КО",
            "phonetic": "MA-LA-KO",
            "translation": "Milk"
      },
      {
            "id": "be-m75",
            "cyrillic": "ТВА-РОГ",
            "phonetic": "TVA-ROH",
            "translation": "Cottage cheese"
      },
      {
            "id": "be-m76",
            "cyrillic": "КА-ВА",
            "phonetic": "KA-VA",
            "translation": "Coffee"
      },
      {
            "id": "be-m77",
            "cyrillic": "КІ-СЕЛЬ",
            "phonetic": "KI-SYEL'",
            "translation": "Kissel"
      },
      {
            "id": "be-m78",
            "cyrillic": "КАМ-ПОТ",
            "phonetic": "KAM-POT",
            "translation": "Compote"
      },
      {
            "id": "be-m79",
            "cyrillic": "КРЫ-НІ-ЦА",
            "phonetic": "KRY-NI-TSA",
            "translation": "Spring / Fountain"
      },
      {
            "id": "be-m80",
            "cyrillic": "А-ЗЕ-РА",
            "phonetic": "A-ZE-RA",
            "translation": "Lake"
      },
      {
            "id": "be-m81",
            "cyrillic": "КРА-Я-ВІД",
            "phonetic": "KRA-YA-VID",
            "translation": "Landscape / View"
      },
      {
            "id": "be-m82",
            "cyrillic": "ПРЫ-ГА-ЖОСЦЬ",
            "phonetic": "PRY-HA-ZHOSTS'",
            "translation": "Beauty"
      },
      {
            "id": "be-m83",
            "cyrillic": "ДА-БРА-ТЫ-НЯ",
            "phonetic": "DA-BRA-TY-NYA",
            "translation": "Kindness"
      },
      {
            "id": "be-m84",
            "cyrillic": "ШЧАС-ЦЕ",
            "phonetic": "SHCHAS-TSE",
            "translation": "Happiness"
      },
      {
            "id": "be-m85",
            "cyrillic": "РА-ДАСЦЬ",
            "phonetic": "RA-DASTS'",
            "translation": "Joy"
      },
      {
            "id": "be-m86",
            "cyrillic": "СУ-МЕЧ-НАСЦЬ",
            "phonetic": "SU-MYECH-NASTS'",
            "translation": "Conscience"
      },
      {
            "id": "be-m87",
            "cyrillic": "ЧЭС-НАСЦЬ",
            "phonetic": "CHES-NASTS'",
            "translation": "Honesty"
      },
      {
            "id": "be-m88",
            "cyrillic": "СМЕ-ЛАСЦЬ",
            "phonetic": "SMYE-LASTS'",
            "translation": "Courage"
      },
      {
            "id": "be-m89",
            "cyrillic": "СІ-ЛА",
            "phonetic": "SI-LA",
            "translation": "Strength / Power"
      },
      {
            "id": "be-m90",
            "cyrillic": "РО-ЗУМ",
            "phonetic": "RO-ZUM",
            "translation": "Mind / Wisdom"
      },
      {
            "id": "be-m91",
            "cyrillic": "ПА-ВА-ГА",
            "phonetic": "PA-VA-HA",
            "translation": "Respect"
      },
      {
            "id": "be-m92",
            "cyrillic": "ЛА-СКА",
            "phonetic": "LA-SKA",
            "translation": "Tenderness / Grace"
      },
      {
            "id": "be-m93",
            "cyrillic": "ЦЯП-ЛО",
            "phonetic": "TSYAP-LO",
            "translation": "Warmth"
      },
      {
            "id": "be-m94",
            "cyrillic": "СВЯТ-ЛО",
            "phonetic": "SVYAT-LO",
            "translation": "Light"
      },
      {
            "id": "be-m95",
            "cyrillic": "ЦІ-ШЫ-НЯ",
            "phonetic": "TSI-SHY-NYA",
            "translation": "Silence"
      },
      {
            "id": "be-m96",
            "cyrillic": "СПО-КАЙ",
            "phonetic": "SPO-KAY",
            "translation": "Peace / Calm"
      },
      {
            "id": "be-m97",
            "cyrillic": "НА-ДЗЕ-Я",
            "phonetic": "NA-DZE-YA",
            "translation": "Hope"
      },
      {
            "id": "be-m98",
            "cyrillic": "ВЕ-РА",
            "phonetic": "VYE-RA",
            "translation": "Faith"
      },
      {
            "id": "be-m99",
            "cyrillic": "ЛЮ-БОЎ",
            "phonetic": "LYU-BOW",
            "translation": "Love"
      },
      {
            "id": "be-m100",
            "cyrillic": "ЖЫЦ-ЦЁ",
            "phonetic": "ZHYT-TSYO",
            "translation": "Life"
      }
],
    hard: [
      {
            "id": "be-h1",
            "cyrillic": "НА-ВУ-КА",
            "phonetic": "NA-VU-KA",
            "translation": "Science"
      },
      {
            "id": "be-h2",
            "cyrillic": "МА-СТАЦ-ТВА",
            "phonetic": "MA-STATS-TVA",
            "translation": "Art"
      },
      {
            "id": "be-h3",
            "cyrillic": "Э-КА-НО-МІ-КА",
            "phonetic": "E-KA-NO-MI-KA",
            "translation": "Economics"
      },
      {
            "id": "be-h4",
            "cyrillic": "ПРЫ-РО-ДА",
            "phonetic": "PRY-RO-DA",
            "translation": "Nature"
      },
      {
            "id": "be-h5",
            "cyrillic": "А-ДУ-КА-ЦЫ-Я",
            "phonetic": "A-DU-KA-TSY-YA",
            "translation": "Education"
      },
      {
            "id": "be-h6",
            "cyrillic": "ГІ-СТО-РЫ-Я",
            "phonetic": "HI-STO-RY-YA",
            "translation": "History"
      },
      {
            "id": "be-h7",
            "cyrillic": "ЛІ-ТА-РА-ТУ-РА",
            "phonetic": "LI-TA-RA-TU-RA",
            "translation": "Literature"
      },
      {
            "id": "be-h8",
            "cyrillic": "КАМ-П’Ю-ТАР",
            "phonetic": "KAM-P'YU-TAR",
            "translation": "Computer"
      },
      {
            "id": "be-h9",
            "cyrillic": "ПРАГ-РА-МА-ВАН-НЕ",
            "phonetic": "PRA-HRA-MA-VAN-NE",
            "translation": "Programming"
      },
      {
            "id": "be-h10",
            "cyrillic": "ТЭХ-НА-ЛО-ГІ-Я",
            "phonetic": "TEKH-NA-LO-HI-YA",
            "translation": "Technology"
      },
      {
            "id": "be-h11",
            "cyrillic": "АР-ХІ-ТЭК-ТУ-РА",
            "phonetic": "AR-KHI-TEK-TU-RA",
            "translation": "Architecture"
      },
      {
            "id": "be-h12",
            "cyrillic": "СКУЛЬП-ТУ-РА",
            "phonetic": "SKUL'P-TU-RA",
            "translation": "Sculpture"
      },
      {
            "id": "be-h13",
            "cyrillic": "ЖЫ-ВА-ПІС",
            "phonetic": "ZHY-VA-PIS",
            "translation": "Painting"
      },
      {
            "id": "be-h14",
            "cyrillic": "ПРА-МЫС-ЛО-ВАСЦЬ",
            "phonetic": "PRA-MYS-LO-VASTS'",
            "translation": "Industry"
      },
      {
            "id": "be-h15",
            "cyrillic": "СЕЛЬ-СКА-Я ГАС-ПА-ДАР-КА",
            "phonetic": "SYEL'-SKA-YA HAS-PA-DAR-KA",
            "translation": "Agriculture"
      },
      {
            "id": "be-h16",
            "cyrillic": "МЕ-ДЫ-ЦЫ-НА",
            "phonetic": "MYE-DY-TSY-NA",
            "translation": "Medicine"
      },
      {
            "id": "be-h17",
            "cyrillic": "ІН-ТЭР-НЭТ",
            "phonetic": "IN-TER-NET",
            "translation": "Internet"
      },
      {
            "id": "be-h18",
            "cyrillic": "АЛ-ГА-РЫТМ",
            "phonetic": "AL-HA-RYTM",
            "translation": "Algorithm"
      },
      {
            "id": "be-h19",
            "cyrillic": "БЕЗ-ПЕ-КА",
            "phonetic": "BYEZ-PYE-KA",
            "translation": "Safety / Security"
      },
      {
            "id": "be-h20",
            "cyrillic": "ГЕ-А-ГРА-ФІ-Я",
            "phonetic": "HYE-A-HRA-FI-YA",
            "translation": "Geography"
      },
      {
            "id": "be-h21",
            "cyrillic": "МА-ТЭ-МА-ТЫ-КА",
            "phonetic": "MA-TE-MA-TY-KA",
            "translation": "Mathematics"
      },
      {
            "id": "be-h22",
            "cyrillic": "ФІ-ЗІ-КА",
            "phonetic": "FI-ZI-KA",
            "translation": "Physics"
      },
      {
            "id": "be-h23",
            "cyrillic": "ХІ-МІ-Я",
            "phonetic": "KHI-MI-YA",
            "translation": "Chemistry"
      },
      {
            "id": "be-h24",
            "cyrillic": "БІ-Я-ЛО-ГІ-Я",
            "phonetic": "BI-YA-LO-HI-YA",
            "translation": "Biology"
      },
      {
            "id": "be-h25",
            "cyrillic": "А-СТРА-НО-МІ-Я",
            "phonetic": "A-STRA-NO-MI-YA",
            "translation": "Astronomy"
      },
      {
            "id": "be-h26",
            "cyrillic": "Э-КА-ЛО-ГІ-Я",
            "phonetic": "E-KA-LO-HI-YA",
            "translation": "Ecology"
      },
      {
            "id": "be-h27",
            "cyrillic": "ПА-ЛІ-ТЫ-КА",
            "phonetic": "PA-LI-TY-KA",
            "translation": "Politics"
      },
      {
            "id": "be-h28",
            "cyrillic": "ДЭ-МА-КРА-ЦЫ-Я",
            "phonetic": "DE-MA-KRA-TSY-YA",
            "translation": "Democracy"
      },
      {
            "id": "be-h29",
            "cyrillic": "ЗА-КА-НА-ДАЎ-СТВА",
            "phonetic": "ZA-KA-NA-DAW-STVA",
            "translation": "Legislation"
      },
      {
            "id": "be-h30",
            "cyrillic": "КАН-СТЫ-ТУ-ЦЫ-Я",
            "phonetic": "KAN-STY-TU-TSY-YA",
            "translation": "Constitution"
      },
      {
            "id": "be-h31",
            "cyrillic": "У-НІ-ВЕР-СІ-ТЭТ",
            "phonetic": "U-NI-VYER-SI-TET",
            "translation": "University"
      },
      {
            "id": "be-h32",
            "cyrillic": "А-КА-ДЭ-МІ-Я",
            "phonetic": "A-KA-DE-MI-YA",
            "translation": "Academy"
      },
      {
            "id": "be-h33",
            "cyrillic": "ФІ-ЛА-СО-ФІ-Я",
            "phonetic": "FI-LA-SO-FI-YA",
            "translation": "Philosophy"
      },
      {
            "id": "be-h34",
            "cyrillic": "ПСІ-ХА-ЛО-ГІ-Я",
            "phonetic": "PSI-KHA-LO-HI-YA",
            "translation": "Psychology"
      },
      {
            "id": "be-h35",
            "cyrillic": "СА-ЦЫ-Я-ЛО-ГІ-Я",
            "phonetic": "SA-TSY-YA-LO-HI-YA",
            "translation": "Sociology"
      },
      {
            "id": "be-h36",
            "cyrillic": "ЛІНГ-ВІ-СТЫ-КА",
            "phonetic": "LING-VI-STY-KA",
            "translation": "Linguistics"
      },
      {
            "id": "be-h37",
            "cyrillic": "ФА-НЕ-ТЫ-КА",
            "phonetic": "FA-NYE-TY-KA",
            "translation": "Phonetics"
      },
      {
            "id": "be-h38",
            "cyrillic": "ГРА-МА-ТЫ-КА",
            "phonetic": "HRA-MA-TY-KA",
            "translation": "Grammar"
      },
      {
            "id": "be-h39",
            "cyrillic": "ЛЕК-СІ-КА-ЛО-ГІ-Я",
            "phonetic": "LYEK-SI-KA-LO-HI-YA",
            "translation": "Lexicology"
      },
      {
            "id": "be-h40",
            "cyrillic": "ЭТ-НА-ГРА-ФІ-Я",
            "phonetic": "ET-NA-HRA-FI-YA",
            "translation": "Ethnography"
      },
      {
            "id": "be-h41",
            "cyrillic": "ФАЛЬК-ЛОР",
            "phonetic": "FAL'K-LOR",
            "translation": "Folklore"
      },
      {
            "id": "be-h42",
            "cyrillic": "МІ-ФА-ЛО-ГІ-Я",
            "phonetic": "MI-FA-LO-HI-YA",
            "translation": "Mythology"
      },
      {
            "id": "be-h43",
            "cyrillic": "РЭ-ЛІ-ГІ-Я",
            "phonetic": "RE-LI-HI-YA",
            "translation": "Religion"
      },
      {
            "id": "be-h44",
            "cyrillic": "ЦІ-ВІ-ЛІ-ЗА-ЦЫ-Я",
            "phonetic": "TSI-VI-LI-ZA-TSY-YA",
            "translation": "Civilization"
      },
      {
            "id": "be-h45",
            "cyrillic": "ІН-ТЭ-ЛЕКТ",
            "phonetic": "IN-TE-LYEKT",
            "translation": "Intellect"
      },
      {
            "id": "be-h46",
            "cyrillic": "КІ-БЕР-НЭ-ТЫ-КА",
            "phonetic": "KI-BYER-NE-TY-KA",
            "translation": "Cybernetics"
      },
      {
            "id": "be-h47",
            "cyrillic": "НА-НА-ТЭХ-НА-ЛО-ГІ-І",
            "phonetic": "NA-NA-TEKH-NA-LO-HI-I",
            "translation": "Nanotechnologies"
      },
      {
            "id": "be-h48",
            "cyrillic": "КАС-МА-НАЎ-ТЫ-КА",
            "phonetic": "KAS-MA-NAW-TY-KA",
            "translation": "Cosmonautics"
      },
      {
            "id": "be-h49",
            "cyrillic": "А-Э-РА-ДЫ-НА-МІ-КА",
            "phonetic": "A-E-RA-DY-NA-MI-KA",
            "translation": "Aerodynamics"
      },
      {
            "id": "be-h50",
            "cyrillic": "ГІ-ДРА-ДЫ-НА-МІ-КА",
            "phonetic": "HI-DRA-DY-NA-MI-KA",
            "translation": "Hydrodynamics"
      },
      {
            "id": "be-h51",
            "cyrillic": "БІ-Я-ХІ-МІ-Я",
            "phonetic": "BI-YA-KHI-MI-YA",
            "translation": "Biochemistry"
      },
      {
            "id": "be-h52",
            "cyrillic": "А-ГРА-НО-МІ-Я",
            "phonetic": "A-HRA-NO-MI-YA",
            "translation": "Agronomy"
      },
      {
            "id": "be-h53",
            "cyrillic": "ВЕ-ТЭ-РЫ-НА-РЫ-Я",
            "phonetic": "VYE-TE-RY-NA-RY-YA",
            "translation": "Veterinary medicine"
      },
      {
            "id": "be-h54",
            "cyrillic": "ГЕ-А-ЛО-ГІ-Я",
            "phonetic": "HYE-A-LO-HI-YA",
            "translation": "Geology"
      },
      {
            "id": "be-h55",
            "cyrillic": "МЕ-ТЭ-А-РА-ЛО-ГІ-Я",
            "phonetic": "MYE-TE-A-RA-LO-HI-YA",
            "translation": "Meteorology"
      },
      {
            "id": "be-h56",
            "cyrillic": "КАР-ТА-ГРА-ФІ-Я",
            "phonetic": "KAR-TA-HRA-FI-YA",
            "translation": "Cartography"
      },
      {
            "id": "be-h57",
            "cyrillic": "МІ-НЕ-РА-ЛО-ГІ-Я",
            "phonetic": "MI-NYE-RA-LO-HI-YA",
            "translation": "Mineralogy"
      },
      {
            "id": "be-h58",
            "cyrillic": "АР-ХЕ-А-ЛО-ГІ-Я",
            "phonetic": "AR-KHYE-A-LO-HI-YA",
            "translation": "Archaeology"
      },
      {
            "id": "be-h59",
            "cyrillic": "ПА-ЛЕ-АН-ТА-ЛО-ГІ-Я",
            "phonetic": "PA-LYE-AN-TA-LO-HI-YA",
            "translation": "Paleontology"
      },
      {
            "id": "be-h60",
            "cyrillic": "АН-ТРА-ПА-ЛО-ГІ-Я",
            "phonetic": "AN-TRA-PA-LO-HI-YA",
            "translation": "Anthropology"
      },
      {
            "id": "be-h61",
            "cyrillic": "МУ-ЗЫ-КА-ЗНАЎ-СТВА",
            "phonetic": "MU-ZY-KA-ZNAW-STVA",
            "translation": "Musicology"
      },
      {
            "id": "be-h62",
            "cyrillic": "ТЭ-АТ-РА-ЗНАЎ-СТВА",
            "phonetic": "TE-AT-RA-ZNAW-STVA",
            "translation": "Theater studies"
      },
      {
            "id": "be-h63",
            "cyrillic": "КІ-НЕ-МА-ТА-ГРА-ФІ-Я",
            "phonetic": "KI-NYE-MA-TA-HRA-FI-YA",
            "translation": "Cinematography"
      },
      {
            "id": "be-h64",
            "cyrillic": "ФО-ТА-ГРА-ФІ-Я",
            "phonetic": "FO-TA-HRA-FI-YA",
            "translation": "Photography"
      },
      {
            "id": "be-h65",
            "cyrillic": "ЖУР-НА-ЛІ-СТЫ-КА",
            "phonetic": "ZHUR-NA-LI-STY-KA",
            "translation": "Journalism"
      },
      {
            "id": "be-h66",
            "cyrillic": "ВЫ-ДА-ВЕЦ-ТВА",
            "phonetic": "VY-DA-VYETS-TVA",
            "translation": "Publishing house"
      },
      {
            "id": "be-h67",
            "cyrillic": "ПА-ЛІ-ГРА-ФІ-Я",
            "phonetic": "PA-LI-HRA-FI-YA",
            "translation": "Polygraphy / Printing"
      },
      {
            "id": "be-h68",
            "cyrillic": "ДЫ-ЗАЙН",
            "phonetic": "DY-ZAYN",
            "translation": "Design"
      },
      {
            "id": "be-h69",
            "cyrillic": "КА-ЛІ-ГРА-ФІ-Я",
            "phonetic": "KA-LI-HRA-FI-YA",
            "translation": "Calligraphy"
      },
      {
            "id": "be-h70",
            "cyrillic": "АР-ХІ-ВА-РЫ-УС",
            "phonetic": "AR-KHI-VA-RY-US",
            "translation": "Archivist"
      },
      {
            "id": "be-h71",
            "cyrillic": "ДА-КУ-МЕН-ТА-ЦЫ-Я",
            "phonetic": "DA-KU-MYEN-TA-TSY-YA",
            "translation": "Documentation"
      },
      {
            "id": "be-h72",
            "cyrillic": "ІН-ФАР-МА-ТЫ-КА",
            "phonetic": "IN-FAR-MA-TY-KA",
            "translation": "Computer Science"
      },
      {
            "id": "be-h73",
            "cyrillic": "ТЭ-ЛЕ-КА-МУ-НІ-КА-ЦЫ-І",
            "phonetic": "TE-LYE-KA-MU-NI-KA-TSY-I",
            "translation": "Telecommunications"
      },
      {
            "id": "be-h74",
            "cyrillic": "РА-ДЗІ-О-ТЭХ-НА-ЛО-ГІ-І",
            "phonetic": "RA-DZI-O-TEKH-NA-LO-HI-I",
            "translation": "Radiotechnology"
      },
      {
            "id": "be-h75",
            "cyrillic": "МІК-РА-Э-ЛЕК-ТРО-НІ-КА",
            "phonetic": "MIK-RA-E-LEK-TRO-NI-KA",
            "translation": "Microelectronics"
      },
      {
            "id": "be-h76",
            "cyrillic": "РО-БА-ТА-ТЭХ-НА-ЛО-ГІ-І",
            "phonetic": "RO-BA-TA-TEKH-NA-LO-HI-I",
            "translation": "Robotics"
      },
      {
            "id": "be-h77",
            "cyrillic": "БІ-Я-ІН-ФАР-МА-ТЫ-КА",
            "phonetic": "BI-YA-IN-FAR-MA-TY-KA",
            "translation": "Bioinformatics"
      },
      {
            "id": "be-h78",
            "cyrillic": "ГЕ-НЕ-ТЫ-КА",
            "phonetic": "HYE-NYE-TY-KA",
            "translation": "Genetics"
      },
      {
            "id": "be-h79",
            "cyrillic": "НЕЎ-РА-ЛО-ГІ-Я",
            "phonetic": "NYEW-RA-LO-HI-YA",
            "translation": "Neurology"
      },
      {
            "id": "be-h80",
            "cyrillic": "КАР-ДЗІ-Я-ЛО-ГІ-Я",
            "phonetic": "KAR-DZI-YA-LO-HI-YA",
            "translation": "Cardiology"
      },
      {
            "id": "be-h81",
            "cyrillic": "ХІ-РУР-ГІ-Я",
            "phonetic": "KHI-RUR-HI-YA",
            "translation": "Surgery"
      },
      {
            "id": "be-h82",
            "cyrillic": "ПЕ-ДЗІ-Я-ТРЫ-Я",
            "phonetic": "PYE-DZI-YA-TRY-YA",
            "translation": "Pediatrics"
      },
      {
            "id": "be-h83",
            "cyrillic": "ФАР-МА-КА-ЛО-ГІ-Я",
            "phonetic": "FAR-MA-KA-LO-HI-YA",
            "translation": "Pharmacology"
      },
      {
            "id": "be-h84",
            "cyrillic": "І-МУ-НА-ЛО-ГІ-Я",
            "phonetic": "I-MU-NA-LO-HI-YA",
            "translation": "Immunology"
      },
      {
            "id": "be-h85",
            "cyrillic": "АФ-ТАЛЬ-МА-ЛО-ГІ-Я",
            "phonetic": "AF-TAL'-MA-LO-HI-YA",
            "translation": "Ophthalmology"
      },
      {
            "id": "be-h86",
            "cyrillic": "СТА-МА-ТА-ЛО-ГІ-Я",
            "phonetic": "STA-MA-TA-LO-HI-YA",
            "translation": "Dentistry"
      },
      {
            "id": "be-h87",
            "cyrillic": "ПСІ-ХІ-Я-ТРЫ-Я",
            "phonetic": "PSI-KHI-YA-TRY-YA",
            "translation": "Psychiatry"
      },
      {
            "id": "be-h88",
            "cyrillic": "ТЭ-РА-ПІ-Я",
            "phonetic": "TE-RA-PI-YA",
            "translation": "Therapy"
      },
      {
            "id": "be-h89",
            "cyrillic": "ДЫ-Я-ГНО-СТЫ-КА",
            "phonetic": "DY-YA-HNO-STY-KA",
            "translation": "Diagnostics"
      },
      {
            "id": "be-h90",
            "cyrillic": "ПРА-ФІ-ЛАК-ТЫ-КА",
            "phonetic": "PRA-FI-LAK-TY-KA",
            "translation": "Prevention"
      },
      {
            "id": "be-h91",
            "cyrillic": "РЭ-А-БІ-ЛІ-ТА-ЦЫ-Я",
            "phonetic": "RE-A-BI-LI-TA-TSY-YA",
            "translation": "Rehabilitation"
      },
      {
            "id": "be-h92",
            "cyrillic": "ФІ-ЗІ-Я-ТЭ-РА-ПІ-Я",
            "phonetic": "FI-ZI-YA-TE-RA-PI-YA",
            "translation": "Physiotherapy"
      },
      {
            "id": "be-h93",
            "cyrillic": "Э-ПІ-ДЭ-МІ-Я-ЛО-ГІ-Я",
            "phonetic": "E-PI-DE-MI-YA-LO-HI-YA",
            "translation": "Epidemiology"
      },
      {
            "id": "be-h94",
            "cyrillic": "ЭН-ДА-КРЫ-НА-ЛО-ГІ-Я",
            "phonetic": "EN-DA-KRY-NA-LO-HI-YA",
            "translation": "Endocrinology"
      },
      {
            "id": "be-h95",
            "cyrillic": "ДЭР-МА-ТА-ЛО-ГІ-Я",
            "phonetic": "DER-MA-TA-LO-HI-YA",
            "translation": "Dermatology"
      },
      {
            "id": "be-h96",
            "cyrillic": "АР-ТА-ПЕ-ДЗІ-Я",
            "phonetic": "AR-TA-PYE-DZI-YA",
            "translation": "Orthopedics"
      },
      {
            "id": "be-h97",
            "cyrillic": "ГЕ-МА-ТА-ЛО-ГІ-Я",
            "phonetic": "HYE-MA-TA-LO-HI-YA",
            "translation": "Hematology"
      },
      {
            "id": "be-h98",
            "cyrillic": "ОН-КА-ЛО-ГІ-Я",
            "phonetic": "ON-KA-LO-HI-YA",
            "translation": "Oncology"
      },
      {
            "id": "be-h99",
            "cyrillic": "І-МУ-НІ-ТЭТ",
            "phonetic": "I-MU-NI-TET",
            "translation": "Immunity"
      },
      {
            "id": "be-h100",
            "cyrillic": "А-НЭС-ТЭ-ЗІ-Я",
            "phonetic": "A-NES-TE-ZI-YA",
            "translation": "Anesthesia"
      },
      {
            "id": "be-h101",
            "cyrillic": "ФАР-МА-ЦЭЎ-ТЫ-КА",
            "phonetic": "FAR-MA-TSEW-TY-KA",
            "translation": "Pharmaceutics"
      },
      {
            "id": "be-h102",
            "cyrillic": "КАС-МЕ-ТА-ЛО-ГІ-Я",
            "phonetic": "KAS-MYE-TA-LO-HI-YA",
            "translation": "Cosmetology"
      },
      {
            "id": "be-h103",
            "cyrillic": "СА-НІ-ТА-РЫ-Я",
            "phonetic": "SA-NI-TA-RY-YA",
            "translation": "Sanitation"
      },
      {
            "id": "be-h104",
            "cyrillic": "ГІ-ГІ-Е-НА",
            "phonetic": "HI-HI-YE-NA",
            "translation": "Hygiene"
      },
      {
            "id": "be-h105",
            "cyrillic": "ВЫ-ТВОР-ЧАСЦЬ",
            "phonetic": "VY-TVOR-CHASTS'",
            "translation": "Production"
      },
      {
            "id": "be-h106",
            "cyrillic": "МА-ДЭР-НІ-ЗА-ЦЫ-Я",
            "phonetic": "MA-DER-NI-ZA-TSY-YA",
            "translation": "Modernization"
      },
      {
            "id": "be-h107",
            "cyrillic": "ІН-ВЕС-ТЫ-ЦЫ-І",
            "phonetic": "IN-VYES-TY-TSY-I",
            "translation": "Investments"
      },
      {
            "id": "be-h108",
            "cyrillic": "ФІ-НАН-СЫ",
            "phonetic": "FI-NAN-SY",
            "translation": "Finance"
      },
      {
            "id": "be-h109",
            "cyrillic": "БАН-КАЎ-СТВА",
            "phonetic": "BAN-KAW-STVA",
            "translation": "Banking"
      },
      {
            "id": "be-h110",
            "cyrillic": "БЮД-ЖЭТ",
            "phonetic": "BYUD-ZHYET",
            "translation": "Budget"
      },
      {
            "id": "be-h111",
            "cyrillic": "ПА-ДА-ТКА-АБ-КЛА-ДАН-НЕ",
            "phonetic": "PA-DA-TKA-AB-KLA-DAN-NYE",
            "translation": "Taxation"
      },
      {
            "id": "be-h112",
            "cyrillic": "СТРА-ХА-ВАН-НЕ",
            "phonetic": "STRA-KHA-VAN-NYE",
            "translation": "Insurance"
      },
      {
            "id": "be-h113",
            "cyrillic": "МАР-КЕ-ТЫНГ",
            "phonetic": "MAR-KYE-TYNG",
            "translation": "Marketing"
      },
      {
            "id": "be-h114",
            "cyrillic": "МЕ-НЕ-ДЖМЕНТ",
            "phonetic": "MYE-NYE-DZHMEN-T",
            "translation": "Management"
      },
      {
            "id": "be-h115",
            "cyrillic": "ЛА-ГІ-СТЫ-КА",
            "phonetic": "LA-HI-STY-KA",
            "translation": "Logistics"
      },
      {
            "id": "be-h116",
            "cyrillic": "ГАН-ДАЛЬ",
            "phonetic": "HAN-DAL'",
            "translation": "Trade / Commerce"
      },
      {
            "id": "be-h117",
            "cyrillic": "ЭК-СПАРТ",
            "phonetic": "EK-SPART",
            "translation": "Export"
      },
      {
            "id": "be-h118",
            "cyrillic": "ІМ-ПАРТ",
            "phonetic": "IM-PART",
            "translation": "Import"
      },
      {
            "id": "be-h119",
            "cyrillic": "КА-МЕР-ЦЫ-Я",
            "phonetic": "KA-MYER-TSY-YA",
            "translation": "Commerce"
      },
      {
            "id": "be-h120",
            "cyrillic": "ПРАД-ПРЫ-МАЛЬ-НІЦ-ТВА",
            "phonetic": "PRAD-PRY-MAL'-NITST-VA",
            "translation": "Entrepreneurship"
      },
      {
            "id": "be-h121",
            "cyrillic": "КАР-ПА-РА-ЦЫ-Я",
            "phonetic": "KAR-PA-RA-TSY-YA",
            "translation": "Corporation"
      },
      {
            "id": "be-h122",
            "cyrillic": "КА-А-ПЕ-РА-ЦЫ-Я",
            "phonetic": "KA-A-PYE-RA-TSY-YA",
            "translation": "Cooperation"
      },
      {
            "id": "be-h123",
            "cyrillic": "ПРЫ-ВА-ТЫ-ЗА-ЦЫ-Я",
            "phonetic": "PRY-VA-TY-ZA-TSY-YA",
            "translation": "Privatization"
      },
      {
            "id": "be-h124",
            "cyrillic": "НА-ЦЫ-Я-НА-ЛІ-ЗА-ЦЫ-Я",
            "phonetic": "NA-TSY-YA-NA-LI-ZA-TSY-YA",
            "translation": "Nationalization"
      },
      {
            "id": "be-h125",
            "cyrillic": "ІН-ФЛЯ-ЦЫ-Я",
            "phonetic": "IN-FLYA-TSY-YA",
            "translation": "Inflation"
      },
      {
            "id": "be-h126",
            "cyrillic": "ДЭ-ФЛЯ-ЦЫ-Я",
            "phonetic": "DE-FLYA-TSY-YA",
            "translation": "Deflation"
      },
      {
            "id": "be-h127",
            "cyrillic": "ВА-ЛЮ-ТА",
            "phonetic": "VA-LYU-TA",
            "translation": "Currency"
      },
      {
            "id": "be-h128",
            "cyrillic": "КРЭ-ДЫ-ТА-ВАН-НЕ",
            "phonetic": "KRE-DY-TA-VAN-NYE",
            "translation": "Crediting"
      },
      {
            "id": "be-h129",
            "cyrillic": "ІН-ВЕС-ТАР",
            "phonetic": "IN-VYES-TAR",
            "translation": "Investor"
      },
      {
            "id": "be-h130",
            "cyrillic": "АК-ЦЫ-Я-НЕР",
            "phonetic": "AK-TSY-YA-NYER",
            "translation": "Shareholder"
      },
      {
            "id": "be-h131",
            "cyrillic": "АБ-ЛІ-ГА-ЦЫ-Я",
            "phonetic": "AB-LI-HA-TSY-YA",
            "translation": "Bond"
      },
      {
            "id": "be-h132",
            "cyrillic": "КА-ПІ-ТАЛ",
            "phonetic": "KA-PI-TAL",
            "translation": "Capital"
      },
      {
            "id": "be-h133",
            "cyrillic": "ІН-ФРА-СТРУК-ТУ-РА",
            "phonetic": "IN-FRA-STRUK-TU-RA",
            "translation": "Infrastructure"
      },
      {
            "id": "be-h134",
            "cyrillic": "УР-БА-НІ-ЗА-ЦЫ-Я",
            "phonetic": "UR-BA-NI-ZA-TSY-YA",
            "translation": "Urbanization"
      },
      {
            "id": "be-h135",
            "cyrillic": "ДЭ-МА-ГРА-ФІ-Я",
            "phonetic": "DE-MA-HRA-FI-YA",
            "translation": "Demography"
      },
      {
            "id": "be-h136",
            "cyrillic": "МІ-ГРА-ЦЫ-Я",
            "phonetic": "MI-HRA-TSY-YA",
            "translation": "Migration"
      },
      {
            "id": "be-h137",
            "cyrillic": "Э-МІ-ГРА-ЦЫ-Я",
            "phonetic": "E-MI-HRA-TSY-YA",
            "translation": "Emigration"
      },
      {
            "id": "be-h138",
            "cyrillic": "І-МІ-ГРА-ЦЫ-Я",
            "phonetic": "I-MI-HRA-TSY-YA",
            "translation": "Immigration"
      },
      {
            "id": "be-h139",
            "cyrillic": "ГЛА-БА-ЛІ-ЗА-ЦЫ-Я",
            "phonetic": "HLA-BA-LI-ZA-TSY-YA",
            "translation": "Globalization"
      },
      {
            "id": "be-h140",
            "cyrillic": "ІН-ТЭ-ГРА-ЦЫ-Я",
            "phonetic": "IN-TE-HRA-TSY-YA",
            "translation": "Integration"
      },
      {
            "id": "be-h141",
            "cyrillic": "СУ-ВЕ-РЭ-НІ-ТЭТ",
            "phonetic": "SU-VYE-RE-NI-TET",
            "translation": "Sovereignty"
      },
      {
            "id": "be-h142",
            "cyrillic": "НЕ-ЗА-ЛЕЖ-НАСЦЬ",
            "phonetic": "NYE-ZA-LYEZH-NASTS'",
            "translation": "Independence"
      },
      {
            "id": "be-h143",
            "cyrillic": "ДЫ-ПЛА-МА-ЦЫ-Я",
            "phonetic": "DY-PLA-MA-TSY-YA",
            "translation": "Diplomacy"
      },
      {
            "id": "be-h144",
            "cyrillic": "АМ-БА-СА-ДА",
            "phonetic": "AM-BA-SA-DA",
            "translation": "Embassy"
      },
      {
            "id": "be-h145",
            "cyrillic": "КОН-СУЛЬ-СТВА",
            "phonetic": "KON-SUL'-STVA",
            "translation": "Consulate"
      },
      {
            "id": "be-h146",
            "cyrillic": "РА-ТЫ-ФІ-КА-ЦЫ-Я",
            "phonetic": "RA-TY-FI-KA-TSY-YA",
            "translation": "Ratification"
      },
      {
            "id": "be-h147",
            "cyrillic": "МЕ-МА-РАН-ДУМ",
            "phonetic": "MYE-MA-RAN-DUM",
            "translation": "Memorandum"
      },
      {
            "id": "be-h148",
            "cyrillic": "КАН-ВЕН-ЦЫ-Я",
            "phonetic": "KAN-VYES-TSY-YA",
            "translation": "Convention"
      },
      {
            "id": "be-h149",
            "cyrillic": "ДЭК-ЛА-РА-ЦЫ-Я",
            "phonetic": "DEK-LA-RA-TSY-YA",
            "translation": "Declaration"
      },
      {
            "id": "be-h150",
            "cyrillic": "РЭ-ЗА-ЛЮ-ЦЫ-Я",
            "phonetic": "RE-ZA-LYU-TSY-YA",
            "translation": "Resolution"
      },
      {
            "id": "be-h151",
            "cyrillic": "ПАР-ЛА-МЕНТ",
            "phonetic": "PAR-LA-MYENT",
            "translation": "Parliament"
      },
      {
            "id": "be-h152",
            "cyrillic": "ДЭ-ПУ-ТАТ",
            "phonetic": "DE-PU-TAT",
            "translation": "Deputy"
      },
      {
            "id": "be-h153",
            "cyrillic": "МІ-НІ-СТЭР-СТВА",
            "phonetic": "MI-NI-STER-STVA",
            "translation": "Ministry"
      },
      {
            "id": "be-h154",
            "cyrillic": "ВЕ-ДАМ-СТВА",
            "phonetic": "VYE-DAM-STVA",
            "translation": "Department / Agency"
      },
      {
            "id": "be-h155",
            "cyrillic": "АД-МІ-НІ-СТРА-ЦЫ-Я",
            "phonetic": "AD-MI-NI-STRA-TSY-YA",
            "translation": "Administration"
      },
      {
            "id": "be-h156",
            "cyrillic": "Ю-РЫС-ПРУ-ДЭН-ЦЫ-Я",
            "phonetic": "YU-RYS-PRU-DEN-TSY-YA",
            "translation": "Jurisprudence"
      },
      {
            "id": "be-h157",
            "cyrillic": "АД-ВА-КАТ",
            "phonetic": "AD-VA-KAT",
            "translation": "Lawyer / Advocate"
      },
      {
            "id": "be-h158",
            "cyrillic": "НА-ТА-РЫ-УС",
            "phonetic": "NA-TA-RY-US",
            "translation": "Notary"
      },
      {
            "id": "be-h159",
            "cyrillic": "ПРА-КУ-РОР",
            "phonetic": "PRA-KU-ROR",
            "translation": "Prosecutor"
      },
      {
            "id": "be-h160",
            "cyrillic": "СУ-ДОЎ-ЦА",
            "phonetic": "SU-DOW-TSA",
            "translation": "Judge"
      },
      {
            "id": "be-h161",
            "cyrillic": "АР-БІ-ТРАЖ",
            "phonetic": "AR-BI-TRAZH",
            "translation": "Arbitration"
      },
      {
            "id": "be-h162",
            "cyrillic": "КРЫ-МІ-НА-ЛІ-СТЫ-КА",
            "phonetic": "KRY-MI-NA-LI-STY-KA",
            "translation": "Criminology"
      },
      {
            "id": "be-h163",
            "cyrillic": "ЭК-СПЕР-ТЫ-ЗА",
            "phonetic": "EK-SPYER-TY-ZA",
            "translation": "Expertise / Examination"
      },
      {
            "id": "be-h164",
            "cyrillic": "ГРА-МА-ДЗЯН-СТВА",
            "phonetic": "HRA-MA-DZYAN-STVA",
            "translation": "Citizenship"
      },
      {
            "id": "be-h165",
            "cyrillic": "ПАШ-ПАРТ",
            "phonetic": "PASH-PART",
            "translation": "Passport"
      },
      {
            "id": "be-h166",
            "cyrillic": "ВІ-ЗА",
            "phonetic": "VI-ZA",
            "translation": "Visa"
      },
      {
            "id": "be-h167",
            "cyrillic": "РЭ-ГІ-СТРА-ЦЫ-Я",
            "phonetic": "RE-HI-STRA-TSY-YA",
            "translation": "Registration"
      },
      {
            "id": "be-h168",
            "cyrillic": "ДЭК-РЭТ",
            "phonetic": "DEK-RET",
            "translation": "Decree"
      },
      {
            "id": "be-h169",
            "cyrillic": "У-КАЗ",
            "phonetic": "U-KAZ",
            "translation": "Edict / Order"
      },
      {
            "id": "be-h170",
            "cyrillic": "ПА-СТА-НО-ВА",
            "phonetic": "PA-STA-NO-VA",
            "translation": "Resolution / Decision"
      },
      {
            "id": "be-h171",
            "cyrillic": "ІН-СТРУК-ЦЫ-Я",
            "phonetic": "IN-STRUK-TSY-YA",
            "translation": "Instruction"
      },
      {
            "id": "be-h172",
            "cyrillic": "РЭ-ГЛА-МЕНТ",
            "phonetic": "RE-HLA-MYENT",
            "translation": "Regulation"
      },
      {
            "id": "be-h173",
            "cyrillic": "СТАН-ДАР-ТЫ-ЗА-ЦЫ-Я",
            "phonetic": "STAN-DAR-TY-ZA-TSY-YA",
            "translation": "Standardization"
      },
      {
            "id": "be-h174",
            "cyrillic": "СЕР-ТЫ-ФІ-КА-ЦЫ-Я",
            "phonetic": "SYER-TY-FI-KA-TSY-YA",
            "translation": "Certification"
      },
      {
            "id": "be-h175",
            "cyrillic": "АК-РЭ-ДЫ-ТА-ЦЫ-Я",
            "phonetic": "AK-RE-DY-TA-TSY-YA",
            "translation": "Accreditation"
      },
      {
            "id": "be-h176",
            "cyrillic": "ЛІ-ЦЭН-ЗА-ВАН-НЕ",
            "phonetic": "LI-TSEN-ZA-VAN-NYE",
            "translation": "Licensing"
      },
      {
            "id": "be-h177",
            "cyrillic": "АЎ-ДЫТ",
            "phonetic": "AW-DYT",
            "translation": "Audit"
      },
      {
            "id": "be-h178",
            "cyrillic": "КАН-ТРОЛЬ",
            "phonetic": "KAN-TROL'",
            "translation": "Control"
      },
      {
            "id": "be-h179",
            "cyrillic": "МА-НІ-ТО-РЫНГ",
            "phonetic": "MA-NI-TO-RYNG",
            "translation": "Monitoring"
      },
      {
            "id": "be-h180",
            "cyrillic": "А-НА-ЛІ-ТЫ-КА",
            "phonetic": "A-NA-LI-TY-KA",
            "translation": "Analytics"
      },
      {
            "id": "be-h181",
            "cyrillic": "ПРА-ГНА-ЗА-ВАН-НЕ",
            "phonetic": "PRA-HNA-ZA-VAN-NYE",
            "translation": "Forecasting"
      },
      {
            "id": "be-h182",
            "cyrillic": "СТРА-ТЭ-ГІ-Я",
            "phonetic": "STRA-TE-HI-YA",
            "translation": "Strategy"
      },
      {
            "id": "be-h183",
            "cyrillic": "ТАК-ТЫ-КА",
            "phonetic": "TAK-TY-KA",
            "translation": "Tactics"
      },
      {
            "id": "be-h184",
            "cyrillic": "КАН-ЦЭП-ЦЫ-Я",
            "phonetic": "KAN-TSEP-TSY-YA",
            "translation": "Concept"
      },
      {
            "id": "be-h185",
            "cyrillic": "ПРА-ЕКТ",
            "phonetic": "PRA-YEVT",
            "translation": "Project"
      },
      {
            "id": "be-h186",
            "cyrillic": "ПРА-ГРА-МА",
            "phonetic": "PRA-HRA-MA",
            "translation": "Program"
      },
      {
            "id": "be-h187",
            "cyrillic": "І-НІ-ЦЫ-Я-ТЫ-ВА",
            "phonetic": "I-NI-TSY-YA-TY-VA",
            "translation": "Initiative"
      },
      {
            "id": "be-h188",
            "cyrillic": "МЕ-РА-ПРЫ-ЕМ-СТВА",
            "phonetic": "MYE-RA-PRY-YEM-STVA",
            "translation": "Event / Measure"
      },
      {
            "id": "be-h189",
            "cyrillic": "КАН-ФЕ-РЭН-ЦЫ-Я",
            "phonetic": "KAN-FYE-REN-TSY-YA",
            "translation": "Conference"
      },
      {
            "id": "be-h190",
            "cyrillic": "СІМ-ПО-ЗІ-УМ",
            "phonetic": "SIM-PO-ZI-UM",
            "translation": "Symposium"
      },
      {
            "id": "be-h191",
            "cyrillic": "ФО-РУМ",
            "phonetic": "FO-RUM",
            "translation": "Forum"
      },
      {
            "id": "be-h192",
            "cyrillic": "СЕ-МІ-НАР",
            "phonetic": "SYE-MI-NAR",
            "translation": "Seminar"
      },
      {
            "id": "be-h193",
            "cyrillic": "ТРЭ-НІНГ",
            "phonetic": "TRE-NING",
            "translation": "Training"
      },
      {
            "id": "be-h194",
            "cyrillic": "ПРЭ-ЗЕН-ТА-ЦЫ-Я",
            "phonetic": "PRE-ZYEN-TA-TSY-YA",
            "translation": "Presentation"
      },
      {
            "id": "be-h195",
            "cyrillic": "ДЫ-СКУ-СІ-Я",
            "phonetic": "DY-SKU-SI-YA",
            "translation": "Discussion"
      },
      {
            "id": "be-h196",
            "cyrillic": "ДЭ-БА-ТЫ",
            "phonetic": "DE-BA-TY",
            "translation": "Debates"
      },
      {
            "id": "be-h197",
            "cyrillic": "КРУГ-ЛЫ СТОЛ",
            "phonetic": "KRUH-LY STOL",
            "translation": "Round table"
      },
      {
            "id": "be-h198",
            "cyrillic": "КАН-СУЛЬ-ТА-ЦЫ-Я",
            "phonetic": "KAN-SUL'-TA-TSY-YA",
            "translation": "Consultation"
      },
      {
            "id": "be-h199",
            "cyrillic": "ВЫ-НІ-КА-ВАСЦЬ",
            "phonetic": "VY-NI-KA-VASTS'",
            "translation": "Effectiveness"
      },
      {
            "id": "be-h200",
            "cyrillic": "Э-ФЕК-ТЫЎ-НАСЦЬ",
            "phonetic": "E-FYEK-TYW-NASTS'",
            "translation": "Efficiency"
      },
      {
            "id": "be-h201",
            "cyrillic": "ПРА-ДУК-ТЫЎ-НАСЦЬ",
            "phonetic": "PRA-DUK-TYW-NASTS'",
            "translation": "Productivity"
      },
      {
            "id": "be-h202",
            "cyrillic": "Я-КАСЦЬ",
            "phonetic": "YA-KASTS'",
            "translation": "Quality"
      },
      {
            "id": "be-h203",
            "cyrillic": "НА-ДЗЕЙ-НАСЦЬ",
            "phonetic": "NA-DZEY-NASTS'",
            "translation": "Reliability"
      },
      {
            "id": "be-h204",
            "cyrillic": "БЯС-ПЕ-КА",
            "phonetic": "BYAS-PYE-KA",
            "translation": "Security"
      },
      {
            "id": "be-h205",
            "cyrillic": "УС-ТОЙ-ЛІ-ВАСЦЬ",
            "phonetic": "US-TOY-LI-VASTS'",
            "translation": "Sustainability"
      },
      {
            "id": "be-h206",
            "cyrillic": "РАЗ-ВІЦ-ЦЁ",
            "phonetic": "RAZ-VIT-SYO",
            "translation": "Development"
      },
      {
            "id": "be-h207",
            "cyrillic": "ПРА-ГРЭС",
            "phonetic": "PRA-HRES",
            "translation": "Progress"
      },
      {
            "id": "be-h208",
            "cyrillic": "І-НА-ВА-ЦЫ-І",
            "phonetic": "I-NA-VA-TSY-I",
            "translation": "Innovations"
      }
]
  }
};

interface ReadingTrainerProps {
  langId?: string;
}

export function ReadingTrainer({ langId: langIdProp }: ReadingTrainerProps = {}) {
  const { lang } = useParams();
  const langId = langIdProp || lang || 'ru';
  
  const [level, setLevel] = useState<ReadingLevel>('easy');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const currentList = READING_DATA[langId]?.[level] || READING_DATA['ru'][level];
  const item: ReadingItem = currentList[currentIndex] || currentList[0];

  // Pick a random index when level changes or component mounts
  useEffect(() => {
    const list = READING_DATA[langId]?.[level] || READING_DATA['ru'][level];
    const randomIdx = Math.floor(Math.random() * list.length);
    setCurrentIndex(randomIdx);
    setRevealed(false);
  }, [level, langId]);

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

  const wiktionaryLang = langId === 'be' ? 'Belarusian' : 'Russian';

  return (
    <div className="flex flex-col items-center p-8 bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] relative">
      {/* Level selector tabs */}
      <div className="flex gap-2 mb-8 w-full max-w-md">
        {(['easy', 'medium', 'hard'] as ReadingLevel[]).map((lvl) => {
          const count = (READING_DATA[langId]?.[lvl] || READING_DATA['ru'][lvl]).length;
          return (
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
              {lvl === 'easy' ? `Easy (${count})` : lvl === 'medium' ? `Medium (${count})` : `Hard (${count})`}
            </button>
          );
        })}
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
              href={`https://en.wiktionary.org/wiki/${encodeURIComponent(item.cyrillic.replace(/[-'’]/g, '').toLowerCase())}#${wiktionaryLang}`}
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
