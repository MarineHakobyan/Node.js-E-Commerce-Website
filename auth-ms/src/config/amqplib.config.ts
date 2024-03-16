export const amqlibConfig = {
  compilerOptions: {
    target: 'es5',
    module: 'commonjs',
    strict: true,
  },
  include: ['src/**/*.ts', 'node_modules/amqplib/callback_api/**/*.ts'],
};
