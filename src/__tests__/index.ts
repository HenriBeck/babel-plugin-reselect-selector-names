import * as babel from '@babel/core';
import plugin from '../';

it('works', () => {
  const res = babel.transform(
    `
  const getConfig = createSelector();
  `,
    { plugins: [plugin] },
  );

  expect(res && res.code).toMatchSnapshot();
});
