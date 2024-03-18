Installation Guide

Clone the repository from GitHub.

Install dependencies using npm:
npm install
Set up the environment variables by creating a .env file for Laravel.

Run the Laravel development server using the following command in a separate terminal:
php artisan serve

Usage Guide
The Salat Time Web Interface consists of a single homepage where users can perform the following actions:

Location Selection: Users can pick their location from the provided list.
Date Selection: Users can select a specific date to view the Salat times for that day.
Salat Time Display: Upon selecting the location and date, the web interface displays the corresponding Salat times.
Monthly Salat Time Display: Users can view a table listing the Salat times for an entire Gregorian month.
Ramadan Timetable: Users can access the Ramadan timetable for a selected location and year.
Printing Functionality: Both the monthly Salat times and Ramadan timetable can be printed directly from the web interface.
Loading Spinner: A loading spinner is implemented to enhance user experience while data is being fetched.
Translation Support: The project includes translation support, allowing for global changes to text or names.