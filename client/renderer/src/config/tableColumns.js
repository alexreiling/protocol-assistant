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
export default columns