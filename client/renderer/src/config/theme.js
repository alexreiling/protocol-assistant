const colors = {
  lightblue: '#66F',
  blue: '#1967d2',
  darkblue: '#00A',
  white: '#ffffff',
  gray1: '#f1f3f4',
  gray3: '#70757a',
  gray2:'#dadce0',
  gray4: '#222222',
  black: '#000',
  lightred: '#FDD',
  lightgreen: '#CFD',
  red: '#E33'
}
export const theme = {
  bg: {
    dark: colors.gray4,
    bright: colors.white,
    contrast: colors.gray1
  },
  gridline: {
    color:colors.gray2
  },
  font: {
    color:{
      bright: colors.white,
      dark: colors.gray4,
      gray: colors.gray3,
      linkHovered: colors.blue,
    }
  },
  button:{
    hover: {
      backgroundColor: colors.gray2,
      specialBg: {
        red: colors.lightred,
        green: colors.lightgreen
      }
    }
  },
  toggleSwitch:{
    backgroundColor: colors.gray2,
    color: colors.white,
    checked: {
      backgroundColor: colors.blue
    }
  },
  strongButton: {
    backgroundColor: colors.blue,
    color: colors.white,
    hover:{
      backgroundColor: colors.lightblue
    },
    active:{
      backgroundColor: colors.darkblue,
    }
  },
  input: {
    borderBottom: '1px solid grey',
    contrast: {
      backgroundColor: colors.gray1
    },
    focus: {
      borderBottom: `2px solid ${colors.blue}`
    }
  },
  scrollbar: {
    thickness: '10px',
    color: {
      thumb: colors.gray3,
      lane: colors.gray1
    }
  },
  nav:{
    thickness: {
      main: '48px',
      sub: '32px'
    },
    bar: {
      color: 'inherit',
      backgroundColor: colors.gray1
    },
    button:{
      fontWeight: 500,
      active:{
        backgroundColor: colors.white,
        color: colors.gray4,
        red: {
          backgroundColor: colors.lightred,
          color: colors.white,
        }
      },
      hover: {
        backgroundColor: colors.white,
        color: colors.gray4,
        red: {
          backgroundColor: colors.red,
          color: colors.white,
        }
      },
      inactive: {
        backgroundColor: colors.gray1,
        color: colors.gray3
      }
    }
  },
  layout: {

    header: {
      height: '300px'
    }
  }
}
export default theme