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
      accessor: client => moment(client.dateOfBirth).format('DD.MM.YYYY'),
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
export const theme = {
  bubbleMe: '#dcf8c6',
  bubbleThey: '#e6f2ff',
  bubbleStd: '#f5f5f5',
  colors: {
    bg: {
      dark: '#222222',
      bright: 'whitesmoke'
    },
    fonts: {
      bright: 'white',
      dark: 'black'
    },
    button:{
      bright:
      {
        hover:'#DDD',
      }
    }
  },
  scrollbar: {
    thickness: '10px'
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