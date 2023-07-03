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
  UsersResult: () => {},
  Mutation: {
    createUser: (parent, args, contextValue, info) => {
      const user = args.input;
      user.id = users[users.length - 1].id + 1;
      users.push(user);
      // console.log(contextValue.req.headers);
      // get request header info and can validate token here
      return user;
    },
    updateUser: (parent, args, contextValue, info) => {
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
    deleteUser: (parent, args, contextValue, info) => {
      const id = args.id;
      _.remove(users, (user) => user.id === Number(id));
      return null;
    },
  },
};
