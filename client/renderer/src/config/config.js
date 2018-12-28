export const columns = {
  client: [
    {
      Header: 'Nachname',
      accessor: 'lastName'
    },
    {
      Header: 'Vorname',
      accessor: 'firstName'
    },
    {
      Header: 'VNR',
      accessor: 'clientId',

    }
  ],
  concern:[
    {
      Header: 'Anliegen',
      accessor: 'name'
    }
  ]
}