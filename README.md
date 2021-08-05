# PlantPal
Health tracking for houseplants
<br />
Deployment link - https://plantpal1.herokuapp.com

## Description
With PlantPal, caring for your houseplants has never been easier. Keep track of your plants and their care needs, so you never forget to water them again!

## Features
- User auth - register, sign in, sign out, email validation
- Dashboard
    - Number of alive plants
    - Number of dead plants
    - Number of snapshots
    - Upcoming reminders
        - for example Snake plant: Watering due in 2 days
    - Leaderboard for how long you've kept the plant alive
        - for example Snake plant - 7 days
    - Weather API
        - If temperate goes over 28 degrees, create a new notification to tell the user to check on their plants
- Create a Plant - using a form
    - Add a Plant Profile Pic
    - Configure the watering schedule
    - Set reminder frequency to add fertiliser
- View/Update/Track your plants
    - Add a Plant Entry
        - For example if to upload a new photo to the Plant to track it's health/growth over time
    - Receive a notification
        - Based on the schedule/frequency inputted when the plant was added
        - View the calendar to see when a task is due
        - When you complete a task, update the status to Complete
- View all your plants - Plant Library
    - Search by name
    - Filter by status - dead or alive

## Backlog
- Ability to delete a Snapshot without deleting the plant
- Display the Snapshots on the Schedule page, alongside the Reminders
- Guides
    - View blog post type guides on specific house plants with recommendations for watering schedules and general care
- Forum
    - View and Post on a timeline to connect with other user's and ask questions about plants

# Client
## Routes
- / - Landing page
- /auth/signup - Signup form
- /auth/login - Login form
- /profile/:id - profile page - name, email etc
- /profile/:id/edit - update/delete profile
- /dashboard - Dashboard
- /plants - all your plants
- /plants/create - add a plant form
- /plants/:id - plants detail page
- /plants/:id/edit - edit plant details
- /plants/:id/record-progress - add a post about that plant to appear on that plant details page
- /schedule - view calendar - tasks created per watering schedule defined when create plant
- /schedule/:id - view task details and update status - incomplete to complete
- /schedule/:id/edit - edit task details
- 404

## Pages
- Home Page (public landing page)
- Sign In Page (anon only)
- Sign Up Page (anon only)
- Profile Page (user only)
- Dashboard (user only)
- Plants (user only)
- Plant Detail Page (user only)
- Create Plant Form Page (user only)
- Edit/ Delete Plant Form Page (user only)
- Schedule Page (user only)
- Schedule -> Task Detail Page (user only)
- Schedule -> Edit/Delete Task Page (user only)
- 404 Page (public page)

## Components
- LandingPage
- Register
- LogIn
- Profile
- Nav
- Dashboard
- PlantsList
- PlantsDetail
- AddPlantForm
- EditDeletePlantForm
- Calendar(TasksList)
- TaskDetail
- AddTaskForm
- EditDeleteTaskForm

## Services
- Auth Service
    - auth.login(user)
    - auth.signup(user)
    - auth.logout()
    - auth.profile()
    - auth.getUser() // synchronous
- Plant Service
    - plants.list()
    - plants.create(data)
    - plants.detail(id)
    - plants.edit(id)
    - plants.delete(id)
- Schedule Service
    - schedule.list()
    - schedule.task.details()
    - schedule.task.edit()

# Server
## Models

User Model

    _id
    Name
    Username
    Email Address
    Town/City
    Password
    Plant ref -> _id

Plant Model

    _id
    Name
    Description
    Plant profile picture
    Set a reminder to water? -> Dropdown to select from 1-31 days
    Set a reminder to add fertiliser? -> Dropdown to select from 1-12 months
    Status -> Can be Alive or Dead, by default it's Alive
    User ref -> _id

Snapshots Model

    _id
    Date -> Autofills with date created
    Name
    Text
    Option to upload a photo
    Plant ref -> _id

Reminders Model

    _id
    Name
    Date
    Status -> Complete or Incomplete
    Plant ref -> _id

## API Endpoints/Backend Routes
- GET /auth/profile
- POST /auth/signup
    - body:
        - name
        - username 
        - email address
        - password
        - town/city
- POST /auth/login
    - body:
        - username
        - password
- POST /auth/logout
    - body: (empty)
- PATCH /profile/edit
    - body:
        - name
        - username 
        - email address
        - password
        - town/city
- DELETE /profile
    - body: (empty)
- GET /plants
    - body:
        - name
        - plant profile pic
        - status
- GET /plants/:id
    - body:
        - name
        - description
        - plant profile pic
        - water schedule - e.g every 7 days
        - fertiliser schedule - e.g. every 3 months
        - status
        - snapshots -> all snapshots logged for this plant
            - date
            - name
            - text
            - photo
- PATCH /plants/:id/edit
    - body:
        - name
        - description
        - plant profile pic
        - water schedule - e.g every 7 days
        - fertiliser schedule - e.g. every 3 months
        - status
- DELETE /plants/:id
    - body (empty) -> deleting the plant also deletes the snapshots
- GET /schedule 
    - body:
        - name
        - date
        - status
- PATCH /schedule
    - body:
        - name
        - date
        - status

# Links
## Website Link
https://plantpal1.herokuapp.com

## Wireframes
Model / States - https://whimsical.com/module-3-plantpal-model-AAwWf1dDaKD712XyCy78P8
<br/>
Pages / Wireframes - https://whimsical.com/module-3-wireframes-FnY9a3VvQ7h3NHBbHQS9ct

## Github
Client-side code - https://github.com/elyzx/plantpal-client
<br/>
Server-side code - https://github.com/elyzx/plantpal-server

## Slides
TBD
