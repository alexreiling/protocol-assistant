import moment from 'moment'
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
  black: 'black',
  lightred: '#FDD',
  lightgreen: '#CFD'
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
    bar: {
      color: 'inherit',
      backgroundColor: colors.lightgray
    },
    button:{
      fontWeight: 500,
      active:{
        backgroundColor: colors.white,
        color: colors.darkgray
      },
      hover: {
        backgroundColor: colors.white,
        color: colors.darkgray
      },
      inactive: {
        backgroundColor: colors.lightgray,
        color: colors.gray
      }
    }
  },
  layout: {
    nav: {
      thicknessMain: '48px',
      thicknessSub: '32px'
    },
    header: {
      height: '300px'
    }
  }
}
export const menues = {
  main:[
    {
      to:'/#',
      imgName:'Snooze_grau.png', 
    }
  ],
  sub: [
    {
      to:'/selling',
      label: 'Up-/Crossselling',
      imgName:'Vertragsänderung_schwarz.png'
    },
    {
      to:'/notes',
      label: 'Gesprächsnotizen',
      imgName:'Upselling_schwarz.png'
    },
    {
      to:'/protocol',
      label: 'Protokoll',
      imgName:'Upselling_schwarz.png'
    }
  ]
}
export const defaults = {
  newEntryPlaceholder: 'Neuer Eintrag...'
}