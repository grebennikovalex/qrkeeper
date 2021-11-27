export const texts = [
  [
    {
      id: 0,
      text: `QR Keeper — удобное приложение с мгновенным запуском для хранения QR-кодов прививок и тестов.

Сохраните код с помощью сканера или введите ссылку. 📷

Показывайте код сразу после открытия приложения. ⏱️

Храните несколько кодов и переключайтесь между ними с помощью свайпа. 👍

Добавляйте коды вакцин и тестов любой страны мира. 🌍

Обучение управлению в следующей карточке 👉`,
    },
    {
      id: 1,
      text: `Для добавления нового кода — нажмите плюсик в правом нижнем углу экрана.

Для изменения уже добавленного кода — нажмите на QR-код внутри карточки и внесите необходимые изменения — вы можете изменить название или содержание кода, а также удалить карточку.

Для навигации между несколькими карточками с QR-кодами — листайте их влево и вправо.`,
    },
  ],
  [
    {
      id: 0,
      text: `QR Keeper is a convenient app with instant launch for storing QR-codes your vaccines or other certificates and tests.

Scan and save the code or enter a link. 📷

Show the code instantly after the app's opening. ⏱️

Store several codes in the app and swipe them. 👍

Add codes of vaccines or tests from any part of the world. 🌍

Swipe for the next card to see how to use the keeper 👉`,
    },
    {
      id: 1,
      text: `Add new code — press '+' button in the bottom right corner of the screen.

For editing of the existing code — press the QR-code itself inside a code card and edit it — you can change the name or the reference link, and also delete the code.

Use swipe navigation between the code cards.`,
    },
  ],
];

export const infoCardTexts = [
  {
    ver: "Версия",
    link: "http://qrkeeper.ru/ru",
    dev: "Разработка и дизайн:",
  },

  {
    ver: "Version",
    link: "http://qrkeeper.ru/en",
    dev: "Development and design:",
  },
];

export const btnTitles = [
  {
    save: "Сохранить",
    delete: "Удалить",
    goBack: "Назад",
    scan: "Сканировать код",
    screenShot: "Скриншот / PDF",
    manualEnter: "Ввести вручную",
    okay: "Ну ладно",
    ok: "Ок",
  },

  {
    save: "Save",
    delete: "Delete",
    goBack: "Go back",
    scan: "Scan code",
    screenShot: "Screenshot / PDF",
    manualEnter: "Enter manually",
    okay: "Okay...",
    ok: "Ok",
  },
];

export const mainTexts = [
  {
    of: "из",
    emptyScreenFirstLine:
      "Ой, похоже, что вы еще не добавили ни одного QR-кода 🤔",
    emptyScreenSecondLine: "Нажмите на плюсик, чтобы начать",
    namePlaceHolder: "Придумайте название",
    linkPlaceHolder: "Ссылка внутри кода",
    enterLink: "Вставьте или введите ссылку",
  },

  {
    of: "of",
    emptyScreenFirstLine:
      "Ooops, it looks like you haven't added any code yet 🤔",
    emptyScreenSecondLine: "Please, press 'plus' button for start",
    namePlaceHolder: "Enter the name",
    linkPlaceHolder: "The link is inside the code",
    enterLink: "Paste or type the link",
  },
];

export const modalMessages = [
  {
    initialMessage: `Ура, вы добавили вашу первую карточку! 🎉

Если захотите что-то изменить — нажмите на QR-код 👆`,
    noNameMessage: "Вы не придумали название для этого QR кода. 🙄",
    scanMessage: "Поместите QR-код в выделенную область 👆",
    successScreenShot: `Код успешно
обработан 👍
Добавлена ссылка: `,
    successScan: `Код успешно
отсканирован 👍
Добавлена ссылка: `,
    faliureScreenShot: `Не удалось распознать QR-код на фото 😥
Попробуйте еще раз`,
    severalCodes: "Найдено несколько кодов 👍",
    emptyLinkMessage: "Информация в QR коде не должна быть пустой. 🙄",
    cameraPermission:
      "Предоставьте приложению доступ к камере устройства. Иначе ничего отсканировать не получится. 🙄",
    permissionProcess: "Запрос разрешения на использование камеры",
  },
  {
    initialMessage: `Hooray, you've just added your very first card! 🎉

If you want to change something - tap the code above 👆`,
    noNameMessage: "You haven't come up with a name for this code yet.  🙄",
    scanMessage: "Place QR-code in designated area 👆",
    successScreenShot: `The code was processed
successfully 👍
Link added: `,
    successScan: `The code was scanned
successfully 👍
Link added: `,
    faliureScreenShot: `No code found in the image you provided 😥
Please, try again`,
    severalCodes: "Several codes found  👍",
    emptyLinkMessage: "Information in the code should not be empty. 🙄",
    cameraPermission:
      "Give the app an access to the device's camera. Otherwise, nothing will be scanned. 🙄",
    permissionProcess: "Asking for the access to the device's camera",
  },
];
