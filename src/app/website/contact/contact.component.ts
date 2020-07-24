import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  zoom = 5;
  lat = 6.4535;
  lng = 3.4343;
  markers: Marker[] = [
    {
      lat: 6.4535,
      lng: 3.4343,
      label: 'A',
      draggable: true
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  clickedMarker(label: string, index: number) {
    // console.log(`clicked the marker: ${label || index}`);
  }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  // }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    // console.log('dragEnd', m, $event);
  }
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

// just an interface for type safety.



