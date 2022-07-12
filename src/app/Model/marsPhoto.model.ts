export class MarsPhoto {
  img_src: string = '';
  earth_date: string = '';
  rover?: Rover;
}

class Rover {
  landing_date: string = '';
  launch_date: string = '';
  name: string = '';
  status: string = '';
}
