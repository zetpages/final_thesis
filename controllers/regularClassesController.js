const { RegularClasses, Room, Course, CourseType, SingleClass, Group} = require('../models/models');
const ApiError = require('../error/ApiError');
const sequelize = require("sequelize");
// const {Transaction} = require("sequelize/types");
// const {now} = require("sequelize/types/utils");

class RegularClassesController {
    // models;

    async create(req, res, next) {
        try {
            let { name, scheduleStart, duration, scheduleEnd, weekDays, topic, courseId, roomId, courseTypeId, periodStart, periodEnd } = req.body;
            const regularClasses = await RegularClasses.create({ name, duration, periodStart, scheduleStart, scheduleEnd, weekDays, topic, courseId, roomId, courseTypeId, periodEnd });

            function parseDate(input) {
                let parts = input.split('-');
                // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
                return new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
            }

            function getCountOf(date1, date2, dayToSearch) {

                let dateObj1 = parseDate(date1);
                let dateObj2 = parseDate(date2);

                let count = 0;

                let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                let dayIndex = week.indexOf(dayToSearch);

                while (dateObj1.getTime() <= dateObj2.getTime()) {
                    if (dateObj1.getDay() === dayIndex) {
                        // count++
                        // console.log(week[dayIndex])
                        const ds = dateObj1.toLocaleDateString();
                        SingleClass.create({
                            regularClassId: regularClasses.id,
                            day: week[dayIndex],
                            dayDate: ds,
                            durationLong: duration,
                            timeStart: scheduleStart,
                            timeEnd: scheduleEnd,
                            topicSingle: topic,
                            courseId: courseId,
                            roomId: roomId,
                            courseTypeId: courseTypeId
                        });
                    }
                    dateObj1.setDate(dateObj1.getDate() + 1);
                }

                return count;
            }

            /* let dayToSearch = "Mon"; */



            weekDays.map((el) => {
                console.log(getCountOf(periodStart, periodEnd, el));
            });
            //
            // for (let i = 0; i < 89; i++) {
            //     await SingleClass.create({regularClassId: regularClasses.id});
            // }
            //
            // console.log(periodEnd)
            // console.log(typeof (periodEnd))
            return res.json(regularClasses);




        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let regularClasses = await RegularClasses.findAll({ include:
                [
                    { model: Room },
                    { model: Course },
                    { model: CourseType },
                    { model: SingleClass, include: [{model: Course}]}
                    // { model: Group }
                ]
        });
        // return res.json(regularClasses, { include:
        //         [
        //             { model: Room },
        //             { model: Course },
        //             { model: CourseType },
        //             { model: SingleClass }
        //             // { model: Group }
        //         ]
        // });
        return res.json(regularClasses);
    }
}

module.exports = new RegularClassesController();