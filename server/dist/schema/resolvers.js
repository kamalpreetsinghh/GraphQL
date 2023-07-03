import { users, movies } from "./data.js";
import _ from "lodash";
export const resolvers = {
    Query: {
        users: () => users,
        user: (parent, args) => users.find((user) => user.id === Number(args.id)),
        movies: () => movies,
        movie: (parent, args) => movies.find((movie) => movie.name === args.name),
    },
    User: {
        favoriteMovies: () => movies,
    },
    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            user.id = users[users.length - 1].id + 1;
            users.push(user);
            return user;
        },
        updateUser: (parent, args) => {
            const { id, username } = args.input;
            let updatedUser;
            users.forEach((user) => {
                if (user.id === Number(id)) {
                    user.username = username;
                    updatedUser = user;
                }
            });
            return updatedUser;
        },
        deleteUser: (parent, args) => {
            const id = args.id;
            _.remove(users, (user) => user.id === Number(id));
            return null;
        },
    },
};
