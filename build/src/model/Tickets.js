"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTicketsData = void 0;
const toTicketsData = (input, id) => {
    return {
        name: input.name,
        value: input.value,
        show_id: input.showId,
        tickets_quantity: input.ticketsQuantity,
        id
    };
};
exports.toTicketsData = toTicketsData;
//# sourceMappingURL=Tickets.js.map