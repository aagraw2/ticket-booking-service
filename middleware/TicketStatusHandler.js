const User = require('../models/User');

module.exports = {
    setTicketOpen(ticket) {
        const { user_id } = ticket;
        ticket.isBooked = false;
        ticket.user_id = null;

        return ticket.save()
            .then((data) => {
                console.log(`Booking status set to false for Ticket: ${ticket._id}`);
                if (user_id != null) {
                    User.deleteOne({ _id: user_id })
                        .then((user) => {
                            console.log(`User with id: ${user_id} removed successfully`);
                            return user;
                        });
                }
            })
            .catch((err) => {
                throw err;
            });
    },
    setTicketClosed(ticket, person) {
        const user = new User(person);

        return user.save()
            .then((data) => {
                ticket.user_id = user._id;
                ticket.isBooked = true;
                return ticket.save();
            })
            .then((response) => {
                console.log(`Ticket with id ${ticket.id} updated`);
                return response;
            })
            .catch((err) => {
                User.findOneAndDelete({ _id: user._id });
                throw err;
            });
    },

};
