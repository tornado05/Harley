
# Harley
v. 0.0.1
## Правила роботи
1. Всі зміни вносяться в проект через **pull rquest**.
2. Назви гілок повинні відповідати виконуваній роботі.


***
## Початок роботи
1. Склонуйте даний репозиторій;
2. Встановіть npm пакети; команда - `npm install`;
3. Встановіть bower компоненти, команда - `bower install`;
4. Збудуйте проект, команда - `gulp`
5. Запустіть сервіс монги
6. Одноразово заповніть данними, для цього у файлі /back_end/controllers/weather.js знайдіть функцію initialize та розкоментуйте блок зазначений у TODO. <b>Обов'язково закоментуйте його назад, щоб не витратити ліміт зняття даних у сервісів.</b> Також зверніть увагу, що сервіс wunderground іноді не віддає данні, тому потрібно його поштурхати кілька разів (перезапустити app.js)
7. Якщо ви бажаєте щоб з бази поверталась свіжа статистика, то після зібрання даних потрібно запустити обрахунок статистики. Для цього знайдіть та розкоментуйте необхідний рядок у функції weather.initialize();

### Верстка
Виконайте покроково інструкції, що зазначені у пункті **Початок роботи**.
Після успішного завершення запустіть будівельника команда - `gulp layout`. Після чого відкриється Ваш браузер (вкладака) на порту localhost:8000 із готовою версією проекту.
Усі файли для роботи над версткою знаходяться в папці `src/front-end/`
***
### Back-end
## Конфігураційни файл
/config/config.json
 - cities - масив об'єктів які містять в собі назву міста для різних сервісів та координати
 - updateInterval - інтервал оновлення даних і занесення їх у основну базу
 - servicesNames - масив з назвами сервісів, використовується при заповнені бази статистикою
 - statisticsTimers - набір інтервалів для обрахунку статистики
 
## Основні роути:
- `/weather/v01/current` - повертає масив об'єктів, які містять в собі інформацію про погоду з останнього зняття показників, з усіх зазначених у конфігураційному файлі містах. <b>При не доступності бази повертається мок даних back_end/data/common_data.json</b>
- `/weather/v01/statistic/day` - Данні статистики за поточний день - згодом будуть повертатись данні по проміжку часу або за конкретний день. <b>При не доступності бази повертається мок даних back_end/data/statisticMock.json</b>

## Вирішення типових проблем
- Якщо після виконання команди `bower install` в консолі пише що *bower* не знайдено потрібно встановити його глобально на Ваш ПК. команда - `npm install bower -g`
- Якщо після виконання команди `gulp` в консолі пише, що *gulp* не знайдено потрібно встановити його глобально. команда - `npm install gulp -g`


