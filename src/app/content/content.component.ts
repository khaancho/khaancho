import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
advertisement = {
  title: 'School',
  description : 'Galaxy Public School is now taking admissions for grade 1 - 10 for new semesters.',
  company: 'Excelsior School',
  email : 'example@example.com',
  telephone : 97711234567,
}
}
