// import { addNewDocument } from "common/database.utils";
// import { User } from "models";



// export const Mutation = {
//   addUser(obj, { params }) {
//     return User
//       .findOne({ 'uniqueKey': params.uk })
//       .exec()
//       .then(user => {
//         if (user) {
//           return user;
//         } else {
//           const newUser = new User({
//             uk: params.uk,
//             mainMenu: []
//           });

//           // adding a new user
//           return addNewDocument(newUser)
//             .then(data => data)
//             .catch(err => { console.error('addUser', err); })
//         }
//       });
//   },
//   updateUser(obj, { params }) {
//     return User
//       .findOneAndUpdate({ 'uniqueKey': params.uk }, params.updates, { new: true })
//       .exec()
//       .then(user => user);
//   },
// }