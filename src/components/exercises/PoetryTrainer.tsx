import { useState, useEffect } from 'react';
import { ArrowRight, Eye } from 'lucide-react';

export interface PoetryItem {
  id: string;
  title: string;
  lines: string[];
  translationLines: string[];
  mainWord: string;
}

export const POETRY_DATA: PoetryItem[] = [
  {
    id: 'p1',
    title: 'Наша Таня (Agniya Barto)',
    lines: [
      'Наша Таня громко плачет:',
      'Уронила в речку мячик.',
      'Тише, Танечка, не плачь:',
      'Не утонет в речке мяч.'
    ],
    translationLines: [
      'Our Tanya is crying loudly:',
      'She dropped her ball into the river.',
      'Hush, Tanyachka, don\'t cry:',
      'The ball won\'t sink in the river.'
    ],
    mainWord: 'мяч'
  },
  {
    id: 'p2',
    title: 'Мишка (Agniya Barto)',
    lines: [
      'Уронили мишку на пол,',
      'Оторвали мишке лапу.',
      'Всё равно его не брошу —',
      'Потому что он хороший.'
    ],
    translationLines: [
      'They dropped the teddy bear on the floor,',
      'They tore off the teddy bear\'s paw.',
      'I won\'t abandon him anyway —',
      'Because he is a good one.'
    ],
    mainWord: 'мишка'
  },
  {
    id: 'p3',
    title: 'Бычок (Agniya Barto)',
    lines: [
      'Идёт бычок, качается,',
      'Вздыхает на ходу:',
      '— Ох, доска кончается,',
      'Сейчас я упаду!'
    ],
    translationLines: [
      'The little bull walks, wobbling,',
      'Sighing as he goes:',
      '— Oh, the board is ending,',
      'Now I am going to fall!'
    ],
    mainWord: 'бычок'
  },
  {
    id: 'p4',
    title: 'Зайка (Agniya Barto)',
    lines: [
      'Зайку бросила хозяйка, —',
      'Под дождём остался зайка.',
      'Со скамейки слезть не мог,',
      'Весь до ниточки промок.'
    ],
    translationLines: [
      'The hostess abandoned the bunny, —',
      'The bunny was left out in the rain.',
      'He couldn\'t climb off the bench,',
      'He got soaked to the skin.'
    ],
    mainWord: 'зайка'
  },
  {
    id: 'p5',
    title: 'Лошадка (Agniya Barto)',
    lines: [
      'Я люблю свою лошадку,',
      'Причёшу ей шёрстку гладко,',
      'Гребешком приглажу хвостик',
      'И верхом поеду в гости.'
    ],
    translationLines: [
      'I love my little horse,',
      'I will comb her coat smooth,',
      'I will smooth her tail with a comb',
      'And ride her to visit friends.'
    ],
    mainWord: 'лошадка'
  },
  {
    id: 'p6',
    title: 'Самолет (Agniya Barto)',
    lines: [
      'Самолет построим сами,',
      'Понесемся над лесами.',
      'Понесемся над лесами,',
      'А потом вернемся к маме.'
    ],
    translationLines: [
      'We will build an airplane ourselves,',
      'We will zoom over the forests.',
      'We will zoom over the forests,',
      'And then return to mom.'
    ],
    mainWord: 'самолет'
  },
  {
    id: 'p7',
    title: 'Кораблик (Agniya Barto)',
    lines: [
      'Матросская шапка,',
      'Верёвка в руке,',
      'Тяну я кораблик',
      'По быстрой реке.'
    ],
    translationLines: [
      'A sailor\'s cap,',
      'A rope in my hand,',
      'I pull a little boat',
      'Along the fast river.'
    ],
    mainWord: 'кораблик'
  },
  {
    id: 'p8',
    title: 'Спать пора (Agniya Barto)',
    lines: [
      'Спать пора! Уснул бычок,',
      'Лёг в коробку на бочок.',
      'Сонный мишка лег в кровать,',
      'Только слон не хочет спать.'
    ],
    translationLines: [
      'Time to sleep! The bull fell asleep,',
      'Lay in the box on his side.',
      'The sleepy bear lay in bed,',
      'Only the elephant doesn\'t want to sleep.'
    ],
    mainWord: 'слон'
  },
  {
    id: 'p9',
    title: 'Солнышко (Folklore)',
    lines: [
      'Солнышко, солнышко,',
      'Выгляни в окошко!',
      'Там детки сидят,',
      'На тебя глядят.'
    ],
    translationLines: [
      'Little sun, little sun,',
      'Peek out the window!',
      'The kids are sitting there,',
      'Looking at you.'
    ],
    mainWord: 'солнышко'
  },
  {
    id: 'p10',
    title: 'Гуси-гуси (Folklore)',
    lines: [
      'Гуси, гуси! — Га-га-га!',
      'Есть хотите? — Да-да-да!',
      'Ну, летите же домой!',
      'Серый волк под горой!'
    ],
    translationLines: [
      'Geese, geese! — Ga-ga-ga!',
      'Do you want to eat? — Yes-yes-yes!',
      'Well, fly back home!',
      'The grey wolf is under the hill!'
    ],
    mainWord: 'гуси'
  },
  {
    id: 'p11',
    title: 'Два гуся (Folklore)',
    lines: [
      'Жили у бабуси',
      'Два весёлых гуся:',
      'Один — серый, другой — белый,',
      'Два весёлых гуся!'
    ],
    translationLines: [
      'Grandma had living with her',
      'Two cheerful geese:',
      'One grey, the other white,',
      'Two cheerful geese!'
    ],
    mainWord: 'бабуся'
  },
  {
    id: 'p12',
    title: 'Мишка косолапый (Folklore)',
    lines: [
      'Мишка косолапый',
      'По лесу идёт,',
      'Шишки собирает,',
      'Песенку поёт.'
    ],
    translationLines: [
      'The clumsy teddy bear',
      'Walks through the forest,',
      'Gathers pinecones,',
      'Sings a little song.'
    ],
    mainWord: 'шишка'
  },
  {
    id: 'p13',
    title: 'Ехали медведи (Kornei Chukovsky)',
    lines: [
      'Ехали медведи',
      'На велосипеде.',
      'А за ними кот',
      'Задом наперед.'
    ],
    translationLines: [
      'The bears were riding',
      'On a bicycle.',
      'And behind them a cat',
      'Backwards.'
    ],
    mainWord: 'медведь'
  },
  {
    id: 'p14',
    title: 'Мама мыла раму (Simple Sentence)',
    lines: [
      'Мама мыла раму.',
      'Рама чистая теперь.',
      'Вот мыло и вода.'
    ],
    translationLines: [
      'Mom washed the window frame.',
      'The frame is clean now.',
      'Here are soap and water.'
    ],
    mainWord: 'рама'
  },
  {
    id: 'p15',
    title: 'Кот на ковре (Short Rhyme)',
    lines: [
      'Кот катился по ковру,',
      'Видел мышку поутру.',
      'Мышка спряталась в нору.'
    ],
    translationLines: [
      'The cat rolled on the carpet,',
      'Saw a mouse in the morning.',
      'The mouse hid in the hole.'
    ],
    mainWord: 'ковер'
  },
  {
    id: 'p16',
    title: 'Ворона (Agniya Barto)',
    lines: [
      'Ворона смолкает,',
      'На ветке дремлет,',
      'Носом в крыло.'
    ],
    translationLines: [
      'The crow falls silent,',
      'Slumbers on the branch,',
      'Beak tucked in her wing.'
    ],
    mainWord: 'ворона'
  },
  {
    id: 'p17',
    title: 'Снегирь (Agniya Barto)',
    lines: [
      'Сел на ветку снегирь,',
      'Красный животик.',
      'А за окном метель.'
    ],
    translationLines: [
      'A bullfinch sat on a branch,',
      'A red little belly.',
      'And outside the window a blizzard.'
    ],
    mainWord: 'снегирь'
  },
  {
    id: 'p18',
    title: 'Козлёнок (Agniya Barto)',
    lines: [
      'У меня живёт козлёнок,',
      'Я сама его пасу.',
      'Я козлёнка в сад зелёный',
      'Рано утром отнесу.'
    ],
    translationLines: [
      'I have a little goat,',
      'I herd him myself.',
      'I will take the goat to the green garden',
      'Early in the morning.'
    ],
    mainWord: 'козленок'
  },
  {
    id: 'p19',
    title: 'Флажок (Agniya Barto)',
    lines: [
      'Горит на солнце флажок,',
      'Как будто я огонь зажёг.'
    ],
    translationLines: [
      'The flag shines in the sun,',
      'As if I lit a fire.'
    ],
    mainWord: 'флажок'
  },
  {
    id: 'p20',
    title: 'Грузовик (Agniya Barto)',
    lines: [
      'Нет, напрасно мы решили',
      'Катать кота в машине:',
      'Кот кататься не привык —',
      'Опрокинул грузовик.'
    ],
    translationLines: [
      'No, in vain we decided',
      'To ride the cat in the car:',
      'The cat is not used to riding —',
      'He overturned the truck.'
    ],
    mainWord: 'грузовик'
  },
  {
    id: 'p21',
    title: 'Мячик (Short Rhyme)',
    lines: [
      'Мой весёлый звонкий мяч,',
      'Ты куда помчался вскачь?'
    ],
    translationLines: [
      'My cheerful ringing ball,',
      'Where did you rush off galloping?'
    ],
    mainWord: 'мяч'
  },
  {
    id: 'p22',
    title: 'Петушок (Folklore)',
    lines: [
      'Петушок, петушок,',
      'Золотой гребешок,',
      'Масляна головушка,',
      'Шёлкова бородушка!'
    ],
    translationLines: [
      'Cockerel, cockerel,',
      'Golden comb,',
      'Butter head,',
      'Silken beard!'
    ],
    mainWord: 'петушок'
  },
  {
    id: 'p23',
    title: 'Сорока-белобока (Folklore)',
    lines: [
      'Сорока-белобока',
      'Кашу варила,',
      'Деток кормила.'
    ],
    translationLines: [
      'The magpie white-side',
      'Cooked porridge,',
      'Fed the children.'
    ],
    mainWord: 'сорока'
  },
  {
    id: 'p24',
    title: 'Идёт коза рогатая (Folklore)',
    lines: [
      'Идёт коза рогатая',
      'За малыми ребятами.',
      'Кто кашу не ест,',
      'Того буц, буц!'
    ],
    translationLines: [
      'Here comes the horned goat',
      'After the little kids.',
      'Whoever doesn\'t eat porridge,',
      'He butt-butts!'
    ],
    mainWord: 'коза'
  },
  {
    id: 'p25',
    title: 'Ладушки (Folklore)',
    lines: [
      'Ладушки, ладушки!',
      'Где были? — У бабушки!',
      'Что ели? — Кашку!',
      'Что пили? — Бражку!'
    ],
    translationLines: [
      'Pat-a-cake, pat-a-cake!',
      'Where were you? — At grandma\'s!',
      'What did you eat? — Porridge!',
      'What did you drink? — Sweet drink!'
    ],
    mainWord: 'ладушки'
  },
  {
    id: 'p26',
    title: 'Каравай (Folklore)',
    lines: [
      'Как на наши именины',
      'Испекли мы каравай.',
      'Вот такой вышины,',
      'Вот такой нижины!'
    ],
    translationLines: [
      'On our name day',
      'We baked a loaf of bread.',
      'This high,',
      'This low!'
    ],
    mainWord: 'каравай'
  },
  {
    id: 'p27',
    title: 'Оладушки (Folklore)',
    lines: [
      'Бабушка оладушки',
      'Пекала на маслице.',
      'Получились сладкие,',
      'Да очень гладкие.'
    ],
    translationLines: [
      'Grandma pancakes',
      'Baked in butter.',
      'They turned out sweet,',
      'And very smooth.'
    ],
    mainWord: 'оладьи'
  },
  {
    id: 'p28',
    title: 'Тень-тень (Folklore)',
    lines: [
      'Тень-тень, потетень,',
      'Выше города плетень.',
      'Сели звери под плетень,',
      'Похвалялися весь день.'
    ],
    translationLines: [
      'Shadow-shadow, shadow-all,',
      'Higher than the city fence.',
      'Animals sat under the fence,',
      'Boasted all day.'
    ],
    mainWord: 'звери'
  },
  {
    id: 'p29',
    title: 'Зайчик (Folklore)',
    lines: [
      'Заинка, попляши,',
      'Серый, поскачи!',
      'Зайка поплясал,',
      'Серый поскакал.'
    ],
    translationLines: [
      'Little bunny, dance a bit,',
      'Grey one, hop along!',
      'Bunny danced,',
      'Grey one hopped along.'
    ],
    mainWord: 'заяц'
  },
  {
    id: 'p30',
    title: 'Воробей (Simple Poem)',
    lines: [
      'Чик-чирик, воробей,',
      'Позови своих друзей!',
      'Поклюем мы крошки',
      'Прямо на дорожке.'
    ],
    translationLines: [
      'Chirp-chirp, sparrow,',
      'Call your friends!',
      'We will peck crumbs',
      'Right on the path.'
    ],
    mainWord: 'воробей'
  },
  {
    id: 'p31',
    title: 'Синичка (Simple Poem)',
    lines: [
      'Синичка-синичка,',
      'Маленькая птичка.',
      'Прилетала в сад,',
      'Каждый ей рад.'
    ],
    translationLines: [
      'Tomtit, tomtit,',
      'Little bird.',
      'Flew into the garden,',
      'Everyone is glad to see her.'
    ],
    mainWord: 'синичка'
  },
  {
    id: 'p32',
    title: 'Дождик (Folklore)',
    lines: [
      'Дождик, дождик, пуще!',
      'Дам тебе я гущи,',
      'Дам тебе ложку,',
      'Кушай понемножку!'
    ],
    translationLines: [
      'Rain, rain, pour harder!',
      'I\'ll give you thick porridge,',
      'I\'ll give you a spoon,',
      'Eat a little at a time!'
    ],
    mainWord: 'дождь'
  },
  {
    id: 'p33',
    title: 'Радуга (Folklore)',
    lines: [
      'Радуга-дуга,',
      'Не давай дождя,',
      'Давай солнышко,',
      'Колоколнышко!'
    ],
    translationLines: [
      'Rainbow-arc,',
      'Don\'t give rain,',
      'Give sunshine,',
      'Little bell!'
    ],
    mainWord: 'радуга'
  },
  {
    id: 'p34',
    title: 'Солнечный зайчик (Simple Poem)',
    lines: [
      'Скачет зайчик по стене',
      'И моргает мне.',
      'Прыг на стол, на диван,',
      'Забрался в карман.'
    ],
    translationLines: [
      'A sunbeam skips on the wall',
      'And winks at me.',
      'Jump on table, on sofa,',
      'Climbed into pocket.'
    ],
    mainWord: 'стена'
  },
  {
    id: 'p35',
    title: 'Ёжик (Simple Poem)',
    lines: [
      'Ходит ёжик без дорожек,',
      'У него колючий бочок.',
      'На иголках несёт грибок,',
      'Прямо в свой уголок.'
    ],
    translationLines: [
      'Hedgehog walks without paths,',
      'He has a prickly side.',
      'On his needles he carries a mushroom,',
      'Straight into his corner.'
    ],
    mainWord: 'ёж'
  },
  {
    id: 'p36',
    title: 'Белочка (Simple Poem)',
    lines: [
      'Белка прыгает по веткам,',
      'Носит орешки деткам.',
      'А в дупле тепло,',
      'Сухо и светло.'
    ],
    translationLines: [
      'Squirrel jumps on branches,',
      'Carries nuts to children.',
      'And in the hollow it\'s warm,',
      'Dry and bright.'
    ],
    mainWord: 'белка'
  },
  {
    id: 'p37',
    title: 'Лиса (Simple Poem)',
    lines: [
      'Лисичка-сестричка',
      'По лесу бежала,',
      'Хвостиком виляла,',
      'Следы заметала.'
    ],
    translationLines: [
      'Foxy-sister',
      'Ran through the forest,',
      'Wagged her tail,',
      'Swept her tracks.'
    ],
    mainWord: 'лиса'
  },
  {
    id: 'p38',
    title: 'Волк (Simple Poem)',
    lines: [
      'Серый волк в лесу гуляет,',
      'Никого не обижает.',
      'Ищет где лужайка,',
      'Там где скачет зайка.'
    ],
    translationLines: [
      'Grey wolf walks in forest,',
      'Offends no one.',
      'Looks for the meadow,',
      'Where the bunny hops.'
    ],
    mainWord: 'волк'
  },
  {
    id: 'p39',
    title: 'Колобок (Folklore)',
    lines: [
      'Я колобок, колобок,',
      'По амбару метён,',
      'По сусекам скоблён,',
      'На сметане мешён.'
    ],
    translationLines: [
      'I am Kolobok, Kolobok,',
      'Swept along the barn,',
      'Scraped from bins,',
      'Kneaded with sour cream.'
    ],
    mainWord: 'колобок'
  },
  {
    id: 'p40',
    title: 'Теремок (Folklore)',
    lines: [
      'Стоит в поле теремок,',
      'Он не низок, не высок.',
      'Кто в теремке живёт?',
      'Кто в невысоком живёт?'
    ],
    translationLines: [
      'There is a little house in field,',
      'It\'s not low, not high.',
      'Who lives in the house?',
      'Who lives in the low one?'
    ],
    mainWord: 'теремок'
  },
  {
    id: 'p41',
    title: 'Репка (Folklore)',
    lines: [
      'Посадил дед репку.',
      'Выросла репка большая-пребольшая.',
      'Тянет-потянет,',
      'Вытянуть не может.'
    ],
    translationLines: [
      'Grandpa planted a turnip.',
      'The turnip grew huge.',
      'Pulls and pulls,',
      'Can\'t pull it out.'
    ],
    mainWord: 'репка'
  },
  {
    id: 'p42',
    title: 'Курочка Ряба (Folklore)',
    lines: [
      'Жили-были дед да баба.',
      'И была у них курочка Ряба.',
      'Снесла курочка яйцо,',
      'Яйцо не простое — золотое.'
    ],
    translationLines: [
      'Once lived grandpa and grandma.',
      'And they had Ryaba chicken.',
      'Chicken laid an egg,',
      'Egg not simple — golden.'
    ],
    mainWord: 'яйцо'
  },
  {
    id: 'p43',
    title: 'Мышка (Simple Poem)',
    lines: [
      'Мышка вылезла из норки,',
      'Ищет хлебушка корочки.',
      'Тихо-тихо бежит,',
      'Никого не смешит.'
    ],
    translationLines: [
      'Mouse climbed out of hole,',
      'Looks for bread crusts.',
      'Runs very quietly,',
      'Makes no one laugh.'
    ],
    mainWord: 'мышь'
  },
  {
    id: 'p44',
    title: 'Сова (Simple Poem)',
    lines: [
      'Сова-сова, большая голова,',
      'На суку сидит,',
      'Головой вертит,',
      'Во все стороны глядит.'
    ],
    translationLines: [
      'Owl-owl, big head,',
      'Sits on a bough,',
      'Turns her head,',
      'Looks in all directions.'
    ],
    mainWord: 'сова'
  },
  {
    id: 'p45',
    title: 'Дятел (Simple Poem)',
    lines: [
      'Дятел на дубу сидит,',
      'Дятел дерево долбит:',
      'Тук-тук-тук, тук-тук-тук,',
      'Я лечу деревья, друг!'
    ],
    translationLines: [
      'Woodpecker sits on oak,',
      'Woodpecker pecks tree:',
      'Knock-knock-knock,',
      'I heal trees, friend!'
    ],
    mainWord: 'дятел'
  },
  {
    id: 'p46',
    title: 'Светлячок (Simple Poem)',
    lines: [
      'Светит ночью светлячок,',
      'Будто малый маячок.',
      'В темноте горит огонь,',
      'Ты его не тронь.'
    ],
    translationLines: [
      'Firefly shines at night,',
      'Like a small lighthouse.',
      'Fire burns in dark,',
      'Don\'t touch it.'
    ],
    mainWord: 'светлячок'
  },
  {
    id: 'p47',
    title: 'Жук (Simple Poem)',
    lines: [
      'Жук упал и встать не может,',
      'Ждёт, кто жуку поможет.',
      'Я к жучку подойду,',
      'На ноги переверну.'
    ],
    translationLines: [
      'Beetle fell and can\'t get up,',
      'Waits for help.',
      'I\'ll approach beetle,',
      'Turn him on his feet.'
    ],
    mainWord: 'жук'
  },
  {
    id: 'p48',
    title: 'Бабочка (Simple Poem)',
    lines: [
      'Бабочка-красавица,',
      'Где ты летала?',
      'Я по саду весело',
      'Целый день порхала.'
    ],
    translationLines: [
      'Beautiful butterfly,',
      'Where did you fly?',
      'I fluttered happily in garden',
      'All day long.'
    ],
    mainWord: 'бабочка'
  },
  {
    id: 'p49',
    title: 'Пчелка (Simple Poem)',
    lines: [
      'Пчёлка, пчёлка, покружи,',
      'Где цветок сладкий покажи!',
      'Собирает она мёд,',
      'В улей свой его несёт.'
    ],
    translationLines: [
      'Bee, bee, spin around,',
      'Show where sweet flower is!',
      'She gathers honey,',
      'Carries it into her hive.'
    ],
    mainWord: 'пчела'
  },
  {
    id: 'p50',
    title: 'Улитка (Simple Poem)',
    lines: [
      'Улитка, улитка,',
      'Высуни рога!',
      'Дам тебе я сахара,',
      'Кусочек пирога.'
    ],
    translationLines: [
      'Snail, snail,',
      'Stick out horns!',
      'I\'ll give you sugar,',
      'A piece of pie.'
    ],
    mainWord: 'улитка'
  },
  {
    id: 'p51',
    title: 'Лягушка (Simple Poem)',
    lines: [
      'На болоте две лягушки,',
      'Две зелёные подружки,',
      'Утром рано умывались,',
      'Полотенцем растирались.'
    ],
    translationLines: [
      'In marsh two frogs,',
      'Two green friends,',
      'Washed early in morning,',
      'Rubbed with towel.'
    ],
    mainWord: 'лягушка'
  },
  {
    id: 'p52',
    title: 'Рыбка (Simple Poem)',
    lines: [
      'Рыбка плавает в воде,',
      'Рыбке весело в пруду.',
      'Никому её не поймать,',
      'Будет в глубине играть.'
    ],
    translationLines: [
      'Fish swims in water,',
      'Fish is happy in pond.',
      'No one can catch her,',
      'She will play in depths.'
    ],
    mainWord: 'рыба'
  },
  {
    id: 'p53',
    title: 'Щенок (Simple Poem)',
    lines: [
      'У меня есть маленький щенок,',
      'Он бежит ко мне со всех ног.',
      'Машет хвостиком любя,',
      'Очень я люблю тебя.'
    ],
    translationLines: [
      'I have a little puppy,',
      'He runs to me as fast as he can.',
      'Wags tail lovingly,',
      'I love you very much.'
    ],
    mainWord: 'щенок'
  },
  {
    id: 'p54',
    title: 'Котёнок (Simple Poem)',
    lines: [
      'Пушистый котёнок',
      'Пьёт из блюдца молоко.',
      'Заурчит тихонько,',
      'Спится ему легко.'
    ],
    translationLines: [
      'Fluffy kitten',
      'Drinks milk from saucer.',
      'Purrs softly,',
      'Sleeps easily.'
    ],
    mainWord: 'котенок'
  },
  {
    id: 'p55',
    title: 'Хомячок (Simple Poem)',
    lines: [
      'Хомячок, хомячок,',
      'Серая спинка.',
      'Щёки дует на ходу,',
      'Прячет зернышки в гнёздышко.'
    ],
    translationLines: [
      'Hamster, hamster,',
      'Grey back.',
      'Puffs cheeks walking,',
      'Hides seeds in nest.'
    ],
    mainWord: 'хомяк'
  },
  {
    id: 'p56',
    title: 'Уточка (Simple Poem)',
    lines: [
      'Уточка-крякушка',
      'Плывёт по реке.',
      'За нею утята',
      'Плывут вдалеке.'
    ],
    translationLines: [
      'Quacking duck',
      'Swims on river.',
      'Behind her ducklings',
      'Swim in distance.'
    ],
    mainWord: 'утка'
  },
  {
    id: 'p57',
    title: 'Курочка (Simple Poem)',
    lines: [
      'Курочка-хохлатка',
      'По двору идёт,',
      'За собой цыпляток',
      'Маленьких ведёт.'
    ],
    translationLines: [
      'Crested hen',
      'Walks around yard,',
      'Leads small chicks',
      'Behind her.'
    ],
    mainWord: 'курица'
  },
  {
    id: 'p58',
    title: 'Цыплёнок (Simple Poem)',
    lines: [
      'Жёлтый маленький цыплёнок',
      'Только вылез из пелёнок.',
      'Ищет крошки и зерно,',
      'Быстро бегает оно.'
    ],
    translationLines: [
      'Small yellow chick',
      'Just hatched.',
      'Looks for crumbs and grain,',
      'Runs fast.'
    ],
    mainWord: 'цыпленок'
  },
  {
    id: 'p59',
    title: 'Телёнок (Simple Poem)',
    lines: [
      'Маленький телёнок',
      'По траве бежит.',
      'Рядом мама-корова',
      'На него глядит.'
    ],
    translationLines: [
      'Small calf',
      'Runs on grass.',
      'Nearby mother cow',
      'Looks at him.'
    ],
    mainWord: 'теленок'
  },
  {
    id: 'p60',
    title: 'Жеребёнок (Simple Poem)',
    lines: [
      'Скок-скок жеребёнок,',
      'Весёлый ребёнок.',
      'По лугу летает,',
      'Траву щиплет, играет.'
    ],
    translationLines: [
      'Gallop-gallop foal,',
      'Cheerful child.',
      'Flies over meadow,',
      'Nibbles grass, plays.'
    ],
    mainWord: 'жеребенок'
  },
  {
    id: 'p61',
    title: 'Яблоня (Simple Poem)',
    lines: [
      'Яблонька в саду растёт,',
      'Белым цветом расцветёт.',
      'А осенью спелые',
      'Яблоки красные.'
    ],
    translationLines: [
      'Apple tree grows in garden,',
      'Will bloom with white flowers.',
      'And in autumn ripe',
      'Red apples.'
    ],
    mainWord: 'яблоня'
  },
  {
    id: 'p62',
    title: 'Одуванчик (Simple Poem)',
    lines: [
      'Носит одуванчик',
      'Жёлтый сарафанчик.',
      'Порастёт — нарядится',
      'В белое платьице.'
    ],
    translationLines: [
      'Dandelion wears',
      'Yellow dress.',
      'Grows up — dresses',
      'In white dress.'
    ],
    mainWord: 'одуванчик'
  },
  {
    id: 'p63',
    title: 'Снежинки (Simple Poem)',
    lines: [
      'Падают снежинки',
      'Тихо на ладонь.',
      'Тают как слезинки,',
      'Только ты не тронь.'
    ],
    translationLines: [
      'Snowflakes fall',
      'Quietly on palm.',
      'Melt like tears,',
      'Just don\'t touch.'
    ],
    mainWord: 'снежинка'
  },
  {
    id: 'p64',
    title: 'Кораблик в луже (Short Rhyme)',
    lines: [
      'Плывёт, плывёт кораблик',
      'В глубокой дождевой лужице.',
      'Ветер его подгоняет,',
      'Волна кружит.'
    ],
    translationLines: [
      'Swims, swims the little boat',
      'In a deep rain puddle.',
      'The wind pushes it along,',
      'The wave spins it.'
    ],
    mainWord: 'лужа'
  },
  {
    id: 'p65',
    title: 'Тихий час (Simple Sentence)',
    lines: [
      'Наступил тихий час.',
      'Все дети уснули.',
      'В комнате тишина.'
    ],
    translationLines: [
      'Quiet hour has come.',
      'All children fell asleep.',
      'Silence in the room.'
    ],
    mainWord: 'тишина'
  }
];

export function PoetryTrainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * POETRY_DATA.length);
    setCurrentIndex(randomIdx);
    setRevealed(false);
  }, []);

  const handleNext = () => {
    setRevealed(false);
    let nextIdx = Math.floor(Math.random() * POETRY_DATA.length);
    if (nextIdx === currentIndex && POETRY_DATA.length > 1) {
      nextIdx = (currentIndex + 1) % POETRY_DATA.length;
    }
    setCurrentIndex(nextIdx);
  };

  const item = POETRY_DATA[currentIndex] || POETRY_DATA[0];

  return (
    <div className="flex flex-col items-center p-8 bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] relative">
      <h3 className="font-bold text-vintage-blue uppercase tracking-widest text-sm mb-2 text-center">
        Read the sentence or poem out loud
      </h3>
      <p className="font-serif text-sm italic text-vintage-ink/70 mb-8 text-center max-w-md">
        Practice reading simple sentences and short 2–4 line rhymes, then click Reveal to check the English translation.
      </p>

      {/* Main Cyrillic Rhyme Card */}
      <div className="w-full max-w-lg bg-white border-2 border-vintage-ink p-6 md:p-8 flex flex-col items-center justify-center mb-8 shadow-[4px_4px_0_0_#2C2A29]">
        <div className="text-xs font-mono font-bold text-vintage-ink/60 uppercase tracking-widest mb-4 border-b border-vintage-ink/20 pb-1">
          {item.title}
        </div>

        <div className="space-y-3 text-center my-2">
          {item.lines.map((line, idx) => (
            <div key={idx} className="text-2xl md:text-3xl font-serif font-bold text-vintage-ink tracking-wide">
              {line}
            </div>
          ))}
        </div>

        {/* Revealed Details */}
        {revealed && (
          <div className="mt-6 pt-6 border-t-2 border-vintage-ink border-dashed w-full text-center animate-in fade-in">
            <div className="space-y-1.5 text-center mb-4">
              {item.translationLines.map((tLine, idx) => (
                <div key={idx} className="text-base md:text-lg font-serif italic text-vintage-red">
                  {tLine}
                </div>
              ))}
            </div>
            <a 
              href={`https://en.wiktionary.org/wiki/${encodeURIComponent(item.mainWord.toLowerCase())}#Russian`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-vintage-blue hover:text-vintage-red underline font-serif font-bold text-sm cursor-pointer"
            >
              View key word "{item.mainWord}" on Wiktionary &rarr;
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
            Skip Rhyme
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
            Next Rhyme <ArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
