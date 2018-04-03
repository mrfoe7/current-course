# current-course [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mrfoe7/current-course/blob/master/LICENSE.md)

Test task project. Service for get currnet course from CB RF.
If you want read task, please open resource/task.txt
Dump data bases in resource/order.sql

## Menu

* **[Presetup](#presetup)**
* **[Technologies](#technologies)**
* **[Usage](#usage)**
* **[Dependencies](#dependencies)**

## Presetup

If you will usage this apps. You will corrected file config/config.json with mysql params and unpackage sql dump.

## Usage

If you can't use docker, you can use this manual
```
git clone https://github.com/mrfoe7/current-course.git
cd current-course
npm install
npm start
```

Docker-compose

```
docker-compose up -d
```


## Tecnologies

* node.js
* express
* mysql
* docker


## Dependencies

* express
* body-parser
* mysql
* ejs
* morgan
* nconf
* winston
