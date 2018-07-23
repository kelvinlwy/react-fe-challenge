**Biarri - Front End Dev Challenge**

For this challenge, we're providing you with three mock data JSON files (Employee, Shift and Role), and are looking for you to use these to create a simple rostering solution SPA for visualising and editing the assignment of shifts to employees. 

To give you an idea of what we mean by rostering, take a look at the table below. Essentially we're looking for a mapping of shifts to employees across a given time period - in the case of this exercise we're providing one week's worth of data. Please bear in mind this is just a sample - we'd like to see your UX chops in how you choose to display this information!

![](https://upload.wikimedia.org/wikipedia/commons/e/e8/WeeklySchedule.png)

In the context of this exercise, the periods employees are working are referred to as shifts. 
Each shift and employee can have multiple roles, and each employee needs to have all the roles a shift requires in order to be eligible to perform that shift.

If a shift is assigned to an employee, it will have it's employee_id property set to an integer, otherwise it will be null.

The amount of time you spend on this exercise is up to you, however we're looking for it to meet the following guidelines:

 - The app should use React as a base framework - any library choices beyond this are up to you.
 - The app should display one week of rostering information for the employees in the mock data 	set.
 - The roster must be represented in tabular format, and also in a visualisation of some form - we're looking for something that would aid end users in understanding the information they're being presented with.
 - 
 - The data provides DateTimes in UTC, but will also feature a timezone property - make sure that you’re using this to format your date times! We want to see the data in the context of their timezone, not your local time zone.

When you're ready to share your solution with us, please create a public repo and email a link to your recruiter or Biarri contact. 
