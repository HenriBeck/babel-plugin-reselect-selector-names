import { declare } from '@babel/helper-plugin-utils';
import { types as t, NodePath } from '@babel/core';
import { VariableDeclaration } from '@babel/types';

const validNames = ['createSelector'];

export default declare((api) => {
  api.assertVersion(7);

  return {
    name: 'reselect-selector-names',

    visitor: {
      VariableDeclaration(path: NodePath<VariableDeclaration>) {
        const { node } = path;

        if (node.declarations.length > 1) {
          return;
        }

        const declarator = node.declarations[0];

        if (
          t.isIdentifier(declarator.id) &&
          t.isCallExpression(declarator.init) &&
          t.isIdentifier(declarator.init.callee) &&
          validNames.includes(declarator.init.callee.name)
        ) {
          const { name } = declarator.id;

          // Add the variable name as selectorName to the selector
          path.insertAfter(
            t.expressionStatement(
              t.assignmentExpression(
                '=',
                t.memberExpression(
                  t.identifier(name),
                  t.identifier('selectorName'),
                ),
                t.stringLiteral(name),
              ),
            ),
          );
        }
      },
    },
  };
});
