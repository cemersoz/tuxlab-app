// Meteor Imports
	import { Meteor } from 'meteor/meteor';
	import { MeteorComponent } from 'angular2-meteor';

// Angular Imports
	import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';

// Declare Global Variable
	var SimpleMDE : any = require('simplemde');

// Define Editor Component
	@Component({
		selector: 'tuxlab-mdeditor',
		templateUrl: '/client/imports/ui/components/mdeditor/mdeditor.html',
	})

// Export Editor Class
	export class MDEditor extends MeteorComponent {
		@ViewChild('simplemde') textarea : ElementRef;
		@Input() mdData: string = "";
		@Output() mdUpdated = new EventEmitter<string>();

		constructor(private elementRef:ElementRef) {
			super();
		}

		ngAfterViewInit(){
			var self = this;
			// Instantiate SimpleMDE
			var mde = new SimpleMDE({ element: this.elementRef.nativeElement.value });
			// Read initial data from task markdown
			mde.value(self.mdData);
			// Catch changes
			mde.codemirror.on("change", function() {
				self.mdData = mde.value();
				self.mdUpdated.emit(self.mdData);
			});
		}
	}
