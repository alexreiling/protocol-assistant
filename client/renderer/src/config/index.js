import moment from 'moment'
import img from '../assets/img';
export const columns = {
  client: [
    {
      Header: 'Vorname',
      accessor: 'firstName'
    },
    {
      Header: 'Nachname',
      accessor: 'lastName'
    },
    {
      Header: 'VNR',
      accessor: 'clientId',
    },
    {
      Header: 'PLZ',
      accessor: 'address.zipCode'
    },
    {
      id: 'dateOfBirth',
      Header: 'Geburtsdatum',
      accessor: client => moment(client.dateOfBirth,'DD.MM.YYYY').format('DD.MM.YYYY'),
      sortMethod: (a,b) => moment(a,'DD.MM.YYYY').valueOf() > moment(b,'DD.MM.YYYY').valueOf() ? 1 : -1
    }
  ],
  contract:[
    {
      Header: 'Code',
      accessor: 'code',
      width: 50
    },
    {
      Header: 'Typ',
      accessor: 'name'
    },
  ],
  concern:[
    {
      Header: 'Anliegen',
      accessor: 'name'
    }
  ]
}
const colors = {
  lightblue: '#66F',
  blue: '#1967d2',
  darkblue: '#00A',
  white: '#ffffff',
  lightgray: '#f1f3f4',
  gray: '#70757a',
  linegray:'#dadce0',
  darkgray: '#222222',
  black: '#000',
  lightred: '#FDD',
  lightgreen: '#CFD',
  red: '#E33'
}
export const theme = {
  bg: {
    dark: colors.darkgray,
    bright: colors.white,
    contrast: colors.lightgray
  },
  gridline: {
    color:colors.linegray
  },
  font: {
    color:{
      bright: colors.white,
      dark: colors.darkgray,
      gray: colors.gray,
      linkHovered: colors.blue,
    }
  },
  button:{
    hover: {
      backgroundColor: colors.lightgray,
      specialBg: {
        red: colors.lightred,
        green: colors.lightgreen
      }
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
      backgroundColor: colors.lightgray
    },
    focus: {
      borderBottom: `2px solid ${colors.blue}`
    }
  },
  scrollbar: {
    thickness: '10px',
    color: {
      thumb: colors.gray,
      lane: colors.lightgray
    }
  },
  nav:{
    thickness: {
      main: '48px',
      sub: '32px'
    },
    bar: {
      color: 'inherit',
      backgroundColor: colors.lightgray
    },
    button:{
      fontWeight: 500,
      active:{
        backgroundColor: colors.white,
        color: colors.darkgray,
        red: {
          backgroundColor: colors.lightred,
          color: colors.white,
        }
      },
      hover: {
        backgroundColor: colors.white,
        color: colors.darkgray,
        red: {
          backgroundColor: colors.red,
          color: colors.white,
        }
      },
      inactive: {
        backgroundColor: colors.lightgray,
        color: colors.gray
      }
    }
  },
  layout: {

    header: {
      height: '300px'
    }
  }
}
export const menues = {
  main:[
    {
      to:'/#',
      img:img.robotInactive, 
    }
  ],
  sub: [
    {
      to:'/selling',
      label: 'Up-/Crossselling',
      img: img.upsellingActive,
      imgInactive: img.upsellingInactive
    },
    {
      to:'/notes',
      label: 'Gesprächsnotizen',
      img: img.notesActive,
      imgInactive: img.notesInactive
    },
    {
      to:'/protocol',
      label: 'Protokoll',
      img: img.protocollActive,
      imgInactive: img.protocollInactive
    }
  ]
}
export const defaults = {
  newEntryPlaceholder: 'Neuer Eintrag...'
}