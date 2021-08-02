"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateInputDate = void 0;
const CustomError_1 = __importDefault(require("../business/erros/CustomError"));
class ValidateInputDate {
    constructor(day, hourStart, hourEnd) {
        this.day = day;
        this.hourStart = hourStart;
        this.hourEnd = hourEnd;
        this.validateHour = () => {
            const regex = new RegExp('[0-2][0-9]h');
            const start = Number(this.hourStart.slice(0, 2));
            if (!regex.test(this.hourStart) ||
                this.hourStart.length !== 3 ||
                start < 8 || start > 23) {
                throw new CustomError_1.default(400, 'Start hour incorrect');
            }
            const end = Number(this.hourEnd.slice(0, 2));
            if (!regex.test(this.hourEnd) ||
                this.hourStart.length !== 3 ||
                end < 8 || end > 23) {
                throw new CustomError_1.default(400, 'End hour incorrect');
            }
            if (start >= end) {
                throw new CustomError_1.default(400, "Start hour cannot be greater than end hour");
            }
            return [start, end];
        };
        this.validateDay = (weekDay = this.day) => {
            if (weekDay.toLowerCase().includes('sexta') ||
                weekDay.toLowerCase().includes('sábado') ||
                weekDay.toLowerCase().includes('domingo')) {
                return weekDay;
            }
            else {
                throw new CustomError_1.default(400, 'Day invalid');
            }
        };
        this.validateDate = () => {
            const [start_time, end_time] = this.validateHour();
            const week_day = this.validateDay();
            return {
                week_day, end_time, start_time
            };
        };
        this.validateShowDate = (startTime, endTime) => {
            const { start_time, end_time } = this.validateDate();
            console.log(start_time, end_time, startTime, endTime);
            if (start_time === startTime || end_time === endTime ||
                (start_time > startTime && start_time < endTime) ||
                (start_time < startTime && end_time > startTime)) {
                throw new CustomError_1.default(400, 'There is already a show on this date and hour.');
            }
        };
    }
}
exports.ValidateInputDate = ValidateInputDate;
exports.default = new ValidateInputDate('', '', '');
//# sourceMappingURL=ValidateInputDate.js.map