import chalk from 'chalk';
import figures from 'figures';

// Need to support Node versions that don't support spreading function arguments
const spread = (fn) => function () {
  return fn([].slice.call(arguments))
}

export const log = console.log.bind(console);

export const error = spread((messages) => {
  console.error(chalk.red.apply(chalk, [figures.cross].concat(messages)))
});

export const info = spread((messages) => {
  console.info(chalk.cyan.apply(chalk, [figures.info].concat(messages)))
});

export const success = spread((messages) => {
  console.log(chalk.green.apply(chalk, [figures.tick].concat(messages)))
});

export const warn = spread((messages) => {
  console.warn(chalk.yellow.apply(chalk, [figures.warning].concat(messages)))
});
