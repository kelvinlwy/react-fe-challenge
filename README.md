**Biarri - Front End Dev Challenge**

For this challenge, we are looking for you to create a simple rostering solution SPA for visualising and editing the shifts of employees. 
For example this could be used for a small business that works 24/7 to manage the shifts of it's employees to make sure everyone gets adequate days off and doesn't get shifts which are directly back-to-back (eg working on a night shift followed by a morning shift the next day)

We're providing you with three mock data JSON files:

 - Configuration: General information about the location which the roster is for including the timezone and title 
 - Employees: The people who are being rostered
 - Shifts: These are the bits of work assigned to employees. If a shift is assigned to an employee, it will have it's employee_id property set to an integer matching the id field on the employee.
 - Role: The type/label of the shift. Each shift will have a role_id which corresponds to a role.

The amount of time you spend on this exercise is up to you, however we're looking for it to meet the following guidelines:

 - The app should use React as a base framework - any library choices beyond this are up to you.
 - The app should display the whole week of rostering information for the employees in the mock data set.
 - The roster must be represented in both a tabular format, and also a visualisation of some form - we're looking for something that would aid end users in understanding the information they're being presented with.
 - The data provides DateTimes in UTC, but the configuration will specify a timezone property - make sure that you're using this to format your date times! We want to see the data in the context of their timezone, not your local time zone.
 - The ability to edit the start/end times of a shift (you do not need to be able to edit any additional data, create or delete shifts)

If any of the requirements are unclear feel free to send through questions for clarification or make assumptions - we are not trying to test you on your knowledge of rostering.

Please create your solution in a fork off this repo.
When you're ready to share your solution with us, email a link to your recruiter or Biarri contact.

While not required, if part of completing this challenge involves wireframing, paper prototyping, mockups or similar please add them to a folder in your repo.

On completion, if there are additional things you think you could have done better/did not have enough time to complete, feel free to compile a quick list and bring it to the technical interview to help remind yourself during the discussion.

---

#### Installation
```
yarn install # Install all dependencies
```

#### Start the app in development mode
```
yarn start # Building bundle and running development server
```
Now the app should be running at http://localhost:3000/

#### Completed requirements

* The project is developed in React with Redux.
* [Material-UI](https://material-ui.com/) is used for UI components.
* [React Calendar Timeline](https://github.com/namespace-ee/react-calendar-timeline) is used for the Timeline components.
* [React Big Calendar](https://github.com/intljusticemission/react-big-calendar) is used for the calendar components.
* The roster is represented in a tabular format, calendar format, and timeline format and those are able to display the whole week of rostering information.
* Date are formatted and display based on the provided timezone in Table View and Calendar View, but not the Timeline View(the library does not support timezone offset).
* The start/end times editor is provided in a popup modal from clicking either the shift block in calendar view or the edit icon button in table view. 

### Incomplete features

My other approach to the solution for updating start/end times is using the drag and drop feature provided in React Big Calendar.
But the functional limitation is a restriction in the ability to set an event across 2 days. So the user is not able to set 'night shift' which is a shift from night time to the day time of next day.
I attempted to solve it by splitting the 'night shift' into 2 shifts which were the evening shift and the morning shift. But It's not an ideal solutions as it ended up creating 2 new shifts and causes other issue of break time allocation.

The timeline was my second approach to visualise the rostering information. There were 3 issues addressing why I couldn't complete it. 
The style customisation doesn't work in the library which leads to the failure of colouring shift block with specific colour. 
The events that handle the block resizing and block movement don't work, so I failed to create either a drag-n-drop action or block-resizing action to update start/end times.
The library doesn't support timezone offset, so it won't display the date time in correct timezone.
In terms of design, using timeline is in higher level in usability by comparing to the calendar view. It's neat and clear to visualise the rostering information by time to time and by employees.

### Improvement

* Fix the libraries or build a new module to solve the problems 
* Write unit tests                                                                                                                                                                                                                             
