export const environment = {
  production: true,
  API_URL: '',
  THEME_LIST: [
    {
      'path': 'default-theme',
      'name': 'Default Theme',
      'primary': '#303f9f',
      'isDark': false,
      'isDefault': true
    },
    {
      'path': 'light-theme',
      'name': 'Light Theme',
      'isDark': false,
      'primary': '#eeeeee'
    },
    {
      'path': 'dark-theme',
      'name': 'Dark Theme',
      'isDark': true,
      'primary': '#616161'
    },
    {
      'path': 'natural-theme',
      'name': 'Natural Theme',
      'isDark': false,
      'primary': '#5d4037'
    }
  ]
};
