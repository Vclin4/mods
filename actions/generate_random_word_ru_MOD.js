module.exports = {
  name: "Generate Random RU Word(s)",
  section: "Other Stuff",

  subtitle() {
    return "Generate Random RU Word(s)";
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage);
    if (type !== varType) return;
    return [data.varName, "Text"];
  },

  fields: ["storage", "varName", "lengthWord", "countWord"],

  html(isEvent, data) {
    return `
    	<p>
    Author: MineEjo#6143 | https://github.com/MineEjo
  </p>
<div style="padding-top: 8px;">
  <div style="float: left; width: 35%;">
    Length:<br>
    <input id="lengthWord" class="round" type="text">
  </div>
    <div style="float: right; width: 60%;">
    Word Count:<br>
    <input id="countWord" class="round" type="text">
  </div><br><br><br>
  <div style="float: left; width: 35%;">
    Store In:<br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%;">
    Variable Name:<br>
    <input id="varName" class="round" type="text">
  </div>
</div>`;
  },

  init() {},

  action(cache) {
    var word = "";
    function GenerateWord(lengthWord) {
      var randomWords = [
        "аароновец",
        "абажур",
        "аббат",
        "аббревиатура",
        "абброморфема",
        "абвер",
        "абверовец",
        "абдикация",
        "абдомен",
        "абдоминальный",
        "абдуктор",
        "аберрация",
        "абзац",
        "абиетин",
        "абиогенез",
        "абиссаль",
        "абитура",
        "аблактировать",
        "аблаут",
        "абляция",
        "аболиционист",
        "абонемент",
        "абонент",
        "абонирование",
        "абордаж",
        "абориген",
        "аборт",
        "абразив",
        "абракадабра",
        "абрек",
        "абрикос",
        "абрикотин",
        "арбуз",
        "апельсин",
        "абрис",
        "аброгация",
        "абсент",
        "абсолют",
        "абсолютизирование",
        "абсолютизм",
        "абсорбент",
        "абстрактность",
        "абсурд",
        "абсцисса",
        "авангард",
        "аванс",
        "авантаж",
        "авантюра",
        "авария",
        "август",
        "банкнота",
        "Байкал",
        "баба",
        "багаж",
        "багор",
        "багрянец",
        "база",
        "базальт",
        "базар",
        "базилик",
        "базука",
        "байкер",
        "байт",
        "бак",
        "баклан",
        "баклажка",
        "бакс",
        "бактерия",
        "банан",
        "банда",
        "бандероль",
        "бампер",
        "баобаб",
        "банзай",
        "банка",
        "банк",
        "бант",
        "барак",
        "баран",
        "бард",
        "барий",
        "басня",
        "вагина",
        "вагон",
        "вагонетка",
        "ваза",
        "ВАЗ",
        "вакансия",
        "вакуум",
        "вакцина",
        "вал",
        "валенки",
        "валериана",
        "валет",
        "валик",
        "валун",
        "валькирия",
        "вальс",
        "вальцовка",
        "вальяжность",
        "валюта",
        "ведьма",
        "вампир",
        "вампиризм",
        "век",
        "велосипед",
        "вена",
        "венец",
        "вера",
        "верблюд",
        "габардин",
        "габитус",
        "гавань",
        "гадалка",
        "гадкий",
        "гадюка",
        "газ",
        "гайка",
        "газета",
        "газовоз",
        "газон",
        "галдёж",
        "галерея",
        "галка",
        "галеты",
        "гаметы",
        "гараж",
        "гарнизон",
        "даль",
        "дьявол",
        "дама",
        "дамба",
        "дамка",
        "дань",
        "дар",
        "дартс",
        "даун",
        "дача",
        "два",
        "движок",
        "дверь",
        "динозавр",
        "двор",
        "дворец",
        "дворняга",
        "дворник",
        "двоякий",
        "двустволка",
        "дебаты",
        "дебош",
        "евнух",
        "еврей",
        "евро",
        "Европа",
        "европеец",
        "егерь",
        "еда",
        "едкий",
        "ель",
        "енот",
        "ересь",
        "ерик",
        "ехидна",
        "естество",
        "ёж",
        "ёлка",
        "ёмкость",
        "ёршик",
        "жаба",
        "жабры",
        "жадина",
        "жажда",
        "жакет",
        "жало",
        "жалоба",
        "жалюзи",
        "жар",
        "жир",
        "желатин",
        "желе",
        "железа",
        "железо",
        "жёлоб",
        "желток",
        "жёлудь",
        "жеребец",
        "женьшень",
        "женщина",
        "жеребий",
        "жертва",
        "жестянка",
        "жесть",
        "жёстко",
        "жетон",
        "живот",
        "животноводство",
        "животное",
        "жижа",
        "Жигули",
        "жизнь",
        "жилет",
        "жилище",
        "жнец",
        "жлоб",
        "житие",
        "забег",
        "забор",
        "завал",
        "завеса",
        "завод",
        "завялый",
        "заветный",
        "завидный",
        "завуч",
        "загс",
        "зад",
        "задание",
        "зажора",
        "зазор",
        "заря",
        "заказ",
        "закал",
        "закалка",
        "заяц",
        "закат",
        "заклёпка",
        "закрома",
        "зал",
        "закуп",
        "залп",
        "залог",
        "залив",
        "замах",
        "замес",
        "замок",
        "замш",
        "замысел",
        "зануда",
        "запад",
        "западный",
        "занос",
        "запах",
        "запас",
        "записка",
        "запинка",
        "ива",
        "игла",
        "игра",
        "игрок",
        "идеал",
        "игуана",
        "идиот",
        "идея",
        "идол",
        "иероглиф",
        "изба",
        "изгиб",
        "изгой",
        "изгородь",
        "изжога",
        "излом",
        "изложение",
        "измена",
        "изо",
        "износ",
        "изумруд",
        "изюм",
        "икра",
        "икс",
        "имитация",
        "импорт",
        "имя",
        "индивид",
        "индиго",
        "интервью",
        "интрига",
        "интуиция",
        "инфаркт",
        "интим",
        "инцест",
        "ирис",
        "искатель",
        "искра",
        "ислам",
        "испуг",
        "исход",
        "Иуда",
        "июль",
        "июнь",
        "ищейка",
        "йети",
        "йог",
        "йога",
        "йогурт",
        "кабан",
        "кабачок",
        "кабель",
        "кабина",
        "каблук",
        "кадет",
        "код",
        "кадр",
        "кадык",
        "казачество",
        "казино",
        "казна",
        "казначейство",
        "калач",
        "калека",
        "календарь",
        "калинка",
        "кальций",
        "камин",
        "камыш",
        "канал",
        "канава",
        "канат",
        "каникулы",
        "кандидат",
        "канва",
        "канифоль",
        "канон",
        "капитан",
        "капитал",
        "капилляр",
        "капкан",
        "каприз",
        "капрон",
        "капуста",
        "карат",
        "карась",
        "карбон",
        "карета",
        "каркас",
        "карма",
        "каре",
        "картель",
        "катер",
        "картон",
        "каско",
        "каскадёр",
        "карты",
        "каток",
        "качок",
        "каша",
        "лаборант",
        "лава",
        "лаваш",
        "лавина",
        "лавка",
        "лавры",
        "лаг",
        "лагерь",
        "лагуна",
        "ладонь",
        "лазарет",
        "лазер",
        "лак",
        "лакомство",
        "лампа",
        "ламинат",
        "лампасы",
        "лангуст",
        "лапа",
        "лапти",
        "лапша",
        "ларёк",
        "латы",
        "латунь",
        "латынь",
        "лгун",
        "лебеда",
        "лев",
        "левша",
        "легион",
        "лёгкие",
        "лёд",
        "ледокол",
        "ледник",
        "лежак",
        "лежебока",
        "лейка",
        "лейкемия",
        "лекарь",
        "лекция",
        "лепка",
        "лён",
        "лепет",
        "лес",
        "леса",
        "лента",
        "лепёшка",
        "леска",
        "лето",
        "лещ",
        "летяга",
        "лилия",
        "маг",
        "магазин",
        "магнитофон",
        "Магомет",
        "мадонна",
        "мажор",
        "мазок",
        "мазохист",
        "мазохизм",
        "май",
        "мазь",
        "майка",
        "майор",
        "майонез",
        "мак",
        "макро",
        "макет",
        "макрос",
        "макрофаги",
        "максимум",
        "малец",
        "маломерка",
        "мамба",
        "мангал",
        "мангуст",
        "мама",
        "мальчик",
        "манор",
        "манёвр",
        "манеж",
        "манифест",
        "манту",
        "мануфактура",
        "манускрипт",
        "манометр",
        "маньяк",
        "маразм",
        "мораль",
        "маркиза",
        "март",
        "марш",
        "маршал",
        "маршрутка",
        "маска",
        "масло",
        "масса",
        "массаж",
        "массажёр",
        "массив",
        "мастер",
        "мат",
        "мастика",
        "мастерство",
        "мебель",
        "машина",
        "набег",
        "навес",
        "навигатор",
        "навоз",
        "навсегда",
        "нога",
        "наглость",
        "нагота",
        "нагрузка",
        "нагрузчик",
        "надежда",
        "надзор",
        "надзорный",
        "надпись",
        "название",
        "наказ",
        "наклон",
        "наколка",
        "накрутка",
        "накопитель",
        "налёт",
        "намёк",
        "напиток",
        "напоказ",
        "нарды",
        "наречие",
        "народный",
        "нарост",
        "нарыв",
        "насилие",
        "насморк",
        "настилка",
        "настрой",
        "настроение",
        "настройка",
        "насыпь",
        "натрий",
        "нутро",
        "наушник",
        "находка",
        "нахлёст",
        "начало",
        "небеса",
        "небо",
        "нёбо",
        "невежда",
        "невеста",
        "нервы",
        "негатив",
        "оазис",
        "обалдуй",
        "обвал",
        "обаяние",
        "обвес",
        "обвёртка",
        "обводка",
        "обёртка",
        "оберег",
        "обзор",
        "обжог",
        "обиход",
        "обжим",
        "обиженный",
        "обиженность",
        "облако",
        "область",
        "облепить",
        "облом",
        "обман",
        "обманщик",
        "обманчивый",
        "обмен",
        "обменённый",
        "обнова",
        "обновление",
        "ободок",
        "образ",
        "обработка",
        "обряд",
        "обрыв",
        "обух",
        "обуза",
        "обувь",
        "обувка",
        "обувной",
        "обшивка",
        "общага",
        "объём",
        "объект",
        "обязательство",
        "овца",
        "овал",
        "овёс",
        "овод",
        "огонь",
        "огород",
        "ограда",
        "одиночка",
        "один",
        "озеро",
        "поляна",
        "паб",
        "павильон",
        "павильонный",
        "павлин",
        "павлиний",
        "падеж",
        "падение",
        "пакля",
        "паладин",
        "палата",
        "палеонтолог",
        "Палестина",
        "палец",
        "палитра",
        "палка",
        "пальма",
        "памятка",
        "памятник",
        "память",
        "панама",
        "панель",
        "пандемия",
        "паникёр",
        "пано",
        "панк",
        "панты",
        "панцирь",
        "папирус",
        "папа",
        "папайя",
        "программа",
        "парад",
        "парадокс",
        "паралич",
        "парапет",
        "парик",
        "паровоз",
        "пар",
        "парта",
        "партнёрство",
        "Паскаль",
        "парфюм",
        "пауза",
        "пашня",
        "раб",
        "работа",
        "рагу",
        "радио",
        "радиус",
        "разбор",
        "развитие",
        "развод",
        "разгар",
        "разврат",
        "разговор",
        "разгром",
        "разгул",
        "разлом",
        "размен",
        "размер",
        "разминка",
        "разный",
        "разовый",
        "разнос",
        "разум",
        "разряд",
        "разруха",
        "разрядка",
        "рай",
        "рак",
        "район",
        "раковина",
        "рама",
        "рана",
        "ранг",
        "раскат",
        "раса",
        "расклад",
        "расплата",
        "распри",
        "рассадник",
        "рассада",
        "распятие",
        "рассвет",
        "рассол",
        "рассказ",
        "рассудок",
        "разум",
        "раствор",
        "расход",
        "сабля",
        "сабор",
        "саботаж",
        "саботажник",
        "саботажница",
        "саванна",
        "сага",
        "сад",
        "садизм",
        "садик",
        "сайга",
        "сакура",
        "сало",
        "сок",
        "салон",
        "сальза",
        "сальто",
        "салют",
        "самец",
        "самовар",
        "самогон",
        "самолёт",
        "самокат",
        "самопал",
        "сани",
        "самса",
        "санузел",
        "сарай",
        "Санта-Клаус",
        "сантехник",
        "сапоги",
        "спина",
        "сардина",
        "саха",
        "Сатана",
        "сахарный",
        "сатира",
        "сборник",
        "свалка",
        "сброс",
        "табак",
        "табакерка",
        "табель",
        "табу",
        "таблетка",
        "табурет",
        "тазик",
        "таёжник",
        "таинство",
        "тайга",
        "таймер",
        "тайна",
        "талант",
        "таксофон",
        "талон",
        "тема",
        "таможенник",
        "тампон",
        "танк",
        "танго",
        "танкист",
        "таран",
        "тариф",
        "топор",
        "топ",
        "таска",
        "татуировка",
        "тварь",
        "театр",
        "тезис",
        "тёзка",
        "текила",
        "текстиль",
        "тележка",
        "телёнок",
        "телеметрия",
        "телепорт",
        "телескоп",
        "телеса",
        "телефон",
        "тембр",
        "темнота",
        "темп",
        "температура",
        "теория",
        "УАЗ",
        "убыток",
        "уважение",
        "увальность",
        "уведомитель",
        "увлечение",
        "угар",
        "увязка",
        "угасание",
        "уголь",
        "улыбка",
        "угроза",
        "удав",
        "удар",
        "удалец",
        "удача",
        "удел",
        "удобство",
        "удочка",
        "удрать",
        "уж",
        "угорь",
        "ужас",
        "ужин",
        "узел",
        "узы",
        "узор",
        "узник",
        "узница",
        "уклад",
        "уклон",
        "утка",
        "укол",
        "уксус",
        "улитка",
        "утилита",
        "улов",
        "улёт",
        "умение",
        "универмаг",
        "универсал",
        "упырь",
        "Фаберже",
        "фабрика",
        "фабрикат",
        "фаворит",
        "фазан",
        "фаза",
        "файл",
        "факт",
        "факел",
        "факс",
        "фактограф",
        "факт",
        "фактура",
        "фаллос",
        "фальшь",
        "фамилия",
        "фальшивость",
        "фантазёр",
        "Фаренгейт",
        "фартук",
        "фарш",
        "фасоль",
        "фатальность",
        "фауна",
        "февраль",
        "ферма",
        "фея",
        "фиаско",
        "фигура",
        "физика",
        "физкультура",
        "фильм",
        "фильтр",
        "фирма",
        "флаг",
        "флейта",
        "флора",
        "фляга",
        "флешка",
        "фон",
        "фокус",
        "форум",
        "фото",
        "фосфор",
        "хлеб",
        "хакер",
        "халат",
        "халва",
        "халява",
        "хамство",
        "ханжа",
        "хаос",
        "хата",
        "хвала",
        "хвост",
        "хижина",
        "химия",
        "химик",
        "хит",
        "хлор",
        "хлопок",
        "хлыст",
        "хмель",
        "хобби",
        "хобот",
        "холм",
        "ходильник",
        "хозяйство",
        "холод",
        "цапка",
        "царь",
        "царство",
        "цвет",
        "цветок",
        "цедра",
        "Цезарь",
        "целевой",
        "цель",
        "цена",
        "центр",
        "ценник",
        "цепь",
        "церковник",
        "цеп",
        "цианид",
        "цикл",
        "циклон",
        "цинга",
        "цинк",
        "цинизм",
        "циклоп",
        "цирк",
        "цитата",
        "цифра",
        "цитрус",
        "цуцик",
        "чудотворец",
        "чага",
        "чадо",
        "чай",
        "чайник",
        "чары",
        "час",
        "частность",
        "частота",
        "часть",
        "чат",
        "человек",
        "чело",
        "челюсть",
        "чемодан",
        "чемпион",
        "червонец",
        "чепуха",
        "червь",
        "черновик",
        "чернозём",
        "чернослив",
        "чертог",
        "чёрт",
        "шабаш",
        "шаблон",
        "шаг",
        "шаль",
        "шампур",
        "шампунь",
        "шар",
        "шамовка",
        "шаман",
        "шалава",
        "шанс",
        "шантаж",
        "шарф",
        "шарм",
        "шахтёр",
        "швея",
        "щавель",
        "щебёнка",
        "щегол",
        "щека",
        "щепка",
        "щетина",
        "щётка",
        "щуп",
        "щит",
        "щип",
        "эвакуация",
        "эвкалипт",
        "Эверест",
        "экзамен",
        "экипировка",
        "экономика",
        "эколог",
        "эксперт",
        "экспресс",
        "элеватор",
        "юань",
        "юбилей",
        "юбка",
        "юг",
        "юла",
        "Юпитер",
        "ябеда",
        "яблоко",
        "яблоня",
        "явность",
        "ягода",
        "ядро",
        "яд",
        "язык",
        "ягуар",
        "яйцо",
        "як",
        "якорь",
        "яма",
        "ямб",
        "январь",
        "ярлык",
        "яркость",
        "ярмо",
        "яхта",
        "ярус",
        "ящик",
      ];

      word = randomWords[Math.floor(Math.random() * randomWords.length)];

      if (lengthWord != 0) {
        if (word.length != lengthWord) {
          GenerateWord(lengthWord);
        }
      }
    }
    function CountWords(countWord) {
      var words = [];
      for (var i = 0; i < countWord; i++) {
        GenerateWord(lengthWord);
        words.push(word);
      }
      word = words;
    }
    const data = cache.actions[cache.index];
    const lengthWord = this.evalMessage(data.lengthWord, cache);
    const countWord = this.evalMessage(data.countWord, cache);
    GenerateWord(lengthWord);
    CountWords(countWord);
    const type = parseInt(data.storage);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(word, type, varName, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
