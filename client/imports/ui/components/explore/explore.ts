// Meteor Imports
	import { Meteor } from 'meteor/meteor';

// Angular Imports
	import { Component } from '@angular/core';

// Angular Material Imports
	import { MATERIAL_DIRECTIVES } from 'ng2-material';
	import { MeteorComponent } from 'angular2-meteor';

// Courses Imports
	import { courses } from '../../../../../collections/courses.ts';

// Define ExploreView Component
	@Component({
		selector: 'tuxlab-exploreview',
		templateUrl: '/client/imports/ui/components/explore/explore.html',
		directives: [
			MATERIAL_DIRECTIVES
		],
	})

// Export ExploreView Class
export class ExploreView extends MeteorComponent {

	courses: Array<any> = [];

	constructor() {
		super();

		this.subscribe('explore-courses', () => {
			this.courses = courses.find().fetch();}, true);
	}
}
