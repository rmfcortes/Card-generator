import { Injectable } from '@angular/core';
import { createAnimation, Animation, Gesture, GestureConfig, createGesture } from '@ionic/core';


@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor( ) { }

  animBrinca(element) {
    createAnimation()
      .addElement(element)
      .duration(1000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'scale(0.97)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1)', opacity: '.93' },
        { offset: 1, transform: 'scale(0.97)', opacity: '1' }
      ])
      .play()
  }

}
