const { range } = require('rxjs');
const { filter, toArray } = require('rxjs/operators');

const part1 = values => {
  //const values = n.split('-');
  const source = range(values[0], values[1] - values[0]).pipe(
    filter(
      num =>
        Array.from(num.toString()).filter((element, index, array) => element === array[index + 1])
          .length &&
        Array.from(num.toString()).every((element, index, array) => !(element > array[index + 1]))
    ),
    toArray()
  );

  let solution = 0;
  source.subscribe(value => (solution = value.length));

  return solution;
};

const part2 = values => {
  //const values = n.split('-');
  const source = range(values[0], values[1] - values[0]).pipe(
    filter(
      num =>
        num
          .toString()
          .match(/([0-9])\1*/g)
          .filter(element => element.length === 2).length &&
        Array.from(num.toString()).every((element, index, array) => !(element > array[index + 1]))
    ),
    toArray()
  );

  // const num = [
  //   246666,
  //   246677,
  //   246678,
  //   246679,
  //   246688,
  //   246689,
  //   246699,
  //   246778,
  //   246779,
  //   246788,
  //   246799,
  //   246889,
  //   246899,
  //   247777,
  //   247788,
  //   247789,
  //   247799,
  //   247889,
  //   247899,
  //   248888,
  //   248899,
  //   249999,
  //   255556,
  //   255557,
  //   255558,
  //   255559,
  //   255566,
  //   255577,
  //   255588,
  //   255599,
  //   255666,
  //   255667,
  //   255668,
  //   255669,
  //   255677,
  //   255678,
  //   255679,
  //   255688,
  //   255689,
  //   255699,
  //   255777,
  //   255778,
  //   255779,
  //   255788,
  //   255789,
  //   255799,
  //   255888,
  //   255889,
  //   255899,
  //   255999,
  //   256666,
  //   256677,
  //   256678,
  //   256679,
  //   256688,
  //   256689,
  //   256699,
  //   256778,
  //   256779,
  //   256788,
  //   256799,
  //   256889,
  //   256899,
  //   257777,
  //   257788,
  //   257789,
  //   257799,
  //   257889,
  //   257899,
  //   258888,
  //   258899,
  //   259999,
  //   266667,
  //   266668,
  //   266669,
  //   266677,
  //   266688,
  //   266699,
  //   266777,
  //   266778,
  //   266779,
  //   266788,
  //   266789,
  //   266799,
  //   266888,
  //   266889,
  //   266899,
  //   266999,
  //   267777,
  //   267788,
  //   267789,
  //   267799,
  //   267889,
  //   267899,
  //   268888,
  //   268899,
  //   269999,
  //   277778,
  //   277779,
  //   277788,
  //   277799,
  //   277888,
  //   277889,
  //   277899,
  //   277999,
  //   278888,
  //   278899,
  //   279999,
  //   288889,
  //   288899,
  //   288999,
  //   289999,
  //   333333,
  //   333344,
  //   333345,
  //   333346,
  //   333347,
  //   333348,
  //   333349,
  //   333355,
  //   333356,
  //   333357,
  //   333358,
  //   333359,
  //   333366,
  //   333367,
  //   333368,
  //   333369,
  //   333377,
  //   333378,
  //   333379,
  //   333388,
  //   333389,
  //   333399,
  //   333445,
  //   333446,
  //   333447,
  //   333448,
  //   333449,
  //   333455,
  //   333466,
  //   333477,
  //   333488,
  //   333499,
  //   333556,
  //   333557,
  //   333558,
  //   333559,
  //   333566,
  //   333577,
  //   333588,
  //   333599,
  //   333667,
  //   333668,
  //   333669,
  //   333677,
  //   333688,
  //   333699,
  //   333778,
  //   333779,
  //   333788,
  //   333799,
  //   333889,
  //   333899,
  //   334444,
  //   334445,
  //   334446,
  //   334447,
  //   334448,
  //   334449,
  //   334455,
  //   334456,
  //   334457,
  //   334458,
  //   334459,
  //   334466,
  //   334467,
  //   334468,
  //   334469,
  //   334477,
  //   334478,
  //   334479,
  //   334488,
  //   334489,
  //   334499,
  //   334555,
  //   334556,
  //   334557,
  //   334558,
  //   334559,
  //   334566,
  //   334567,
  //   334568,
  //   334569,
  //   334577,
  //   334578,
  //   334579,
  //   334588,
  //   334589,
  //   334599,
  //   334666,
  //   334667,
  //   334668,
  //   334669,
  //   334677,
  //   334678,
  //   334679,
  //   334688,
  //   334689,
  //   334699,
  //   334777,
  //   334778,
  //   334779,
  //   334788,
  //   334789,
  //   334799,
  //   334888,
  //   334889,
  //   334899,
  //   334999,
  //   335555,
  //   335556,
  //   335557,
  //   335558,
  //   335559,
  //   335566,
  //   335567,
  //   335568,
  //   335569,
  //   335577,
  //   335578,
  //   335579,
  //   335588,
  //   335589,
  //   335599,
  //   335666,
  //   335667,
  //   335668,
  //   335669,
  //   335677,
  //   335678,
  //   335679,
  //   335688,
  //   335689,
  //   335699,
  //   335777,
  //   335778,
  //   335779,
  //   335788,
  //   335789,
  //   335799,
  //   335888,
  //   335889,
  //   335899,
  //   335999,
  //   336666,
  //   336667,
  //   336668,
  //   336669,
  //   336677,
  //   336678,
  //   336679,
  //   336688,
  //   336689,
  //   336699,
  //   336777,
  //   336778,
  //   336779,
  //   336788,
  //   336789,
  //   336799,
  //   336888,
  //   336889,
  //   336899,
  //   336999,
  //   337777,
  //   337778,
  //   337779,
  //   337788,
  //   337789,
  //   337799,
  //   337888,
  //   337889,
  //   337899,
  //   337999,
  //   338888,
  //   338889,
  //   338899,
  //   338999,
  //   339999,
  //   344445,
  //   344446,
  //   344447,
  //   344448,
  //   344449,
  //   344455,
  //   344466,
  //   344477,
  //   344488,
  //   344499,
  //   344555,
  //   344556,
  //   344557,
  //   344558,
  //   344559,
  //   344566,
  //   344567,
  //   344568,
  //   344569,
  //   344577,
  //   344578,
  //   344579,
  //   344588,
  //   344589,
  //   344599,
  //   344666,
  //   344667,
  //   344668,
  //   344669,
  //   344677,
  //   344678,
  //   344679,
  //   344688,
  //   344689,
  //   344699,
  //   344777,
  //   344778,
  //   344779,
  //   344788,
  //   344789,
  //   344799,
  //   344888,
  //   344889,
  //   344899,
  //   344999,
  //   345555,
  //   345566,
  //   345567,
  //   345568,
  //   345569,
  //   345577,
  //   345578,
  //   345579,
  //   345588,
  //   345589,
  //   345599,
  //   345667,
  //   345668,
  //   345669,
  //   345677,
  //   345688,
  //   345699,
  //   345778,
  //   345779,
  //   345788,
  //   345799,
  //   345889,
  //   345899,
  //   346666,
  //   346677,
  //   346678,
  //   346679,
  //   346688,
  //   346689,
  //   346699,
  //   346778,
  //   346779,
  //   346788,
  //   346799,
  //   346889,
  //   346899,
  //   347777,
  //   347788,
  //   347789,
  //   347799,
  //   347889,
  //   347899,
  //   348888,
  //   348899,
  //   349999,
  //   355556,
  //   355557,
  //   355558,
  //   355559,
  //   355566,
  //   355577,
  //   355588,
  //   355599,
  //   355666,
  //   355667,
  //   355668,
  //   355669,
  //   355677,
  //   355678,
  //   355679,
  //   355688,
  //   355689,
  //   355699,
  //   355777,
  //   355778,
  //   355779,
  //   355788,
  //   355789,
  //   355799,
  //   355888,
  //   355889,
  //   355899,
  //   355999,
  //   356666,
  //   356677,
  //   356678,
  //   356679,
  //   356688,
  //   356689,
  //   356699,
  //   356778,
  //   356779,
  //   356788,
  //   356799,
  //   356889,
  //   356899,
  //   357777,
  //   357788,
  //   357789,
  //   357799,
  //   357889,
  //   357899,
  //   358888,
  //   358899,
  //   359999,
  //   366667,
  //   366668,
  //   366669,
  //   366677,
  //   366688,
  //   366699,
  //   366777,
  //   366778,
  //   366779,
  //   366788,
  //   366789,
  //   366799,
  //   366888,
  //   366889,
  //   366899,
  //   366999,
  //   367777,
  //   367788,
  //   367789,
  //   367799,
  //   367889,
  //   367899,
  //   368888,
  //   368899,
  //   369999,
  //   377778,
  //   377779,
  //   377788,
  //   377799,
  //   377888,
  //   377889,
  //   377899,
  //   377999,
  //   378888,
  //   378899,
  //   379999,
  //   388889,
  //   388899,
  //   388999,
  //   389999,
  //   444444,
  //   444455,
  //   444456,
  //   444457,
  //   444458,
  //   444459,
  //   444466,
  //   444467,
  //   444468,
  //   444469,
  //   444477,
  //   444478,
  //   444479,
  //   444488,
  //   444489,
  //   444499,
  //   444556,
  //   444557,
  //   444558,
  //   444559,
  //   444566,
  //   444577,
  //   444588,
  //   444599,
  //   444667,
  //   444668,
  //   444669,
  //   444677,
  //   444688,
  //   444699,
  //   444778,
  //   444779,
  //   444788,
  //   444799,
  //   444889,
  //   444899,
  //   445555,
  //   445556,
  //   445557,
  //   445558,
  //   445559,
  //   445566,
  //   445567,
  //   445568,
  //   445569,
  //   445577,
  //   445578,
  //   445579,
  //   445588,
  //   445589,
  //   445599,
  //   445666,
  //   445667,
  //   445668,
  //   445669,
  //   445677,
  //   445678,
  //   445679,
  //   445688,
  //   445689,
  //   445699,
  //   445777,
  //   445778,
  //   445779,
  //   445788,
  //   445789,
  //   445799,
  //   445888,
  //   445889,
  //   445899,
  //   445999,
  //   446666,
  //   446667,
  //   446668,
  //   446669,
  //   446677,
  //   446678,
  //   446679,
  //   446688,
  //   446689,
  //   446699,
  //   446777,
  //   446778,
  //   446779,
  //   446788,
  //   446789,
  //   446799,
  //   446888,
  //   446889,
  //   446899,
  //   446999,
  //   447777,
  //   447778,
  //   447779,
  //   447788,
  //   447789,
  //   447799,
  //   447888,
  //   447889,
  //   447899,
  //   447999,
  //   448888,
  //   448889,
  //   448899,
  //   448999,
  //   449999,
  //   455556,
  //   455557,
  //   455558,
  //   455559,
  //   455566,
  //   455577,
  //   455588,
  //   455599,
  //   455666,
  //   455667,
  //   455668,
  //   455669,
  //   455677,
  //   455678,
  //   455679,
  //   455688,
  //   455689,
  //   455699,
  //   455777,
  //   455778,
  //   455779,
  //   455788,
  //   455789,
  //   455799,
  //   455888,
  //   455889,
  //   455899,
  //   455999,
  //   456666,
  //   456677,
  //   456678,
  //   456679,
  //   456688,
  //   456689,
  //   456699,
  //   456778,
  //   456779,
  //   456788,
  //   456799,
  //   456889,
  //   456899,
  //   457777,
  //   457788,
  //   457789,
  //   457799,
  //   457889,
  //   457899,
  //   458888,
  //   458899,
  //   459999,
  //   466667,
  //   466668,
  //   466669,
  //   466677,
  //   466688,
  //   466699,
  //   466777,
  //   466778,
  //   466779,
  //   466788,
  //   466789,
  //   466799,
  //   466888,
  //   466889,
  //   466899,
  //   466999,
  //   467777,
  //   467788,
  //   467789,
  //   467799,
  //   467889,
  //   467899,
  //   468888,
  //   468899,
  //   469999,
  //   477778,
  //   477779,
  //   477788,
  //   477799,
  //   477888,
  //   477889,
  //   477899,
  //   477999,
  //   478888,
  //   478899,
  //   479999,
  //   488889,
  //   488899,
  //   488999,
  //   489999,
  //   555555,
  //   555566,
  //   555567,
  //   555568,
  //   555569,
  //   555577,
  //   555578,
  //   555579,
  //   555588,
  //   555589,
  //   555599,
  //   555667,
  //   555668,
  //   555669,
  //   555677,
  //   555688,
  //   555699,
  //   555778,
  //   555779,
  //   555788,
  //   555799,
  //   555889,
  //   555899,
  //   556666,
  //   556667,
  //   556668,
  //   556669,
  //   556677,
  //   556678,
  //   556679,
  //   556688,
  //   556689,
  //   556699,
  //   556777,
  //   556778,
  //   556779,
  //   556788,
  //   556789,
  //   556799,
  //   556888,
  //   556889,
  //   556899,
  //   556999,
  //   557777,
  //   557778,
  //   557779,
  //   557788,
  //   557789,
  //   557799,
  //   557888,
  //   557889,
  //   557899,
  //   557999,
  //   558888,
  //   558889,
  //   558899,
  //   558999,
  //   559999,
  //   566667,
  //   566668,
  //   566669,
  //   566677,
  //   566688,
  //   566699,
  //   566777,
  //   566778,
  //   566779,
  //   566788,
  //   566789,
  //   566799,
  //   566888,
  //   566889,
  //   566899,
  //   566999,
  //   567777,
  //   567788,
  //   567789,
  //   567799,
  //   567889,
  //   567899,
  //   568888,
  //   568899,
  //   569999,
  //   577778,
  //   577779,
  //   577788,
  //   577799,
  //   577888,
  //   577889,
  //   577899,
  //   577999,
  //   578888,
  //   578899,
  //   579999,
  //   588889,
  //   588899,
  //   588999,
  //   589999,
  //   666666,
  //   666677,
  //   666678,
  //   666679,
  //   666688,
  //   666689,
  //   666699,
  //   666778,
  //   666779,
  //   666788,
  //   666799,
  //   666889,
  //   666899,
  //   667777,
  //   667778,
  //   667779,
  //   667788,
  //   667789,
  //   667799,
  //   667888,
  //   667889,
  //   667899,
  //   667999,
  //   668888,
  //   668889,
  //   668899,
  //   668999,
  //   669999,
  //   677778,
  //   677779,
  //   677788,
  //   677799,
  //   677888,
  //   677889,
  //   677899,
  //   677999,
  //   678888,
  //   678899,
  //   679999,
  //   688889,
  //   688899,
  //   688999,
  //   689999
  // ];

  // return num.map(
  //   n =>
  //     `Value ${n} is ${
  //       n
  //         .toString()
  //         .match(/([0-9])\1*/g)
  //         .filter(element => element.length === 2).length
  //     }\n`
  // );

  let solution = 0;
  source.subscribe(value => (solution = value.length));
  return solution;
};

module.exports = { part1, part2 };
