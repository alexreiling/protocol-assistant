import img from '../assets/img';
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
export default menues