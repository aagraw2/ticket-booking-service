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
    async setTicketClosed(ticket, person) {
        const user = new User(person);
        const prevUser = ticket.user_id;
        let response;
        if (prevUser != null) {
            await User.deleteOne({ _id: prevUser });
            console.log(`Deleted user with id ${prevUser}`);
        }
        try {
            const data = await user.save();
            ticket.user_id = user._id;
            ticket.isBooked = true;
            response = ticket.save();
            console.log(`Ticket with id ${ticket.id} updated`);
        } catch (err) {
            User.findOneAndDelete({ _id: user._id });
            throw err;
        }
        return response;
    },
};
