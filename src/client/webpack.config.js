module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
      }
    },
  },
};