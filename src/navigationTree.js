// Children:
// There are 4 slots for children, stored as an array,
// where elements correpond to 4 corners like this:
// 1: NE (north-east), 2: SE, 3: SW, 4: NW

const navTree = [
  [{}, {}, {}, {}, {name: 'Talks', type: 'branch', leaves: [{name: 'Opening'}, {name: 'Liquid Feminine'}, {name: 'Marta Lindberg'}, {name: 'Shella Arnell'}, {name: 'Sara Utberg'}, {name: 'Manuelle Para'}, {name: 'Delphine Carter'}, {name: 'Amy Delvani'}]}],
  [{}, {}, {}, {}, {name: 'Practice', type: 'branch', leaves: [{name: 'Your Why'}, {name: 'Helene Bjork'}, {name: 'Marta Lindberg'}, {name: 'Shella Arnell'}, {name: 'Sara Utberg'}, {name: 'Manuelle Paradiso'}]}],
  [{}, {}, {}, {name: 'Sexy Book Club', type: 'home', children: [[5,2], [5,4], [5,5], [5,1]]}, {}],
  [{}, {}, {}, {}, {name: 'Workshops', type: 'branch', disabled: true}],
  [{}, {}, {}, {}, {name: 'More Workshops', type: 'branch', disabled: true}],
  [{}, {}, {}, {name: 'Live', type: 'live'}, {}],
  [{}, {}, {}, {}, {name: 'Talks', type: 'branch', leaves: [{name: 'Shella Arnell'}, {name: 'Sara Utberg'}, {name: 'Manuelle Para'}, {name: 'Delphine Carter'}, {name: 'Amy Delvani'}, {name: 'Opening'}, {name: 'Liquid Feminine'}, {name: 'Marta Lindberg'}]}],
  [
    {name: 'Community Onboarding', type: 'branch', leaves: [{name: 'Welcome'}, {name: 'Comments'}, {name: 'Messages'}, {name: 'Vulva'}]}, 
    {name: 'Conclave Home', type: 'home'}, 
    {name: 'Fuel', type: 'home', children: [[4,6], [4,12], [4,14], [4,3]]}, 
    {name: 'School Bench', type: 'home', children: [[5,7], [5,9], [5,10], null]}, 
    {name: 'Interviews', type: 'branch', leaves: [{name: 'Naked Pink'}, {name: 'Helene Bjork'}, {name: 'Marta Lindberg'}, {name: 'Shella Arnell'}, {name: 'Sara Utberg'}, {name: 'Manuelle Paradiso'}]}],
  [{}, {}, {}, {}, {name: 'Practice', type: 'branch', leaves: [{name: 'Your Why'}, {name: 'Helene Bjork', watching: ['sister1']}, {name: 'Marta Lindberg'}, {name: 'Shella Arnell'}, {name: 'Sara Utberg'}, {name: 'Manuelle Paradiso'}]}],
  [{}, {}, {}, {}, {name: 'Workshops', type: 'branch', disabled: true}],
  [{}, {}, {}, {}, {name: 'Climax Talks', type: 'branch', leaves: [{name: 'Opening'}, {name: 'Liquid Feminine'}, {name: 'Marta Lindberg'}, {name: 'Shella Arnell'}, {name: 'Sara Utberg', watching: ['sister2', 'sister1']}, {name: 'Manuelle Para'}, {name: 'Delphine Carter'}, {name: 'Amy Delvani'}]}],
  [{}, {}, {}, {name: 'Climax', type: 'home', children: [[5,11], [5,13], null, null]}, {}],
  [{}, {}, {}, {}, {name: 'Practice', type: 'branch', leaves: [{name: 'Your Why'}, {name: 'Helene Bjork'}, {name: 'Marta Lindberg'}, {name: 'Shella Arnell'}, {name: 'Sara Utberg'}, {name: 'Manuelle Paradiso'}]}],
  [{}, {}, {}, {name: 'Gas Station', type: 'home'}, {}],
];

export default navTree;