import React from 'react';
import renderer from 'react-test-renderer';

//Nombre de render sur la page MyEvents (test import module swipe render deux choses différentes) --> import abandonné
import Myevents from './Components/MyEvents';


 test('has 1 child', () => {
   const tree = renderer.create(<Myevents />).toJSON();
   expect(tree.children.length).toBe(1);
 });