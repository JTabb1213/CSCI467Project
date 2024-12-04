import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure FormsModule is imported
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  // Filters object to bind with the form inputs
  filters = {
    status: '',
    startDate: '',
    endDate: '',
    associate: '',
    customer: ''
  };

  // Placeholder data for sales associates until the databse is connected
  salesAssociates = [
    { id: 1, name: 'Riker', username: 'WRiker', commission: 5000, address: '123 stargazer St' },
    { id: 2, name: 'Geordi', username: 'GLaforge', commission: 30000, address: '1243 warpcore blvd' },
    { id: 3, name: 'Worf', username: 'KWorf', commission: 3000, address: '2222 enterprise ln' },
  ];

  // Method to add a new sales associate
  addAssociate() {
    alert('Add New Sales Associate');
  }

  // Method to search quotes based on filters
  searchQuotes() {
    console.log('Searching quotes with filters:', this.filters);
  }

  // Method to edit an existing sales associate
  editAssociate(associate: any) {
    alert(`Editing associate: ${associate.name}`);
  }

  // Method to delete a sales associate
  deleteAssociate(id: number) {
    alert(`Deleting associate with ID: ${id}`);
  }
}
