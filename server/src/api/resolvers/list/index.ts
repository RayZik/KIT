import { service } from '../../service';

export default {
  List: {
    page: (obj, args, ctx, info) => getPage(args, ctx)
    // page: () => ({})
  },

  Query: {
    list: () => ({})
  }
};


function getPage(args, ctx) {

  const list = {
    nodes: [{
      cursor: "1515151515",
      node: {
        id: '1',
        name: "test",
        description: "rrr",
        __typename: 'DocumentItem'
      }
    }],
    info: { count: 0 }
  };

  return list
}